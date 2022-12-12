import { Alert, Image, PermissionsAndroid, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Children, useCallback, useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, CustomJobDetailsBottomButton, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Avatar, AvatarProps, Bubble, BubbleProps, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, MessageImage, MessageImageProps, Send, SendProps, } from 'react-native-gifted-chat'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import CustomChatLinkView from '../../components/CustomChatLinkView'
import moment from 'moment'
import { strings } from '../../languages/localizedStrings'
import RBSheet from 'react-native-raw-bottom-sheet'
import DocumentPicker from 'react-native-document-picker';
import { CameraOptions, launchCamera } from 'react-native-image-picker'
import { LinkPreview } from '@flyerhq/react-native-link-preview'

interface UserProps {
    _id: number
    name: string
    avatar: string
}

interface ChatProps {
    _id: number
    text: string
    createdAt: Date
    type?: string
    user: UserProps
    image?: string
}


interface imageList {
    id: number
    imgUrl: string
    mediaType: string | undefined
}
interface docList {
    path: string,
    type: string | undefined
    mb: number | null
    title: string | null
}

interface MessageProps {
    createdAt: Date;
    text: string | undefined;
    user: {
        _id: number;
        name: string;
    };
    image?: imageList | null,
    type?: string | null,
    document?: docList | null
    _id: any;
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
        // image: ['https://dummyimage.com/600x400/000/fff', 'https://dummyimage.com/600x400/000/fff', 'https://dummyimage.com/600x400/000/fff']
        image: 'https://dummyimage.com/600x400/000/fff'
    },
]

const ChatScreen = () => {
    const navigation = useCustomNavigation('ChatScreen')
    const [messages, setMessages] = useState<Array<ChatProps>>(messageData)
    // const [showBottomBtn, setShowBottomBtn] = useState(false)
    const refRBSheet = useRef<RBSheet | null>(null);
    const [imageList, setImageList] = useState<imageList[]>([])
    const [docList, setDocList] = useState<docList[] | []>([])

    const [isVisible, setIsVisible] = useState(false)

    // const [imageList, setImageList] = useState<imageList>()
    // const [docList, setDocList] = useState<docList>()
    // const [{ cameraRef, type, ratio }] = useCamera({ type: 'image' });

    // const devices: CameraDevices | undefined = useCameraDevices('wide-angle-camera')
    // const device = devices.back

    let type = "job"

    const jobData = {
        id: 1,
        name: 'job title',
        distance: '5 km',
        descriprion: 'hello this is the job details screen page',
        imageurl: "https://dummyimage.com/600x400/000/fff",
    }

    const onSend = useCallback((messages: any = []) => {
        let message = [{
            _id: 1,
            text: "",
            createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
            image: 'https://dummyimage.com/600x400/000/fff',
        }]
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
                // If CAMERA Permission is granted
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
                const source = { uri: result.assets };
                console.log('response', JSON.stringify(result));
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
                    props.currentMessage?.type == 'job' ?
                        <View style={{ width: '110%', alignItems: props.position == 'right' ? 'flex-end' : 'flex-start' }}>
                            {
                                props.position == "right" &&
                                <RenderDateTxt date={props.currentMessage?.createdAt} />
                            }
                            <CustomChatLinkView props={props} keyBoardVisible={false} textComponent={
                                <Text style={styles.messageTxt}>{props.currentMessage.text}</Text>
                            } />
                            {
                                props.position == "left" &&
                                <RenderDateTxt date={props.currentMessage?.createdAt} />
                            }
                        </View>
                        :
                        <>
                            {
                                props.position == "right" &&
                                <RenderDateTxt date={props.currentMessage?.createdAt} />
                            }
                            <Bubble
                                {...props}
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
                        </>
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
                                // image: imageList, attachment: docList
                            }, true)
                        }
                    }
                }}
                containerStyle={{ marginHorizontal: wp(2) }
                }>
                <Image source={ImagesPath.send_btn_icon} style={{ height: wp(10), width: wp(10), resizeMode: 'contain', top: 0, marginVertical: wp(1), }} />
            </Send >
        )
    }

    const renderAvatar = (props: AvatarProps<IMessage>) => {
        console.log({ renderAvatar: props });
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
            const res = await DocumentPicker.pick({
                type: type == 'image' ? DocumentPicker.types.images : [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.plainText],
                presentationStyle: 'fullScreen',
                mode: 'import',
                allowMultiSelection: true,
                copyTo: 'cachesDirectory'
            })
            let ImageTempArray = [...imageList]
            let DocTempArray = [...docList]
            if (res[0]?.type?.split("/")[0] == 'application') {
                DocTempArray.push({ path: res[0].uri, type: res[0]?.type?.split("/")[1], mb: res[0].size, title: res[0].name })
                // setDocList({
                //     path: res[0].uri,
                //     type: res[0]?.type?.split("/")[1],
                //     mb: res[0].size,
                //     title: res[0].name
                // })
            }
            else {
                // setImageList({
                //     id: Math.random(),
                //     mediaType: res[0]?.type?.split("/")[0],
                //     imgUrl: res[0].uri
                // })
                ImageTempArray.push({ imgUrl: res[0].uri, mediaType: res[0]?.type?.split("/")[0], id: Math.random() })
            }
            refRBSheet.current?.close()
            type == 'image' ? setImageList(ImageTempArray) : setDocList(DocTempArray)
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
                containerStyle={{ flex: 1, paddingVertical: wp(1), height: Platform.OS == 'ios' ? wp(10) : wp(15) }}
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
                                    // !showBottomBtn && Keyboard.dismiss()
                                    // setShowBottomBtn(!showBottomBtn)
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
            <MessageImage {...props} />
        )
    }

    const removeImage = (index: number, item: imageList) => {
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
            <View style={{ flex: 1, marginHorizontal: wp(2) }}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages[0])}
                    showAvatarForEveryMessage={false}
                    showUserAvatar={true}
                    renderBubble={renderBubble}
                    renderAvatarOnTop
                    renderAvatar={renderAvatar}
                    renderChatFooter={() => {
                        return (
                            <>
                                {
                                    type == 'job' && isVisible &&
                                    <View style={{ maxHeight: wp(35) }}>
                                        <TouchableOpacity onPress={() => { setIsVisible(!isVisible) }} style={styles.closeButtonView}>
                                            <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                        </TouchableOpacity>
                                        <LinkPreview
                                            text='This link https://github.com/flyerhq'
                                            containerStyle={{ backgroundColor: colors.light_blue_color, borderRadius: wp(3) }}
                                            enableAnimation={true}
                                            metadataContainerStyle={{ direction: 'ltr', backgroundColor: colors.white_color, padding: wp(2), borderRadius: wp(2) }}
                                            metadataTextContainerStyle={{ alignItems: 'flex-end', marginHorizontal: wp(2), flex: 1 }}
                                            previewData={{ description: jobData.descriprion, image: { url: jobData.imageurl, height: 50, width: 50 }, link: '', title: jobData.name }}
                                            renderDescription={(props) => {
                                                return (
                                                    <Text style={styles.jobDetailsTxt}>{props}</Text>
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
                                            renderMinimizedImage={(image) => {
                                                console.log(image);
                                                return (
                                                    <Image source={{ uri: image.url }} style={{ height: wp(17), width: wp(17), borderRadius: wp(2) }} />
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
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxHeight: wp(30), justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', padding: wp(2), marginBottom: Platform.OS == "ios" ? 0 : wp(5) }}>
                                        {imageList.slice(0, 4).map((item, index) => {
                                            return (
                                                <>
                                                    {
                                                        index <= 2 ?
                                                            <View>
                                                                <TouchableOpacity onPress={() => { removeImage(index, item) }} style={styles.closeButtonView}>
                                                                    <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                                                </TouchableOpacity>
                                                                <Image source={{ uri: item.imgUrl }} style={{ height: wp(20), width: wp(20), resizeMode: 'cover', marginHorizontal: wp(1), borderRadius: wp(2) }} />
                                                            </View>
                                                            :
                                                            <View style={{ width: wp(20), height: wp(20), marginHorizontal: wp(1), justifyContent: "center", alignItems: 'center', backgroundColor: colors.light_blue_color, borderRadius: wp(2) }}>
                                                                <Text>+{imageList.length - 3}</Text>
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
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxHeight: wp(20), justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', marginTop: wp(2) }}>
                                        {docList.slice(0, 4).map((item, index) => {
                                            console.log("🚀 ~ file: index.tsx:554 ~ {imageList.slice ~ item", item)
                                            return (
                                                <>
                                                    {
                                                        index <= 2 ?
                                                            <View>
                                                                <TouchableOpacity onPress={() => { }} style={styles.closeButtonView}>
                                                                    <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                                                </TouchableOpacity>
                                                                {/* <Image source={{ uri: item.imgUrl }} style={{ height: wp(20), width: wp(20), resizeMode: 'cover', marginHorizontal: wp(1), borderRadius: wp(2) }} /> */}
                                                            </View>
                                                            :
                                                            <View style={{ width: wp(20), height: wp(20), marginHorizontal: wp(1), justifyContent: "center", alignItems: 'center', backgroundColor: colors.light_blue_color, borderRadius: wp(2) }}>
                                                                <Text>+{imageList.length - 3}</Text>
                                                            </View>
                                                    }
                                                </>
                                            )
                                        }
                                        )}
                                    </View>
                                }
                            </>
                        )
                    }}
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
            </View>
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

//     < CustomChatLinkView props = { props } keyBoardVisible = { true} viewStyle = {{
//     width: '95%',
//         alignSelf: 'center',
//                                         }}
// textComponent = {
//                                                 < Composer
// {...props }
// onTextChanged = { props.onTextChanged }
// multiline = { false}
// textInputStyle = {{
//                                                         ...globalStyles.rtlStyle,
//         backgroundColor: "red",
//             paddingHorizontal: wp(2),
//                 marginVertical: wp(2)
// }}
// />
//                                             }
// />