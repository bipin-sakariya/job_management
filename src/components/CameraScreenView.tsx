import { View, Text, ActivityIndicator, TouchableOpacity, Alert, Image } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
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
import { Camera, CameraProps, useCameraDevices } from 'react-native-vision-camera';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../styles/Colors';
import { ImagesPath } from '../utils/ImagePaths';

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

const CameraScreenView = ({ onClose }: { onClose: Dispatch<SetStateAction<boolean>> }) => {

    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    const [recordingStart, setRecordingStart] = useState(false)
    const progressRef = useRef<AnimatedCircularProgress>(null);

    useEffect(() => {
        const cameraPermission = Camera.getCameraPermissionStatus()
        const newCameraPermission = Camera.requestCameraPermission()
    }, [])

    const camera = useRef<Camera>(null)
    const zoom = useSharedValue(0)

    const animatedProps = useAnimatedProps<Partial<CameraProps>>(
        () => ({ zoom: zoom.value }),
        [zoom]
    )

    const storeFile = (file: FileTypeProps, downloadFilePath: string) => {
        console.log("🚀 ~ file: index.tsx:43 ~ storeFile ~ file", file)
        RNFS.readFile(file.path, 'base64')
            .then(res => {
                writeFile(downloadFilePath, res, 'base64').then((data) => {
                    console.log("store", data);
                }).catch((error) => {
                    console.log({ error });
                });
            });
        onClose(false)
        return { path: downloadFilePath };
    }

    if (device == null) return <ActivityIndicator />
    return (
        <>
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
            />

            <TouchableOpacity onPress={() => onClose(false)} style={{ position: 'absolute', top: wp(10), left: wp(5), backgroundColor: colors.light_blue_color, borderRadius: wp(10), padding: wp(2), alignItems: 'center', justifyContent: 'center' }}>
                <Image source={ImagesPath.close_icon} style={{ height: wp(7), width: wp(7), resizeMode: 'cover' }} />
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
                                delayLongPress={1500}
                                onLongPress={() => {
                                    setRecordingStart(true)
                                    progressRef.current?.animate(360, 20000, Easing.ease).start()
                                    camera.current?.startRecording({
                                        flash: 'auto',
                                        onRecordingError: (error) => {
                                            progressRef.current?.animate(360, 20000, Easing.ease).stop()
                                            Alert.alert("Some thing went wrong")
                                        },
                                        onRecordingFinished: (video) => {
                                            const tmpPath = RNFS.DownloadDirectoryPath + '/video' + Date.now().toString().slice(3, 4) + '.mp4'
                                            return storeFile(video, tmpPath)
                                            // RNFS.readFile(video.path, 'base64')
                                            //     .then(res => {
                                            //         writeFile(tmpPath, res, 'base64').then((data) => {
                                            //             console.log("store", data);
                                            //         }).catch((error) => {
                                            //             console.log({ error });
                                            //         });
                                            //     });
                                            // return { path: tmpPath };
                                        },
                                        fileType: 'mp4',
                                    })
                                }}
                                onPressOut={async () => {
                                    recordingStart && await camera.current?.stopRecording().then((data) => {
                                        progressRef.current?.animate(360, 20000, Easing.ease).reset()
                                        setRecordingStart(false)
                                    }).catch((error) => {
                                        console.log({ error });
                                    })
                                }}
                                onPress={() => {
                                    camera.current?.takePhoto({ qualityPrioritization: 'balanced', flash: 'auto', skipMetadata: false, enableAutoDistortionCorrection: true, enableAutoStabilization: true }).then(async (data) => {
                                        console.log({ data });
                                        const tmpPath = RNFS.DownloadDirectoryPath + '/image' + Date.now().toString().slice(3, 4) + '.jpg'
                                        return storeFile(data, tmpPath)
                                        // RNFS.readFile(data.path, 'base64')
                                        //     .then(res => {
                                        //         writeFile(tmpPath, res, 'base64').then((data) => {
                                        //         }).catch((error) => {
                                        //             console.log({ error });
                                        //         });
                                        //     });
                                        // return { path: tmpPath };
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                }}
                                style={{ height: wp(19.8), width: wp(19.8), backgroundColor: colors.light_blue_color, position: 'absolute', alignSelf: 'center', }} >
                            </TouchableOpacity>
                        )
                    }
                }
            </AnimatedCircularProgress>
        </>
    )
}

export default CameraScreenView