import { Alert, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomActivityIndicator, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header, MultileSelectDropDown } from '../../components'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { DropdownProps } from '../../types/commanTypes'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RootRouteProps } from '../../types/RootStackTypes'
import { PrivateValueStore, useIsFocused, useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { billList } from '../../redux/slices/AdminSlice/billListSlice'
import { formCreate } from '../../redux/slices/AdminSlice/formListSlice'

const { height: deviceHeight } = Dimensions.get('window');
interface billListParams {
    page?: number,
    search?: string,
    type?: string
}


const CreateFormScreen = () => {
    const navigation = useCustomNavigation('CreateFormScreen');
    const componentRef = useRef(null)
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()
    const route = useRoute<RootRouteProps<'GroupDetailScreen'>>()
    const { formDetails, isLoading } = useAppSelector(state => state.formList)

    const [countingValue, setCountingValue] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [isBillError, setIsBillError] = useState(false)
    const [page, setPage] = useState(1)
    const [btn, setBtn] = useState({ open: true, close: false })
    const [isBillList, setBillList] = useState([])
    const [isAllList, setIsAllList] = useState([])
    const [list, isList] = useState([])
    const [selectedMemberData, setSelectedMemberData] = useState()
    const [finalArray, setFinalArray] = useState()
    console.log({ route })

    const CreateFormValidationSchema = yup.object().shape({
        formName: yup
            .string()
            .required(strings.Fromname_required),
    });



    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                formName: '',
            },
            validationSchema: CreateFormValidationSchema,
            onSubmit: values => {
                createForm(values)
            }
        })

    const createForm = (values: any) => {
        let params = {
            name: values.formName,
            bill: finalArray,
            is_sign: true
        }
        console.log({ params })
        dispatch(formCreate(params)).unwrap().then((res) => {
            console.log({ res: res });
            navigation.goBack()
            // navigation.navigate('FormScreen')
        }).catch((e) => {
            console.log({ error: e });

        })
    }

    useEffect(() => {
        console.log({ route2: route });

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
            console.log("billList", res.data)
            setBillList(res.data.results)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }
    console.log({ billlistArray: isBillList })


    useEffect(() => {
        const findData: any = isBillList.map((i) => {

            return {
                ...i,
                user_name: i.name,
                selected: false,
            }
        })
        isList(findData)
        if (formDetails.bill) {
            const finalData: any = formDetails?.bill?.map((i) => {
                return {
                    ...i,
                    user_name: i.name,
                    selected: true,

                }
            })
            console.log({ finalData })
            setIsAllList(finalData)
        }
    }, [isBillList])
    // const selectdata = selectedMemberData?.map((item) = {

    // })
    console.log({ selectedMemberData })
    useEffect(() => {
        let data: any = []
        selectedMemberData?.map((item) => {
            data.push(
                item.id
            )
        }
        )
        setFinalArray(data)
    }, [selectedMemberData])
    console.log(finalArray)
    // const [offsetData, setOffsetData] = useState({
    //     horizontal: 0,
    //     vertical: 0,
    //     modalHeight: 0,
    // });
    // const { bottom: safeAreaBottom } = useSafeAreaInsets();

    // useEffect(() => {
    //     if (isVisible) {
    //         componentRef?.current?.measure(
    //             (
    //                 x: number,
    //                 y: number,
    //                 width: number,
    //                 height: number,
    //                 horizontalOffset: number,
    //                 verticalOffset: number,
    //             ) => {
    //                 setOffsetData({
    //                     ...offsetData,
    //                     horizontal: horizontalOffset,
    //                     vertical: verticalOffset,
    //                 });
    //             },
    //         );
    //     }
    // }, [isVisible]);

    // useEffect(() => {
    //     console.log({ offsetData: offsetData });

    // }, [offsetData])

    // const renderItem = ({ item, index }: any) => {
    //     return (
    //         <View style={[globalStyles.rowView, { height: wp(8), marginHorizontal: wp(2.5), justifyContent: 'space-between' }]}>
    //             <Text style={{ maxWidth: wp(75), fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_12 }}>Form Name</Text>
    //             <Image source={item.selected ? ImagesPath.check_box_fill_icon : ImagesPath.check_box_border_icon} style={[{
    //                 height: wp(6),
    //                 width: wp(6),
    //                 resizeMode: 'contain',
    //             }]} />
    //         </View>
    //     )
    // }

    // const modalPositionHandler = async () => {
    //     const { modalHeight, vertical } = offsetData;
    //     console.log("🚀 ~ file: index.tsx ~ line 110 ~ modalPositionHandler ~ offsetData", offsetData)
    //     console.log("🚀 ~ file: index.tsx ~ line 112 ~ modalPositionHandler ~ deviceHeight", deviceHeight)
    //     if (vertical + modalHeight + hp(10) > deviceHeight) {
    //         return await deviceHeight - modalHeight;
    //     } else {
    //         return await Platform.OS == 'android' ? vertical - hp(4) : vertical + hp(7.5);
    //     }
    // };

    // if (!offsetData.horizontal && !offsetData.vertical) {
    //     return null;
    // }



    return (
        <TouchableWithoutFeedback onPress={() => {
            setIsVisible(false)
        }}>
            <View style={globalStyles.container}>
                <Header
                    headerLeftStyle={{
                        width: "50%",
                        paddingLeft: wp(3)
                    }}
                    headerLeftComponent={
                        <TouchableOpacity style={[globalStyles.rowView]} onPress={() => navigation.goBack()}>
                            <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                            <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle, { width: wp(50), }]}>{strings.CreateForm}</Text>
                        </TouchableOpacity>
                    } />
                {isLoading && <CustomActivityIndicator size={"small"} />}
                <Container style={{ paddingHorizontal: wp(4) }}>
                    <CustomSubTitleWithImageComponent disabled viewStyle={{ marginTop: wp(2) }} title={strings.CreateForm} image={ImagesPath.receipt_icon} />
                    <CustomTextInput
                        title={strings.formname}
                        container={{ marginVertical: wp(5) }}
                        placeholder={strings.formname}
                        onChangeText={handleChange('formName')}
                        value={values.formName}
                    />
                    {touched?.formName && errors?.formName ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.formName}</Text> : null}
                    {/* <View ref={componentRef} style={[styles.textInputContainer,]}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{"props.title"}</Text>
                    </View>
                    <View style={[globalStyles.rowView, { justifyContent: 'space-between', backgroundColor: 'red', marginVertical: wp(2), marginHorizontal: wp(2) }]}>
                        <View>
                            <Text>sdfsd</Text>
                        </View>
                        <TouchableOpacity onPress={() => setIsVisible(true)} style={{ backgroundColor: 'blue', }}>
                            <Image source={ImagesPath.down_white_arrow} style={[globalStyles.headerIcon, { backgroundColor: 'green', transform: [{ rotate: '180deg' }] }]} />
                        </TouchableOpacity>
                    </View>
                </View> */}

                    {/* <ReactNativeModal
                    onLayout={e =>
                        setOffsetData({
                            ...offsetData,
                            modalHeight: e.nativeEvent.layout.height,
                        })
                    }
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    style={[
                        styles.modalStyle,
                        {
                            // top: modalPositionHandler(),
                            top: Platform.OS == 'ios' ? wp(12) : wp(27)
                        },
                    ]}
                    isVisible={isVisible}
                    backdropOpacity={0}
                    onBackdropPress={() => {
                        setIsVisible(false);
                    }}>
                    <View style={styles.container}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <View style={{ height: 20, backgroundColor: 'red' }}></View>}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </ReactNativeModal> */}
                    {/* {
                    isVisible ?
                        <View style={{ maxHeight: wp(80), backgroundColor: "white", borderColor: colors.text_input_border_color, borderWidth: wp(0.5), borderRadius: wp(2), top: wp(-0.5) }}>
                            <View style={[globalStyles.rowView, { alignItems: 'center', alignContent: 'center', padding: wp(2), marginVertical: wp(2), marginHorizontal: wp(2), borderColor: colors.text_input_border_color, borderWidth: wp(0.5), borderRadius: wp(2) }]}>
                                <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                                <TextInput style={{ maxWidth: wp(75), marginHorizontal: wp(2), fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.MEDIUM_16 }} placeholder={strings.Searchhere} placeholderTextColor={colors.dark_blue3_color} />
                            </View>
                            <FlatList data={data} renderItem={renderItem} ItemSeparatorComponent={() => {
                                return (
                                    <View style={{ height: wp(1) }} />
                                )
                            }} />
                        </View>
                        : null
                } */}
                    <MultileSelectDropDown
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        title={strings.AddBill}
                        data={isVisible ? isAllList : list}
                        onCount={(count) => { setCountingValue(count) }}
                        setSelectedMembers={(data) => { setSelectedMemberData(data) }}

                    />
                    {isBillError ? <Text style={[globalStyles.rtlStyle, { bottom: wp(0), color: 'red' }]}>{strings.Bill_required}</Text> : null}

                    <CustomBlackButton onPress={() => {
                        if (countingValue == 0) {
                            setIsBillError(true)
                        }
                        handleSubmit()
                    }} title={strings.CreateForm} image={ImagesPath.plus_white_circle_icon} imageStyle={{ ...globalStyles.headerIcon, tintColor: colors.white_color }} />
                </Container>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateFormScreen