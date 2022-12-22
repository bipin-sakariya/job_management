import { View, Text, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomDashedComponent, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { strings } from '../../languages/localizedStrings';
import { useFormik } from 'formik';
import * as yup from "yup";
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { billCreate } from '../../redux/slices/AdminSlice/billListSlice';
import { colors } from '../../styles/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface DropdownProps {
    label: string,
    value: number
}

interface ValuesProps {
    name: string;
    ration_qunt?: string;
}

const CreateBillSectionScreen = () => {
    const navigation = useCustomNavigation('CreateBillSectionScreen')
    const route = useRoute<RootRouteProps<'CreateBillSectionScreen'>>();
    let { type } = route.params
    console.log(route.params)
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: 0 })
    const [countingError, setCountingError] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [imageError, setImageError] = useState(false)
    const [count, setCount] = useState(1)
    const dispatch = useAppDispatch()
    // const { error } = useAppSelector(state => state.billList)
    const [error, setError] = useState({
        name: "",
        jumping_ration: "",
        type_counting: '',
        type: '',
        image: '',
        quantity: ''
    })

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
        console.log("🚀 ~ file: index.tsx ~ line 47 ~ createbills ~ values", values)

        if (!countingValue.value) {
            setCountingError(true)
        }
        else if (!imageUrl && type == "sign") {
            Alert.alert(strings.profile_pic_required)
        }
        else {
            var data = new FormData()
            let images = {
                uri: imageUrl,
                name: "photo.jpg",
                type: "image/jpeg"
            }
            console.log({ imageUrl });

            data.append("name", values.name)
            data.append("type_counting", countingValue.value)

            if (imageUrl) {
                data.append("image", images ? images : '')
            }
            data.append(type == 'material' ? "jumping_ration" : "quantity", route.params.screenName == 'updateJob' ? count : parseFloat(values.ration_qunt))
            data.append("type", type == 'material' ? "Material" : 'Sign')

            console.log("🚀 ~ file: index.tsx ~ line 73 ~ createbills ~ data", data)

            dispatch(billCreate(data)).unwrap().then((res) => {
                console.log({ res: res });
                navigation.navigate('BillListScreen', { billType: type })
            }).catch((e) => {
                console.log({ error: e });
                setError(e.data)
            })
        }
    }

    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            initialValues: {
                name: '',
                ration_qunt: '',
            },
            validationSchema: CreateMaterialValidationSchema,
            onSubmit: values => {
                createbills(values)
            }
        })

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

    const Increment = () => {
        setCount(count + 1)
    }

    const Decrement = () => {
        if (count == 0) {
            setCount(0)
        }
        else {
            setCount(count - 1)
        }
    }
    return (
        <View style={globalStyles.container}>
            {console.log({ values })}
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
                                setImageUrl(assets && assets.length !== 0 ? assets[0]?.uri : '')
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
                                    {countingError || error.type ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.type ? error.type : strings.typeCountRequired}</Text> : null}

                                    <CustomTextInput
                                        title={strings.jumpdish}
                                        value={values.ration_qunt}
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
                    {route.params.screenName == 'updatedJob' && <View style={[styles.textInputContainer, globalStyles.rtlDirection]}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{type == 'Sign' ? strings.quantity : strings.measurement}</Text>
                        </View>
                        <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.btnContainerStyle]}>
                            <TouchableOpacity onPress={() => Increment()}>
                                <Image source={ImagesPath.plus} resizeMode={'contain'} style={styles.btnIconStyle} />
                            </TouchableOpacity>
                            <Text style={{ width: wp(10), textAlign: 'center' }}>{count}</Text>
                            <TouchableOpacity onPress={() => Decrement()}>
                                <Image source={ImagesPath.minus} resizeMode={'contain'} style={styles.btnIconStyle} />
                            </TouchableOpacity>
                        </View>
                    </View>}
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
                </KeyboardAwareScrollView>
            </Container>
        </View>
    )
}

export default CreateBillSectionScreen