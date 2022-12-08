import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header, MultileSelectDropDown } from '../../components'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { ImagesPath } from '../../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import CustomDropdown from '../../components/CustomDropDown'
import TableHeaderView from '../../components/TableHeaderView'
import TableDetailsComponent from '../../components/TableDetailsComponent'
import { strings } from '../../languages/localizedStrings'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { RootRouteProps } from '../../types/RootStackTypes'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { FormData, formDelete, formDetail, formUpdate } from '../../redux/slices/AdminSlice/formListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useFormik } from 'formik'
import * as yup from "yup";
import { billData, billList } from '../../redux/slices/AdminSlice/billListSlice'
import { renameKeys } from '../../utils/screenUtils'

interface DataTypes {
    user_name?: string
    selected?: boolean
    date_joined?: string
    email?: string
    id: number
    is_active?: boolean
    phone?: string
    profile_image?: string,
    role?: { id: number, title?: string },
    name?: string
}

interface Formvalues {
    formName: string
}

interface billDetails {
    created_at: string
    id: number
    image: string
    jumping_ration: number
    name: string
    quantity: number
    type: string
    type_counting: string
    updated_at: string
}

const FormDetailsScreen = () => {
    const navigation = useCustomNavigation('FormDetailsScreen');
    const route = useRoute<RootRouteProps<'FormDetailsScreen'>>()
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const menuRef = useRef(null);
    const isFocused = useIsFocused()
    const [isBillList, setBillList] = useState<DataTypes[]>([])
    const [isAllList, setIsAllList] = useState<DataTypes[]>([])
    const [list, isList] = useState<billData[]>([])
    const [countingValue, setCountingValue] = useState(0)
    const [selectedMemberData, setSelectedMemberData] = useState<DataTypes[]>([])
    const [finalArray, setFinalArray] = useState<number[]>([])
    const [page, setPage] = useState(1)
    const [FormDetails, setFormDetails] = useState<FormData>()

    const [isselectData, setIsSelectData] = useState<DataTypes[]>([])
    const [isEditable, setIsEditable] = useState(isEdit || route.params.isEdit == true ? true : false)

    const dispatch = useAppDispatch()
    const { formDetails, isLoading } = useAppSelector(state => state.formList)
    const { billListData } = useAppSelector(state => state.billList)
    console.log({ route: route.params })
    const [isALLSign, setIsAllSign] = useState(formDetails?.is_sign ?? false)


    useEffect(() => {
        setIsAllSign(formDetails?.is_sign ?? false)
    }, [formDetails])

    useEffect(() => {
        if (isFocused && route.params.id) {
            dispatch(formDetail(route.params.id)).unwrap().then((res) => {
                setFormDetails(res)
                console.log({ formDetails: res });
            }).catch((error) => {
                console.log({ error });
            })

            let params = {
                page: page,
                search: '',
                bill_type: ''
            }

            dispatch(billList(params)).unwrap().then((res) => {
                console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
                setBillList(res.results)
                setPage(page + 1)
            }).catch((error) => {
                console.log({ error });
            })

        }
    }, [isFocused, formDetails?.is_sign])

    useEffect(() => {
        const findData: billData[] = billListData.results.map((i) => {
            return {
                ...i,
                user_name: i.name,
                selected: false,
            }
        })
        isList(findData)

        if (formDetails.bill) {
            const finalData: DataTypes[] = isBillList.map((i: DataTypes) => {
                return {
                    ...i,
                    user_name: i.name,
                    // selected: true,
                }
            })
            // console.log({ finalData })
            setIsAllList(finalData)
        }

        const results = billListData.results.map((i) => {
            let newKey = { name: "user_name" }
            const renamedObj = renameKeys(i, newKey);
            console.log({ renamedObj });

            return {
                ...renamedObj,
                selected: !!(formDetails.bill.find(e => e.id == i.id))
            }
        })
        setIsSelectData(results)
        console.log({ results })


    }, [isBillList, formDetails.bill])

    // useEffect(() => {
    //     if(formDetails.is_sign == true)
    //  },[])

    console.log({ isAllList })
    console.log({ selectedMemberData })
    useEffect(() => {
        let data: number[] = []
        selectedMemberData?.map((item) => {
            data.push(item.id)
        }
        )
        setFinalArray(data)
    }, [selectedMemberData])
    console.log('===========', { finalArray })


    const CreateGroupValidationSchema = yup.object().shape({
        formName: yup.string().required(strings.forms_required),

    });

    const deleteGroupData = (id?: number) => {
        if (id) {
            dispatch(formDelete(id)).unwrap().then(() => {
                navigation.goBack()
            })
        }

    }

    const optionData = [
        { title: strings.Remove, onPress: () => deleteGroupData(route.params.id), imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEdit(true)
                setIsEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const renderItem = ({ item, index }: { item: billData, index: number }) => {
        return (
            <TableDetailsComponent type='form' item={item} index={index} />
        )
    }


    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                formName: formDetails.name ? formDetails.name : '',
            },
            validationSchema: CreateGroupValidationSchema,
            onSubmit: values => {
                createForm(values)
            }
        })



    const createForm = (values: Formvalues) => {
        let params = {
            id: route.params.id,
            name: values.formName,
            bill: finalArray,
            is_sign: isALLSign
        }
        console.log({ params })
        dispatch(formUpdate(params)).unwrap().then((res) => {
            navigation.goBack()
        }).catch((e) => {
            console.log({ error: e });

        })
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.Form_Name}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.threeDotMenuIcon} />
                    </TouchableOpacity>
                }
                headerLeftStyle={{ width: wp("50%"), paddingLeft: wp(3) }} />

            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomTextInput
                    title={strings.Form_Name}
                    container={{ marginVertical: wp(5) }}
                    value={values.formName}
                    editable={isEdit}
                    onChangeText={handleChange('formName')}
                />
                {isEdit || route.params.isEdit == true ?
                    <MultileSelectDropDown
                        isVisible={isEditable}
                        setIsVisible={setIsEditable}
                        title={strings.AddBill}
                        data={isselectData}
                        onCount={(count) => { setCountingValue(count) }}
                        setSelectedMembers={(data) => { setSelectedMemberData(data) }}
                        isForm={true}
                        setIsAllSign={setIsAllSign}
                        isALLSign={isALLSign}
                        countTitle={strings.Forms}

                    /> :
                    <View style={[styles.sammedView, globalStyles.rtlDirection, { flexShrink: 1 }]}>
                        <View style={styles.formHeaderView}>
                            <Text style={[styles.noNameTxt, globalStyles.rtlStyle]}>{strings.Edit}</Text>
                        </View>
                        <FlatList
                            data={formDetails.bill}
                            renderItem={renderItem}
                            style={{ maxHeight: wp(80) }}
                            ListHeaderComponent={() => {
                                return (
                                    <TableHeaderView type={"form"} />
                                )
                            }}
                            ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                        />
                        <Text style={[globalStyles.rtlStyle, { fontFamily: fonts.FONT_POP_SEMI_BOLD, fontSize: FontSizes.EXTRA_SMALL_12, color: colors.dark_blue2_color, marginHorizontal: wp(2), marginBottom: wp(2) }]}>{strings.Differentsignshavebeenassignedtothisform}</Text>
                    </View>}
                {isEdit || route.params.isEdit == true ? <CustomBlackButton onPress={() => {
                    handleSubmit()
                }} title={strings.CreateForm} image={ImagesPath.plus_white_circle_icon} imageStyle={{ ...globalStyles.headerIcon, tintColor: colors.white_color }} /> : null}
            </Container>
            <CustomDropdown
                componentRef={menuRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
                modalStyle={{ marginHorizontal: 0 }}
            />
        </View>
    )
}

export default FormDetailsScreen

