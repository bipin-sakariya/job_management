import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomListView, GroupListComponent, Header } from '../../components'
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

const SearchScreen = () => {

    const navigation = useCustomNavigation('SearchScreen');
    const dispatch = useAppDispatch();
    const route = useRoute<RootRouteProps<'GroupDetailScreen'>>()
    console.log({ route })

    const [text, setText] = useState("");
    const [page, setPage] = useState(1)
    const { formListData, isLoading } = useAppSelector(state => state.formList)
    const { groupListData } = useAppSelector(state => state.groupList)


    const searchName = (input: string) => {
        let param = {
            page: page,
            search: input
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
                            placeholder={strings.SearchHere}
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
                                <Text style={[styles.billListTxt, globalStyles.rtlStyle]}>{strings.FormList}</Text>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(3) }} />
                        )
                    }}
                />}
                {route.params.screenName == 'groupScreen' &&
                    <FlatList
                        data={groupListData?.results}
                        renderItem={({ item, index }) => {
                            return (
                                <GroupListComponent item={item} />
                            )
                        }}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        showsVerticalScrollIndicator={false}
                    />}
            </Container>
        </View>

    )
}

export default SearchScreen