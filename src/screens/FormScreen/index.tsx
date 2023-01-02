import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomListView, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { FormDataTypes, formList } from '../../redux/slices/AdminSlice/formListSlice'
import { useIsFocused } from '@react-navigation/native'

interface formListParams {
    page?: number,
    search?: string,
}
const FormScreen = () => {
    const navigation = useCustomNavigation('FormScreen');
    const dispatch = useAppDispatch();
    const isFocus = useIsFocused();

    const { formListData, isLoading } = useAppSelector(state => state.formList)

    const [isFooterLoading, setIsFooterLoading] = useState<boolean>(false)
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (isFocus)
            formListApiCall(page)
        return () => {
            setPage(1)
        }
    }, [isFocus])

    const formListApiCall = (page: number) => {
        let params: formListParams = {
            page: page,
            search: ''
        }
        dispatch(formList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    // const onReachEndApiCall = () => {
    //     console.log("RTYRTY");
    //     const ApiParams = {
    //         page: page,

    //     }
    //     dispatch(formList(ApiParams)).unwrap().then((res) => {
    //         console.log("🚀 ~ file: index.tsx:55 ~ dispatch ~ res", res)
    //         setIsFooterLoading(false)
    //         if (res.data.next) {
    //             Alert.alert("|fdsfs")
    //         }
    //         // res.data.next && setPage(page + 1)
    //     })
    // }

    const renderItem = ({ item, index }: { item: FormDataTypes, index: number }) => {
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
                headerLeftStyle={{ width: '50%', paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.form}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => { navigation.navigate("CreateFormScreen") }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen', { screenName: 'formScreen' })}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <FlatList
                    data={formListData.results}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => {
                        console.log("On reach call");
                        if (formListData.next) {
                            formListApiCall(page)
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => {
                        return (
                            <>
                                {isFooterLoading && <ActivityIndicator size={'small'} />}
                            </>
                        )
                    }}
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
                />
            </Container>
        </View>
    )
}

export default FormScreen

