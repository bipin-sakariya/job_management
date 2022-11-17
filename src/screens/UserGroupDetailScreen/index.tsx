import { Image, Text, TouchableOpacity, View, ImageBackground, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Container, CustomBlackButton, CustomDetailsComponent, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header, MultileSelectDropDown } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { DropdownProps } from '../../types/commanTypes';
import { strings } from '../../languages/localizedStrings';
import FontSizes from '../../styles/FontSizes';
import { colors } from '../../styles/Colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createUser } from '../../redux/slices/AdminSlice/userListSlice';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface userData {
    id: number,
    name: string
}

const UserGroupDetailScreen = () => {
    const navigation = useCustomNavigation('UserGroupDetailScreen');
    const route = useRoute<RootRouteProps<'UserGroupDetailScreen'>>();
    const { type } = route.params;
    const menuRef = useRef(null);
    const dispatch = useAppDispatch()

    const [role, setRole] = useState<DropdownProps>({ title: '', id: 0 })
    const [permission, setPermission] = useState<DropdownProps>({ title: '', id: 0 })
    const [selectForms, setSelectForms] = useState<DropdownProps>({ title: '', id: 0 })
    const [visible, setVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [roleRequired, setRoleRequired] = useState(false)
    const [permissionRequired, setPermissionRequired] = useState(false)
    const [error, setError] = useState({
        phone: "",
        email: "",
        user_name: ""
    })

    const { isLoading, userDetails, userRoleList } = useAppSelector(state => state.userList);

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

    const userCreate = (values: any) => {
        if (!role.id) {
            setRoleRequired(true)
        } else if (!permission.id) {
            setPermissionRequired(true)
        } else if (!imageUrl) {
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
            data.append("role", parseInt(role.id.toString()))
            // let params = {
            //     data: JSON.stringify(data),
            // }
            dispatch(createUser(data)).unwrap().then((res) => {
                console.log({ res: res });
                navigation.goBack()
            }).catch((e) => {
                console.log({ error: e });
                setError(e.data)
            })
        }
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
                type == 'users' ? userCreate(values) : Alert.alert("group create")
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

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(50) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{type == 'users' ? strings.AddUser : strings.AddGroup}</Text>
                    </TouchableOpacity>
                }
            // headerRightComponent={
            //     type !== 'users' && (<TouchableOpacity ref={menuRef} onPress={() => setVisible(true)}>
            //         <Image source={ImagesPath.menu_dots_icon} style={styles.headerMenu} />
            //     </TouchableOpacity>)
            // }
            />
            {isLoading && <CustomActivityIndicator size={"small"} />}
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    title={type == 'users' ? strings.FillfromtocreateUser : strings.FillfromtoCreateGroup}
                    image={ImagesPath.from_list_icon}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground
                        source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                        style={styles.addPhotoStyle}
                        borderRadius={wp(2)}>
                        <TouchableOpacity
                            onPress={async () => {
                                // let option: ImageLibraryOptions = {
                                //     mediaType: 'photo'
                                // }
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
                                // // const { assets } = await launchImageLibrary(option)
                                // console.log("🚀 ~ file: index.tsx ~ line 256 ~ onPress={ ~ assets", assets)

                                const result: any = await launchImageLibrary(options);
                                setImageUrl(result ? result?.assets[0].uri : '')
                            }}

                            activeOpacity={1}
                            style={styles.camreaBtnStyle}>
                            <Image source={ImagesPath.camera_icon} style={styles.cameraIconStyle} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <CustomTextInput
                        title={type == 'users' ? strings.UserName : strings.GroupName}
                        placeholder={type == 'users' ? strings.Enter_user_name : strings.Enter_group_name}
                        container={{ marginBottom: wp(5) }}
                        onChangeText={type == "users" ? handleChange("userName") : handleChange("groupName")}
                        value={type == "users" ? values.userName : values.groupName}
                    />
                    {(touched?.userName && errors?.userName) || error?.user_name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.userName ? errors.userName : error?.email}</Text> : null}
                    {
                        type == 'users' &&
                        <>
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

                        </>
                    }
                    {userRoleList && <DropDownComponent
                        title={type == 'users' ? strings.Role : strings.Group_Manager}
                        data={userRoleList}
                        image={ImagesPath.down_white_arrow}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => {
                            setRoleRequired(false)
                            setRole(item)
                        }}
                        value={role.id}
                        placeholder={strings.SelectRoleforUser}
                        container={{ marginBottom: wp(5) }}
                    />}
                    {roleRequired ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.role_required}</Text> : null}
                    {userRoleList && <DropDownComponent
                        title={type == 'users' ? strings.Permission : strings.Group_Inspector}
                        data={userRoleList}
                        image={ImagesPath.down_white_arrow}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => {
                            console.log({ item })
                            setPermissionRequired(false)
                            setPermission(item)
                        }}
                        value={permission.id}
                        placeholder={strings.GivePermission}
                        container={{ marginBottom: wp(5) }}
                    />}
                    {permissionRequired ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Permission_required}</Text> : null}
                    {
                        <>
                            <MultileSelectDropDown
                                setIsVisible={setVisible}
                                isVisible={visible}
                                data={[{ name: 'abc', selected: false }, { name: 'def', selected: false }, { name: 'ghi', selected: false }]}
                                title={strings.Groupmemeber}
                            />
                            {userRoleList && <DropDownComponent
                                title={strings.GroupForms}
                                data={userRoleList}
                                image={ImagesPath.down_white_arrow}
                                labelField="title"
                                valueField="id"
                                onChange={(item) => setSelectForms(item)}
                                value={selectForms.id}
                                placeholder={strings.GivePermission}
                                container={{ marginTop: wp(5) }}
                            />}</>


                        // type != 'users' &&
                        // <>
                        //     <CustomDetailsComponent
                        //         title={strings.Groupmemeber}
                        //         detailsContainerStyle={{ marginBottom: wp(5) }}
                        //         bottomComponent={
                        //             <View style={{ width: "100%", marginVertical: wp(1) }}>
                        //                 <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { fontSize: FontSizes.EXTRA_SMALL_12 }]}>{`Total ${userData.length} people`}</Text>
                        //                 <View style={[globalStyles.rowView, { flexWrap: "wrap", alignItems: "center" }]}>
                        //                     {userData.map((item, index) => {
                        //                         return (
                        //                             <TouchableOpacity onPress={() => {
                        //                                 const tempuserdata = userData.filter((x, _index) => {
                        //                                     return _index !== index
                        //                                 })
                        //                                 setUserData(tempuserdata)
                        //                             }} style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, borderRadius: wp(2) }]}>
                        //                                 <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14, color: colors.dark_blue1_color }]}>{item.name}</Text>
                        //                                 <Image source={ImagesPath.cross_icon} style={styles.commonIconStyle} />
                        //                             </TouchableOpacity>
                        //                         )
                        //                     })}
                        //                     <TouchableOpacity onPress={() => {
                        //                         let userdata = userData
                        //                         userdata.push({
                        //                             id: userData.length - 1,
                        //                             name: `Stanley Lamb ${userData.length - 1}`
                        //                         })
                        //                         setUserData([...userdata])
                        //                     }} style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, }]}>
                        //                         <Image source={ImagesPath.plus_icon} style={styles.commonIconStyle} />
                        //                         <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14 }]}>{strings.AddUser}</Text>
                        //                     </TouchableOpacity>
                        //                 </View>
                        //             </View>
                        //         } />
                        //     {userRoleList && <DropDownComponent
                        //         title={strings.GroupForms}
                        //         data={userRoleList}
                        //         image={ImagesPath.down_white_arrow}
                        //         labelField="title"
                        //         valueField="id"
                        //         onChange={(item) => setSelectForms(item)}
                        //         value={selectForms.id}
                        //         placeholder={strings.GivePermission}
                        //     // container={{ marginBottom: wp(5) }}
                        //     />}
                        // </>
                    }
                    <CustomBlackButton
                        title={type == 'users' ? strings.CreateUser : strings.CreateGroup}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => {
                            if (type == 'users') {
                                if (!role.id) {
                                    setRoleRequired(true)
                                }
                                if (!permission.id) {
                                    setPermissionRequired(true)
                                }
                                handleSubmit()
                            }
                        }}
                    />
                </KeyboardAwareScrollView>
            </Container>
        </View>
    )
}

export default UserGroupDetailScreen;

