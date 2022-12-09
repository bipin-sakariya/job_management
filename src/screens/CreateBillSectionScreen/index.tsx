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
    ration_qunt: string;
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
            .required(type == "material" ? strings.Billname_required : strings.Signname_required),
        ration_qunt: yup
            .string()
            .required(type == "material" ? strings.Jumpingration_required : strings.Quantity_required),
    });

    const createbills = (values: ValuesProps) => {
        console.log("🚀 ~ file: index.tsx ~ line 47 ~ createbills ~ values", values)

        if (!countingValue.value) {
            setCountingError(true)
        }
        else if (!imageUrl && type == "sign") {
            Alert.alert('Alert', 'Please select your profile picture.')
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
            data.append(type == 'material' ? "jumping_ration" : "quantity", parseFloat(values.ration_qunt))
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

    return (
        <View style={globalStyles.container}>
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
                    <CustomSubTitleWithImageComponent disabled title={strings.Prepare_bill} image={ImagesPath.receipt_icon} />
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
                            }} title={strings.Addasignlogo} />}
                        </>
                        : null
                    }
                    {imageError || error.image ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{error.image ? error.image : strings.Pleaseentersignlogo}</Text> : null}
                    <CustomTextInput
                        title={strings.name}
                        container={{ marginVertical: wp(5), marginTop: wp(3) }}
                        placeholder={type == "material" ? strings.Billname : strings.SignName}
                        onChangeText={handleChange("name")}
                    />
                    {(touched.name && errors.name) || error.name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.name ? error.name : errors.name}</Text> : null}
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
                            {countingError || error.type ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.type ? error.type : strings.Typecount_required}</Text> : null}

                            <CustomTextInput
                                title={strings.jumpdish}
                                value={values.ration_qunt}
                                placeholder={strings.jumpdish}
                                container={{ marginBottom: wp(5) }}
                                onChangeText={handleChange("ration_qunt")}
                                placeholderTextColor={colors.light_brown}
                                keyboardType={'decimal-pad'}
                            />
                            {(touched.ration_qunt && errors.ration_qunt) || error.jumping_ration ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.jumping_ration ? error.jumping_ration : errors.ration_qunt}</Text> : null}
                        </>
                        :
                        <>
                            <CustomTextInput
                                title={strings.quantity}
                                placeholder={strings.EnterQuantity}
                                container={{ marginBottom: wp(5) }}
                                onChangeText={handleChange("ration_qunt")}
                                keyboardType={'number-pad'}
                            />
                            {(touched.ration_qunt && errors.ration_qunt) || error.quantity ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.quantity ? error.quantity : errors.ration_qunt}</Text> : null}

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
                            {countingError || error.type_counting ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error.type_counting ? error.type_counting : strings.Typecount_required}</Text> : null}
                        </>
                    }
                    <CustomBlackButton
                        title={strings.CreateBill}
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