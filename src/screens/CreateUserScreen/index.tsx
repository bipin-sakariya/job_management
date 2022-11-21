import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createUser } from '../../redux/slices/AdminSlice/userListSlice';

const roleSchema = yup.object().shape({
    title: yup.string().required(strings.role_required),
    id: yup.number().required(strings.role_required)
})

const permissionSchema = yup.object().shape({
    title: yup.string().required(strings.Permission_required),
    id: yup.number().required(strings.Permission_required)
})

const CreateUserValidationSchema = yup.object().shape({
    userName: yup.string().required(strings.Username_invalid),
    email: yup.string().email(strings.email_invalid).required(strings.email_invalid),
    contactNo: yup.string().min(8, strings.Contectno_invalid).required(strings.Contectno_invalid),
    role: roleSchema,
    permission: permissionSchema
});

const CreateUserScreen = () => {
    const navigation = useCustomNavigation('CreateUserScreen');
    const dispatch = useAppDispatch();

    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [error, setError] = useState({
        phone: "",
        email: "",
        user_name: "",
        role: {},
        permission: {},
    })

    const { isLoading, userDetails, userRoleList } = useAppSelector(state => state.userList);

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                userName: '',
                email: '',
                contactNo: '',
                role: { title: '', id: 0 },
                permission: { title: '', id: 0 },
            },
            validationSchema: CreateUserValidationSchema,
            onSubmit: values => {
                userCreate(values)
            }
        })

    const userCreate = (values: any) => {
        if (!imageUrl) {
            Alert.alert('Alert', 'Please select your profile picture.')
        } else {
            var data = new FormData()
            let images = {
                uri: imageUrl,
                name: "photo.jpg",
                type: "image/jpeg"
            }
            if (imageUrl) {
                data.append("profile_image", images ? images : '')
            }
            data.append("user_name", values.userName)
            data.append("email", values.email)
            data.append("phone", `+972${values.contactNo}`)
            data.append("role", parseInt(values.role.id.toString()))
            dispatch(createUser(data)).unwrap().then((res) => {
                console.log({ res: res });
                navigation.goBack()
            }).catch((e) => {
                console.log({ error: e });
                setError(e.data)
            })
        }
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(50) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.AddUser}</Text>
                    </TouchableOpacity>
                }
            />
            {isLoading && <CustomActivityIndicator size={"small"} />}
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.FillfromtocreateUser}
                    image={ImagesPath.from_list_icon}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground
                        source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                        style={styles.addPhotoStyle}
                        borderRadius={wp(2)}>
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
                    </ImageBackground>
                    <CustomTextInput
                        title={strings.UserName}
                        placeholder={strings.Enter_user_name}
                        container={{ marginBottom: wp(5) }}
                        onChangeText={handleChange("userName")}
                        value={values.userName}
                    />
                    {(touched?.userName && errors?.userName) || error?.user_name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.userName ? errors.userName : error?.email}</Text> : null}
                    <CustomTextInput
                        title={strings.Email}
                        container={{ marginBottom: wp(5) }}
                        placeholder={strings.Enter_email_address}
                        onChangeText={handleChange("email")}
                        value={values.email}
                    />
                    {(touched?.email && errors?.email) || error?.email ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.email ? errors?.email : error?.email}</Text> : null}
                    <CustomTextInput
                        title={strings.Contactno}
                        container={{ marginBottom: wp(5) }}
                        placeholder={strings.Enter_contect_no}
                        onChangeText={handleChange("contactNo")}
                        value={values.contactNo}
                    />
                    {(touched?.contactNo && errors?.contactNo) || error?.phone ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error?.phone ? error.phone : errors.contactNo}</Text> : null}
                    {userRoleList && <DropDownComponent
                        title={strings.Role}
                        data={userRoleList}
                        image={ImagesPath.down_white_arrow}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => {
                            setFieldValue('role', item)
                        }}
                        value={values.role.id}
                        placeholder={strings.SelectRoleforUser}
                        container={{ marginBottom: wp(5) }}
                    />}
                    {(touched?.role && errors.role) ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.role_required}</Text> : null}
                    {userRoleList && <DropDownComponent
                        title={strings.Permission}
                        data={userRoleList}
                        image={ImagesPath.down_white_arrow}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => setFieldValue('permission', item)}
                        value={values.permission.id}
                        placeholder={strings.GivePermission}
                        container={{ marginBottom: wp(5) }}
                    />}
                    {(touched?.permission && errors.permission) ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Permission_required}</Text> : null}
                    <CustomBlackButton
                        title={strings.CreateUser}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => {
                            handleSubmit()
                        }}
                    />
                </KeyboardAwareScrollView>
            </Container>
        </View>
    )
}

export default CreateUserScreen;
