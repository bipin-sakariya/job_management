import { Image, Text, TouchableOpacity, View, ScrollView, TextInput, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Container, CustomBlackButton, CustomDetailsComponent, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { DropdownProps } from '../../types/commanTypes';
import CustomDropdown from '../../components/CustomDropDown';
import { strings } from '../../languages/localizedStrings';
import FontSizes from '../../styles/FontSizes';
import { colors } from '../../styles/Colors';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { Formik, useFormik } from 'formik';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createUsers } from '../../redux/slices/AdminSlice/userListSlice';
import moment from 'moment';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

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

const UserGroupDetailScreen = () => {
    const navigation = useCustomNavigation('UserGroupDetailScreen');
    const route = useRoute<RootRouteProps<'UserGroupDetailScreen'>>();
    const { type } = route.params;

    const menuRef = useRef(null);
    const [role, setRole] = useState<DropdownProps>({ label: '', value: '' })
    const [permission, setPermission] = useState<DropdownProps>({ label: '', value: '' })
    const [selectForms, setSelectForms] = useState<DropdownProps>({ label: '', value: '' })
    const [visible, setVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [roleRequired, setRoleRequired] = useState(false)
    const [permissionRequired, setPermissionRequired] = useState(false)
    const [error, setError] = useState({
        phone: "",
        email: "",
        user_name: ""
    })
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(state => state.userList)
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
    const onPress = () => {
        console.log("Remove")
    }

    const optionData = [
        { title: strings.Remove, onPress: onPress, imageSource: ImagesPath.bin_icon },
        { title: strings.Edit, onPress: onPress, imageSource: ImagesPath.edit_icon }
    ]

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

    let createUserinitialValues = {
        userName: '',
        email: '',
        contactNo: '',
    }

    let createGroupinitialValues = {
        groupName: '',
        groupManager: '',
        inspector: '',
        groupMamber: '',
        forms: ''

    }

    const createUser = (values: any) => {
        console.log("🚀 ~ file: index.tsx ~ line 121 ~ createUser ~ values", values)
        if (!role.value) {
            setRoleRequired(true)
        } else if (!permission.value) {
            setPermissionRequired(true)
        } else {
            if (role.value && permission.value && values) {
                var data = new FormData()
                data.append("profile_image", imageUrl)
                data.append("user_name", values.userName)
                data.append("email", values.email)
                data.append("phone", `+972${values.contactNo}`)
                data.append("role", parseInt(role.value))
                data.append("date_joined", moment().format("DD-MM-YYYY"))
                console.log("🚀 ~ file: index.tsx ~ line 138 ~ createUser ~ data", data)
                dispatch(createUsers(data)).unwrap().then((res) => {
                    console.log({ res: res });
                    navigation.goBack()
                }).catch((e) => {
                    console.log({ error: e });
                    setError(e.data)
                })
            }
        }
    }

    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            initialValues: type == "users" ? createUserinitialValues : createGroupinitialValues,
            validationSchema: type == 'users' ? CreateUserValidationSchema : CreateGroupValidationSchema,
            onSubmit: values => {
                type == 'users' ? createUser(values) : Alert.alert("dsf")
            }
        })

    useEffect(() => {
        console.log('EMAIL==>', { email: values.email })
        setError({ ...error, email: "" })
    }, [values.email])

    useEffect(() => {
        console.log('EMAIL==>', { userName: values.userName })
        setError({ ...error, user_name: "" })
    }, [values.userName])

    useEffect(() => {
        console.log('EMAIL==>', { contactNo: values.contactNo })
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
                headerRightComponent={
                    type !== 'users' && <TouchableOpacity ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={styles.headerMenu} />
                    </TouchableOpacity>
                }
            />
            {isLoading && <CustomActivityIndicator size={"small"} />}
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <Formik
                        validationSchema={type == 'users' ? CreateUserValidationSchema : CreateGroupValidationSchema}
                        initialValues={type == "users" ? createUserinitialValues : createGroupinitialValues}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            type == 'users' ? createUser(values) : Alert.alert("dsf")
                        }}
                    >{({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <> */}
                    <CustomSubTitleWithImageComponent
                        disabled
                        title={type == 'users' ? strings.FillfromtocreateUser : strings.FillfromtoCreateGroup}
                        image={ImagesPath.from_list_icon}
                    />
                    <ImageBackground
                        source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                        style={styles.addPhotoStyle}
                        borderRadius={wp(2)}>
                        <TouchableOpacity
                            onPress={async () => {
                                let option: ImageLibraryOptions = {
                                    mediaType: 'photo'
                                }
                                const { assets } = await launchImageLibrary(option)
                                setImageUrl(assets && assets.length !== 0 ? assets[0]?.uri : '')
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

                    {(touched.userName && errors.userName) || error?.user_name && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.userName ? errors.userName : error?.email}</Text>}
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
                            {(touched.email && errors.email) || error?.email ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.email ? errors.email : error?.email}</Text> : null}
                            <CustomTextInput
                                title={strings.Contactno}
                                container={{ marginBottom: wp(5) }}
                                placeholder={strings.Enter_contect_no}
                                onChangeText={handleChange("contactNo")}
                                value={values.contactNo}
                            />
                            {(touched.contactNo && errors.contactNo) || error?.phone && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{error?.phone ? error.phone : errors.contactNo}</Text>}

                        </>
                    }
                    <DropDownComponent
                        title={type == 'users' ? strings.Role : strings.Group_Manager}
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => {
                            setRoleRequired(false)
                            setRole(item)
                        }}
                        value={role.value}
                        placeholder={strings.SelectRoleforUser}
                        container={{ marginBottom: wp(5) }}
                    />
                    {roleRequired && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.role_required}</Text>}
                    <DropDownComponent
                        title={type == 'users' ? strings.Permission : strings.Group_Inspector}
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => {
                            setPermissionRequired(false)
                            setPermission(item)
                        }}
                        value={permission.value}
                        placeholder={strings.GivePermission}
                        container={{ marginBottom: wp(5) }}
                    />
                    {permissionRequired && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Permission_required}</Text>}
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
                                                    <TouchableOpacity onPress={() => {
                                                        const tempuserdata = userData.filter((x, _index) => {
                                                            return _index !== index
                                                        })
                                                        setUserData(tempuserdata)
                                                    }} style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, borderRadius: wp(2) }]}>
                                                        <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14, color: colors.dark_blue1_color }]}>{item.name}</Text>
                                                        <Image source={ImagesPath.cross_icon} style={styles.commonIconStyle} />
                                                    </TouchableOpacity>
                                                )
                                            })}
                                            <TouchableOpacity onPress={() => {
                                                let userdata = userData
                                                userdata.push({
                                                    id: userData.length - 1,
                                                    name: `Stanley Lamb ${userData.length - 1}`
                                                })
                                                setUserData([...userdata])
                                            }} style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, }]}>
                                                <Image source={ImagesPath.plus_icon} style={styles.commonIconStyle} />
                                                <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14 }]}>{strings.AddUser}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                } />
                            <DropDownComponent
                                title={strings.GroupForms}
                                data={data}
                                image={ImagesPath.down_white_arrow}
                                labelField="label"
                                valueField="value"
                                onChange={(item) => setSelectForms(item)}
                                value={selectForms.value}
                                placeholder={strings.GivePermission}
                                container={{ marginBottom: wp(5) }}
                            />
                        </>
                    }
                    <CustomBlackButton
                        title={type == 'users' ? strings.CreateUser : strings.CreateGroup}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => {
                            if (type == 'users') {
                                handleSubmit()
                                if (!role.value) {
                                    setRoleRequired(true)
                                }
                                if (!permission.value) {
                                    setPermissionRequired(true)
                                }
                            }
                        }}
                    />
                    {/* </>
                    )}
                    </Formik> */}
                </ScrollView>
            </Container>
            {/* <CustomDropdown
                componentRef={menuRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
                modalStyle={{ right: 0 }}
            /> */}
        </View>
    )
}

export default UserGroupDetailScreen;

