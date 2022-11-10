import { Alert, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { AssignedJobsComponent, Container, CustomBlackButton, CustomDetailsComponent, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import { strings } from '../../languages/localizedStrings'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { RootRouteProps } from '../../types/RootStackTypes'
import { styles } from './styles'
import CustomDropdown from '../../components/CustomDropDown'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { deleteUser, detailsOfUser, getListOfUsers, resetUserDetails, updateUser } from '../../redux/slices/AdminSlice/userListSlice'
import { useFormik } from 'formik'
import * as yup from "yup";
import { launchImageLibrary } from 'react-native-image-picker'
import CustomActivityIndicator from '../../components/CustomActivityIndicator'

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
interface userData {
    id: number,
    name: string
}

const UserGroupProfileScreen = () => {
    const navigation = useCustomNavigation('UserGroupProfileScreen');
    const route = useRoute<RootRouteProps<'UserGroupProfileScreen'>>();
    const { type, userId, isEdit } = route.params;
    const [visible, setVisible] = useState(false);
    const menuRef = useRef(null);
    const [isEditable, setIsEditable] = useState(isEdit ? isEdit : false)
    const [assignedJobs, setAssignedJobs] = useState([{}, {}, {}])
    const dispatch = useAppDispatch()
    const isFoucs = useIsFocused()
    const { userDetails, isLoading } = useAppSelector(state => state.userList)
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [error, setError] = useState({
        phone: "",
        email: "",
        user_name: ""
    })

    useEffect(() => {
        console.log({ userId });
        let params = {
            id: userId
        }
        userDetail(params)
        return () => {
            dispatch(resetUserDetails())
        }
    }, [navigation, isFoucs])


    const userDetail = (params: any) => {
        dispatch(detailsOfUser(params)).unwrap().then((res) => {
            console.log({ resss: res });
            setImageUrl(res.profile_image)
        }).catch((error) => {
            console.log({ error });
        })
    }

    let data_user = [
        {
            id: 1,
            name: 'Stanley Lamb 1'
        },
        {
            id: 2,
            name: 'Robert Kramer 2'
        },
        {
            id: 3,
            name: 'Tiffany Rivas 3'
        },
        {
            id: 4,
            name: 'Linda Mark 4'
        },
        {
            id: 5,
            name: 'Tiffany Rivas 5'
        },
        {
            id: 6,
            name: 'Tiffany Rivads fdsfsfs'
        },
    ]
    const [userData, setUserData] = useState<userData[]>(data_user)

    const deleteUserData = () => {
        let params = {
            id: userId
        }
        setVisible(false)
        dispatch(deleteUser(params)).unwrap().then((res) => {
            dispatch(getListOfUsers("")).unwrap().then((response) => { }).catch((error) => { })
            navigation.goBack()
        }).catch((error) => {
            Alert.alert("some thing went wrong")
        })
    }

    const CreateUserValidationSchema = yup.object().shape({
        userName: yup
            .string()
            .required(strings.Username_invalid),
        email: yup
            .string()
            .email(strings.email_invalid)
            .required(strings.email_invalid),
        contactNo: yup.string().min(8, strings.Contectno_invalid).required(strings.Contectno_invalid),
    });

    const CreateGroupValidationSchema = yup.object().shape({
        groupName: yup
            .string()
            .required(strings.Groupname_required),
        groupManager: yup
            .string()
            .required(strings.groupmanger_required),
        inspector: yup.string().trim().required(strings.Contectno_invalid),
        groupMamber: yup.string().trim().required(strings.groupMember_required),
        forms: yup.string().required(strings.forms_required)
    });

    const optionData = [
        { title: strings.Remove, onPress: () => deleteUserData(), imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

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
            console.log({ res: res });
            setIsEditable(false)
            userDetail(params)
        }).catch((e) => {
            console.log({ error: e });
            setError(e.data)
        })

    }

    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: type == "users" ? {
                userName: userDetails?.user_name ? userDetails.user_name : '',
                email: userDetails?.email ? userDetails.email : '',
                contactNo: userDetails?.phone ? userDetails.phone.split("+972")[1] : '',
            } : {
                groupName: '',
                groupManager: '',
                inspector: '',
                groupMamber: '',
                forms: ''

            },
            validationSchema: type == 'users' ? CreateUserValidationSchema : CreateGroupValidationSchema,
            onSubmit: values => {
                type == 'users' ? updateUserData(values) : Alert.alert("dsf")
            }
        })

    useEffect(() => {
        console.log('EMAIL==>', { email: values.email })
        setError({ ...error, email: "" })
    }, [values.email])

    useEffect(() => {
        console.log('userName==>', { userName: values.userName })
        setError({ ...error, user_name: "" })
    }, [values.userName])

    useEffect(() => {
        console.log('contactNo==>', { contactNo: values.contactNo })
        setError({ ...error, phone: "" })
    }, [values.contactNo])

    const renderItem = ({ item, index }: any) => {
        return (
            <AssignedJobsComponent item={item} />
        )
    }

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
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{type == "users" && userDetails?.user_name ? userDetails?.user_name : ""}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={styles.headerMenu} />
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
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
                        title={type == 'users' ? strings.UserName : strings.GroupName}
                        container={{ marginBottom: wp(5) }}
                        value={type == "users" ? values.userName : ""}
                        onChangeText={handleChange('userName')}
                    />
                    {(touched?.userName && errors?.userName) || error?.user_name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.userName ? errors.userName : error?.email}</Text> : null}
                    {
                        type == 'users' &&
                        <>
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
                        </>
                    }
                    <CustomTextInput
                        editable={false}
                        title={type == 'users' ? strings.Role : strings.Group_Manager}
                        container={{ marginBottom: wp(5) }}
                        value={type == 'users' ? userDetails?.role.title : ""}
                    />
                    <CustomTextInput
                        editable={false}
                        title={type == 'users' ? strings.Permission : strings.Group_Inspector}
                        container={{ marginBottom: wp(5) }}
                        value={type == 'users' ? userDetails?.role.title : ""}
                    />
                    {
                        type != 'users' &&
                        <>
                            <CustomDetailsComponent
                                title={strings.Groupmemeber}
                                detailsContainerStyle={{ marginBottom: wp(5) }}
                                bottomComponent={
                                    <View style={{ width: "100%", marginVertical: wp(1) }}>
                                        <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { fontSize: FontSizes.EXTRA_SMALL_12 }]}>{`Total ${userData.length} people`}</Text>
                                        <View style={[globalStyles.rowView, { flexWrap: "wrap", alignItems: "center" }]}>
                                            {userData.map((item, index) => {
                                                return (
                                                    <View style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, borderRadius: wp(2) }]}>
                                                        <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14, color: colors.dark_blue1_color }]}>{item.name}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                } />
                            <CustomDetailsComponent
                                title={strings.GroupForms}
                                detailsContainerStyle={{ marginBottom: wp(5) }}
                                bottomComponent={
                                    <View style={[globalStyles.rowView, { flexWrap: "wrap", alignItems: "center" }]}>
                                        {userData.map((item, index) => {
                                            return (
                                                <View style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, borderRadius: wp(2) }]}>
                                                    <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14, color: colors.dark_blue1_color }]}>{item.name}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                } />
                            <CustomDetailsComponent
                                title={strings.Assignedjobs}
                                detailsContainerStyle={{ marginBottom: wp(5) }}
                                bottomComponent={
                                    <>
                                        <FlatList
                                            data={assignedJobs.slice(0, 2)}
                                            renderItem={renderItem}
                                            style={{ paddingVertical: wp(2) }}
                                            ItemSeparatorComponent={() => {
                                                return (
                                                    <View style={{ height: wp(2), backgroundColor: colors.white_5 }} />
                                                )
                                            }}
                                        />
                                        {
                                            assignedJobs.length > 2 &&
                                            <TouchableOpacity style={[globalStyles.rowView, styles.viewAllJobs]}>
                                                <Text style={styles.viewAllJobsTxt}>{strings.ViewallJobs}</Text>
                                                <Image source={ImagesPath.arrow_right_black_border_icon} style={[styles.iconStyle, { transform: [{ rotate: '180deg' }] }]} />
                                            </TouchableOpacity>
                                        }
                                    </>
                                } />
                        </>
                    }
                    {
                        isEditable &&
                        <CustomBlackButton
                            title={type == 'users' && userId && isEditable ? strings.Update_user : strings.CreateGroup}
                            image={ImagesPath.plus_white_circle_icon}
                            onPress={() => {
                                if (type == 'users') {
                                    handleSubmit()
                                }
                            }}
                        />
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
        </View >
    )
}

export default UserGroupProfileScreen