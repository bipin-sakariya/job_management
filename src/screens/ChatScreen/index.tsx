import { Alert, Image, Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Children, useCallback, useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, CustomJobDetailsBottomButton, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ActionsProps, Avatar, AvatarProps, Bubble, BubbleProps, Composer, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, RenderMessageTextProps, Send, SendProps, Time, TimeProps } from 'react-native-gifted-chat'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import CustomChatLinkView from '../../components/CustomChatLinkView'
import moment from 'moment'
import { strings } from '../../languages/localizedStrings'
import RBSheet from 'react-native-raw-bottom-sheet'
import DocumentPicker from 'react-native-document-picker';

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

const messageData = [
    {
        _id: 1,
        text: 'Hello developer',
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
]

const ChatScreen = () => {
    const navigation = useCustomNavigation('ChatScreen')
    const [messages, setMessages] = useState<Array<ChatProps>>(messageData)
    // const [showBottomBtn, setShowBottomBtn] = useState(false)
    const refRBSheet = useRef<RBSheet | null>(null);
    const [imageList, setImageList] = useState<imageList[]>([])
    const [docList, setDocList] = useState<docList[] | []>([])
    // const [{ cameraRef, type, ratio }] = useCamera({ type: 'image' });

    // const devices: CameraDevices | undefined = useCameraDevices('wide-angle-camera')
    // const device = devices.back

    const onSend = useCallback((messages: any = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const RenderDateTxt = ({ date }: { date: Date | undefined }) => {
        return (
            <Text style={styles.chatDateTxtStyle}>{moment(date).format("HH:MM A")}</Text>
        )
    }

    const renderBubble = (props: Readonly<BubbleProps<ChatProps>>) => {
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

    const renderSend = (props: SendProps<ChatProps>) => {
        return (
            <Send {...props} containerStyle={{ marginHorizontal: wp(2) }}>
                <Image source={ImagesPath.send_btn_icon} style={{ height: wp(10), width: wp(10), resizeMode: 'contain', top: 0, marginVertical: wp(1), }} />
            </Send>
        )
    }

    const renderAvatar = (props: AvatarProps<ChatProps>) => {
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
            }
            else {
                ImageTempArray.push({ imgUrl: res[0].uri, mediaType: res[0]?.type?.split("/")[0], id: Math.random() })
            }
            type == 'image' ? setImageList(ImageTempArray) : setDocList(DocTempArray)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

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
                    onSend={messages => onSend(messages)}
                    showAvatarForEveryMessage={false}
                    showUserAvatar={true}
                    renderBubble={renderBubble}
                    renderAvatarOnTop
                    renderAvatar={renderAvatar}
                    scrollToBottomStyle={{ height: 100, backgroundColor: 'green' }}
                    renderInputToolbar={(props: InputToolbarProps<ChatProps>) => {
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
                                                // onPressIn={() => {
                                                //     showBottomBtn && Keyboard.dismiss()
                                                // }}
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
                    }}

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
                    }
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
                            onPress={() => {
                                refRBSheet.current?.close()
                                // selectOneFile()
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
