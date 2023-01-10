import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, CustomBlackButton, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { colors } from '../../styles/Colors';
import { strings } from '../../languages/localizedStrings';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useFormik } from 'formik'
import * as yup from "yup";
import * as ImagePicker from "react-native-image-picker";
import FastImage from 'react-native-fast-image';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { updateUserProfile } from '../../redux/slices/AuthUserSlice';

const EditProfileScreen = () => {
    const navigation = useCustomNavigation('EditProfileScreen');
    const dispatch = useAppDispatch();

    const { token } = useAppSelector(state => state.userDetails)
    const { userInformation, isLoading } = useAppSelector(state => state.userList)
    const [pickerResponse, setPickerResponse] = useState(token?.user?.profile_image ? token?.user?.profile_image : '');
    const [error, setError] = useState({
        email: '',
        phone: ''
    })
    const phoneNumber = token?.user?.phone.substring(4)

    const UserValidationSchema = yup.object().shape({
        user_name: yup.string().required(strings.usernameRequired),
    });

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                user_name: token?.user?.user_name ? token?.user?.user_name : '',
                email: token?.user?.email ? token?.user?.email : '',
                phone: token?.user?.phone ? phoneNumber : '',
                profile_image: token?.user?.profile_image ? token?.user?.profile_image : '',
                role: { title: token?.user?.role.title ? token?.user?.role.title : '', id: token?.user?.role.id ? token?.user?.role.id : 0 },
            },
            validationSchema: UserValidationSchema,
            onSubmit: values => {
                console.log({ values })
                editProfile(values)
            }
        })
    console.log({ data: errors?.user_name, phone: error.phone })

    interface CustomImageOption extends ImageLibraryOptions {
        title?: string,
        customButtons?: { name?: string, title?: string }[]
        storageOptions?: {
            skipBackup: Boolean
            path: string
        }
    }

    const chooseFile = () => {
        let options: CustomImageOption = {
            mediaType: 'photo',
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        interface ImagePickerResponseType extends ImagePickerResponse {
            title?: string,
            customButtons?: { name?: string, title?: string }[]
            storageOptions?: {
                skipBackup: Boolean
                path: string
            }
        }
        ImagePicker.launchImageLibrary(options, (response: ImagePickerResponseType) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.errorCode) {
                console.log("ImagePicker Error: ", response.errorCode);
            } else if (response.customButtons) {
                console.log("User tapped custom button: ", response.customButtons);
            } else {
                setPickerResponse(response?.assets ? response?.assets[0]?.uri ?? '' : '');
            }
        });
    };

    const editProfile = (values: {
        user_name: string;
        email: string;
        phone: string | undefined;
        role: {
            title: string;
            id: number;
        };
        profile_image: string
    }) => {
        if (!pickerResponse) {
            Alert.alert(strings.profile_pic_required)
        }
        else {
            var Data = new FormData();

            let images = {
                uri: pickerResponse,
                name: "photo.jpg",
                type: "image/jpeg"
            }

            if (pickerResponse) {
                Data.append("profile_image", images ? images : '')
            }

            Data.append("user_name", values.user_name)
            Data.append("email", values.email)
            Data.append("phone", `+972${values.phone}`)

            let params = {
                id: token?.user.id,
                data: Data
            }

            dispatch(updateUserProfile(params)).unwrap().then((res) => {
                navigation.goBack()
            }).catch((e) => {
                console.log({ error: e });
                setError(e?.data)
            })
        }
    }

    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3),
                    width: "70%",
                }}
                headerLeftComponent={
                    <TouchableOpacity
                        style={[globalStyles.rowView]}
                        onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.editYourProfile}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <TouchableOpacity onPress={() => { chooseFile() }} style={styles.profilePhoto}>
                    <FastImage source={{ uri: pickerResponse }} resizeMode={'stretch'} style={[styles.profilePhoto, {
                        marginVertical: 0
                    }]} />
                    <Image source={ImagesPath.camera_icon} resizeMode={'contain'} style={{ position: 'absolute', height: wp(8.5), width: wp(8.5), right: wp(-4), bottom: wp(2) }} />
                </TouchableOpacity>
                <CustomTextInput
                    title={strings.userName}
                    container={{ marginBottom: wp(5) }}
                    value={values.user_name}
                    onChangeText={handleChange('user_name')}
                />
                {errors?.user_name && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.user_name}</Text>}
                <CustomTextInput
                    title={strings.email}
                    container={{ marginBottom: wp(5) }}
                    value={values.email}
                    onChangeText={handleChange('email')}
                />
                {error?.email && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error?.email}</Text>}
                <CustomTextInput
                    title={strings.contactNo}
                    container={{ marginBottom: wp(5) }}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                />
                {error?.phone && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error?.phone}</Text>}
                <CustomBlackButton
                    title={strings.save}
                    image={ImagesPath.save_icon}
                    imageStyle={{ tintColor: colors.white }}
                    onPress={() => handleSubmit()}
                />
            </Container>
        </View>
    )
}

export default EditProfileScreen;
