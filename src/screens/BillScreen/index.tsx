import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { ButtonTab, CommonEmptyListComponent, Container, CustomActivityIndicator, CustomListView, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { strings } from '../../languages/localizedStrings';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { billData, billList } from '../../redux/slices/AdminSlice/billListSlice';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../types/RootStackTypes';

interface billListParams {
    page?: number,
    search?: string,
    type?: string
}

const BillListScreen = () => {
    const navigation = useCustomNavigation('BillListScreen');
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()
    const route = useRoute<RootRouteProps<'BillListScreen'>>();

    const [page, setPage] = useState(1)
    const [btn, setBtn] = useState({ open: true, close: false })
    const { billListData, isLoading } = useAppSelector(state => state.billList)

    useEffect(() => {
        if (isFocus && route.params) {
            if (route.params?.billType == 'material') {
                setBtn({ open: true, close: false })
            }
            else if (route.params?.billType == 'sign') {
                setBtn({ open: false, close: true })
            }
        }
    }, [isFocus, route])

    useEffect(() => {
        if (isFocus && btn) {
            let params = {
                page: page,
                bill_type: btn.open ? 'Material' : 'Sign',
                search: ''
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

    const renderItem = ({ item, index }: { item: billData, index: number }) => {
        return (
            <CustomListView
                item={item}
                material={btn.open}
                onPress={() => {
                    let params = {
                        id: item.id,
                        type: btn.open ? 'material' : 'sign',
                    }
                    navigation.navigate("BillSectionScreen", params)
                }}
            />
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
                        <Text style={globalStyles.headerTitle}>{strings.bills}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => { navigation.navigate('BillCreateScreen', { screenName: 'createBill' }) }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('SearchScreen', { screenName: 'billScreen' }) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ButtonTab
                    btnOneTitle={strings.accountMaterial}
                    btnTwoTitle={strings.signBill}
                    setBtn={setBtn}
                    onReset={setPage}
                    btnValue={btn} />
                <View style={[globalStyles.rowView, { marginVertical: hp(1) }]}>
                    <Image source={ImagesPath.squre_note_icon} style={styles.noteIconStyle} />
                    <Text style={[styles.billListTxt, globalStyles.rtlStyle]}>{strings.billList}</Text>
                </View>
                <FlatList
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
                    onEndReached={() => {
                        if (billListData.next) {
                            let param = {
                                page: page,
                                bill_type: btn.open ? 'Material' : 'Sign'
                            }
                            billListApiCall(param)
                        }
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

export default BillListScreen
