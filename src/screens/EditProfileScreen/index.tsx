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
import * as ImagePicker from "react-native-image-picker";
import FastImage from 'react-native-fast-image';
import { updateUserProfile } from '../../redux/slices/AdminSlice/userListSlice';

const EditProfileScreen = () => {
    const navigation = useCustomNavigation('EditProfileScreen');
    const dispatch = useAppDispatch();

    const { token } = useAppSelector(state => state.userDetails)
    const { userInformation, isLoading } = useAppSelector(state => state.userList)

    const [pickerResponse, setPickerResponse] = useState(userInformation?.profile_image ? userInformation?.profile_image : '');
    const [error, setError] = useState({ email: '', phone: '' })
    const phoneNumber = userInformation?.phone.substring(4)

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                user_name: userInformation?.user_name ? userInformation?.user_name : '',
                email: userInformation?.email ? userInformation?.email : '',
                phone: userInformation?.phone ? phoneNumber : '',
                profile_image: userInformation?.profile_image ? userInformation?.profile_image : '',
                role: { title: userInformation?.role.title ? userInformation?.role.title : '', id: userInformation?.role.id ? userInformation?.role.id : 0 },
            },
            onSubmit: values => {
                editProfile(values)
            }
        })

    const chooseFile = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                setPickerResponse(response.assets[0].uri);
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
                setError(e.data)
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
                <CustomTextInput
                    title={strings.email}
                    container={{ marginBottom: wp(5) }}
                    value={values.email}
                    onChangeText={handleChange('email')}
                />
                {error.email && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.email}</Text>}
                <CustomTextInput
                    title={strings.contactNo}
                    container={{ marginBottom: wp(5) }}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                />
                {error.phone && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.phone}</Text>}
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
