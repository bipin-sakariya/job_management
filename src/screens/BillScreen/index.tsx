import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonTab, Container, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FlatList } from 'react-native-gesture-handler'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import CustomListView from '../../components/CustomListView'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { billList } from '../../redux/slices/AdminSlice/billListSlice'
import { useIsFocused } from '@react-navigation/native'
import CustomActivityIndicator from '../../components/CustomActivityIndicator'

interface billListParams {
    page?: number,
    search?: string,
    type?: string
}

const BillListScreen = () => {
    const navigation = useCustomNavigation('BillListScreen');
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()
    const [page, setPage] = useState(1)
    const { billListData, isLoading } = useAppSelector(state => state.billList)
    const bills = [
        {
            iamgeUrl: 'dsdfsd',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sdfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sdfsf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },

        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },

        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '2022-11-08T12:44:46.142691Z',
        },
    ]
    const [btn, setBtn] = useState({
        open: true,
        close: false
    })

    useEffect(() => {
        console.log("🚀 ~ file: index.tsx ~ line 95 ~ useEffect ~ isFocus", isFocus)
        if (isFocus && btn) {
            let params = {
                page: page,
                bill_type: btn.open ? 'Material' : 'Sign'
            }
            billListApiCall(params)
        }
        return () => {
            setPage(1)
        }
    }, [isFocus, btn])

    const billListApiCall = (params: billListParams) => {
        dispatch(billList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });

        })
    }


    const renderItem = ({ item, index }: any) => {
        return (
            <CustomListView item={item} material={btn.open} onPress={() => {
                let params = {
                    id: item.id,
                    type: btn.open ? 'material' : 'sign',
                }
                navigation.navigate("BillSectionScreen", params)
            }} />
        )
    }

    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator size={'small'} />}
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3),
                    width: wp(50),
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.Bills}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => { navigation.navigate('BillCreateScreen') }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ButtonTab btnOneTitle={strings.accountmaterial} btnTwoTitle={strings.Signabill} setBtn={setBtn} onReset={setPage} btnValue={btn} />
                <FlatList contentContainerStyle={{ paddingBottom: wp(10) }} showsVerticalScrollIndicator={false} data={billListData?.results}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[globalStyles.rowView, { marginBottom: wp(4) }]}>
                                <Image source={ImagesPath.squre_note_icon} style={styles.noteIconStyle} />
                                <Text style={[styles.billListTxt, globalStyles.rtlStyle]}>{strings.BillList}</Text>
                            </View>
                        )
                    }}
                    onEndReached={() => {
                        if (billListData.next) {
                            let param = {
                                page: page,
                                bill_type: btn.open ? 'Material' : 'Sign'
                            }
                            billListApiCall(param)
                        }
                    }}
                    renderItem={renderItem} ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(3) }} />
                        )
                    }} />
            </Container>
        </View>
    )
}

export default BillListScreen
