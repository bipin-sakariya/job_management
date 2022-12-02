import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomListView, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { formList } from '../../redux/slices/AdminSlice/formListSlice'
import { useIsFocused } from '@react-navigation/native'

interface formListParams {
    page?: number,
    search?: string,
}
const FormScreen = () => {

    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1)
    const isFocus = useIsFocused();
    const { formListData, isLoading } = useAppSelector(state => state.formList)
    console.log({ formListData });


    useEffect(() => {
        console.log("🚀 ~ file: index.tsx ~ line 95 ~ useEffect ~ isFocus", isFocus)
        if (isFocus) {
            let params = {
                page: page,
            }
            formListApiCall(params)
        }
        return () => {
            setPage(1)
        }
    }, [isFocus])

    const formListApiCall = (params: formListParams) => {
        dispatch(formList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }


    const navigation = useCustomNavigation('FormScreen');
    const form = [
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            name: 'Form Name',
            date: '12 May 2022',
        },
    ]
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
                        <TouchableOpacity >
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={formListData.results}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[globalStyles.rowView, { marginBottom: wp(4) }]}>
                                <Image source={ImagesPath.squre_note_icon} style={styles.noteIconStyle} />
                                <Text style={[styles.billListTxt, globalStyles.rtlStyle]}>{strings.FormList}</Text>
                            </View>
                        )
                    }}
                    renderItem={renderItem}
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

