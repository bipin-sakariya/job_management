import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../types/RootStackTypes';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomTextInput, DropDownComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import CustomDropdown from '../../components/CustomDropDown';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { isEmptyArray, useFormik } from 'formik';
import * as yup from 'yup'
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { billDelete, billDetail, billUpdate, resetBillDetails } from '../../redux/slices/AdminSlice/billListSlice';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
interface DropdownProps {
    label: string,
    value: string
}

const BillSectionScreen = () => {
    const navigation = useCustomNavigation('BillSectionScreen')
    const route = useRoute<RootRouteProps<'BillSectionScreen'>>();
    let { id, type, isEdit } = route.params

    const [visible, setVisible] = useState(false);
    const [isEditable, setIsEditEditable] = useState(isEdit ? isEdit : false);
    const menuRef = useRef(null);
    const [typeCountError, setTypeCountError] = useState(false)
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()
    const { billDetails, isLoading } = useAppSelector(state => state.billList)
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: billDetails.type_counting ? billDetails.type_counting : '', value: billDetails.type_counting ? billDetails.type_counting : '' })
    const [error, setError] = useState({
        name: "",
        jumping_ration: "",
        type_counting: '',
        type: '',
        image: '',
        quantity: '',
        detail: ''
    })


    useEffect(() => {
        if (isFocus) {
            let params = {
                id: id
            }
            dispatch(billDetail(params)).unwrap().then((res) => {
                console.log({ res });
                setImageUrl(res.image)
            }).catch((error) => {
                console.log({ error });
            })
        }
        return () => {
            dispatch(resetBillDetails())
        }
    }, [isFocus])

    const optionData = [
        { title: strings.Remove, onPress: () => deleteBill(), imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEditEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const deleteBill = () => {
        //delete bill 
        let params = {
            id: id
        }
        dispatch(billDelete(params)).unwrap().then(() => {
            setVisible(false)
            navigation.goBack()
        })
    }

    const CreateMaterialValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required(type == "material" ? strings.Billname_required : strings.Signname_required),
        ration_qunt: yup
            .string()
            .required(type == "material" ? strings.Jumpingration_required : strings.Quantity_required),
        // imageUrl: yup.string().required(strings.Sign_image_required)
    });

    // const data = [
    //     { label: strings.meters, value: strings.meters },
    //     { label: strings.units, value: strings.units },
    //     { label: strings.SQM, value: strings.SQM },
    //     { label: strings.tons, value: strings.tons },
    //     { label: strings.CBM, value: strings.CBM },
    // ];

    const data = [
        { label: strings.meters, value: 'Meters' },
        { label: strings.units, value: 'Units' },
        { label: strings.SQM, value: 'SQM' },
        { label: strings.tons, value: 'Tons' },
        { label: strings.CBM, value: 'CBM' },
    ];

    const updateBill = (values: any) => {
        if (!countingValue.value) {
            setTypeCountError(true)
        } else {
            var data = new FormData()
            let images = {
                uri: imageUrl,
                name: "photo.jpg",
                type: "image/jpeg"
            }
            if (values.name != billDetails.name) {
                data.append("name", values.name)
            }
            if (countingValue.value != billDetails.type_counting) {
                data.append("type_counting", countingValue.value)
            }
            if (imageUrl && images.uri != billDetails.image) {
                data.append("image", images ? images : '')
            }
            if (type == 'material' && parseFloat(values.ration_qunt) != billDetails.jumping_ration) {
                data.append("quantity", values.ration_qunt)
            }
            if (type == 'sign' && parseFloat(values.ration_qunt) != billDetails.quantity) {
                data.append("quantity", values.ration_qunt)
            }
            console.log("🚀 ~ file: index.tsx ~ line 139 ~ updateBill ~ data", data)
            if (isEmptyArray(data)) {
                let params = {
                    data: data,
                    id: id
                }
                dispatch(billUpdate(params)).unwrap().then((res) => {
                    navigation.goBack()
                }).catch((e) => {
                    setError(e.data)
                })
            } else {
                Alert.alert("Please enter data")
            }
        }
    }


    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                name: billDetails.name ? billDetails.name : '',
                ration_qunt: type == 'material' ? billDetails.jumping_ration ? billDetails.jumping_ration.toString() : '' : billDetails.quantity ? billDetails.quantity.toString() : '',
                // imageUrl: billDetails.image ? billDetails.image : ''
            },
            validationSchema: CreateMaterialValidationSchema,
            onSubmit: values => {
                console.log("sdhfhsdfh", values);
                updateBill(values)
            }
        })

    useEffect(() => {
        setError({ ...error, detail: "" })
    }, [values])

    useEffect(() => {
        setError({ ...error, name: "" })
    }, [values.name])

    useEffect(() => {
        if (error.jumping_ration) {
            setError({ ...error, jumping_ration: "" })
        }
        if (error.quantity) {
            setError({ ...error, quantity: '' })
        }
    }, [values.ration_qunt])

    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator size={'small'} />}
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, { marginHorizontal: 0 }]}>{billDetails.name}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.threeDotMenuIcon} />
                    </TouchableOpacity>
                }
                headerLeftStyle={{
                    width: wp("50%"),
                    paddingLeft: wp(3)
                }}
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                    {type == "sign" &&
                        <ImageBackground
                            source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                            style={styles.addPhotoStyle}
                            borderRadius={wp(2)}>
                            {
                                isEditable ?
                                    <TouchableOpacity
                                        onPress={async () => {
                                            let options: any = {
                                                title: "Select Image",
                                                customButtons: [
                                                    { name: "customOptionKey", title: "Choose Photo from Custom Option" },
                                                ],
                                                storageOptions: {
                                                    skipBackup: true,
                                                    path: "images",
                                                },
                                            };
                                            const result: any = await launchImageLibrary(options);
                                            setImageUrl(result ? result?.assets[0].uri : '')
                                            if (result?.assets[0].uri) {
                                                setError({ ...error, image: '', detail: '' })
                                            }
                                        }}
                                        activeOpacity={1}
                                        style={styles.camreaBtnStyle}>
                                        <Image source={ImagesPath.camera_icon} style={styles.cameraIconStyle} />
                                    </TouchableOpacity>
                                    : null
                            }
                        </ImageBackground>
                        // <Image source={imageUrl ? imageUrl : ImagesPath.add_photo} style={styles.addPhotoStyle} />
                    }
                    {error.image ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{error.image}</Text> : null}

                    <CustomTextInput
                        title={strings.Name}
                        container={{ marginVertical: wp(5) }}
                        value={values.name}
                        placeholder={type == "material" ? strings.Billname : strings.SignName}
                        editable={isEditable}
                        onChangeText={handleChange('name')}
                    />
                    {(touched.name && errors.name) || error.name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.name ? error.name : errors.name}</Text> : null}
                    {
                        type == "sign" ?
                            <>
                                <CustomTextInput
                                    title={strings.Quantity}
                                    container={{ marginBottom: wp(5) }}
                                    value={values.ration_qunt}
                                    placeholder='2'
                                    editable={isEditable}
                                    onChangeText={handleChange('ration_qunt')}
                                />
                                {(touched.ration_qunt && errors.ration_qunt) || error.quantity ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.quantity ? error.quantity : errors.ration_qunt}</Text> : null}
                            </> : null
                    }
                    <DropDownComponent
                        title={strings.TypeCounting}
                        data={data}
                        disable={isEditable ? !isEditable : true}
                        image={ImagesPath.down_white_arrow}
                        imageStyle={{ tintColor: isEditable ? colors.dark_blue1_color : colors.white_color }}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => {
                            setError({ ...error, detail: "", type_counting: "" })
                            setTypeCountError(false)
                            setCountingValue(item)
                        }}
                        value={countingValue.value}
                        placeholder={strings.choose}
                        container={{ marginBottom: wp(5) }}
                    />
                    {typeCountError || error.type_counting ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.type_counting ? error.type_counting : strings.Typecount_required}</Text> : null}
                    {
                        type != "sign" ?
                            <>
                                <CustomTextInput
                                    title={strings.JumpingRation}
                                    container={{ marginBottom: wp(5) }}
                                    value={values.ration_qunt}
                                    editable={isEditable}
                                    placeholder='1.5141'
                                    onChangeText={handleChange("ration_qunt")}
                                />
                                {(touched.ration_qunt && errors.ration_qunt) || error.jumping_ration ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.jumping_ration ? error.jumping_ration : errors.ration_qunt}</Text> : null}
                            </> : null
                    }
                    {error.detail ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.detail}</Text> : null}
                    {
                        isEditable ?
                            <CustomBlackButton
                                title={strings.UpdateBill}
                                image={ImagesPath.plus_white_circle_icon}
                                onPress={() => {
                                    if (!countingValue.value) {
                                        setTypeCountError(true)
                                    }
                                    handleSubmit()
                                }}
                            />
                            : null
                    }
                </KeyboardAvoidingView>
            </Container>
            <CustomDropdown
                componentRef={menuRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
                modalStyle={{ right: 0 }}
            />
        </View>
    )
}

export default BillSectionScreen