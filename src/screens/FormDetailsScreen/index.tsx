import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomActivityIndicator, CustomBlackButton, CustomTextInput, Header, MultileSelectDropDown } from '../../components'
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
import { formDelete, formDetail, formUpdate } from '../../redux/slices/AdminSlice/formListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useFormik } from 'formik'
import * as yup from "yup";
import { billList } from '../../redux/slices/AdminSlice/billListSlice'


const FormDetailsScreen = () => {
    const navigation = useCustomNavigation('FormDetailsScreen');
    const route = useRoute<RootRouteProps<'GroupDetailScreen'>>()
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const menuRef = useRef(null);
    const isFocused = useIsFocused()
    const [isBillList, setBillList] = useState([])
    const [isAllList, setIsAllList] = useState([])
    const [list, isList] = useState([])
    const [countingValue, setCountingValue] = useState(0)
    const [selectedMemberData, setSelectedMemberData] = useState()
    const [finalArray, setFinalArray] = useState()

    const dispatch = useAppDispatch()
    const { formDetails, isLoading } = useAppSelector(state => state.formList)
    // console.log({ route: route.params.id })

    useEffect(() => {
        if (isFocused) {
            dispatch(formDetail(route.params.id)).unwrap().then((res) => {
                console.log({ formDetails: res });
            }).catch((error) => {
                console.log({ error });
            })


        }
    }, [isFocused])
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
            // console.log({ finalData })
            setIsAllList(finalData)
        }
    }, [isBillList])
    console.log({ selectedMemberData })
    useEffect(() => {
        let data: any = []
        selectedMemberData?.map((item) => {
            data.push({
                id: item.id
            })
        }
        )
        setFinalArray(data)
    }, [selectedMemberData])
    // console.log({ finalArray })

    const CreateGroupValidationSchema = yup.object().shape({
        formName: yup.string().required(strings.forms_required),

    });

    const deleteGroupData = (id: number) => {

        dispatch(formDelete(id)).unwrap().then(() => {
            navigation.goBack()
        })
    }

    const optionData = [
        { title: strings.Remove, onPress: () => deleteGroupData(route.params.id), imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEdit(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const renderItem = ({ item, index }: any) => {
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

    const createForm = (values: any) => {
        let params = {
            id: route.params.id,
            name: values.formName,
            bill: finalArray,
            is_sign: false
        }
        console.log({ params })
        dispatch(formUpdate(params)).unwrap().then((res) => {

            navigation.goBack()
            // navigation.navigate('FormScreen')
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
                {isEdit ?
                    <MultileSelectDropDown
                        isVisible={isEdit}
                        setIsVisible={setIsEdit}
                        title={strings.AddBill}
                        data={isEdit ? isAllList : list}
                        onCount={(count) => { setCountingValue(count) }}
                        setSelectedMembers={(data) => { setSelectedMemberData(data) }}

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
                {isEdit && <CustomBlackButton onPress={() => {
                    handleSubmit()
                }} title={strings.CreateForm} image={ImagesPath.plus_white_circle_icon} imageStyle={{ ...globalStyles.headerIcon, tintColor: colors.white_color }} />}
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

