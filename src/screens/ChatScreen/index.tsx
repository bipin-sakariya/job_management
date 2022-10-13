import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Bubble, BubbleProps, GiftedChat } from 'react-native-gifted-chat'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'

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
                text: 'Hello developer asdsadasdadasdasdasdasdasdasdasdasdasdasdasdasdsadsadsadsdsdasdasdasdsadasdsdasdsdasdasdasdas',
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
                text: 'Hello developer asdsadasdadasdasdasdasdasdasdasdasdasdasdasdasdsadsadsadsdsdasdasdasdsadasdsdasdsdasdasdasdas',
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
                text: 'Hello developer asdsadasdadasdasdasdasdasdasdasdasdasdasdasdasdsadsadsadsdsdasdasdasdsadasdsdasdsdasdasdasdas',
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
        console.log("🚀 ~ file: index.tsx ~ line 90 ~ renderBubble ~ props", props)
        return (
            <>
                {
                    props.currentMessage?.type == 'job' ?
                        <View style={{ backgroundColor: 'red' }}>
                            <View style={globalStyles.rowView}>
                                <View style={[globalStyles.centerView, { width: wp(20), height: wp(20), backgroundColor: '#D9D9D9' }]}>
                                    <Image source={ImagesPath.image_white_border} style={{ height: wp(10), width: wp(10), resizeMode: 'contain' }} />
                                </View>
                            </View>
                        </View> :
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
                headerLeftStyle={{ width: "100%" }}
            />
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    showAvatarForEveryMessage={false}
                    showUserAvatar={false}
                    renderBubble={renderBubble}
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