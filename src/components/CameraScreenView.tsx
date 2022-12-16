import { View, Text, ActivityIndicator, TouchableOpacity, Alert, Image, Platform } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import Animated, { Easing } from 'react-native-reanimated';
import { AnimatedCircularProgress, AnimatedCircularProgressProps } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import Reanimated, {
    useAnimatedProps,
    useSharedValue,
    withSpring,
} from "react-native-reanimated"
import RNFS, { downloadFile, writeFile } from 'react-native-fs';
import { Camera, CameraProps, CameraRuntimeError, useCameraDevices } from 'react-native-vision-camera';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../styles/Colors';
import { ImagesPath } from '../utils/ImagePaths';
import { useIsFocused } from '@react-navigation/native';
import { SelectedImageProps } from '../screens/ChatScreen';
import { ImageList } from '../types/commanTypes';
import { StyleSheet } from 'react-native';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)
Reanimated.addWhitelistedNativeProps({
    zoom: true,
})

interface FileTypeProps {
    height?: number
    isRawPhoto?: boolean
    path: string
    width?: number
    duration?: number
    size?: number
}

interface CameraScreenViewProps {
    onClose: Dispatch<SetStateAction<boolean>>
    setFile: Dispatch<SetStateAction<ImageList[]>>,
    fileData: ImageList[]
}

const CameraScreenView = ({ onClose, setFile, fileData }: CameraScreenViewProps) => {

    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    const [recordingStart, setRecordingStart] = useState(false)
    const progressRef = useRef<AnimatedCircularProgress>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const cameraPermission = Camera.getCameraPermissionStatus()
        const newCameraPermission = Camera.requestCameraPermission()
        return () => {
            setRecordingStart(false)
        }
    }, [])

    const camera = useRef<Camera>(null)
    const zoom = useSharedValue(0)

    const animatedProps = useAnimatedProps<Partial<CameraProps>>(
        () => ({ zoom: zoom.value }),
        [zoom]
    )

    const storeFile = (file: FileTypeProps, type: string) => {
        setLoading(true)
        console.log("🚀 ~ file: CameraScreenView.tsx:67 ~ storeFile ~ file", file)
        const tmpPath = (Platform.OS == "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath) + `/${type}` + Math.random() + (type == "image" ? '.jpg' : '.mp4')
        RNFS.readFile(file.path, 'base64')
            .then(async (res) => {
                console.log("🚀 ~ file: CameraScreenView.tsx:86 ~ storeFile ~ res", res)

                let tempFile = [...fileData]
                await writeFile(tmpPath, res, 'base64').then((data) => {
                    console.log("🚀 ~ file: CameraScreenView.tsx:74 ~ writeFile ~ data", data)
                    tempFile.push({
                        id: Math.random(),
                        url: 'file://' + tmpPath,
                        mediaType: type,
                    })
                    setFile(tempFile)
                    setLoading(false)
                    onClose(false)
                }).catch((error) => {
                    console.log({ error });
                });
            });
        return { path: tmpPath };
    }

    const onError = useCallback((error: CameraRuntimeError) => {
        console.error(error)
    }, [])

    const vedioRecordingStart = async (action: string) => {
        if (action == 'start') {
            setRecordingStart(true)
            progressRef.current?.animate(360, 20000, Easing.ease).start()
            camera.current?.startRecording({
                flash: 'auto',
                onRecordingError: (error) => {
                    progressRef.current?.animate(360, 20000, Easing.ease).stop()
                    Alert.alert("Something went wrong")
                },
                onRecordingFinished: async (video) => {
                    console.log("🚀 ~ file: CameraScreenView.tsx:108 ~ vedioRecordingStart ~ video", video)

                    return storeFile(video, "video")
                },
                fileType: 'mp4',
            })
        } else {
            await camera.current?.stopRecording().then((data) => {
                console.log("🚀 ~ file: CameraScreenView.tsx:111 ~ awaitcamera.current?.stopRecording ~ data", data)
                progressRef.current?.animate(360, 20000, Easing.ease).reset()
                setRecordingStart(false)
            }).catch((error) => {
                console.log({ error });
            })
        }
    }

    if (device == null) return <ActivityIndicator />
    return (
        <>
            {loading && <ActivityIndicator size={"large"} style={{ alignSelf: "center", flex: 1, zIndex: 1, ...StyleSheet.absoluteFillObject }} />}
            <Text></Text>
            <ReanimatedCamera
                ref={camera}
                {...camera.current?.props}
                style={{ flex: 1 }}
                device={device}
                isActive={true}
                videoStabilizationMode={'auto'}
                preset={'medium'}
                photo={true}
                video={true}
                zoom={device.neutralZoom}
                enableZoomGesture={true}
                animatedProps={animatedProps}
                focusable={true}
                onError={onError}
            />
            <TouchableOpacity onPress={() => !loading && onClose(false)} style={style.closeIconView}>
                <Image source={ImagesPath.close_icon} style={style.closeIcon} />
            </TouchableOpacity>
            <AnimatedCircularProgress
                duration={200}
                ref={progressRef}
                size={wp(20)}
                width={wp(2)}
                fill={0}
                lineCap={'round'}
                fillLineCap={'round'}
                easing={Easing.out(Easing.ease)}
                tintColor={colors.primary_color}
                onAnimationComplete={(event) => console.log('onAnimationComplete', event)}
                padding={2.90}
                style={{
                    backgroundColor: 'transparent',
                    position: "absolute",
                    bottom: wp(2),
                    alignSelf: 'center'
                }}
                tintTransparency={false}
            >
                {
                    (fill) => {
                        return (
                            <TouchableOpacity
                                delayLongPress={Platform.OS == "ios" ? 1000 : 3000}
                                onLongPress={() => vedioRecordingStart('start')}
                                onPressOut={async () => recordingStart && vedioRecordingStart('stope')}
                                onPress={async () => {
                                    !recordingStart && await camera.current?.takePhoto({ qualityPrioritization: 'balanced', flash: 'auto', skipMetadata: false, }).then(async (data) => {
                                        return storeFile(data, 'image')
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                }}
                                style={style.clickBtnStyle} >
                            </TouchableOpacity>
                        )
                    }
                }
            </AnimatedCircularProgress>
        </>
    )
}

const style = StyleSheet.create({
    closeIconView: {
        position: 'absolute',
        top: wp(10),
        left: wp(5),
        backgroundColor: colors.light_blue_color,
        borderRadius: wp(10),
        padding: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIcon: {
        height: wp(7),
        width: wp(7),
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    clickBtnStyle: {
        height: wp(19.8),
        width: wp(19.8),
        backgroundColor: colors.light_blue_color,
        position: 'absolute',
        alignSelf: 'center',
    }

})

export default CameraScreenView