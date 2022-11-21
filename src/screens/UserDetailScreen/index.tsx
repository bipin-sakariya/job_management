import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { deleteUser, detailsOfUser, resetUserDetails, updateUser } from '../../redux/slices/AdminSlice/userListSlice';
import { useFormik } from 'formik';
import * as yup from "yup";
import { strings } from '../../languages/localizedStrings';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, CustomBlackButton, CustomDropdown, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';

const UserValidationSchema = yup.object().shape({
    userName: yup.string().required(strings.Username_invalid),
    email: yup.string().email(strings.email_invalid).required(strings.email_invalid),
    contactNo: yup.string().min(8, strings.Contectno_invalid).required(strings.Contectno_invalid),
    role: yup.string().required(strings.role_required),
});

const UserDetailScreen = () => {
    const navigation = useCustomNavigation('UserDetailScreen');
    const route = useRoute<RootRouteProps<'UserDetailScreen'>>();
    const { userId, isEdit } = route.params
    const dispatch = useAppDispatch();
    const isFoucs = useIsFocused();
    const menuRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const { userDetails, isLoading } = useAppSelector(state => state.userList);
    const [isEditable, setIsEditable] = useState(isEdit ? isEdit : false);
    const [error, setError] = useState({
        phone: "",
        email: "",
        user_name: ""
    });
    console.log({ userDetails })

    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (isFoucs) {
            userDetail(userId)
            return () => {
                dispatch(resetUserDetails())
            }
        }
    }, [isFoucs])

    const userDetail = (params: number) => {
        dispatch(detailsOfUser(params)).unwrap().then((res) => {
            setImageUrl(res.profile_image)
        }).catch((error) => {
            console.log({ error });
        })
    }

    const updateUserData = (values: any) => {
        var data = new FormData()
        let images = {
            uri: imageUrl,
            name: "photo.jpg",
            type: "image/jpeg"
        }
        data.append("profile_image", images ? images : "")
        data.append("user_name", values.userName)
        data.append("email", values.email)
        data.append("phone", `+972${values.contactNo}`)
        let params = {
            data: data,
            id: userId
        }
        //update user info
        dispatch(updateUser(params)).unwrap().then((res) => {
            setIsEditable(false)
            navigation.goBack()
        }).catch((e) => {
            setError(e.data)
        })

    }

    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                userName: userDetails?.user_name ? userDetails.user_name : '',
                email: userDetails?.email ? userDetails.email : '',
                contactNo: userDetails?.phone ? userDetails.phone.split("+972")[1] : '',
                role: userDetails?.role ? userDetails.role.title : '',
            },
            validationSchema: UserValidationSchema,
            onSubmit: values => {
                updateUserData(values)
            }
        })


    const deleteUserData = () => {
        setVisible(false)
        dispatch(deleteUser(userId)).unwrap().then((res) => {
            navigation.goBack()
        }).catch((error) => {
            Alert.alert("some thing went wrong")
        })
    }

    const optionData = [
        { title: strings.Remove, onPress: () => { deleteUserData() }, imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator size={'small'} />}
            <Header
                headerLeftStyle={{
                    paddingHorizontal: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(60) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{userDetails?.user_name}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={styles.headerMenu} />
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
                    <CustomTextInput
                        editable={isEditable}
                        title={strings.UserName}
                        container={{ marginBottom: wp(5) }}
                        value={values.userName}
                        onChangeText={handleChange('userName')}
                    />
                    {(touched?.userName && errors?.userName) || error?.user_name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.userName ? errors.userName : error?.email}</Text> : null}
                    <CustomTextInput
                        editable={isEditable}
                        title={strings.Email}
                        container={{ marginBottom: wp(5) }}
                        value={values.email}
                        onChangeText={handleChange('email')}
                    />
                    {(touched?.email && errors?.email) || error?.email ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.email ? errors?.email : error?.email}</Text> : null}
                    <CustomTextInput
                        editable={isEditable}
                        title={strings.Contactno}
                        container={{ marginBottom: wp(5) }}
                        value={values.contactNo}
                        onChangeText={handleChange('contactNo')}
                    />
                    {(touched?.contactNo && errors?.contactNo) || error?.phone ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error?.phone ? error.phone : errors.contactNo}</Text> : null}
                    <CustomTextInput
                        editable={false}
                        title={strings.Role}
                        container={{ marginBottom: wp(5) }}
                        value={values.role}
                    />
                    <CustomTextInput
                        editable={false}
                        title={strings.Permission}
                        container={{ marginBottom: wp(5) }}
                        value={userDetails?.role.title}
                    />

                </KeyboardAwareScrollView>
                {isEditable && <CustomBlackButton
                    title={strings.Update_user}
                    image={ImagesPath.plus_white_circle_icon}
                    onPress={handleSubmit}
                />}
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

export default UserDetailScreen;
