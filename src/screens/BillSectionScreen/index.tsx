import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../types/RootStackTypes';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomTextInput, DropDownComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import CustomDropdown from '../../components/CustomDropDown';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { launchImageLibrary } from 'react-native-image-picker';
interface DropdownProps {
    label: string,
    value: number
}

const BillSectionScreen = () => {
    const navigation = useCustomNavigation('BillSectionScreen')
    const route = useRoute<RootRouteProps<'BillSectionScreen'>>();
    let { type, name, ration, unit, imageUrl: img, quantity, isEdit } = route.params
    console.log("🚀 ~ file: index.tsx ~ line 27 ~ BillSectionScreen ~ isEdit", isEdit)

    const [visible, setVisible] = useState(false);
    const [isEditable, setIsEditEditable] = useState(isEdit ? isEdit : false);
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: 0 })
    const menuRef = useRef(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [typeCountError, setTypeCountError] = useState(false)

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
        setVisible(false)
        navigation.goBack()
    }

    const CreateMaterialValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required(type == "material" ? strings.Billname_required : strings.Signname_required),
        ration_qunt: yup
            .string()
            .required(type == "material" ? strings.Jumpingration_required : strings.Quantity_required),
    });
    const data = [
        { label: strings.meters, value: strings.meters },
        { label: strings.units, value: strings.units },
        { label: strings.SQM, value: strings.SQM },
        { label: strings.tons, value: strings.tons },
        { label: strings.CBM, value: strings.CBM },
    ];

    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                name: '',
                ration_qunt: '',
            },
            validationSchema: CreateMaterialValidationSchema,
            onSubmit: values => {
                // login(values)
            }
        })

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text numberOfLines={1} style={globalStyles.headerTitle}>{strings.BillName}</Text>
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
                    <CustomTextInput
                        title={strings.Name}
                        container={{ marginVertical: wp(5) }}
                        value={values.name}
                        placeholder={type == "material" ? strings.Billname : strings.SignName}
                        editable={isEditable}
                        onChangeText={handleChange('name')}
                    />
                    {touched.name && errors.name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.name}</Text> : null}
                    {
                        type == "sign" ?
                            <>
                                <CustomTextInput
                                    title={strings.Quantity}
                                    container={{ marginBottom: wp(5) }}
                                    value={values.ration_qunt}
                                    placeholder='2'
                                    editable={isEditable}
                                    onChange={handleChange('ration_qunt')}
                                />
                                {touched.ration_qunt && errors.ration_qunt ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.ration_qunt}</Text> : null}
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
                            setTypeCountError(false)
                            setCountingValue(item)
                        }}
                        value={countingValue.value}
                        placeholder={strings.choose}
                        container={{ marginBottom: wp(5) }}
                    />
                    {typeCountError ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Typecount_required}</Text> : null}
                    {
                        type != "sign" ?
                            <>
                                <CustomTextInput
                                    title={strings.JumpingRation}
                                    container={{ marginBottom: wp(5) }}
                                    value={values.ration_qunt}
                                    editable={isEditable}
                                    placeholder='1.5141'
                                    onChange={handleChange("ration_qunt")}
                                />
                                {touched.ration_qunt && errors.ration_qunt ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.ration_qunt}</Text> : null}
                            </> : null
                    }
                    {
                        isEditable ?
                            <CustomBlackButton
                                title={strings.UpdateBill}
                                image={ImagesPath.plus_white_circle_icon}
                                onPress={() => {
                                    handleSubmit()
                                    if (!countingValue.value) {
                                        setTypeCountError(true)
                                    }
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