import { View, Text, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, CustomBlackButton, CustomDashedComponent, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { strings } from '../../languages/localizedStrings';
import { useFormik } from 'formik';
import * as yup from "yup";
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { billCreate, billData } from '../../redux/slices/AdminSlice/billListSlice';
import { colors } from '../../styles/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { storeCreatedBillDetailsForCloseJob } from '../../redux/slices/AdminSlice/jobListSlice'

interface DropdownProps {
    label: string,
    value: number
}

interface ValuesProps {
    name: string;
    ration_qunt?: string | number;
}

const CreateBillSectionScreen = () => {
    const navigation = useCustomNavigation('CreateBillSectionScreen')
    const route = useRoute<RootRouteProps<'CreateBillSectionScreen'>>();
    const dispatch = useAppDispatch()

    let { type } = route.params
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: 0 })
    const [countingError, setCountingError] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [imageError, setImageError] = useState(false)
    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { formData, jobDetails } = useAppSelector(state => state.jobList)
    const [error, setError] = useState({
        name: "",
        jumping_ration: "",
        type_counting: '',
        type: '',
        image: '',
        quantity: ''
    })
    const { isFromCloseJob, newlyCreatedBillsForCloseJob } = useAppSelector(state => state.jobList)
    // const { error } = useAppSelector(state => state.billList)

    const data = [
        { label: strings.meters, value: 'Meters' },
        { label: strings.units, value: 'Units' },
        { label: strings.SQM, value: 'SQM' },
        { label: strings.tons, value: 'Tons' },
        { label: strings.CBM, value: 'CBM' },
    ];

    const CreateMaterialValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required(type == "material" ? strings.billNameRequired : strings.signNameRequired),
        ration_qunt: yup
            .string()
            .required(type == "material" ? strings.jumpingRatioRequired : strings.quantityRequired),
    });

    const createbills = (values: ValuesProps) => {
        if (!countingValue.value) {
            setCountingError(true)
        }
        else if (!imageUrl && type == "sign") {
            Alert.alert(strings.profile_pic_required)
        }
        else {
            setIsLoading(true)
            const data = new FormData()
            const images = {
                uri: imageUrl ?? '',
                name: "photo.jpg",
                type: "image/jpeg"
            }

            data.append("name", values.name)
            data.append("type_counting", countingValue.value.toString())

            if (imageUrl) {
                data.append("image", images)
            }
            data.append(type == 'material' ? "jumping_ration" : "measurement", route.params.screenName == 'updateJob' ? count.toString() : parseFloat(String(values.ration_qunt).toString()))
            data.append("type", type == 'material' ? "Material" : 'Sign')

            dispatch(billCreate(data)).unwrap().then((res: billData) => {
                setIsLoading(false)
                if (isFromCloseJob) {
                    dispatch(storeCreatedBillDetailsForCloseJob(res))
                    navigation.navigate('CloseJobScreen', { params: jobDetails.id })
                } else {
                    navigation.navigate('BillListScreen', { billType: type })
                }
            }).catch((e) => {
                setIsLoading(false)
                console.log({ error: e });
                setError(e.data)
            })
        }
    }
    const Increment = () => {
        setCount(count + 1)
    }

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            initialValues: {
                name: '',
                ration_qunt: route.params.screenName == 'updatedJob' ? count : '',
            },
            validationSchema: CreateMaterialValidationSchema,
            onSubmit: values => {
                createbills(values)
            }
        })

    useEffect(() => {
        setError({ ...error, name: "" })
        // formData?.push(values.name)
    }, [values.name])

    useEffect(() => {
        if (error.jumping_ration) {
            setError({ ...error, jumping_ration: "" })
        }
        if (error.quantity) {
            setError({ ...error, quantity: '' })
        }
    }, [values.ration_qunt, count])


    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(50) }]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.billSection}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <CustomSubTitleWithImageComponent disabled title={strings.prepareBill} image={ImagesPath.receipt_icon} />
                    {type == "sign" ?
                        <>
                            {imageUrl && <ImageBackground
                                source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                                style={styles.addPhotoStyle}
                                borderRadius={wp(2)}>
                                <TouchableOpacity
                                    onPress={async () => {
                                        let option: ImageLibraryOptions = {
                                            mediaType: 'photo'
                                        }
                                        const result = await launchImageLibrary(option);
                                        setImageUrl(result?.assets ? result?.assets[0].uri : '')
                                        if (result.assets && result.assets[0]?.uri) {
                                            setImageError(false)
                                            setError({ ...error, image: '' })
                                        }
                                    }}

                                    activeOpacity={1}
                                    style={styles.camreaBtnStyle}>
                                    <Image source={ImagesPath.camera_icon} style={styles.cameraIconStyle} />
                                </TouchableOpacity>
                            </ImageBackground>}
                            {!imageUrl && <CustomDashedComponent viewStyle={{ paddingVertical: wp(5) }} image={ImagesPath.add_icon} onPress={async () => {
                                let option: ImageLibraryOptions = {
                                    mediaType: 'photo'
                                }
                                const { assets } = await launchImageLibrary(option)

                                if (assets && assets.length !== 0) {
                                    setImageUrl(assets[0]?.uri ?? '')
                                }

                                if (assets && assets[0]?.uri) {
                                    setImageError(false)
                                    setError({ ...error, image: '' })
                                }
                            }} title={strings.addSignLogo} />}
                        </>
                        : null
                    }
                    {imageError || error.image ? <Text style={[globalStyles.rtlStyle, { color: colors.red }]}>{error.image ? error.image : strings.pleaseEnterSignLogo}</Text> : null}
                    <CustomTextInput
                        title={strings.name}
                        container={{ marginVertical: wp(5), marginTop: wp(3) }}
                        placeholder={type == "material" ? strings.billName : strings.signName}
                        onChangeText={handleChange("name")}
                    />
                    {(touched.name && errors.name) || error.name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.name ? error.name : errors.name}</Text> : null}
                    {route.params.screenName == 'updatedJob' ? <DropDownComponent
                        title={strings.typeCounting}
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => {
                            setError({
                                ...error,
                                type_counting: ''
                            })
                            setCountingError(false)
                            setCountingValue(item)
                        }}
                        value={countingValue.value}
                        placeholder={strings.choose}
                        container={{ marginBottom: wp(5) }}
                    />
                        :
                        <>
                            {type == "material" ?
                                <>
                                    <DropDownComponent
                                        title={strings.typeCounting}
                                        data={data}
                                        image={ImagesPath.down_white_arrow}
                                        labelField="label"
                                        valueField="value"
                                        onChange={(item) => {
                                            setError({
                                                ...error,
                                                type_counting: ''
                                            })
                                            setCountingError(false)
                                            setCountingValue(item)
                                        }}
                                        value={countingValue.value}
                                        placeholder={strings.choose}
                                        container={{ marginBottom: wp(5) }}
                                    />
                                    {countingError || error.type ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.type ? error.type : strings.typecount_required}</Text> : null}

                                    <CustomTextInput
                                        title={strings.jumpdish}
                                        value={String(values.ration_qunt)}
                                        placeholder={strings.jumpdish}
                                        container={{ marginBottom: wp(5) }}
                                        onChangeText={handleChange("ration_qunt")}
                                        placeholderTextColor={colors.light_brown}
                                        keyboardType={'decimal-pad'}
                                    />
                                    {(touched.ration_qunt && errors.ration_qunt) || error.jumping_ration ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.jumping_ration ? error.jumping_ration : errors.ration_qunt}</Text> : null}
                                </>
                                :
                                <>
                                    <CustomTextInput
                                        title={strings.quantity}
                                        placeholder={strings.enterQuantity}
                                        container={{ marginBottom: wp(5) }}
                                        onChangeText={handleChange("ration_qunt")}
                                        keyboardType={'number-pad'}
                                    />
                                    {(touched.ration_qunt && errors.ration_qunt) || error.quantity ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.quantity ? error.quantity : errors.ration_qunt}</Text> : null}

                                    <DropDownComponent
                                        title={strings.typeCounting}
                                        data={data}
                                        image={ImagesPath.down_white_arrow}
                                        labelField="label"
                                        valueField="value"
                                        onChange={(item) => {
                                            setError({
                                                ...error,
                                                type_counting: ''
                                            })
                                            setCountingError(false)
                                            setCountingValue(item)
                                        }}
                                        value={countingValue.value}
                                        placeholder={strings.choose}
                                        container={{ marginBottom: wp(5) }}
                                    />
                                    {countingError || error.type_counting ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.type_counting ? error.type_counting : strings.typeCountRequired}</Text> : null}
                                </>
                            }
                        </>}
                    {
                        route.params.screenName == 'updatedJob' && <View style={[styles.textInputContainer, globalStyles.rtlDirection]}>
                            <View style={styles.titleContainer}>
                                <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{type == 'Sign' ? strings.quantity : strings.measurement}</Text>
                            </View>
                            <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.btnContainerStyle]}>
                                <TouchableOpacity onPress={() => {
                                    setFieldValue('ration_qunt', count + 1)
                                    setCount(count + 1)
                                }}>
                                    <Image source={ImagesPath.plus} resizeMode={'contain'} style={styles.btnIconStyle} />
                                </TouchableOpacity>
                                <Text style={{ width: wp(10), textAlign: 'center' }}>{count}</Text>
                                <TouchableOpacity onPress={() => {
                                    setFieldValue('ration_qunt', count >= 1 ? count - 1 : 0)
                                    setCount(count >= 1 ? count - 1 : 0)
                                }}>
                                    <Image source={ImagesPath.minus} resizeMode={'contain'} style={styles.btnIconStyle} />
                                </TouchableOpacity>
                            </View>
                        </View >}
                    <CustomBlackButton
                        title={strings.createBill}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => {
                            if (!countingValue.value) {
                                setCountingError(true)
                            }
                            if (!imageUrl && type == "sign") {
                                setImageError(true)
                            }
                            handleSubmit()
                        }}
                    />
                </KeyboardAwareScrollView >
            </Container >
        </View >
    )
}

export default CreateBillSectionScreen