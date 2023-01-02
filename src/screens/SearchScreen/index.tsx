import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { CommonEmptyListComponent, Container, CustomJobListComponent, CustomListView, GroupListComponent, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { strings } from '../../languages/localizedStrings'
import { formList } from '../../redux/slices/AdminSlice/formListSlice'
import { RootRouteProps } from '../../types/RootStackTypes'
import { useRoute } from '@react-navigation/native'
import { groupList } from '../../redux/slices/AdminSlice/groupListSlice'
import { JobDetailsData, jobList, transferJobList } from '../../redux/slices/AdminSlice/jobListSlice'
import { getListOfUsers } from '../../redux/slices/AdminSlice/userListSlice'
import UserListComponent from '../../components/UserListComponent';
import { billList } from '../../redux/slices/AdminSlice/billListSlice'
import { colors } from '../../styles/Colors'

const SearchScreen = () => {

    const navigation = useCustomNavigation('SearchScreen');
    const dispatch = useAppDispatch();
    const route = useRoute<RootRouteProps<'GroupDetailScreen'>>()
    console.log({ route })

    const [text, setText] = useState("");
    const [page, setPage] = useState(1)
    const { formListData, isLoading } = useAppSelector(state => state.formList)
    const { groupListData } = useAppSelector(state => state.groupList)
    const { jobListData } = useAppSelector(state => state.jobList)
    const { userListData } = useAppSelector(state => state.userList);
    const { billListData } = useAppSelector(state => state.billList)

    const searchName = (input: string) => {
        let param = {
            page: page,
            search: input
        }

        let billParams = {
            page: page,
            search: input,
            bill_type: '',
        }

        if (route.params.screenName == 'formScreen') {
            dispatch(formList(param)).unwrap().then((res) => {
                if (res.next && !!input) {
                    setPage(page + 1)
                }
                console.log({ res })

            })
        }
        if (route.params.screenName == 'groupScreen') {
            dispatch(groupList(param)).unwrap().then((res) => {
                if (res.next && !!input) {
                    setPage(page + 1)
                }
                console.log({ res })

            })
        }

        if (route.params.screenName == 'recentAndHistoryScreen') {
            dispatch(jobList(param)).unwrap().then((res) => {
                if (res.next && !!input) {
                    setPage(page + 1)
                }
                console.log({ res })

            })
        }
        if (route.params.screenName == 'transferJobScreen') {
            dispatch(transferJobList(param)).unwrap().then((res) => {
                if (res.next && !!input) {
                    setPage(page + 1)
                }
                console.log({ res })
            })
        }
        if (route.params.screenName == 'userScreen') {
            dispatch(getListOfUsers(param)).unwrap().then((res) => {
                if (res.next && !!input) {
                    setPage(page + 1)
                }
                console.log({ res })
                console.log("🚀 ~ file: index.tsx ~ line 41 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log("🚀 ~ file: index.tsx ~ line 38 ~ dispatch ~ error", error)
            })
        }
        if (route.params.screenName == 'billScreen') {
            dispatch(billList(billParams)).unwrap().then((res) => {
                if (res.next && !!input) {
                    setPage(page + 1)
                }
                console.log({ res })
                console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log({ error });
            })
        }
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomListView
                item={item}
                isFrom
                onPress={() => {
                    navigation.navigate("FormDetailsScreen", { id: item.id })
                }}
            />
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingHorizontal: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(60) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}></Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={[styles.searchinputview]}>
                        <Image source={ImagesPath.search_icon} style={styles.searchviewimage} />
                        <TextInput
                            style={[styles.searchinputtext]}
                            placeholder={strings.searchHere}
                            placeholderTextColor={colors.gray_1}
                            onChangeText={(text) => {
                                setText(text)
                                searchName(text)
                            }}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                    </View>
                }

            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                {route.params.screenName == 'formScreen' && <FlatList
                    data={formListData.results}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[globalStyles.rowView, { marginBottom: wp(4) }]}>
                                <Image source={ImagesPath.squre_note_icon} style={styles.noteIconStyle} />
                                <Text style={[styles.billListTxt, globalStyles.rtlStyle]}>{strings.formList}</Text>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(3) }} />
                        )
                    }}
                />}
                {route.params.screenName == 'groupScreen' && <FlatList
                    data={groupListData?.results}
                    renderItem={({ item, index }) => {
                        return (
                            <GroupListComponent item={item} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}

                />}
                {route.params.screenName == 'recentAndHistoryScreen' && <FlatList
                    data={jobListData.results}
                    renderItem={({ item, index }: { item: JobDetailsData, index: number }) => {
                        return (
                            <CustomJobListComponent
                                item={item}
                                onPress={() => navigation.navigate('JobDetailsScreen', { params: item })}
                            />
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: wp(2), }}
                    ItemSeparatorComponent={() => <View style={{ height: wp(3) }} />}
                />}

                {route.params.screenName == 'transferJobScreen' && <FlatList
                    data={jobListData.results}
                    renderItem={({ item, index }: { item: JobDetailsData, index: number }) => {
                        return (
                            <CustomJobListComponent
                                item={item}
                                onPress={() => navigation.navigate('JobDetailsScreen', { params: item })}
                            />
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: wp(2), }}
                    ItemSeparatorComponent={() => <View style={{ height: wp(3) }} />}
                />}
                {route.params.screenName == 'userScreen' && <FlatList
                    data={userListData}
                    renderItem={({ item, index }) => {
                        return (
                            <UserListComponent item={item} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                />}
                {route.params.screenName == 'billScreen' && <FlatList
                    data={billListData?.results}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: wp(10) }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[globalStyles.rowView, { marginBottom: wp(4) }]}>
                                {/* <Image source={ImagesPath.squre_note_icon} style={styles.noteIconStyle} />
                                <Text style={[styles.billListTxt, globalStyles.rtlStyle]}>{strings.BillList}</Text> */}
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => <CommonEmptyListComponent Txt={strings.billdatanotfound} />}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(3) }} />
                        )
                    }}
                />}
            </Container>
        </View>

    )
}

export default SearchScreen