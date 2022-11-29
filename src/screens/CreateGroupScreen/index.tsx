import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header, MultileSelectDropDown } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useIsFocused } from '@react-navigation/native';
import { getListOfUsers } from '../../redux/slices/AdminSlice/userListSlice';

const CreateGroupValidationSchema = Yup.object().shape({
    groupName: Yup.string().required(strings.Groupname_required),
    groupManager: Yup.string().required(strings.groupmanger_required),
    inspector: Yup.string().trim().required(strings.Contectno_invalid),
    groupMamber: Yup.string().trim().required(strings.groupMember_required),
    forms: Yup.string().required(strings.forms_required)
});

const data_user = [
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

const CreateGroupScreen = () => {
    const navigation = useCustomNavigation('CreateGroupScreen');
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { isLoading, userListData, userInsepectorList, userGroupManagerList } = useAppSelector(state => state.userList);

    const isFoucs = useIsFocused();
    console.log({ userListData })
    useEffect(() => {
        if (isFoucs) {
            dispatch(getListOfUsers("")).unwrap().then((res) => {
                console.log("🚀 ~ file: index.tsx ~ line 41 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log("🚀 ~ file: index.tsx ~ line 38 ~ dispatch ~ error", error)
            })
        }
    }, [isFoucs])

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                groupName: '',
                groupManager: {
                    id: 0,
                    user_name: '',
                    profile_image: '',
                    email: '',
                    phone: '',
                    date_joined: '',
                    role: '',
                    is_active: false
                },
                inspector: {
                    id: 0,
                    user_name: '',
                    profile_image: '',
                    email: '',
                    phone: '',
                    date_joined: '',
                    role: '',
                    is_active: false
                },
                groupMamber: '',
                forms: { name: '', id: '' },

            },
            validationSchema: CreateGroupValidationSchema,
            onSubmit: values => {
                Alert.alert("group create")
            }
        })

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(50) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.AddGroup}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.FillfromtoCreateGroup}
                    image={ImagesPath.from_list_icon}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        onPress={async () => {
                            let option: ImageLibraryOptions = {
                                mediaType: 'photo'
                            }
                            const result: any = await launchImageLibrary(option);
                            setImageUrl(result ? result?.assets[0].uri : '')
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
                        title={strings.GroupName}
                        placeholder={strings.Enter_group_name}
                        container={{ marginBottom: wp(5) }}
                        onChangeText={handleChange("groupName")}
                        value={values.groupName}
                    />
                    {(touched?.groupName) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.groupName}</Text>}
                    <DropDownComponent
                        title={strings.Group_Manager}
                        data={userGroupManagerList}
                        image={ImagesPath.down_white_arrow}
                        labelField="user_name"
                        valueField="id"
                        onChange={(item) => setFieldValue('groupManager', item)}
                        value={values.groupManager.id}
                        placeholder={strings.SelectRoleforUser}
                        container={{ marginBottom: wp(5) }}
                    />
                    {(touched?.groupManager) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.role_required}</Text>}
                    <DropDownComponent
                        title={strings.Group_Inspector}
                        data={userInsepectorList}
                        image={ImagesPath.down_white_arrow}
                        labelField="user_name"
                        valueField="id"
                        onChange={(item) => setFieldValue('inspector', item)}
                        value={values.inspector.id}
                        placeholder={strings.GivePermission}
                        container={{ marginBottom: wp(5) }}
                    />
                    {(touched?.inspector) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Permission_required}</Text>}
                    <MultileSelectDropDown
                        setIsVisible={setVisible}
                        isVisible={visible}
                        data={[{ name: 'abc', selected: false }, { name: 'def', selected: false }, { name: 'ghi', selected: false }]}
                        title={strings.Groupmemeber}
                    />
                    <DropDownComponent
                        title={strings.GroupForms}
                        data={data_user}
                        image={ImagesPath.down_white_arrow}
                        labelField="name"
                        valueField="id"
                        onChange={(item) => setFieldValue('forms', item)}
                        value={values.forms.id}
                        placeholder={strings.GivePermission}
                        container={{ marginTop: wp(5) }}
                    />
                    <CustomBlackButton
                        title={strings.CreateGroup}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => {

                        }}
                    />
                </KeyboardAwareScrollView>
            </Container>
        </View>
    )
}

export default CreateGroupScreen
