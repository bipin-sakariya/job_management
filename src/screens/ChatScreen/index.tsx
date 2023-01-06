import { Alert, Image, Modal, Platform, Pressable, StatusBar, Text, TextInput, TextProps, TextStyle, ViewStyle, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, CommonlinkPreview, CommonPdfView, Container, CustomActivityIndicator, CustomJobDetailsBottomButton, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Avatar, AvatarProps, Bubble, BubbleProps, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, LoadEarlier, LoadEarlierProps, MessageImageProps, MessageVideoProps, Send, SendProps, User, } from 'react-native-gifted-chat'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import moment from 'moment'
import { strings } from '../../languages/localizedStrings'
import RBSheet from 'react-native-raw-bottom-sheet'
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, CameraOptions } from 'react-native-image-picker'
import { DocList, ImageList, JobDataProps, MessageProps, VideoList } from '../../types/commanTypes'
import ImageViewer from 'react-native-image-zoom-viewer'
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Video from 'react-native-video'
import RNModal from 'react-native-modal';
import { createThumbnail } from 'react-native-create-thumbnail'
import { RootRouteProps } from '../../types/RootStackTypes'
import { useRoute } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { messageListDetails } from '../../redux/slices/ChatSlice/ChatSlice'
import { SOCKET_URL } from '../../config/Host'

export interface SelectedImageProps {
    visible: boolean,
    selectedIndex?: number,
    data: ImageList | VideoList | undefined,
}

interface CloseIconProps {
    onPress?: () => void,
    viewStyle?: ViewStyle
}

const PhotoOption: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    includeBase64: true,
    presentationStyle: 'fullScreen',
    saveToPhotos: true
}

const messageData = [
    {
        _id: 5,
        createdAt: new Date(),
        text: 'hello',
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 1,
        text: 'Hello developer 111111',
        createdAt: new Date(),
        jobData: {
            id: 1,
            name: 'job title',
            distance: '5 km',
            descriprion: 'hello this is the job details screen page',
            imageurl: "https://dummyimage.com/600x400/000/fff",
        },
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 2,
        text: 'Hello developer video',
        createdAt: new Date(),
        jobData: {
            id: 1,
            name: 'job title',
            distance: '5 km',
            descriprion: 'hello this is the job details screen page',
            imageurl: "https://dummyimage.com/600x400/000/fff",
        },
        user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
        video: {
            id: 0,
            url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            mediaType: 'video',
            thumbnail: ''
        }
    },
    {
        _id: 3,
        text: 'Hello developer video',
        createdAt: new Date(),
        jobData: {
            id: 1,
            name: 'job title',
            distance: '5 km',
            descriprion: 'hello this is the job details screen page',
            imageurl: "https://dummyimage.com/600x400/000/fff",
        },
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
        image: {
            id: 0,
            url: 'https://dummyimage.com/600x400/000/fff',
            mediaType: 'image',
        }
    },
    {
        _id: 4,
        text: 'Hello developer 123',
        createdAt: new Date(),
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 6,
        createdAt: new Date(),
        jobData: {
            id: 1,
            name: 'job title',
            distance: '5 km',
            descriprion: 'hello this is the job details screen page',
            imageurl: "https://dummyimage.com/600x400/000/fff",
        },
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },

    },
]

const CLOSED = 3
const CLOSING = 2
const CONNECTING = 0
const OPEN = 1

const currentUser: User = {
    _id: 1,
    avatar: 'https://placeimg.com/140/140/any',
    name: "Developer"
}

interface messageListApiCallProps {
    id?: number,
    page?: number
}

const ChatScreen = () => {
    const navigation = useCustomNavigation('ChatScreen')
    const route = useRoute<RootRouteProps<'ChatScreen'>>();
    const job_data = route.params.job

    const [page, setPage] = useState<number>(1)
    const dispatch = useAppDispatch()

    const { token, netInfo } = useAppSelector(state => state.userDetails)
    const { messageList } = useAppSelector(state => state.chatData)
    const [messages, setMessages] = useState<MessageProps[]>(messageData)
    const [loading, setLoading] = useState(false);
    const [footerLoading, setFooterLoading] = useState<boolean>(false)
    const refRBSheet = useRef<RBSheet | null>(null);
    const menuRef = useRef(null);
    const [imageVideoSelected, setImageVideoSelected] = useState(false)
    const chatRef = useRef<GiftedChat<MessageProps> | null>(null)
    const [jobData, setJobData] = useState<JobDataProps | undefined>(job_data)
    const [imageList, setImageList] = useState<ImageList | undefined>(undefined)
    const [videoList, setVideoList] = useState<VideoList | undefined>(undefined)
    const [docList, setDocList] = useState<DocList | undefined>(undefined)
    const [selectedImageVedio, setSelectedImageVedio] = useState<SelectedImageProps>({
        visible: false,
        data: {
            id: 0,
            mediaType: "",
            url: '',
            thumbnail: ''
        }
    });

    let chatId = 3

    const url = SOCKET_URL + chatId + `/${token?.access}/`
    const ws = useRef<WebSocket>(new WebSocket(url)).current

    useEffect(() => {
        let params = {
            id: chatId,
            page: page
        }
        // chat list api call
        setLoading(true)
        getMessageListApiCall(params)
    }, [])

    useEffect(() => {
        socketConnectionOpen()

        ws.addEventListener('open', () => {
            console.log("SOCKET CONNECTION OPEN");
        })

        ws.addEventListener('message', (message) => {
            console.log(message.data);

        })

        ws.addEventListener('error', (error) => {
            console.log("SOCKET CONNECTION ERROR", error, error.message)
            if (ws.readyState == CLOSED) {
                setTimeout(() => {
                    socketConnectionOpen()
                }, 5000);
            }
        })

        ws.addEventListener('close', (close) => {
            console.log("SCOKET CONNECTION CLOSE", close);
        })

        return () => {
            if (ws.readyState == OPEN) {
                socketConnectionClose()
            }
        }
    }, [])

    const socketConnectionOpen = () => {
        ws.onopen
    }

    const socketConnectionClose = () => {
        ws.close()
    }

    const sendMessageOnSocket = (text: string) => {
        //data
        ws.send(text)
    }

    const getMessageListApiCall = (params: messageListApiCallProps) => {
        dispatch(messageListDetails(params)).unwrap().then((res) => {
            let tempmessage: MessageProps[] = []
            res.results.map((item, index) => {
                console.log("🚀 ~ file: index.tsx:271 ~ res.results.map ~ item", item)
                let message: MessageProps = {
                    _id: 5,
                    createdAt: new Date(),
                    text: 'hello',
                    user: {
                        _id: 1,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    }
                    // attachment: { attachment: "" },
                    // image: { url: '' },
                    // jobData: {
                    //     id: ''
                    // },
                    // video: {
                    //     url: ''
                    // }
                }
                tempmessage.push(message)
            })
            if (params.page == 1) {
                setMessages(tempmessage)
                setLoading(false)
            } else {
                setMessages([...messages, ...tempmessage])
                setFooterLoading(false)
            }
            setPage(page + 1)
            setMessages(previousMessages => GiftedChat.append(previousMessages, res.results))
        }).catch((error) => {
            setLoading(false)
            console.log({ error });

        })
    }

    const onSend = useCallback((messages: MessageProps[] = []) => {
        console.log("🚀 ~ file: index.tsx:157 ~ onSend ~ messages", messages)
        let message: MessageProps[] = [{
            _id: 1,
            text: messages[0]?.text,
            createdAt: messages[0].createdAt,
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
            jobData: messages[0].jobData,
        }]
        if (messages[0].image?.url) {
            message = [{
                ...message[0],
                image: messages[0].image
            }]
        }
        if (messages[0].video?.url) {
            message = [{
                ...message[0],
                video: messages[0].video
            }]
        }
        if (messages[0].attachment?.attachment) {
            message = [{
                ...message[0],
                attachment: messages[0].attachment
            }]
        }
        //clear all data
        removeAlldata()

        if (loading) {
            Alert.alert("Please wait..!!")
        } else {
            if (ws.readyState == OPEN) {
                messages[0].text && sendMessageOnSocket(messages[0].text)
            } else {
                if (netInfo && ws.readyState == CLOSED) {
                    socketConnectionOpen()
                    messages[0].text && sendMessageOnSocket(messages[0].text)
                } else {
                    Alert.alert("Network connection error...")
                    socketConnectionOpen()
                }
            }
        }
        console.log("🚀 ~ file: index.tsx:146 ~ onSend ~ message", message)
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    }, [])

    const removeAlldata = (type?: string) => {
        switch (type) {
            case "image":
                setImageList(undefined)
                break;
            case "video":
                setVideoList(undefined)
                break;
            case "doc":
                setDocList(undefined)
                break;
            case 'job':
                setJobData(undefined)
                break;
            case 'image&video':
                setImageList(undefined)
                setVideoList(undefined)
                break;
            default:
                setImageList(undefined)
                setDocList(undefined)
                setVideoList(undefined)
                setJobData(undefined)
                break;
        }
    }

    const selectOneFile = async (type: string) => {
        try {
            setLoading(true)
            const result = await DocumentPicker.pick({
                type: type == "photo" ? [DocumentPicker.types.images, DocumentPicker.types.video] : [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.plainText],
                presentationStyle: 'fullScreen',
                mode: 'import',
                allowMultiSelection: true,
                copyTo: 'cachesDirectory',
            })
            if (type == "photo") {
                if (result[0]?.type?.split("/")[0] == 'image') {
                    setImageList({
                        // url: result[0].fileCopyUri ? result[0].fileCopyUri : "",
                        url: result[0].uri,
                        mediaType: result[0]?.type?.split("/")[0],
                        id: Math.random()
                    })
                } else {
                    createThumbnail({
                        url: result[0].fileCopyUri ? result[0].fileCopyUri : '',
                        timeStamp: 1000,
                    }).then((res) => {
                        setVideoList({
                            url: result[0].fileCopyUri ? result[0].fileCopyUri : '',
                            mediaType: result[0]?.type?.split("/")[0],
                            id: Math.random(),
                            thumbnail: res.path
                        })
                    }).catch((error) => {
                        console.log("Thumbnail not get", error);
                    })
                }
                refRBSheet.current?.close()
                setTimeout(() => {
                    setImageVideoSelected(true)
                }, 500);
            }
            else {
                if (result[0]?.type?.split("/")[0] == 'application') {
                    setDocList({
                        id: Math.random(),
                        attachment: result[0].fileCopyUri ? result[0].fileCopyUri : "",
                        type: result[0]?.type?.split("/")[1],
                        bytes: result[0].size,
                        title: result[0].name
                    })
                    setLoading(false)
                    refRBSheet.current?.close()
                } else {
                    setLoading(false)
                }
            }
        }
        catch (err) {
            if (DocumentPicker.isCancel(err)) {
                setLoading(false)
            } else {
                setLoading(false)
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const customMessage = () => {
        const props = chatRef.current?.props
        const state = chatRef.current?.state
        if (props?.onSend && (state?.text || imageList?.url || docList?.attachment || videoList?.url || jobData)) {
            chatRef?.current?.onSend([{
                _id: Math.random(),
                createdAt: new Date(),
                user: props?.user ? props?.user : currentUser,
                text: state?.text ? state?.text : '',
                image: imageList,
                video: videoList,
                attachment: docList,
                jobData: jobData,
            }], true)
            removeAlldata()
        }
    }

    const RenderDateTxt = ({ date, textStyle }: { date: number | Date | undefined, textStyle?: TextStyle }) => {
        return (
            <Text style={[styles.chatDateTxtStyle, textStyle]}>{moment(date).format("HH:MM A")}</Text>
        )
    }

    const renderBubble = (props: BubbleProps<IMessage>) => {
        return (
            <View style={{ flex: 1, alignItems: props.position == 'right' ? 'flex-end' : 'flex-start' }}>
                {
                    props.position == "right" ?
                        <RenderDateTxt date={props.currentMessage?.createdAt} />
                        : null
                }
                <Bubble
                    {...props}
                    renderCustomView={(props) => {
                        return (
                            <>
                                {
                                    props.currentMessage?.jobData &&
                                    <CommonlinkPreview onPress={() => {
                                        //for scoket
                                        // navigation.navigate("JobDetailsScreen", { params: params })
                                    }}
                                        job={props.currentMessage?.jobData}
                                        containerStyle={styles.linkPreviewContainerStyle} />
                                }
                                {
                                    props.currentMessage?.attachment &&
                                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                                        <CommonPdfView
                                            item={{ attachment: props.currentMessage?.attachment.attachment }}
                                            mainView={styles.pdfViewStyle}
                                            onPress={async () => {
                                                setLoading(true)
                                                const pdfName = props.currentMessage?.attachment?.attachment.split(/[#?]/)[0].split('/').pop()?.split('.')[0];
                                                const extension = props.currentMessage?.attachment?.attachment.split(/[#?]/)[0].split(".").pop()?.trim();;
                                                const localFile = `${RNFS.DocumentDirectoryPath}/${pdfName}.${extension}`;
                                                const options = {
                                                    fromUrl: props.currentMessage?.attachment?.attachment ? props.currentMessage?.attachment?.attachment : '',
                                                    toFile: localFile,
                                                };
                                                let checkHttpLink = props.currentMessage?.attachment?.attachment.includes("http://")
                                                checkHttpLink ?
                                                    RNFS.downloadFile(options).promise.then(() =>
                                                        FileViewer.open(localFile)).then(() => {
                                                            setLoading(false)
                                                        }).catch((error) => {
                                                            setLoading(false)
                                                        }) :
                                                    props.currentMessage?.attachment?.attachment && FileViewer.open(props.currentMessage?.attachment?.attachment).then((data) => {
                                                        setLoading(false)
                                                    }).catch((error) => {
                                                        setLoading(false)
                                                    })
                                            }
                                            }
                                        />
                                    </View >
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
                            borderRadius: 0,
                            padding: wp(1),
                            borderBottomRightRadius: wp(3),
                            borderBottomLeftRadius: wp(3),
                            borderTopLeftRadius: wp(3)
                        },
                        left: {
                            backgroundColor: colors.primary_color,
                            borderRadius: 0,
                            padding: wp(1),
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
            </View >

        )
    }

    const renderSend = (props: SendProps<IMessage>) => {
        return (
            <Send {...props}
                sendButtonProps={{
                    onPress: () => {
                        if (props.onSend && (props.text || imageList?.url || docList?.attachment || videoList?.url || (jobData && props.text))) {
                            props.onSend({
                                text: props.text,
                                image: imageList,
                                attachment: docList,
                                jobData: jobData,
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
                    left: styles.leftAvatarStyle,
                    right: styles.rightAvatarStyle
                }}
            />
        )
    }

    const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
        return (
            <InputToolbar
                {...props}
                primaryStyle={{
                    marginVertical: wp(1)
                }}
                renderComposer={(data: ComposerProps) => {
                    return (
                        <View ref={menuRef} style={styles.toolbarContainerStyle}>
                            <TextInput
                                {...data}
                                value={data.text}
                                onChangeText={data.onTextChanged}
                                multiline={true}
                                placeholder={strings.write_a_message_here}
                                placeholderTextColor={colors.dark_blue3_color}
                                style={styles.inputToolBarTextInputStyle}
                            />
                            <TouchableOpacity disabled={docList?.attachment || imageList?.url || videoList?.url ? true : false} style={{ padding: wp(3) }}
                                onPress={() => refRBSheet.current?.open()}>
                                <Image source={ImagesPath.linkImage} style={styles.linkImageStyle} />
                            </TouchableOpacity>
                        </View>
                    )
                }
                }
            />
        )
    }

    const renderChatFooter = () => {
        if (jobData || docList?.attachment) {
            return (
                <View style={[styles.chatFooterMainView,]}>
                    {jobData ? <View style={styles.innerChatFooterContainerStyle}>
                        <TouchableOpacity onPress={() => { setJobData(undefined) }} style={[globalStyles.rtlDirection, styles.footerCloseBtnStyle]}>
                            <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                        </TouchableOpacity>
                        <CommonlinkPreview job={jobData} />
                    </View> : null}
                    {
                        docList?.attachment &&
                        <View style={{ backgroundColor: colors.white, marginBottom: wp(1) }}>
                            <TouchableOpacity onPress={() => { removeAlldata('doc') }} style={[globalStyles.rtlDirection, styles.footerCloseBtnStyle, { alignSelf: 'center', margin: wp(1.5), paddingRight: wp(1) }]}>
                                <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                            </TouchableOpacity>
                            <CommonPdfView disabled item={{ attachment: docList.attachment, bytes: docList.bytes }} mainView={{ backgroundColor: colors.light_blue_color, width: '50%' }} />
                        </View >
                    }
                </View >
            )
        }
        return null
    }

    const renderMessageImage = (props: MessageImageProps<IMessage>) => {
        return (
            <Pressable onPress={() => { setSelectedImageVedio({ visible: true, data: props.currentMessage?.image }) }}>
                <Image source={{ uri: props.currentMessage?.image?.url }} style={styles.renderMessageImageStyle} />
            </Pressable>
        )
    }

    const renderMessageVideo = (props: MessageVideoProps<MessageProps>) => {
        return (
            <Pressable
                onPress={() => { setSelectedImageVedio({ visible: true, data: props.currentMessage?.video }) }}>
                <View style={styles.renderMessageVideoContainerStyle} >
                    <Image source={ImagesPath.play_button_icon} style={styles.playBtnStyle} />
                </View>
                <Video
                    {...props}
                    poster={props.currentMessage?.video?.thumbnail}
                    posterResizeMode={'cover'}
                    source={{ uri: props.currentMessage?.video?.url }}
                    paused
                    style={styles.renderMessageVideoStyle}
                    resizeMode={'cover'} />
            </Pressable >
        )
    }

    const CloseIcon = (props: CloseIconProps) => {
        return (
            <View style={[styles.closeIconViewStyle, props.viewStyle]}>
                <Pressable onPress={props.onPress} style={styles.pressableContainerStyle}>
                    <Image source={ImagesPath.cross_icon} style={styles.closeIconStyle} />
                </Pressable>
            </View>
        )
    }

    return (
        <View style={[globalStyles.container]}>
            {loading && <CustomActivityIndicator size={'large'} />}
            <StatusBar backgroundColor={colors.white_color} />
            <Header
                containerStyle={{ backgroundColor: colors.white }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.rtlStyle, styles.titleTxt]}>Bill name</Text>
                    </TouchableOpacity>
                }
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
            />
            <Container style={styles.mainViewStyle}>
                <GiftedChat
                    ref={chatRef}
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    showAvatarForEveryMessage={false}
                    showUserAvatar={true}
                    renderAvatarOnTop
                    renderAvatar={renderAvatar}
                    minInputToolbarHeight={wp(15)}
                    bottomOffset={Platform.OS == "ios" ? wp(8) : 0}
                    infiniteScroll={false}
                    renderBubble={renderBubble}
                    renderChatFooter={renderChatFooter}
                    renderInputToolbar={renderInputToolbar}
                    renderMessageImage={renderMessageImage}
                    renderMessageVideo={renderMessageVideo}
                    renderSend={renderSend}
                    alwaysShowSend
                    user={currentUser}
                    listViewProps={{
                        onEndReached: () => {
                            setFooterLoading(true)
                            if (messageList.next) {
                                let params = {
                                    id: chatId,
                                    page: page
                                }
                                // chat list api call
                                setFooterLoading(true)
                                getMessageListApiCall(params)
                            }
                        },
                        contentContainerStyle: styles.giftedChatContentContainerStyle,
                    }}
                    isLoadingEarlier={footerLoading}
                    renderLoadEarlier={(props: LoadEarlierProps) => {
                        return (
                            <LoadEarlier
                                {...props}
                                activityIndicatorColor={colors.gray_1}
                                wrapperStyle={{
                                    backgroundColor: colors.white_color
                                }}
                            />
                        )
                    }}
                />
            </Container>
            {/* image and video full screen display modal */}
            {
                selectedImageVedio.visible && selectedImageVedio.data &&
                <Modal
                    visible={selectedImageVedio.visible}
                    style={{ margin: 0, backgroundColor: colors.white_color }}
                >
                    <StatusBar hidden />
                    <View style={{ height: '100%', width: '100%', backgroundColor: colors.black }}>
                        <CloseIcon viewStyle={styles.closeIconCommonViewStyle} onPress={() => {
                            setSelectedImageVedio({
                                visible: false,
                                selectedIndex: 0,
                                data: {
                                    id: 0,
                                    mediaType: "",
                                    url: '',
                                    thumbnail: ''
                                }
                            })
                        }} />
                        {
                            selectedImageVedio.data.mediaType == 'image' ?
                                // temporary use of image
                                <Image source={{ uri: selectedImageVedio.data.url }} style={{
                                    height: '100%',
                                    width: "100%",
                                    resizeMode: 'cover'
                                }} />
                                //we get http url then use this down function
                                // <ImageViewer
                                //     failImageSource={{ url: 'https://dummyimage.com/600x400/e800e8/fff' }}
                                //     renderIndicator={() => {
                                //         return closeIcon()
                                //     }}
                                //     style={{ height: '100%', width: '100%' }}
                                //     imageUrls={[{
                                //         // url: selectedImageVedio.data.url
                                //         url: 'content://com.android.providers.media.documents/document/image%3A1000000340'
                                //         // url: 'file:///data/user/0/com.job_management/cache/rn_image_picker_lib_temp_f086b91d-9fa8-4d36-baa2-4e394b40a55b.jpg'
                                //     }]}
                                // />
                                :
                                <Video
                                    source={{ uri: selectedImageVedio.data.url }}
                                    poster={selectedImageVedio.data.thumbnail}
                                    posterResizeMode={'contain'}
                                    style={{ height: '100%', width: '100%', }}
                                    resizeMode={'contain'} />
                        }
                    </View>
                </Modal>
            }
            {/* image and video message send modal */}
            {
                imageVideoSelected && <RNModal
                    isVisible={imageVideoSelected}
                    style={{ margin: 0 }}
                >
                    <>
                        <StatusBar hidden />
                        <CloseIcon onPress={() => {
                            setImageVideoSelected(false)
                            setLoading(false)
                            chatRef?.current?.onInputTextChanged('')
                            removeAlldata('image&video')
                        }} />
                        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.black }}>
                            {
                                videoList?.url &&
                                <Video
                                    repeat
                                    source={{ uri: videoList.url }}
                                    style={styles.modalVideoContainerStyle}
                                    resizeMode={'contain'} />
                            }
                            {
                                imageList?.url &&
                                <Image source={{ uri: imageList?.url }} style={styles.modalImageContainerStyle} />
                            }
                            <View ref={menuRef} style={styles.modalTxtInputContainerStyle}>
                                <TextInput
                                    onChangeText={chatRef?.current?.onInputTextChanged}
                                    multiline={false}
                                    numberOfLines={1}
                                    placeholder={strings.write_a_message_here}
                                    placeholderTextColor={colors.dark_blue3_color}
                                    style={[styles.inputToolBarTextInputStyle, { padding: wp(2), borderRadius: wp(2), }]}
                                />
                                <TouchableOpacity style={{ padding: wp(4) }}
                                    onPress={() => {
                                        customMessage()
                                        setImageVideoSelected(false)
                                    }
                                    }>
                                    <Image source={ImagesPath.send_btn_icon} style={styles.sendBtnStyle} />
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </>
                </RNModal >}
            {/* chat footer bottomsheet */}
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
                    container: styles.bottomSheetContainer
                }}
                children={
                    <View style={styles.bottomViewStyle}>
                        <CustomJobDetailsBottomButton
                            imageStyle={styles.bottomImageStyle}
                            image={ImagesPath.gallary_image_icon}
                            buttonText={strings.photos}
                            onPress={async () => {
                                selectOneFile('photo')
                            }} />
                        <CustomJobDetailsBottomButton
                            imageStyle={styles.bottomImageStyle}
                            image={ImagesPath.camera_image_icon}
                            buttonText={strings.camera}
                            onPress={() => {
                                launchCamera(PhotoOption, response => {
                                    console.log({ response: response });
                                    if (response.didCancel) {
                                        console.log('User cancelled image picker');
                                        refRBSheet.current?.close()
                                        setLoading(false)
                                    } else if (response.errorMessage) {
                                        refRBSheet.current?.close()
                                        setLoading(false)
                                        console.log('ImagePicker Error: ', response.errorMessage);
                                    } else {
                                        if (response.assets && response.assets[0]?.uri) {
                                            setImageList({
                                                id: Math.random(),
                                                url: response.assets[0].uri,
                                                mediaType: response.assets[0].type?.split('/')[0],
                                            })
                                            refRBSheet.current?.close()
                                            setLoading(true)
                                            setTimeout(() => {
                                                setImageVideoSelected(true)
                                            }, 1000);
                                        }
                                    }
                                }).catch((error) => {
                                    setLoading(false)
                                })
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
        </View >
    )
}

export default ChatScreen
