import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Bubble, BubbleProps, Composer, GiftedChat, Send } from 'react-native-gifted-chat'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import CustomChatLinkView from '../../components/CustomChatLinkView'

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
const ChatScreen = () => {
    const navigation = useCustomNavigation('ChatScreen')
    const [messages, setMessages] = useState<Array<ChatProps>>([])
    useEffect(() => {
        setMessages([
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
        ])
    }, [])

    const onSend = useCallback((messages: any = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (props: Readonly<BubbleProps<ChatProps>>) => {
        return (
            <>
                {
                    props.currentMessage?.type == 'job' ?
                        <CustomChatLinkView props={props} keyBoardVisible={false} textComponent={
                            <Text style={styles.messageTxt}>{props.currentMessage.text}</Text>
                        } />
                        :
                        <Bubble
                            {...props}
                            textStyle={{
                                left: {
                                    color: colors.chat_left_Txt,
                                    fontFamily: fonts.FONT_POP_REGULAR,
                                    fontSize: FontSizes.SMALL_14
                                },
                                right: {
                                    color: colors.chat_right_Txt,
                                    fontFamily: fonts.FONT_POP_REGULAR,
                                    fontSize: FontSizes.SMALL_14
                                },
                            }}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: colors.chat_left_bubble,
                                    paddingVertical: wp(2),
                                    paddingHorizontal: wp(2),
                                    borderRadius: 0,
                                    borderTopRightRadius: wp(3),
                                    borderBottomRightRadius: wp(3),
                                    borderBottomLeftRadius: wp(3)
                                },
                                right: {
                                    backgroundColor: colors.chat_right_bubble,
                                    paddingVertical: wp(2),
                                    paddingHorizontal: wp(2),
                                    borderRadius: 0,
                                    borderTopRightRadius: wp(3),
                                    borderBottomLeftRadius: wp(3),
                                    borderTopLeftRadius: wp(3)
                                },
                            }}
                        />
                }
            </>

        )
    }

    const renderComposer = (props: any) => {
        return (
            <View style={{ flex: 1 }}>
                <CustomChatLinkView props={props} keyBoardVisible={true} viewStyle={{
                    width: '95%',
                    alignSelf: 'center',
                }}
                    textComponent={
                        <Composer
                            {...props}
                            onTextChanged={(text) => {
                                console.log(text);
                                props.onTextChanged(text)
                            }}
                            multiline={false}
                            textInputStyle={{
                                backgroundColor: "red",
                                paddingHorizontal: wp(2),
                                marginVertical: wp(2)
                            }}
                        />
                    }
                />

            </View>
        )
    }
    const renderSend = (props: any) => {
        return (
            <View style={{ marginHorizontal: wp(2), }}>
                <Send {...props}>
                    <Image source={ImagesPath.send_btn_icon} style={{ height: wp(10), width: wp(10), resizeMode: 'contain', top: 0, marginVertical: wp(1) }} />
                </Send>
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
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    showAvatarForEveryMessage={false}
                    showUserAvatar={false}
                    renderBubble={renderBubble}
                    // renderComposer={renderComposer}
                    // renderInputToolbar={(props: any) => {
                    //     return (
                    //         <View style={[globalStyles.rowView, { flex: 1, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" }]}>
                    //             <View style={{ backgroundColor: colors.white, marginHorizontal: wp(4) }}>
                    //                 <Composer
                    //                     {...props}
                    //                     placeholder='Write Message here.....'
                    //                     onTextChanged={(text) => {
                    //                         props.onTextChanged(text)
                    //                     }}
                    //                     textInputStyle={{
                    //                         backgroundColor: '#E9E9E9',
                    //                         width: wp('80%'),
                    //                         paddingVertical: wp(2),
                    //                         paddingHorizontal: wp(2),
                    //                         borderRadius: wp(1),
                    //                     }} />
                    //             </View>
                    //             <Send {...props}>
                    //                 <Image source={ImagesPath.send_btn_icon} style={{ height: wp(10), width: wp(10), resizeMode: 'contain', }} />
                    //             </Send>
                    //         </View>
                    //     )
                    // }}
                    renderSend={renderSend}
                    alwaysShowSend
                    user={{
                        _id: 1,
                        name: "new one",
                        // avatar:
                    }}
                />
            </View>
        </View>
    )
}

export default ChatScreen
