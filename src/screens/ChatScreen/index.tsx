import { Alert, Image, PermissionsAndroid, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, CommonPdfView, Container, CustomJobDetailsBottomButton, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Avatar, AvatarProps, Bubble, BubbleProps, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, MessageImageProps, Send, SendProps, } from 'react-native-gifted-chat'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import moment from 'moment'
import { strings } from '../../languages/localizedStrings'
import RBSheet from 'react-native-raw-bottom-sheet'
import DocumentPicker from 'react-native-document-picker';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import { DocList, ImageList } from '../../types/commanTypes'
import { isEmptyArray } from 'formik'
// import Modal from 'react-native-modal';
// import CustomCarouselZoomImageViewer from '../../components/CustomCarouselZoomImageViewer';
// import Carousel from 'react-native-snap-carousel';
// import ImageViewer from 'react-native-image-zoom-viewer'

interface UserProps {
    _id: string | number;
    name?: string;
    avatar?: string;
}
interface MessageProps {
    createdAt: Date | number;
    text: string;
    user: UserProps;
    image?: ImageList[],
    type?: string,
    attachment?: DocList[]
    _id: string | number;
}

const doc = [
    {
        "id": 0.37442033995468504,
        "path": "file:///Users/mac/Library/Developer/CoreSimulator/Devices/6DF8A61F-9784-4627-9F57-C96D05AEFC39/data/Containers/Data/Application/5D1B9E9A-095D-4297-A634-E2FE75DE3FC3/tmp/org.reactjs.native.example.Job-Management-Inbox/pdf-test.pdf",
        "type": "pdf",
        "mb": 20597,
        "title": "pdf-test.pdf"
    },
    {
        "id": 0.37442033995468504,
        "path": "file:///Users/mac/Library/Developer/CoreSimulator/Devices/6DF8A61F-9784-4627-9F57-C96D05AEFC39/data/Containers/Data/Application/5D1B9E9A-095D-4297-A634-E2FE75DE3FC3/tmp/org.reactjs.native.example.Job-Management-Inbox/pdf-test.pdf",
        "type": "pdf",
        "mb": 20597,
        "title": "pdf-test.pdf"
    },
    {
        "id": 0.37442033995468504,
        "path": "file:///Users/mac/Library/Developer/CoreSimulator/Devices/6DF8A61F-9784-4627-9F57-C96D05AEFC39/data/Containers/Data/Application/5D1B9E9A-095D-4297-A634-E2FE75DE3FC3/tmp/org.reactjs.native.example.Job-Management-Inbox/pdf-test.pdf",
        "type": "pdf",
        "mb": 20597,
        "title": "pdf-test.pdf"
    },
    {
        "id": 0.37442033995468504,
        "path": "file:///Users/mac/Library/Developer/CoreSimulator/Devices/6DF8A61F-9784-4627-9F57-C96D05AEFC39/data/Containers/Data/Application/5D1B9E9A-095D-4297-A634-E2FE75DE3FC3/tmp/org.reactjs.native.example.Job-Management-Inbox/pdf-test.pdf",
        "type": "pdf",
        "mb": 20597,
        "title": "pdf-test.pdf"
    },
]

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
        attachment: doc
    },
]

const ChatScreen = () => {
    const navigation = useCustomNavigation('ChatScreen')
    const [messages, setMessages] = useState<Array<MessageProps>>(messageData)
    const refRBSheet = useRef<RBSheet | null>(null);
    const [imageList, setImageList] = useState<ImageList[]>([])
    const [docList, setDocList] = useState<DocList[] | []>([])

    const [isVisible, setIsVisible] = useState(true)

    const [visible, setVisible] = useState<boolean>(false);
    const [visibleImage, setVisibleImage] = useState<ImageList[]>([]);

    const jobData = {
        id: 1,
        name: 'job title',
        distance: '5 km',
        descriprion: 'hello this is the job details screen page',
        imageurl: "https://dummyimage.com/600x400/000/fff",
    }
    // const jobData = undefined

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
            type: messages[0].type
        }]
        //clear the job data
        setIsVisible(false)
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    }, [])

    const RenderDateTxt = ({ date }: { date: number | Date | undefined }) => {
        return (
            <Text style={styles.chatDateTxtStyle}>{moment(date).format("HH:MM A")}</Text>
        )
    }

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA, {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                    buttonPositive: 'ok'
                }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const cameraLaunch = async () => {
        let option: CameraOptions = {
            mediaType: 'photo',
            cameraType: 'back',
            presentationStyle: 'fullScreen'
        }
        const result = await launchCamera(option);

        if (result.didCancel) {
            console.log('User cancelled image picker');
        } else if (result.errorMessage) {
            console.log('ImagePicker Error: ', result.errorMessage);
        } else {
            if (result.assets && result.assets[0]?.uri) {
                let ImageTempArray = [...imageList]
                ImageTempArray.push({
                    id: Math.random(),
                    imgUrl: result.assets[0].uri,
                    mediaType: result.assets[0].type?.split('/')[1],
                })
                setImageList(ImageTempArray)
                refRBSheet.current?.close()
            }
        }

    }

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
                                    <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.jobDetailsViewStyle, { backgroundColor: props.position == 'left' ? colors.light_blue_color : colors.white_color, }]}>
                                        <Image source={ImagesPath.image_white_border} style={[styles.imageStyle, { backgroundColor: props.position == 'left' ? colors.white_color : colors.light_blue_color }]} />
                                        <View style={styles.jobDetailsMainView}>
                                            <View style={[globalStyles.rowView, styles.jobDetailHeaderView]}>
                                                <Text numberOfLines={1} style={[styles.jobTitleTxt,]}>Job Title</Text>
                                                <View style={[globalStyles.rowView, styles.pinImageViewStyle]}>
                                                    <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.pinImageStyle} />
                                                    <Text numberOfLines={1} style={styles.jobDistanceTxt}>5 km away</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.jobDetailsTxt} numberOfLines={2}>Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing</Text>
                                        </View>
                                    </View>
                                }
                                {
                                    props.currentMessage?.attachment &&
                                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                                        {
                                            props.currentMessage?.attachment?.slice(0, 4).map((item, index) => {
                                                return (
                                                    <>
                                                        {
                                                            index < 3 ?
                                                                <CommonPdfView item={item} onPress={() => { }} />
                                                                :
                                                                <View style={[globalStyles.rtlDirection, styles.remainAttachmentViewStyle]}>
                                                                    <Text style={styles.remainTxtStyle}>+{props.currentMessage?.attachment?.length && props.currentMessage?.attachment?.length - 3}</Text>
                                                                </View>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
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
                                image: imageList,
                                attachment: docList,
                                type: jobData && "job"
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
            if (type == "image") {
                let option: ImageLibraryOptions = {
                    mediaType: 'photo',
                    presentationStyle: 'fullScreen'
                }
                const result = await launchImageLibrary(option);
                if (result.didCancel) {
                    console.log('User cancelled image picker');
                } else if (result.errorMessage) {
                    console.log('ImagePicker Error: ', result.errorMessage);
                } else {
                    if (result.assets && result.assets[0]?.uri) {
                        let ImageTempArray = [...imageList]
                        ImageTempArray.push({
                            id: Math.random(),
                            imgUrl: result.assets[0].uri,
                            mediaType: result.assets[0].type?.split('/')[1],
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
                    DocTempArray.push({ id: Math.random(), path: res[0].uri, type: res[0]?.type?.split("/")[1], mb: res[0].size, title: res[0].name })
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
                containerStyle={{ flex: 1, paddingVertical: wp(1), height: Platform.OS == 'ios' ? wp(15) : wp(15) }}
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

    const renderMessageImage = (props: MessageImageProps<IMessage>) => {
        return (
            <>
                {
                    props.currentMessage?.image && props.currentMessage?.image?.length >= 4 ?
                        <View style={styles.renderImageMainStyle}>
                            {
                                props.currentMessage?.image?.slice(0, 4).map((item, index) => {
                                    return (
                                        <>
                                            {
                                                index <= 2 ?
                                                    <TouchableOpacity onPress={() => {
                                                        // props.currentMessage?.image && setVisibleImage(props.currentMessage?.image)
                                                        // setVisible(true)
                                                    }}>
                                                        <Image source={{ uri: item.imgUrl }} style={styles.renderImageStyle} />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={styles.remainImageViewStyle}>
                                                        <Text style={styles.remainTxtStyle}>+{props.currentMessage?.image && props.currentMessage?.image?.length - 3}</Text>
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
                                props.currentMessage?.image?.map((item) => {
                                    return (
                                        <TouchableOpacity style={styles.singleImageViewStyle} onPress={() => { setVisible(true) }}>
                                            <Image source={{ uri: item.imgUrl }} style={styles.singleImageStyle} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </>
                }
                {/* <Modal
                    isVisible={visible}
                    style={{ margin: 0, backgroundColor: colors.white_color }}>
                    <>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.closeImageBtnStyle}>
                            <Image source={ImagesPath.cross_icon} style={styles.closeIcon} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Carousel
                                layout={'default'}
                                data={props.currentMessage?.image}
                                sliderWidth={wp(100)}
                                itemWidth={wp(100)}
                                renderItem={({ item, index }: { item: string, index: number }) => {
                                    console.log("🚀 ~ file: index.tsx:536 ~ renderMessageImage ~ item", item)

                                    return (
                                        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                                            <ImageViewer
                                                imageUrls={[{ url: item }]}
                                                renderIndicator={() => <></>}
                                                backgroundColor='transparent'
                                            />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </>
                </Modal> */}
            </>

        )
    }

    const removeImage = (index: number, item: ImageList) => {
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

    const removeDocument = (index: number, item: DocList) => {
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

    const renderChatFooter = () => {
        return (
            <View style={[styles.chatFooterMainView, { padding: !isEmptyArray(docList) || !isEmptyArray(imageList) ? wp(4) : 0 }]}>
                {
                    jobData && isVisible &&
                    <View style={[styles.jobDetailsMainViewStyle]}>
                        <TouchableOpacity onPress={() => { setIsVisible(!isVisible) }} style={[styles.jobCloseBtnStyle]}>
                            <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                        </TouchableOpacity>
                        <LinkPreview
                            text='This link https://github.com/flyerhq'
                            containerStyle={styles.linkContainerStyle}
                            enableAnimation={true}
                            metadataContainerStyle={styles.linkMetadataContainerStyle}
                            metadataTextContainerStyle={styles.linkMetadataTextContainerStyle}
                            previewData={{ description: jobData.descriprion, image: { url: jobData.imageurl, height: wp(15), width: wp(15) }, link: '', title: jobData.name }}
                            renderDescription={(props) => {
                                return (
                                    <Text style={styles.jobDetailsTxt}>{props}</Text>
                                )
                            }}
                            renderMinimizedImage={(image) => {
                                console.log(image);
                                return (
                                    <Image source={{ uri: image.url }} style={[styles.renderMinimizedImageStyle]} />
                                )
                            }}
                            renderTitle={() => {
                                return (
                                    <View style={[globalStyles.rowView, styles.jobDetailHeaderView, globalStyles.rtlDirection]}>
                                        <Text numberOfLines={1} style={styles.jobTitleTxt}>Job Title</Text>
                                        <View style={[globalStyles.rowView, styles.pinImageViewStyle]}>
                                            <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.pinImageStyle} />
                                            <Text numberOfLines={1} style={styles.jobDistanceTxt}>5 km away</Text>
                                        </View>
                                    </View>
                                )
                            }}
                            renderText={() => {
                                return null
                            }}
                        />
                    </View>
                }
                {
                    imageList.length != 0 &&
                    <View style={styles.footerImageMainViewStyle}>
                        {imageList.slice(0, 4).map((item, index) => {
                            return (
                                <>
                                    {
                                        index <= 2 ?
                                            <View>
                                                <TouchableOpacity onPress={() => { removeImage(index, item) }} style={styles.closeButtonView}>
                                                    <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                                </TouchableOpacity>
                                                <Image source={{ uri: item.imgUrl }} style={styles.footerImageStyle} />
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
                    <View style={styles.footerDocMainViewStyle}>
                        {docList.slice(0, 4).map((item, index) => {
                            return (
                                <>
                                    {
                                        index <= 2 ?
                                            <View>
                                                <TouchableOpacity onPress={() => { removeDocument(index, item) }} style={styles.closeButtonView}>
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
            </View>
        )
    }

    return (
        <View style={[globalStyles.container]}>
            <Header
                containerStyle={{ backgroundColor: colors.white }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={styles.titleTxt}>Bill name</Text>
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
                    renderMessageImage={renderMessageImage}
                    renderSend={renderSend}
                    alwaysShowSend
                    user={{
                        _id: 1,
                        name: "new one",
                        // avatar:
                    }}
                />
            </Container>
            <BottomSheet
                ref={refRBSheet}
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
                            onPress={() => {
                                selectOneFile('image')
                            }} />
                        <CustomJobDetailsBottomButton
                            imageStyle={styles.bottomImageStyle}
                            image={ImagesPath.camera_image_icon}
                            buttonText={strings.Camera}
                            onPress={async () => {
                                let permission
                                if (Platform.OS == "android") {
                                    permission = await requestCameraPermission()
                                    permission && cameraLaunch()
                                } else {
                                    cameraLaunch()
                                }
                            }} />
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
