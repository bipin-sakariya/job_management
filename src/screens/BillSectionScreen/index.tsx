import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../types/RootStackTypes';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, CustomBlackButton, CustomDropdown, CustomTextInput, DropDownComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { isEmptyArray, useFormik } from 'formik';
import * as yup from 'yup';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { billDelete, billDetail, billUpdate, resetBillDetails } from '../../redux/slices/AdminSlice/billListSlice';

interface DropdownProps {
    label: string,
    value: string
}

const BillSectionScreen = () => {
    const navigation = useCustomNavigation('BillSectionScreen')
    const route = useRoute<RootRouteProps<'BillSectionScreen'>>();
    let { id, type, isEdit } = route.params
    const menuRef = useRef(null);
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()

    const [visible, setVisible] = useState(false);
    const [isEditable, setIsEditEditable] = useState(isEdit ? isEdit : false);
    const [typeCountError, setTypeCountError] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | undefined>('');


    const [error, setError] = useState({
        name: "",
        jumping_ration: "",
        type_counting: '',
        type: '',
        image: '',
        quantity: '',
        detail: ''
    })

    const { billDetails, isLoading } = useAppSelector(state => state.billList)
    const [countingValue, setCountingValue] = useState<DropdownProps>({
        label: billDetails.type_counting ? billDetails.type_counting : '',
        value: billDetails.type_counting ? billDetails.type_counting : ''
    })

    useEffect(() => {
        if (billDetails) {
            setCountingValue({
                label: billDetails.type_counting ? billDetails.type_counting : '',
                value: billDetails.type_counting ? billDetails.type_counting : ''
            })
        }
    }, [billDetails])


    useEffect(() => {
        if (isFocus && id) {
            dispatch(billDetail(id)).unwrap().then((res) => {
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
        { title: strings.remove, onPress: () => deleteBill(), imageSource: ImagesPath.bin_icon },
        {
            title: strings.edit, onPress: () => {
                setIsEditEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const deleteBill = () => {
        //delete bill 
        if (id) {
            dispatch(billDelete(id)).unwrap().then(() => {
                setVisible(false)
                navigation.goBack()
            })
        }
    }

    const CreateMaterialValidationSchema = yup.object().shape({
        name: yup.string().required(type == "material" ? strings.billNameRequired : strings.signNameRequired),
        ration_qunt: yup.string().required(type == "material" ? strings.jumpingRatioRequired : strings.quantityRequired),
    });
    const CreateSignBillValidationSchema = yup.object().shape({
        name: yup.string().required(type == "material" ? strings.billNameRequired : strings.signNameRequired),
    });

    const data = [
        { label: strings.meters, value: 'Meters' },
        { label: strings.units, value: 'Units' },
        { label: strings.SQM, value: 'SQM' },
        { label: strings.tons, value: 'Tons' },
        { label: strings.CBM, value: 'CBM' },
    ];

    const updateBill = (values: { name: string, ration_qunt: string }) => {
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
                data.append("jumping_ration", parseFloat(values.ration_qunt))
            }
            if (type == 'sign' && parseFloat(values.ration_qunt) != billDetails.quantity) {
                data.append("quantity", parseFloat(values.ration_qunt))
            }
            if (!isEmptyArray(data)) {
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
                Alert.alert(strings.data_required)
            }
        }
    }


    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                name: billDetails.name ? billDetails.name : '',
                ration_qunt: type == 'material' ? billDetails.jumping_ration ? billDetails.jumping_ration.toString() : '' : billDetails.quantity ? billDetails.quantity.toString() : '',
            },
            validationSchema: type == 'material' ? CreateMaterialValidationSchema : CreateSignBillValidationSchema,
            onSubmit: values => {
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
                        <TouchableOpacity
                            onPress={async () => {
                                let option: ImageLibraryOptions = {
                                    mediaType: 'photo'
                                }
                                const result = await launchImageLibrary(option);
                                setImageUrl(result?.assets ? result?.assets[0].uri : '')
                                if (result?.assets && result?.assets[0].uri) {
                                    setError({ ...error, image: '', detail: '' })
                                }
                            }}
                            activeOpacity={1}
                            disabled={isEditable ? false : true}>
                            <ImageBackground
                                source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                                style={styles.addPhotoStyle}
                                borderRadius={wp(2)}>
                                {isEditable ? <View style={styles.camreaBtnStyle}>
                                    <Image source={ImagesPath.camera_icon} style={styles.cameraIconStyle} />
                                </View> : null}
                            </ImageBackground>
                        </TouchableOpacity>
                        // <Image source={imageUrl ? imageUrl : ImagesPath.add_photo} style={styles.addPhotoStyle} />
                    }
                    {error.image ? <Text style={[globalStyles.rtlStyle, { color: colors.red }]}>{error.image}</Text> : null}
                    <CustomTextInput
                        title={strings.name}
                        container={{ marginVertical: wp(5) }}
                        value={values.name}
                        placeholder={type == "material" ? strings.billName : strings.signName}
                        editable={isEditable}
                        onChangeText={handleChange('name')}
                    />
                    {(touched.name && errors.name) || error.name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.name ? error.name : errors.name}</Text> : null}
                    {/* {type == "sign" && <>
                        <CustomTextInput
                            title={strings.quantity}
                            container={{ marginBottom: wp(5) }}
                            value={values.ration_qunt}
                            placeholder='2'
                            editable={isEditable}
                            onChangeText={handleChange('ration_qunt')}
                            keyboardType={'number-pad'}
                        />
                        {(touched.ration_qunt && errors.ration_qunt) || error.quantity ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.quantity ? error.quantity : errors.ration_qunt}</Text> : null}
                    </>} */}
                    <DropDownComponent
                        title={strings.typeCounting}
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
                    {typeCountError || error.type_counting ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.type_counting ? error.type_counting : strings.typeCountRequired}</Text> : null}
                    {type != "sign" && <>
                        <CustomTextInput
                            title={strings.jumpingRation}
                            container={{ marginBottom: wp(5) }}
                            value={values.ration_qunt}
                            editable={isEditable}
                            placeholder={strings.jumpingRation}
                            onChangeText={handleChange("ration_qunt")}
                            keyboardType={'decimal-pad'}
                        />
                        {(touched.ration_qunt && errors.ration_qunt) || error.jumping_ration ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.jumping_ration ? error.jumping_ration : errors.ration_qunt}</Text> : null}
                    </>}
                    {error.detail ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.detail}</Text> : null}
                    {isEditable && <CustomBlackButton
                        title={strings.updateBill}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => {
                            if (!countingValue.value) {
                                setTypeCountError(true)
                            }
                            handleSubmit()
                        }}
                    />}
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