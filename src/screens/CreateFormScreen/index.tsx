import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomActivityIndicator, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header, MultileSelectDropDown } from '../../components'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ImagesPath } from '../../utils/ImagePaths'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RootRouteProps } from '../../types/RootStackTypes'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { billList } from '../../redux/slices/AdminSlice/billListSlice'
import { formCreate } from '../../redux/slices/AdminSlice/formListSlice'

interface billListParams {
    page?: number,
    search?: string,
    type?: string
}

const CreateFormScreen = () => {
    const navigation = useCustomNavigation('CreateFormScreen');
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()
    const route = useRoute<RootRouteProps<'GroupDetailScreen'>>()
    const { formDetails, isLoading } = useAppSelector(state => state.formList)
    const { billListData } = useAppSelector(state => state.billList)

    const [countingValue, setCountingValue] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [isBillSelected, setIsBillSelected] = useState(false)
    const [page, setPage] = useState(1)
    const [btn, setBtn] = useState({ open: true, close: false })
    const [isBillList, setBillList] = useState([])
    const [isAllList, setIsAllList] = useState([])
    const [list, isList] = useState([])
    const [selectedMemberData, setSelectedMemberData] = useState()
    const [finalArray, setFinalArray] = useState()
    const [isALLSign, setIsAllSign] = useState(false)

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
            is_sign: isALLSign
        }
        console.log({ params })
        dispatch(formCreate(params)).unwrap().then((res) => {
            navigation.goBack()
            // navigation.navigate('FormScreen')
        }).catch((e) => {
            console.log({ error: e });
        })
    }

    useEffect(() => {
        if (isFocus && btn) {
            let params = {
                page: page,
                bill_type: ''
            }
            billListApiCall(params)
        }
        return () => {
            setPage(1)
        }
    }, [isFocus, btn])

    const billListApiCall = (params: billListParams) => {
        dispatch(billList(params)).unwrap().then((res) => {
            setBillList(res.data.results)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

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
            const finalData: any = billListData.results.map((i) => {
                return {
                    ...i,
                    user_name: i.name,
                    // selected: true,

                }
            })
            setIsAllList(finalData)
        }
    }, [isBillList])

    useEffect(() => {
        let data: any = []
        selectedMemberData?.map((item) => {
            data.push(item.id)
        })
        setFinalArray(data)

    }, [selectedMemberData])

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

                    {/* bill selection list */}
                    <MultileSelectDropDown
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        title={strings.AddBill}
                        data={isAllList}
                        onCount={(count) => { setCountingValue(count) }}
                        setSelectedMembers={(data) => { setSelectedMemberData(data) }}
                        countTitle={strings.Forms}
                        isForm={true}
                        setIsAllSign={setIsAllSign}
                        isALLSign={isALLSign}
                    />
                    {/* {isBillError ? <Text style={[globalStyles.rtlStyle, { bottom: wp(0), color: 'red' }]}>{strings.Bill_required}</Text> : null} */}

                    <CustomBlackButton
                        onPress={() => {
                            handleSubmit()
                        }}
                        title={strings.CreateForm}
                        image={ImagesPath.plus_white_circle_icon}
                        imageStyle={{ ...globalStyles.headerIcon, tintColor: colors.white_color }} />
                </Container>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CreateFormScreen