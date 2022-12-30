import { Alert, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { colors } from '../../styles/Colors';
import { strings } from '../../languages/localizedStrings';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useFormik } from 'formik'
import * as yup from 'yup'
import * as ImagePicker from "react-native-image-picker";
import FastImage from 'react-native-fast-image';
import { updateUserProfile } from '../../redux/slices/AdminSlice/userListSlice';
import DeviceInfo from 'react-native-device-info';


const EditProfileScreen = () => {
    const navigation = useCustomNavigation('EditProfileScreen');
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.userDetails)
    const [imageClick, isImageClick] = useState(false)
    const [pickerResponse, setPickerResponse] = useState(token?.user.profile_image ? token?.user.profile_image : '');
    const [deviceId, setDeviceId] = useState('')

    useEffect(() => {
        (async () => {
            const DeviceId = await DeviceInfo.getUniqueId();
            setDeviceId(DeviceId)
        })()
    }, [])
    console.log({ deviceId })
    // const CreateEditJobValidationSchema = yup.object().shape({
    //     // jobID: yup.string().trim().required(strings.jobid_required),
    // });
    // const phoneNumber = token?.user.phone.trim()
    // console.log({ phoneNumber })
    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                user_name: token?.user.user_name ? token?.user.user_name : '',
                email: token?.user.email ? token?.user.email : '',
                phone: token?.user.phone ? token?.user.phone : '',
                image: token?.user.profile_image ? token?.user.profile_image : '',
                role: { title: token?.user.role.title ? token?.user.role.title : '', id: token?.user.role.id ? token?.user.role.id : 0 },
            },
            // validationSchema: CreateEditJobValidationSchema,
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
                console.log({
                    response,
                });

                if (response) {
                    isImageClick(true)
                }
                else {
                    isImageClick(false)
                }
                setPickerResponse(response.assets[0].uri);
            }
            // setIsImage(true);
        });
    };
    const editProfile = (values: {
        user_name: string;
        email: string;
        phone: string;
        role: {
            title: string;
            id: number;
        };
    }) => {
        if (!pickerResponse) {
            Alert.alert(strings.profile_pic_required)
        } else {
            var Data = new FormData()
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
                console.log({ res: res });
                navigation.goBack()
            }).catch((e) => {
                console.log({ error: e });
            })
        }
    }



    return (
        <View style={globalStyles.container}>
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
                <CustomTextInput
                    title={strings.contactNo}
                    container={{ marginBottom: wp(5) }}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                />
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
