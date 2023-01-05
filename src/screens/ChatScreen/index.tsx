import { Alert, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { BottomSheet, CommonlinkPreview, CommonPdfView, Container, CustomActivityIndicator, CustomJobDetailsBottomButton, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Avatar, AvatarProps, Bubble, BubbleProps, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, MessageImageProps, MessageVideoProps, Send, SendProps, User, } from 'react-native-gifted-chat';
import { colors } from '../../styles/Colors';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import moment from 'moment';
import { strings } from '../../languages/localizedStrings';
import RBSheet from 'react-native-raw-bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { DocList, ImageList, JobDataProps, VideoList } from '../../types/commanTypes';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Video from 'react-native-video'
import RNModal from 'react-native-modal';
import { createThumbnail } from 'react-native-create-thumbnail';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface MessageProps {
    createdAt: Date | number;
    text?: string;
    user: User;
    image?: ImageList | undefined,
    attachment?: DocList | undefined;
    _id: string | number;
    video?: VideoList | undefined;
    jobData?: JobDataProps | undefined
}

export interface SelectedImageProps {
    visible: boolean,
    selectedIndex?: number,
    data: ImageList | VideoList | undefined,
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

const currentUser: User = {
    _id: 1,
    avatar: 'https://placeimg.com/140/140/any',
    name: "Developer"
}

const ChatScreen = () => {
    const navigation = useCustomNavigation('ChatScreen')
    const route = useRoute<RootRouteProps<'ChatScreen'>>();
    const job_data = route.params.job
    const refRBSheet = useRef<RBSheet | null>(null);
    const menuRef = useRef(null);

    const [messages, setMessages] = useState<MessageProps[]>(messageData)
    const [loading, setLoading] = useState(false);
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

    const onSend = useCallback((messages: MessageProps[] = []) => {
        let message: MessageProps[] = [{
            _id: 1,
            text: messages[0]?.text,
            createdAt: messages[0].createdAt,
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
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
        setLoading(false)
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
            if (type == "photo") {
                const result = await DocumentPicker.pick({
                    type: [DocumentPicker.types.images, DocumentPicker.types.video],
                    presentationStyle: 'fullScreen',
                    mode: 'import',
                    allowMultiSelection: true,
                    copyTo: 'cachesDirectory'
                })
                if (result[0]?.type?.split("/")[0] == 'image') {
                    setImageList({
                        url: result[0].uri,
                        mediaType: result[0]?.type?.split("/")[0],
                        id: Math.random()
                    })
                } else {
                    createThumbnail({
                        url: result[0].uri,
                        timeStamp: 1000,
                    }).then((res) => {
                        setVideoList({
                            url: result[0].uri,
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
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.plainText],
                    presentationStyle: 'fullScreen',
                    mode: 'import',
                    allowMultiSelection: true,
                    copyTo: 'cachesDirectory',
                })
                if (res[0]?.type?.split("/")[0] == 'application') {
                    setDocList({
                        id: Math.random(),
                        attachment: res[0].uri,
                        type: res[0]?.type?.split("/")[1],
                        bytes: res[0].size,
                        title: res[0].name
                    })
                    setLoading(false)
                    refRBSheet.current?.close()
                } else {
                    setLoading(false)
                }
            }
        } catch (err) {
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

    const RenderDateTxt = ({ date }: { date: number | Date | undefined }) => {
        return (
            <Text style={styles.chatDateTxtStyle}>{moment(date).format("HH:MM A")}</Text>
        )
    }

    const renderBubble = (props: BubbleProps<IMessage>) => {
        return (
            <View style={{ flex: 1, alignItems: props.position == 'right' ? 'flex-end' : 'flex-start', }}>
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
                                    <CommonlinkPreview onPress={() => {// navigation.navigate("JobDetailsScreen", { params: params })
                                    }}
                                        job={props.currentMessage?.jobData}
                                        containerStyle={styles.linkPreviewContainerStyle} />
                                }
                                {
                                    props.currentMessage?.attachment &&
                                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                                        <CommonPdfView item={props.currentMessage?.attachment} onPress={async () => {
                                            setLoading(true)
                                            const pdfName = props.currentMessage?.attachment?.attachment.split(/[#?]/)[0].split('/').pop()?.split('.')[0];
                                            const extension = props.currentMessage?.attachment?.attachment.split(/[#?]/)[0].split(".").pop()?.trim();;
                                            const localFile = `${RNFS.DocumentDirectoryPath}/${pdfName}.${extension}`;
                                            const options = {
                                                fromUrl: props.currentMessage?.attachment?.attachment ? props.currentMessage?.attachment?.attachment : '',
                                                toFile: localFile,
                                            };
                                            RNFS.downloadFile(options).promise.then(() =>
                                                FileViewer.open(localFile)).then((data) => {
                                                    setLoading(false)
                                                }).catch((error) => {
                                                    setLoading(false)
                                                })
                                        }
                                        }
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
                            <CommonPdfView disabled item={docList} mainView={{ backgroundColor: colors.light_blue_color, width: '50%' }} />
                        </View>
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
            <Pressable style={{ margin: wp(2) }}
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

    return (
        <View style={[globalStyles.container]}>
            {loading && <CustomActivityIndicator size={'large'} />}
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
                    minInputToolbarHeight={wp(15)}
                    bottomOffset={wp(5)}
                    infiniteScroll={false}
                    renderBubble={renderBubble}
                    renderAvatar={renderAvatar}
                    renderChatFooter={renderChatFooter}
                    renderInputToolbar={renderInputToolbar}
                    renderMessageImage={renderMessageImage}
                    renderMessageVideo={renderMessageVideo}
                    renderSend={renderSend}
                    alwaysShowSend
                    user={currentUser}
                />
            </Container>
            {/* image and video full screen display modal */}
            {selectedImageVedio.visible && selectedImageVedio.data &&
                <Modal
                    visible={selectedImageVedio.visible}
                    style={{ margin: 0, backgroundColor: colors.white_color }}>
                    <View style={{ height: '100%', }}>
                        <TouchableOpacity
                            onPress={() => {
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
                            }}
                            style={[styles.closeImageBtnStyle]}>
                            <Image source={ImagesPath.cross_icon} style={[styles.closeIcon, { tintColor: selectedImageVedio.data.mediaType == 'image' ? colors.white : colors.black }]} />
                        </TouchableOpacity>
                        {
                            selectedImageVedio.data.mediaType == 'image' ?
                                <ImageViewer
                                    renderIndicator={() => { return <></> }}
                                    style={{ flex: 1 }} imageUrls={[{
                                        url: selectedImageVedio.data.url
                                    }]}
                                /> :
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
            {imageVideoSelected && <RNModal
                isVisible={imageVideoSelected}
                style={{ margin: 0 }}
            >
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.black }}>
                    <TouchableOpacity onPress={() => {
                        setImageVideoSelected(false)
                        setLoading(false)
                        chatRef?.current?.onInputTextChanged('')
                        removeAlldata()
                    }} style={[globalStyles.rtlDirection, styles.closeIconModalContainerStyle]}>
                        <Image source={ImagesPath.close_icon} style={styles.closeIconModalStyle} />
                    </TouchableOpacity>
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
            </RNModal>}

            {/* chat footer bottomsheet */}
            <BottomSheet
                ref={refRBSheet}
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
                                    if (response.didCancel) {
                                        console.log('User cancelled image picker');
                                        setLoading(false)
                                    } else if (response.errorMessage) {
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
