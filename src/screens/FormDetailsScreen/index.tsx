import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomTextInput, Header, MultipleSelectDropDown } from '../../components'
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

const FormDetailsScreen = () => {
    const navigation = useCustomNavigation('FormDetailsScreen');
    const route = useRoute<RootRouteProps<'FormDetailsScreen'>>();
    const menuRef = useRef(null);
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isBillList, setBillList] = useState<DataTypes[]>([]);
    const [countingValue, setCountingValue] = useState(0);
    const [selectedMemberData, setSelectedMemberData] = useState<DataTypes[]>([]);
    const [finalArray, setFinalArray] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [isselectData, setIsSelectData] = useState<DataTypes[]>([]);
    const [isEditable, setIsEditable] = useState(isEdit || route.params.isEdit == true ? true : false);

    const { formDetails } = useAppSelector(state => state.formList);
    const { billListData } = useAppSelector(state => state.billList);
    const [isALLSign, setIsAllSign] = useState(formDetails?.is_sign ?? false);

    useEffect(() => {
        setIsAllSign(formDetails?.is_sign ?? false)
    }, [formDetails])

    useEffect(() => {
        if (isFocused && route.params.id) {
            dispatch(formDetail(route.params.id)).unwrap().then((res) => {
            }).catch((error) => {
                console.log({ error });
            })

            let params = {
                page: page,
                search: '',
                bill_type: ''
            }

            dispatch(billList(params)).unwrap().then((res) => {
                setBillList(res.results)
                setPage(page + 1)
            }).catch((error) => {
                console.log({ error });
            })
        }
    }, [isFocused, formDetails?.is_sign])

    useEffect(() => {
        const results = billListData.results.map((i) => {
            let newKey = { name: "user_name" }
            const renamedObj = renameKeys(i, newKey);

            return {
                ...renamedObj,
                selected: !!(formDetails.bill.find(e => e.id == i.id))
            }
        })
        setIsSelectData(results)

    }, [isBillList, formDetails.bill])

    useEffect(() => {
        let data: number[] = []
        selectedMemberData?.map((item) => {
            data.push(item.id)
        }
        )
        setFinalArray(data)
    }, [selectedMemberData])

    const CreateGroupValidationSchema = yup.object().shape({
        formName: yup.string().required(strings.formsRequired),
    });

    const deleteGroupData = (id?: number) => {
        if (id) {
            dispatch(formDelete(id)).unwrap().then(() => {
                navigation.goBack()
            })
        }
    }

    const optionData = [
        { title: strings.remove, onPress: () => deleteGroupData(route.params.id), imageSource: ImagesPath.bin_icon },
        {
            title: strings.edit, onPress: () => {
                setIsEdit(true)
                setIsEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const renderItem = ({ item, index }: { item: billData, index: number }) => {
        return (
            <TableDetailsComponent type='form' item={item} index={index} isViewOnly />
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
                        <Text style={globalStyles.headerTitle}>{strings.formName}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.threeDotMenuIcon} />
                    </TouchableOpacity>
                }
                headerLeftStyle={{ width: wp("50%"), paddingLeft: wp(3) }} />

            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomTextInput
                        title={strings.formName}
                        container={{ marginVertical: wp(5) }}
                        value={values.formName}
                        editable={isEdit}
                        onChangeText={handleChange('formName')}
                    />
                    {isEdit || route.params.isEdit == true ?
                        <MultipleSelectDropDown
                            isVisible={isEditable}
                            setIsVisible={setIsEditable}
                            title={strings.addBill}
                            data={isselectData}
                            onCount={(count) => { setCountingValue(count) }}
                            setSelectedMembers={(data) => { setSelectedMemberData(data) }}
                            isForm={true}
                            setIsAllSign={setIsAllSign}
                            isALLSign={isALLSign}
                            countTitle={strings.forms}

                        /> :
                        <View style={[styles.sammedView, globalStyles.rtlDirection, { flexShrink: 1 }]}>
                            <View style={styles.formHeaderView}>
                                <Text style={[styles.noNameTxt, globalStyles.rtlStyle]}>{strings.edit}</Text>
                            </View>
                            <TableHeaderView type={"form"} />
                            <FlatList
                                data={formDetails.bill}
                                renderItem={renderItem}
                                style={{ maxHeight: wp(80) }}
                                // ListHeaderComponent={() => {
                                //     return (
                                //         <TableHeaderView type={"form"} />
                                //     )
                                // }}
                                ListEmptyComponent={() => <View>
                                    <Text></Text>
                                </View>}
                                ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                            />
                            <Text style={[globalStyles.rtlStyle, { fontFamily: fonts.FONT_POP_SEMI_BOLD, fontSize: FontSizes.EXTRA_SMALL_12, color: colors.dark_blue2_color, margin: wp(2) }]}>{strings.assignedSignTitles}</Text>
                        </View>}
                    {isEdit || route.params.isEdit == true ? <CustomBlackButton onPress={() => {
                        handleSubmit()
                    }} title={strings.createForm} image={ImagesPath.plus_white_circle_icon} imageStyle={{ ...globalStyles.headerIcon, tintColor: colors.white_color }} /> : null}
                </ScrollView>
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

