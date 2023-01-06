import { Alert, Image, ImageBackground, Text, TouchableOpacity, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header, MultipleSelectDropDown } from '../../components';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createUser } from '../../redux/slices/AdminSlice/userListSlice';
import { colors } from '../../styles/Colors';
import { GroupData, groupList } from '../../redux/slices/AdminSlice/groupListSlice';
import DeviceInfo from 'react-native-device-info';

const roleSchema = yup.object().shape({
    title: yup.string().required(strings.roleRequired),
    id: yup.number().required(strings.roleRequired)
})

// const permissionSchema = yup.object().shape({
//     title: yup.string().required(strings.permissionRequired),
//     id: yup.number().required(strings.permissionRequired)
// })

const CreateUserValidationSchema = yup.object().shape({
    userName: yup.string().required(strings.usernameRequired),
    email: yup.string().email(strings.emailInvalid).required(strings.emailRequired),
    contactNo: yup.string().length(8, strings.contactNoInvalid).required(strings.contactNoRequired),
    role: roleSchema,
    // permission: permissionSchema
});

const CreateUserScreen = () => {
    const navigation = useCustomNavigation('CreateUserScreen');
    const dispatch = useAppDispatch();

    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [formListVisible, setFormListVisible] = useState(false);
    const [formsList, setFormList] = useState<GroupData[]>([])
    const [selectedFormsData, setSelectedFormsData] = useState([])
    const [error, setError] = useState({
        phone: "",
        email: "",
        user_name: "",
        role: {},
        // permission: {},
    })
    const [deviceId, setDeviceId] = useState('')
    const [finalArray, setFinalArray] = useState<number[]>([])

    const { isLoading, userDetails, userRoleList } = useAppSelector(state => state.userList);
    const { groupListData } = useAppSelector(state => state.groupList);
    const { token } = useAppSelector(state => state.userDetails)


    useEffect(() => {
        (async () => {
            const DeviceId = await DeviceInfo.getUniqueId();
            setDeviceId(DeviceId)
        })()
    }, [])
    console.log({ deviceId })

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                userName: '',
                email: '',
                contactNo: '',
                role: { title: '', id: 0 },
                // permission: { title: '', id: 0 },
            },
            validationSchema: CreateUserValidationSchema,
            onSubmit: values => {
                console.log({ values })
                userCreate(values)
            }
        })


    useEffect(() => {
        const findData: GroupData[] = groupListData.results.map((i) => {
            return {
                ...i,
                user_name: i.name,
                selected: false,
            }
        })
        setFormList(findData)
    }, [])
    useEffect(() => {
        let params = {
            search: ''
        }
        // setIsFooterLoading(true)
        dispatch(groupList(params)).unwrap().then((res) => {
            // setIsFooterLoading(false) setPage(page + 1)
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
        }).catch((error) => {
            console.log({ error });
        })
    }, [])

    useEffect(() => {
        let data: number[] = []
        selectedFormsData?.map((item) => {
            data.push(item.id)
        })
        setFinalArray(data)
    }, [selectedFormsData])

    const userCreate = (values: {
        userName: string;
        email: string;
        contactNo: string;
        role: {
            title: string;
            id: number;
        };
        permission: {
            title: string;
            id: number;
        };
    }) => {
        if (!imageUrl) {
            Alert.alert(strings.profile_pic_required)
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
            data.append("fcm_token", token?.access)
            data.append("device_id", deviceId)
            data.append("device_type", Platform.OS)
            data.append("user_name", values.userName)
            data.append("email", values.email)
            data.append("phone", `+972${values.contactNo}`)
            data.append("role", parseInt(values.role.id.toString()))
            finalArray.map((_form) => {
                data.append("permissions", _form)
            })

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
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.addUser}</Text>
                    </TouchableOpacity>
                }
            />
            {isLoading && <CustomActivityIndicator size={"small"} />}
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.fillFormToCreateUser}
                    image={ImagesPath.from_list_icon}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(20) }} keyboardShouldPersistTaps={'handled'}>
                    <TouchableOpacity
                        onPress={async () => {
                            let options: ImageLibraryOptions = {
                                mediaType: 'photo'
                            }
                            const result = await launchImageLibrary(options);
                            setImageUrl(result?.assets ? result?.assets[0].uri : '')
                        }}
                        activeOpacity={1}>
                        <ImageBackground
                            source={imageUrl ? { uri: imageUrl } : ImagesPath.image_for_user_icon}
                            style={styles.addPhotoStyle}
                            borderRadius={wp(2)}>
                            <View style={styles.camreaBtnStyle}>
                                <Image source={ImagesPath.camera_icon} style={styles.cameraIconStyle} />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <CustomTextInput
                        title={strings.userName}
                        placeholder={strings.enterUserame}
                        container={{ marginBottom: wp(5) }}
                        onChangeText={handleChange("userName")}
                        value={values.userName}
                    />
                    {(touched?.userName && errors?.userName) || error?.user_name ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.userName ? errors.userName : error?.email}</Text> : null}
                    <CustomTextInput
                        title={strings.email}
                        container={{ marginBottom: wp(5) }}
                        placeholder={strings.enterEmailAddress}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        keyboardType={'email-address'}
                    />
                    {(touched?.email && errors?.email) || error?.email ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.email ? errors?.email : error?.email}</Text> : null}
                    <CustomTextInput
                        title={strings.contactNo}
                        container={{ marginBottom: wp(5) }}
                        placeholder={strings.enterContactNo}
                        onChangeText={handleChange("contactNo")}
                        value={values.contactNo}
                        keyboardType={'number-pad'}
                    />
                    {(touched?.contactNo && errors?.contactNo) || error?.phone ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error?.phone ? error.phone : errors.contactNo}</Text> : null}
                    {userRoleList && <DropDownComponent
                        title={strings.role}
                        data={userRoleList}
                        image={ImagesPath.down_white_arrow}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => {
                            setFieldValue('role', item)
                        }}
                        value={values.role.id}
                        placeholder={strings.selectRoleForUser}
                        container={{ marginBottom: wp(5) }}
                    />}
                    {(touched?.role && errors.role) ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{strings.roleRequired}</Text> : null}
                    {/* {userRoleList && <DropDownComponent
                        title={strings.permission}
                        data={userRoleList}
                        image={ImagesPath.down_white_arrow}
                        labelField="title"
                        valueField="id"
                        onChange={(item) => {
                            setFieldValue('permission', item)
                        }}
                        value={values.permission.id}
                        placeholder={strings.givePermission}
                        container={{ marginBottom: wp(5) }}
                    />} */}
                    <MultipleSelectDropDown
                        setIsVisible={setFormListVisible}
                        isVisible={formListVisible}
                        data={formsList}
                        title={strings.forms}
                        setSelectedMembers={(data) => {
                            setSelectedFormsData(data)
                            setFieldValue('forms', data)
                        }}
                        container={{ marginTop: hp(2.5) }}
                        countTitle={strings.forms}
                    />
                    {/* {(touched?.permission && errors.permission) ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{strings.permissionRequired}</Text> : null} */}
                    <CustomBlackButton
                        title={strings.createUser}
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
