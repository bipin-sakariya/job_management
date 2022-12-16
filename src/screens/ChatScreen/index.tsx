import { Alert, FlatList, Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, CameraScreenView, CommonPdfView, Container, CustomActivityIndicator, CustomJobDetailsBottomButton, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Avatar, AvatarProps, Bubble, BubbleProps, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, MessageImageProps, MessageVideoProps, Send, SendProps, User, } from 'react-native-gifted-chat'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import moment from 'moment'
import { strings } from '../../languages/localizedStrings'
import RBSheet from 'react-native-raw-bottom-sheet'
import DocumentPicker from 'react-native-document-picker';
import { ImageLibraryOptions, launchImageLibrary, } from 'react-native-image-picker'
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import { DocList, ImageList, VideoList } from '../../types/commanTypes'
import { isEmptyArray } from 'formik'
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer'
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Video from 'react-native-video'
import RNModal from 'react-native-modal';
interface MessageProps {
    createdAt: Date | number;
    text: string;
    user: User;
    image?: ImageList[],
    type?: string,
    attachment?: DocList[]
    _id: string | number;
    video?: VideoList[];
}

export interface SelectedImageProps {
    visible: boolean,
    selectedIndex?: number,
    data: ImageList[] | undefined
}

interface JobDataProps {
    id: number,
    name: string,
    distance: string,
    descriprion: string,
    imageurl: string
}

const messageData = [
    {
        _id: 1,
        text: 'Hello developer 111111',
        createdAt: new Date(),
        type: 'job',
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 12,
        text: 'Hello developer',
        createdAt: new Date(),
        type: 'job',
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 13,
        text: 'Hello developer ',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 14,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 15,
        text: 'Hello developer ',
        createdAt: new Date(),
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 16,
        text: 'Hello developer ',
        createdAt: new Date(),
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
        video: [{
            id: Math.random(),
            url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            mediaType: 'mp4'
        }]
    },
]

const job = {
    id: 1,
    name: 'job title',
    distance: '5 km',
    descriprion: 'hello this is the job details screen page',
    imageurl: "https://dummyimage.com/600x400/000/fff",
}
const ChatScreen = () => {
    const navigation = useCustomNavigation('ChatScreen')
    const [messages, setMessages] = useState<Array<MessageProps>>(messageData)
    const refRBSheet = useRef<RBSheet | null>(null);

    const [imageList, setImageList] = useState<ImageList[] | []>([])
    const [docList, setDocList] = useState<DocList[] | []>([])
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true)
    const [selectedImageVedio, setSelectedImageVedio] = useState<SelectedImageProps>({ visible: false, selectedIndex: 0, data: [] });
    const [showCameraView, setShowCameraView] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    //temp data
    const [jobData, setJobData] = useState<JobDataProps | undefined>(job)

    const onSend = useCallback((messages: MessageProps[] = []) => {
        console.log("🚀 ~ file: index.tsx:157 ~ onSend ~ messages", messages)
        let message = [{
            _id: 1,
            text: messages[0].text,
            createdAt: messages[0].createdAt,
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
            image: messages[0].image,
            attachment: messages[0].attachment,
            type: messages[0].type,
            video: [{
                id: 123,
                url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                mediaType: 'video'
            }, {
                id: 123,
                url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                mediaType: 'video'
            }, {
                id: 123,
                url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                mediaType: 'video'
            }, {
                id: 123,
                url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                mediaType: 'video'
            }, {
                id: 123,
                url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                mediaType: 'video'
            }, {
                id: 123,
                url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                mediaType: 'video'
            }]
            // video: messages[0].video
        }]
        //clear the job data
        setJobData(undefined)
        setIsVisible(false)
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    }, [])

    const RenderDateTxt = ({ date }: { date: number | Date | undefined }) => {
        return (
            <Text style={styles.chatDateTxtStyle}>{moment(date).format("HH:MM A")}</Text>
        )
    }

    // const requestCameraPermission = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.CAMERA, {
    //                 title: 'Camera Permission',
    //                 message: 'App needs camera permission',
    //                 buttonPositive: 'ok'
    //             }
    //             );
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err) {
    //             console.warn(err);
    //             return false;
    //         }
    //     } else return true;
    // };

    // const cameraLaunch = async (type: MediaType) => {
    //     let option: CameraOptions = {
    //         mediaType: type,
    //         cameraType: 'back',
    //         saveToPhotos: true,
    //         presentationStyle: 'fullScreen',
    //     }
    //     const result = await launchCamera(option);
    //     console.log("🚀 ~ file: index.tsx:187 ~ cameraLaunch ~ result", result)

    //     if (result.didCancel) {
    //         console.log('User cancelled image picker');
    //     } else if (result.errorMessage) {
    //         console.log('ImagePicker Error: ', result.errorMessage);
    //     } else {
    //         if (result.assets && result.assets[0]?.uri) {
    //             let ImageTempArray = [...imageList]
    //             ImageTempArray.push({
    //                 id: Math.random(),
    //                 imgUrl: result.assets[0].uri,
    //                 mediaType: result.assets[0].type?.split('/')[1],
    //             })
    //             setImageList(ImageTempArray)
    //             refRBSheet.current?.close()
    //         }
    //     }

    // }

    const renderBubble = (props: BubbleProps<IMessage>) => {
        return (
            <View style={{ flex: 1, alignItems: props.position == 'right' ? 'flex-end' : 'flex-start', }}>
                {
                    props.position == "right" &&
                    <RenderDateTxt date={props.currentMessage?.createdAt} />
                }
                <Bubble
                    {...props}
                    renderCustomView={(props) => {
                        return (
                            <>
                                {
                                    props.currentMessage?.type &&
                                    <LinkPreview
                                        previewData={{
                                            description: 'This link https://github.com/flyerhq asd asd can be extracted from the text',
                                            image: { height: 50, width: 50, url: 'https://dummyimage.com/600x400/000/fff' },
                                            link: 'https://github.com/flyerhq',
                                            title: 'hello'
                                        }}
                                        metadataContainerStyle={{ direction: 'rtl', marginTop: 0 }}
                                        metadataTextContainerStyle={styles.linkMetadataTextContainerStyle}
                                        textContainerStyle={[styles.linkTextContainerStyle,]}
                                        text='This link https://github.com/flyerhq asd asd can be extracted from the text'
                                        renderTitle={() => {
                                            return (
                                                <View style={[globalStyles.rowView, styles.jobDetailHeaderView, globalStyles.rtlDirection,]}>
                                                    <Text numberOfLines={1} style={styles.jobTitleTxt}>Job Title as dasdasd</Text>
                                                    <View style={[globalStyles.rowView, styles.pinImageViewStyle]}>
                                                        <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.pinImageStyle} />
                                                        <Text numberOfLines={1} style={styles.jobDistanceTxt}>5 km away ads sd sdasdasd</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                        renderDescription={(props) => <Text numberOfLines={2} style={[styles.jobDetailsTxt, { direction: 'ltr' }]}>{props}</Text>}
                                        renderText={() => {
                                            return null
                                        }}
                                        renderMinimizedImage={(props) => <Image source={{ uri: props.url }} style={[styles.renderMinimizedImageStyle]} />}
                                    />
                                }
                                {
                                    props.currentMessage?.attachment &&
                                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                                        <FlatList
                                            data={props.currentMessage?.attachment}
                                            renderItem={({ item, index }: { item: DocList, index: number }) => {
                                                return (
                                                    <CommonPdfView item={item} onPress={() => {
                                                        const pdfName = item.path.split(/[#?]/)[0].split('/').pop()?.split('.')[0];
                                                        const extension = item.path.split(/[#?]/)[0].split(".").pop()?.trim();;
                                                        const localFile = `${RNFS.DocumentDirectoryPath}/${pdfName}.${extension}`;
                                                        const options = {
                                                            fromUrl: item.path,
                                                            toFile: localFile,
                                                        };
                                                        RNFS.downloadFile(options).promise.then(() =>
                                                            FileViewer.open(localFile)).then(() => {
                                                            }).catch((error) => {
                                                            });
                                                    }}
                                                    />
                                                )
                                            }}
                                        />
                                    </View>
                                }
                            </>
                        )
                    }}
                    textStyle={{
                        right: {
                            ...globalStyles.rtlStyle,
                            color: colors.chat_right_Txt,
                            fontFamily: fonts.FONT_POP_REGULAR,
                            fontSize: FontSizes.SMALL_14,
                        },
                        left: {
                            ...globalStyles.rtlStyle,
                            color: colors.white,
                            fontFamily: fonts.FONT_POP_REGULAR,
                            fontSize: FontSizes.SMALL_14
                        },
                    }}
                    wrapperStyle={{
                        right: {
                            backgroundColor: colors.light_blue_color,
                            paddingVertical: wp(2),
                            paddingHorizontal: wp(2),
                            borderRadius: 0,
                            borderBottomRightRadius: wp(3),
                            borderBottomLeftRadius: wp(3),
                            borderTopLeftRadius: wp(3)
                        },
                        left: {
                            backgroundColor: colors.primary_color,
                            paddingVertical: wp(2),
                            paddingHorizontal: wp(2),
                            borderRadius: 0,
                            borderTopRightRadius: wp(3),
                            borderBottomLeftRadius: wp(3),
                            borderBottomRightRadius: wp(3)
                        },
                    }}
                    renderTime={() => null}
                />
                {
                    props.position == "left" &&
                    <RenderDateTxt date={props.currentMessage?.createdAt} />
                }
            </View>

        )
    }

    const renderSend = (props: SendProps<IMessage>) => {
        return (
            <Send {...props}
                sendButtonProps={{
                    onPress: () => {
                        if (props.onSend) {
                            setImageList([])
                            setDocList([])
                            props.onSend({
                                text: props.text,
                                image: imageList.filter((i) => i.mediaType == "image"),
                                attachment: docList,
                                type: jobData && "job",
                                video: imageList.filter((i) => i.mediaType == "video")
                            }, true)
                        }
                    }
                }}
                containerStyle={{ marginHorizontal: wp(2) }
                }>
                <Image source={ImagesPath.send_btn_icon} style={styles.sendBtnStyle} />
            </Send >
        )
    }

    const renderAvatar = (props: AvatarProps<IMessage>) => {
        return (
            <Avatar
                {...props}
                renderAvatarOnTop
                containerStyle={{
                    left: {
                        borderRadius: wp(5),
                        width: wp(8),
                        height: wp(8),
                        justifyContent: "center",
                        alignItems: 'center'
                    },
                    right: {
                        borderRadius: wp(5),
                        width: wp(8),
                        height: wp(8),
                        justifyContent: "center",
                        alignItems: 'center',
                        marginTop: wp(5)
                    }
                }}
            />
        )
    }

    const selectOneFile = async (type: string) => {
        try {
            if (type == "mixed") {
                let option: ImageLibraryOptions = {
                    mediaType: 'mixed',
                    presentationStyle: 'fullScreen'
                }
                const result = await launchImageLibrary(option);
                if (result.didCancel) {
                    console.log('User cancelled image picker');
                } else if (result.errorMessage) {
                    console.log('ImagePicker Error: ', result.errorMessage);
                } else {
                    console.log("🚀 ~ file: index.tsx:415 ~ selectOneFile ~ result", result)
                    if (result.assets && result.assets[0]?.uri) {
                        // if (result.assets[0].type?.split('/')[0] == 'image') {
                        let ImageTempArray = [...imageList]
                        ImageTempArray.push({
                            id: Math.random(),
                            url: result.assets[0].uri,
                            mediaType: result.assets[0].type?.split('/')[0],
                        })
                        setImageList(ImageTempArray)
                        refRBSheet.current?.close()
                    }
                }
            }
            else {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.plainText],
                    presentationStyle: 'fullScreen',
                    mode: 'import',
                    allowMultiSelection: true,
                    copyTo: 'cachesDirectory'
                })
                let DocTempArray = [...docList]
                if (res[0]?.type?.split("/")[0] == 'application') {
                    DocTempArray.push({
                        id: Math.random(),
                        path: res[0].uri,
                        type: res[0]?.type?.split("/")[1],
                        mb: res[0].size,
                        title: res[0].name
                    })
                }
                setDocList(DocTempArray)
            }
            refRBSheet.current?.close()
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
        return (
            <InputToolbar
                {...props}
                primaryStyle={{ marginBottom: wp(2) }}
                containerStyle={styles.inputTextToolBarContainerStyle}
                renderComposer={(data: ComposerProps) => {
                    return (
                        <View style={styles.inputToolBarMainViewStyle}>
                            <TextInput
                                {...data}
                                value={data.text}
                                onChangeText={data.onTextChanged}
                                multiline={false}
                                numberOfLines={1}
                                placeholder={strings.Write_a_message_here}
                                placeholderTextColor={colors.dark_blue3_color}
                                style={styles.inputToolBarTextInputStyle}
                            />
                            <TouchableOpacity style={{ padding: wp(3) }}
                                onPress={() => {
                                    refRBSheet.current?.open()
                                }}
                            >
                                <Image source={ImagesPath.linkImage} style={styles.linkImageStyle} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
                renderSend={() => renderSend(props)}
            />
        )
    }

    const removeImage = (item: ImageList, index: number,) => {
        Alert.alert("Are you sure to remove image", '', [{
            text: 'Yes',
            onPress: () => {
                setImageList(imageList.filter((i) => i.id != item.id))
            }
        }, {
            text: 'Cancle',
            onPress: () => {

            }
        }])
    }

    const removeDocument = (item: DocList, index: number,) => {
        Alert.alert("Are you sure to remove document", '', [{
            text: 'Yes',
            onPress: () => {
                setDocList(docList.filter((i) => i.id != item.id))
            }
        }, {
            text: 'Cancle',
            onPress: () => {

            }
        }])
    }

    const renderImageVedioMessage = (props: MessageImageProps<IMessage> | MessageVideoProps<IMessage>, type: string) => {
        const data = type == "image" ? props.currentMessage?.image : props.currentMessage?.video
        return (
            <>
                {
                    data && data?.length >= 4 ?
                        <View style={styles.renderImageMainStyle}>
                            {
                                data.slice(0, 4).map((item, index) => {
                                    return (
                                        <>
                                            {
                                                index <= 2 ?
                                                    <TouchableOpacity onPress={() => {
                                                        setActiveIndex(index)
                                                        data && setSelectedImageVedio({ visible: true, selectedIndex: index, data: data })
                                                    }}>
                                                        {
                                                            type == 'image' ?
                                                                <Image source={{ uri: item.url }} style={styles.renderImageStyle} />
                                                                : <Video poster={'https://dummyimage.com/600x400/000/fff'} posterResizeMode={'cover'} source={{ uri: item.url }} paused style={{ height: wp(31), borderRadius: wp(2), width: wp(31), marginHorizontal: wp(1), marginVertical: wp(1) }} resizeMode={'cover'} />
                                                        }
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => {
                                                        setActiveIndex(index)
                                                        data && setSelectedImageVedio({ visible: true, selectedIndex: index, data: data })
                                                    }} style={styles.remainImageViewStyle}>
                                                        <Text style={styles.remainTxtStyle}>+{data && data.length - 3}</Text>
                                                    </TouchableOpacity>
                                            }
                                        </>
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                            {
                                data?.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.singleImageViewStyle} onPress={() => {
                                            console.log({ oneItem: item });
                                            setActiveIndex(index)
                                            data && setSelectedImageVedio({ visible: true, selectedIndex: index, data: data })
                                        }}>
                                            {
                                                type == 'image' ?
                                                    <Image source={{ uri: item.url }} style={styles.singleImageStyle} />
                                                    :
                                                    <Video poster={'https://dummyimage.com/600x400/000/fff'} posterResizeMode={'cover'} source={{ uri: item.url }} paused style={{ minHeight: wp(40), borderRadius: wp(2), minWidth: wp(65) }} resizeMode={'cover'} />
                                            }
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </>
                }
            </>
        )
    }

    const renderChatFooter = () => {
        return (
            <View style={[styles.chatFooterMainView, { padding: !isEmptyArray(docList) || !isEmptyArray(imageList) ? wp(4) : 0 }]}>
                {
                    jobData && isVisible &&
                    <LinkPreview
                        previewData={{
                            description: 'This link https://github.com/flyerhq asd asd can be extracted from the text',
                            image: { height: 100, width: 100, url: 'https://dummyimage.com/600x400/000/fff' },
                            // link: 'https://github.com/flyerhq',
                            title: 'hello'
                        }}
                        metadataContainerStyle={{ direction: 'rtl', marginTop: 0 }}
                        metadataTextContainerStyle={styles.footerMetadataTextStyle}
                        textContainerStyle={styles.footerTextContainerStyle}
                        text='This link https://github.com/flyerhq asd asd can be extracted from the text'
                        renderTitle={() => {
                            return (
                                <View style={[globalStyles.rowView, styles.jobDetailHeaderView, globalStyles.rtlDirection,]}>
                                    <Text numberOfLines={1} style={[styles.jobTitleTxt]}>Job Title</Text>
                                    <View style={[globalStyles.rowView, styles.pinImageViewStyle]}>
                                        <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.pinImageStyle} />
                                        <Text numberOfLines={1} style={styles.jobDistanceTxt}>5 km away</Text>
                                    </View>
                                </View>
                            )
                        }}
                        renderDescription={(props) => <Text numberOfLines={2} style={[styles.jobDetailsTxt, { direction: 'ltr' }]}>{props}</Text>}
                        renderText={() => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setIsVisible(!isVisible)
                                }} style={[globalStyles.rtlDirection, {
                                    padding: wp(2),
                                    alignSelf: 'flex-end',
                                    position: "absolute",
                                    zIndex: 5,
                                }]}>
                                    <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                </TouchableOpacity>
                            )
                        }}
                        renderMinimizedImage={(props) => <Image source={{ uri: props.url }} style={[styles.renderMinimizedImageStyle]} />}
                    />
                }
                {/* {
                    imageList.length != 0 && (renderFooterImageDoc('image', imageList))
                }
                {
                    docList.length != 0 && (renderFooterImageDoc('image', docList))
                } */}
                {
                    imageList.length != 0 &&
                    <View style={styles.footerImageDocMainViewStyle}>
                        {imageList.slice(0, 4).map((item, index) => {
                            console.log("🚀 ~ file: index.tsx:648 ~ {imageList.slice ~ item", item)
                            return (
                                <>
                                    {
                                        index <= 2 ?
                                            <View>
                                                <TouchableOpacity onPress={() => { removeImage(item, index) }} style={styles.closeButtonView}>
                                                    <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                                </TouchableOpacity>
                                                {
                                                    item.mediaType == "video" ?
                                                        <Video source={{ uri: item.url }} paused style={styles.footerImageStyle} resizeMode={'cover'} />
                                                        :
                                                        <Image source={{ uri: item.url }} style={styles.footerImageStyle} />
                                                }
                                            </View>
                                            :
                                            <View style={styles.footerImageViewStyle}>
                                                <Text style={styles.remainTxtStyle}>+{imageList.length - 3}</Text>
                                            </View>
                                    }
                                </>
                            )
                        }
                        )}
                    </View>
                }
                {
                    docList.length != 0 &&
                    <View style={styles.footerImageDocMainViewStyle}>
                        {docList.slice(0, 4).map((item, index) => {
                            return (
                                <>
                                    {
                                        index <= 2 ?
                                            <View>
                                                <TouchableOpacity onPress={() => { removeDocument(item, index) }} style={styles.closeButtonView}>
                                                    <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                                </TouchableOpacity>
                                                <View style={styles.footerDocStyle}>
                                                    <Text style={styles.remainTxtStyle}>PDF</Text>
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.footerDocViewStyle}>
                                                <Text style={styles.remainTxtStyle}>+{docList.length - 3}</Text>
                                            </View>
                                    }
                                </>

                            )
                        }
                        )}
                    </View>
                }
            </View >
        )
    }

    const renderFooterImageDoc = (type: string, data: ImageList[] & DocList[]) => {
        return (
            <View style={styles.footerImageDocMainViewStyle}>
                {data.slice(0, 4).map((item, index) => {
                    return (
                        <>
                            {
                                index <= 2 ?
                                    <View>
                                        <TouchableOpacity onPress={() => { removeImage(item, index) }} style={styles.closeButtonView}>
                                            <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                        </TouchableOpacity>
                                        {
                                            type == "image" ?
                                                <Image source={{ uri: item.url }} style={styles.footerImageStyle} />
                                                : null
                                        }
                                    </View>
                                    :
                                    <View style={styles.footerImageViewStyle}>
                                        <Text style={styles.remainTxtStyle}>+{data.length - 3}</Text>
                                    </View>
                            }
                        </>
                    )
                }
                )}
            </View>
        )
    }

    return (
        <View style={[globalStyles.container]}>
            {loading && <CustomActivityIndicator size={'small'} />}
            <Header
                containerStyle={{ backgroundColor: colors.white }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.rtlStyle, styles.titleTxt]}>Bill name</Text>
                    </TouchableOpacity>
                }
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
            />
            <Container style={styles.mainViewStyle}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    showAvatarForEveryMessage={false}
                    showUserAvatar={true}
                    renderBubble={renderBubble}
                    renderAvatarOnTop
                    renderAvatar={renderAvatar}
                    renderChatFooter={renderChatFooter}
                    renderInputToolbar={renderInputToolbar}
                    renderMessageImage={(props) => renderImageVedioMessage(props, 'image')}
                    // renderMessageImage={renderMessageImage}
                    renderMessageVideo={(props) => renderImageVedioMessage(props, 'video')}
                    renderSend={renderSend}
                    alwaysShowSend
                    user={{
                        _id: 1,
                        name: "new one",
                        // avatar: ""
                    }}
                />
            </Container>
            {showCameraView && <RNModal
                isVisible={showCameraView}
                style={{ margin: 0, backgroundColor: colors.white_color }}>
                <CameraScreenView onClose={setShowCameraView} setFile={setImageList} fileData={imageList} />
            </RNModal>}
            {selectedImageVedio.visible && selectedImageVedio.data &&
                <Modal
                    visible={selectedImageVedio.visible}
                    style={{ margin: 0, backgroundColor: colors.white_color }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setActiveIndex(null)
                                setSelectedImageVedio({ visible: false, selectedIndex: 0, data: [] })
                            }}
                            style={styles.closeImageBtnStyle}>
                            <Image source={ImagesPath.cross_icon} style={styles.closeIcon} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Carousel
                                layout={'default'}
                                data={selectedImageVedio.data}
                                firstItem={selectedImageVedio.selectedIndex}
                                // activeSlideOffset={0}
                                sliderWidth={wp(100)}
                                itemWidth={wp(100)}
                                inactiveSlideOpacity={1}
                                // callbackOffsetMargin={0}
                                onSnapToItem={setActiveIndex}
                                style={{ backgroundColor: 'red' }}
                                renderItem={({ item, index }: { item: ImageList, index: number }) => {
                                    return (
                                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', backgroundColor: colors.white_color }}>
                                            {
                                                item.mediaType == 'video' ?
                                                    <Video
                                                        poster={''}
                                                        source={{ uri: item.url }}
                                                        paused={(activeIndex != index)}
                                                        resizeMode={'cover'}
                                                        repeat={true}
                                                        style={[styles.backgroundVideo]}
                                                    />
                                                    : <ImageViewer
                                                        imageUrls={[{ url: item.url }]}
                                                        renderIndicator={() => <></>}
                                                        backgroundColor='transparent'
                                                    />

                                            }
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            }
            <BottomSheet
                ref={refRBSheet}
                onClose={() => {
                    // setShowCameraView(false)
                }}
                animationType={'slide'}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: colors.bottom_sheet_tab,
                        width: wp(0),
                    },
                    container: {
                        borderTopLeftRadius: wp(8),
                        borderTopRightRadius: wp(8),
                        shadowColor: 'rgba(0, 0, 0, 0.9)',
                        shadowOpacity: 10,
                        shadowRadius: 10,
                        shadowOffset: { height: 0, width: 0 },
                        elevation: 10,
                    },
                }}
                children={
                    <View style={styles.bottomViewStyle}>
                        <CustomJobDetailsBottomButton
                            imageStyle={styles.bottomImageStyle}
                            image={ImagesPath.gallary_image_icon}
                            buttonText={strings.Photos}
                            onPress={async () => {
                                // if (showCameraView) {
                                //     let permission
                                //     if (Platform.OS == "android") {
                                //         permission = await requestCameraPermission()
                                //         permission && cameraLaunch('video')
                                //     } else {
                                //         cameraLaunch('video')
                                //     }
                                // } else {
                                selectOneFile('mixed')
                                // }
                            }} />
                        <CustomJobDetailsBottomButton
                            imageStyle={styles.bottomImageStyle}
                            image={ImagesPath.camera_image_icon}
                            buttonText={strings.Camera}
                            onPress={() => {
                                refRBSheet.current?.close()
                                setTimeout(() => {
                                    setShowCameraView(true)
                                }, 500);
                            }
                            }
                        />
                        <CustomJobDetailsBottomButton
                            imageStyle={styles.bottomImageStyle}
                            image={ImagesPath.file_image_icon}
                            buttonText={strings.document}
                            onPress={() => {
                                selectOneFile('file')
                            }} />
                    </View>
                }
                height={225}
            />
        </View>
    )
}

export default ChatScreen
