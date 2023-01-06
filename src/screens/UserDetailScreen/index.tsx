import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
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
import { Container, CustomActivityIndicator, CustomBlackButton, CustomDropdown, CustomTextInput, DropDownComponent, Header, MultipleSelectDropDown } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../styles/Colors';

const UserValidationSchema = yup.object().shape({
    userName: yup.string().required(strings.usernameRequired),
    email: yup.string().email(strings.emailInvalid).required(strings.emailInvalid),
    contactNo: yup.string().length(8, strings.contactNoInvalid).required(strings.contactNoInvalid),
    role: yup.string().required(strings.roleRequired),
});

const UserDetailScreen = () => {
    const navigation = useCustomNavigation('UserDetailScreen');
    const route = useRoute<RootRouteProps<'UserDetailScreen'>>();
    const { userId, isEdit } = route.params
    const dispatch = useAppDispatch();
    const isFoucs = useIsFocused();
    const menuRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(isEdit ? isEdit : false);
    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState({
        phone: "",
        email: "",
        user_name: ""
    });
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    const { userDetails, isLoading, userRoleList } = useAppSelector(state => state.userList);


    useEffect(() => {
        if (isFoucs) {
            userDetail(userId)
            return () => {
                dispatch(resetUserDetails())
            }
        }
    }, [isFoucs])

    // useEffect(() => { 
    //     const results: DataTypes[] = isUser.map((i) => {
    //         console.log("🚀 ~ file: index.tsx:212 ~ constresults:MemberValues[]=isUser.map ~ i", i)
    //         return {
    //             ...i,
    //             selected: !!(groupDetails.member_details?.find((e) => e.id == i.id))
    //         }
    //     })
    //     isSetAllMember(results)
    // })

    const userDetail = (params: number) => {
        dispatch(detailsOfUser(params)).unwrap().then((res) => {
            setImageUrl(res.profile_image)
        }).catch((error) => {
            console.log({ error });
        })
    }

    const updateUserData = (values: {
        userName: string;
        email: string;
        contactNo: string;
        role: string;
    }) => {
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

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                userName: userDetails?.user_name ? userDetails.user_name : '',
                email: userDetails?.email ? userDetails.email : '',
                contactNo: userDetails?.phone ? userDetails.phone.substring(4) : '',
                role: userDetails?.role ? userDetails.role.title : '',
                permission: userDetails?.role ? userDetails.role.title : '',
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
            console.log({ error });
        })
    }

    const optionData = [
        { title: strings.remove, onPress: () => { deleteUserData() }, imageSource: ImagesPath.bin_icon },
        {
            title: strings.edit, onPress: () => {
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
                    <TouchableOpacity
                        onPress={async () => {
                            let option: ImageLibraryOptions = {
                                mediaType: 'photo'
                            }
                            const result: any = await launchImageLibrary(option);
                            setImageUrl(result ? result?.assets[0].uri : '')
                        }}
                        disabled={isEditable ? false : true}
                        activeOpacity={1}>
                        <ImageBackground
                            source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                            style={styles.addPhotoStyle}
                            borderRadius={wp(2)}>
                            {isEditable ?
                                <View style={styles.camreaBtnStyle}>
                                    <Image source={ImagesPath.camera_icon} style={styles.cameraIconStyle} />
                                </View>
                                : null
                            }
                        </ImageBackground>
                    </TouchableOpacity>
                    <CustomTextInput
                        editable={isEditable}
                        title={strings.userName}
                        container={{ marginBottom: wp(5) }}
                        value={values.userName}
                        onChangeText={handleChange('userName')}
                        placeholder={isEditable ? strings.userName : ''}
                    />
                    {(touched?.userName && errors?.userName) || error?.user_name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.userName ? errors.userName : error?.email}</Text> : null}
                    <CustomTextInput
                        editable={isEditable}
                        title={strings.email}
                        container={{ marginBottom: wp(5) }}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        placeholder={isEditable ? strings.email : ''}
                        keyboardType={'email-address'}
                    />
                    {(touched?.email && errors?.email) || error?.email ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.email ? errors?.email : error?.email}</Text> : null}
                    <CustomTextInput
                        editable={isEditable}
                        title={strings.contactNo}
                        container={{ marginBottom: wp(5) }}
                        value={values.contactNo}
                        onChangeText={handleChange('contactNo')}
                        placeholder={isEditable ? strings.contactNo : ''}
                        keyboardType={'number-pad'}
                    />
                    {(touched?.contactNo && errors?.contactNo) || error?.phone ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error?.phone ? error.phone : errors.contactNo}</Text> : null}
                    {/* <CustomTextInput
                        editable={isEditable}
                        title={strings.role}
                        container={{ marginBottom: wp(5) }}
                        value={values.role}
                        placeholder={isEditable ? strings.contactNo : ''}
                    /> */}
                    <DropDownComponent
                        disable={!isEditable}
                        title={strings.role}
                        data={userRoleList}
                        image={isEditable ? ImagesPath.down_white_arrow : ''}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => {
                            setFieldValue('role', item)
                        }}
                        value={values.role}
                        placeholder={userDetails?.role.title ? userDetails.role.title : strings.selectRoleForUser}
                        container={{ marginBottom: wp(5) }}
                    />
                    <DropDownComponent
                        disable={!isEditable}
                        title={strings.permission}
                        data={userRoleList}
                        image={isEditable ? ImagesPath.down_white_arrow : ''}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => {
                            setFieldValue('role', item)
                        }}
                        value={values.permission}
                        placeholder={userDetails?.role.title ? userDetails.role.title : strings.permission}
                        container={{ marginBottom: wp(5) }}
                    />
                    {/* <MultipleSelectDropDown
                        disabled={!isEditable}
                        setIsVisible={setModalShow}
                        isVisible={modalShow}
                        // data={setAllMember}
                        title={strings.groupMember}
                        setSelectedMembers={(data: DataTypes[]) => {
                            // setSelectedMemberData(data)
                            setFieldValue('groupMember', data)

                            console.log('setfield value', { data, isMember })
                        }}
                        countTitle={strings.people}
                    /> */}
                </KeyboardAwareScrollView>
                {isEditable && <CustomBlackButton
                    title={strings.updateUser}
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
