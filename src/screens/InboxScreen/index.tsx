import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import InboxListComponent from '../../components/InboxListComponent';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { chatListDetails, groupDetailsProps } from '../../redux/slices/ChatSlice/ChatSlice';
import { styles } from './styles';
export interface messageListProps {
    id: number,
    group: groupDetailsProps,
    message: string | null,
    created_at: string,
    created_by: number,
    badge: number | null
}

const IndoxScreen = () => {
    const navigation = useCustomNavigation('IndoxScreen')

    const { chatList } = useAppSelector(state => state.chatData)
    const [page, setPage] = useState<number>(1)
    const [isFooterLoading, setIsFooterLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const [isSearch, setIsSearch] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        setLoading(true)
        chatListApicall(1, '')
        return () => {
            setPage(1)
            setText("")
        }
    }, [])

    const chatListApicall = (page: number, search?: string) => {
        let param = {
            page: page,
            search: search?.trim()
        }
        dispatch(chatListDetails(param)).unwrap().then((res) => {
            page == 1 ? setLoading(false) : setIsFooterLoading(false)
            setPage(page + 1)
        }).catch((error) => {
            setLoading(false)
            setIsFooterLoading(false)
            console.log({ error });
        })
    }

    return (
        <View style={globalStyles.container}>
            {loading && <CustomActivityIndicator size={"large"} />}
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <Text style={globalStyles.headerTitle}>{strings.message}</Text>
                }
                headerRightComponent={
                    <TouchableOpacity onPress={() => setIsSearch(!isSearch)}>
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container>
                {isSearch && <View style={[styles.searchInputView]}>
                    <Image source={ImagesPath.search_icon} style={styles.searchViewImage} />
                    <TextInput
                        style={[styles.searchInputText]}
                        placeholder={strings.searchHere}
                        onChangeText={(text) => {
                            setText(text)
                            chatListApicall(1, text)
                        }}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <TouchableOpacity onPress={() => {
                        setIsSearch(false)
                        setText('')
                        chatListApicall(1, '')
                    }} >
                        <Image source={ImagesPath.close_icon} style={globalStyles.backArrowStyle} />
                    </TouchableOpacity>
                </View>}
                <FlatList
                    data={chatList.results}
                    renderItem={({ item, index }: { item: messageListProps, index: number }) => (
                        <InboxListComponent item={item} index={index} onPress={() => {
                            if (index == 0) {
                                navigation.navigate("ChatScreen", { job: undefined })
                            } else {
                                const job = {
                                    id: 1,
                                    name: 'job title',
                                    distance: '5 km',
                                    descriprion: 'hello this is the job details screen page',
                                    imageurl: "https://dummyimage.com/600x400/000/fff",
                                }
                                navigation.navigate("ChatScreen", { job: job })
                            }
                        }} />
                    )}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                        // for paggination
                        if (chatList.next) {
                            setIsFooterLoading(true)
                            chatListApicall(page, text.trim())
                        }
                    }}
                    ListFooterComponent={() => {
                        return (
                            <>
                                {isFooterLoading && <ActivityIndicator size={'small'} />}
                            </>
                        )
                    }}
                    contentContainerStyle={{ paddingBottom: wp(5) }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={[globalStyles.container, globalStyles.spaceAroundView]}>
                                <Text style={globalStyles.rtlStyle}>{strings.empty_list}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(5), backgroundColor: colors.white_color }} />
                        )
                    }}
                />
            </Container>
        </View>
    )
}

export default IndoxScreen;
