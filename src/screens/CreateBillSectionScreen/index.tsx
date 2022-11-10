import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
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

interface DropdownProps {
    label: string,
    value: number
}

const CreateBillSectionScreen = () => {
    const navigation = useCustomNavigation('CreateBillSectionScreen')
    const route = useRoute<RootRouteProps<'CreateBillSectionScreen'>>();
    let { type } = route.params
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: 0 })
    const [countingError, setCountingError] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [imageError, setImageError] = useState(false)

    const data = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
    ];

    const CreateMaterialValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required(type == "material" ? strings.Billname_required : strings.Signname_required),
        ration_qunt: yup
            .string()
            .required(type == "material" ? strings.Jumpingration_required : strings.Quantity_required),
    });

    const createbills = (values: any) => {
        console.log("🚀 ~ file: index.tsx ~ line 47 ~ createbills ~ values", values)
        if (!countingValue.value) {
            setCountingError(true)
        } else {
            // if (countingValue.value && values) {
            //     var data = new FormData()
            //     let params = {}
            //     if (type == "material") {
            //     } else {

            //     }
            // }
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
                console.log("🚀 ~ file: index.tsx ~ line 54 ~ CreateBillSectionScreen ~ values", values)
                createbills(values)
            }
        })

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(50) }]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.BillSection}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                    <CustomSubTitleWithImageComponent disabled title={strings.Prepare_bill} image={ImagesPath.receipt_icon} />
                    {
                        type == "sign" &&
                        <CustomDashedComponent viewStyle={{ paddingVertical: wp(5) }} image={ImagesPath.add_icon} onPress={async () => {
                            let option: ImageLibraryOptions = {
                                mediaType: 'photo'
                            }
                            const { assets } = await launchImageLibrary(option)
                            setImageUrl(assets && assets.length !== 0 ? assets[0]?.uri : '')
                            if (assets && assets[0]?.uri) {
                                setImageError(false)
                            }
                        }} title={strings.Addasignlogo} />
                    }
                    {imageError && <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{strings.Pleaseentersignlogo}</Text>}
                    <CustomTextInput
                        title={strings.Name}
                        container={{ marginVertical: wp(5) }}
                        placeholder={type == "material" ? strings.Billname : strings.SignName}
                        onChangeText={handleChange("name")}
                    />
                    {(touched.name && errors.name) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.name}</Text>}
                    {
                        type == "material" ?
                            <>
                                <DropDownComponent
                                    title={strings.TypeCounting}
                                    data={data}
                                    image={ImagesPath.down_white_arrow}
                                    labelField="label"
                                    valueField="value"
                                    onChange={(item) => {
                                        setCountingError(false)
                                        setCountingValue(item)
                                    }}
                                    value={countingValue.value}
                                    placeholder={strings.choose}
                                    container={{ marginBottom: wp(5) }}
                                />
                                {countingError && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Typecount_required}</Text>}

                                <CustomTextInput
                                    title={strings.Jumpdish}
                                    placeholder='1.5'
                                    container={{ marginBottom: wp(5) }}
                                    onChangeText={handleChange("ration_qunt")}
                                />
                                {(touched.ration_qunt && errors.ration_qunt) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.ration_qunt}</Text>}
                            </>
                            :
                            <>
                                <CustomTextInput
                                    title={strings.Quantity}
                                    placeholder={strings.EnterQuantity}
                                    container={{ marginBottom: wp(5) }}
                                    onChangeText={handleChange("ration_qunt")}
                                />
                                {(touched.ration_qunt && errors.ration_qunt) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.ration_qunt}</Text>}

                                <DropDownComponent
                                    title={strings.TypeCounting}
                                    data={data}
                                    image={ImagesPath.down_white_arrow}
                                    labelField="label"
                                    valueField="value"
                                    onChange={(item) => {
                                        setCountingError(false)
                                        setCountingValue(item)
                                    }}
                                    value={countingValue.value}
                                    placeholder={strings.choose}
                                    container={{ marginBottom: wp(5) }}
                                />
                                {countingError && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Typecount_required}</Text>}
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
                </KeyboardAvoidingView>
            </Container>
        </View>
    )
}

export default CreateBillSectionScreen