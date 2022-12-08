import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header, MultileSelectDropDown } from '../../components';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
import { getListOfUsers, inspectorListProps, roleList, UserData } from '../../redux/slices/AdminSlice/userListSlice';
import { FormData, formList } from '../../redux/slices/AdminSlice/formListSlice';
import { createGroup } from '../../redux/slices/AdminSlice/groupListSlice';
import { billData } from '../../redux/slices/AdminSlice/billListSlice';

interface DataTypes {
    user_name?: string
    selected?: boolean
    date_joined?: string
    email?: string
    id: number
    is_active?: boolean
    phone?: string
    profile_image?: string,
    role?: { id: number, title?: string },
}
interface FormDataProps {
    id: number,
    bill: billData[],
    created_at: string,
    updated_at: string,
    user_name: string,
    is_sign?: boolean,
    selected: boolean
}

const CreateGroupValidationSchema = Yup.object().shape({
    groupName: Yup.string().required(strings.Groupname_required),
    groupManager: Yup.object().shape({
        id: Yup.number().required(strings.groupmanger_required)
    }),
    inspector: Yup.object().shape({
        id: Yup.number().required(strings.inspector_required)
    }),
    member: Yup.array().required(strings.groupMember_required),
    forms: Yup.array().required(strings.forms_required)
});

const CreateGroupScreen = () => {
    const navigation = useCustomNavigation('CreateGroupScreen');
    const dispatch = useAppDispatch();
    const isFoucs = useIsFocused();

    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [visible, setVisible] = useState(false);
    const [formListVisible, setFormListVisible] = useState(false);
    const [isInspector, setIsInspector] = useState<UserData[]>([])
    const [isManager, setIsManager] = useState<UserData[]>([])
    const [isUser, setIsUser] = useState<UserData[]>([])
    const [page, setPage] = useState(1)
    const [finalArray, setFinalArray] = useState<number[]>([])
    const [finalFormsArray, setFinalFormsArray] = useState<number[]>([])
    const [error, setError] = useState({
        groupName: '',
        image: '',
        groupManager: {
            id: null
        },
        inspector: {
            id: null
        },
    })
    const [selectedMemberData, setSelectedMemberData] = useState<DataTypes[]>([])
    const [formsList, setFormList] = useState<FormDataProps[]>([])
    const [memberList, setMemberList] = useState<DataTypes[]>([])
    const [allForm, setAllForm] = useState<FormData[]>([])
    const [selectedFormsList, setSelectedFormList] = useState<FormDataProps[]>([])
    const [selectedFormsData, setSelectedFormsData] = useState<DataTypes[]>()


    const { isLoading, userListData, } = useAppSelector(state => state.userList);
    const { formListData, formDetails } = useAppSelector(state => state.formList);
    const { groupDetails } = useAppSelector(state => state.groupList);

    useEffect(() => {
        if (isFoucs) {
            dispatch(getListOfUsers("")).unwrap().then((res) => {
                console.log("🚀 ~ file: index.tsx ~ line 41 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log("🚀 ~ file: index.tsx ~ line 38 ~ dispatch ~ error", error)
            })

            let params = {
                role: strings.Inspector
            }
            dispatch(roleList(params)).unwrap().then((res: inspectorListProps) => {
                console.log({ res111: res });
                setIsInspector(res.results)
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 21 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 20 ~ dispatch ~ error", error)
            })
            let param = {
                role: strings.Group_Manager
            }
            dispatch(roleList(param)).unwrap().then((res: inspectorListProps) => {
                console.log({ res });
                setIsManager(res.results)
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 21 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 20 ~ dispatch ~ error", error)
            })
            let role = {
                role: ''
            }
            dispatch(roleList(role)).unwrap().then((res) => {
                console.log({ res });
                setIsUser(res.results)
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 21 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 20 ~ dispatch ~ error", error)
            })
        }
        let params = {
            page: page,
            search: ''
        }
        dispatch(formList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setAllForm(res.results)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })

    }, [isFoucs])



    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                groupName: '',
                image: '',
                groupManager: {
                    id: 0
                },
                inspector: {
                    id: 0
                },
                member: [],
                forms: []
            },
            validationSchema: CreateGroupValidationSchema,
            onSubmit: (values: {
                groupName: string,
                image: string,
                groupManager: {
                    id: number
                },
                inspector: {
                    id: number
                },
                member: [],
                forms: []
            }) => {
                console.log({ values, touched, error })
                groupCreate(values)
                // alert('hjgjhgjguighjh')
            }
        })
    useEffect(() => {
        let data: number[] = []
        selectedMemberData?.map((item) => {
            data.push(item.id)
        })
        setFinalArray(data)
    }, [selectedMemberData])

    useEffect(() => {
        let data: number[] = []
        selectedFormsData?.map((item) => {
            data.push(item.id)
        })
        setFinalFormsArray(data)
    }, [selectedFormsData])

    console.log({ finalArray, finalFormsArray });


    const groupCreate = (values: {
        groupName: string;
        image: string,
        groupManager: {
            id: number;
        };
        inspector: {
            id: number;
        };
        member: number[],
        forms: number[]
    }) => {
        if (!imageUrl) {
            Alert.alert('Alert', 'Please select your profile picture.')
        } else {
            let data = new FormData()
            let images = {
                uri: imageUrl,
                name: "photo.jpg",
                type: "image/jpeg"
            }
            console.log({ images })
            if (imageUrl) {
                data.append("image", images ? images : '')
            }
            data.append("name", values.groupName)
            data.append("manager", values.groupManager.id)
            data.append("inspector", values.inspector.id)
            finalArray.map((_member) => {
                // data.append()
                data.append("member", _member)
            })
            finalFormsArray.map((_form) => {
                data.append("form", _form)
            })
            // data.append("form", values.forms.id)
            dispatch(createGroup(data)).unwrap().then((res) => {
                console.log({ res: res });
                navigation.goBack()
            }).catch((e) => {
                console.log({ error: e });
                setError(e.data)
            })
        }
    }

    console.log({ imageUrl });


    useEffect(() => {
        const findData: FormDataProps[] = formListData.results.map((i) => {
            return {
                ...i,
                user_name: i.name,
                selected: false,
            }
        })
        setFormList(findData)
        const finaldata: DataTypes[] = userListData.map((i) => {
            return {
                ...i,
                selected: false,
            }
        })
        setMemberList(finaldata)

        if (formDetails.bill) {
            const finalData: FormDataProps[] = formDetails?.bill?.map((i: any) => {
                return {
                    ...i,
                    user_name: i.name,
                    selected: true,

                }
            })
            console.log({ finalData })
            setSelectedFormList(finalData)
        }
    }, [formListData])


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
                    <>
                        <TouchableOpacity
                            onPress={async () => {
                                let option: ImageLibraryOptions = {
                                    mediaType: 'photo'
                                }
                                const result: any = await launchImageLibrary(option);
                                setImageUrl(result ? result?.assets[0].uri : '')
                                setFieldValue('image', result ? result?.assets[0].uri : '')
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
                        {console.log({ values })}
                        {(touched.groupName && errors?.groupName) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.groupName}</Text>}
                        <DropDownComponent
                            title={strings.Group_Manager}
                            data={isManager}
                            image={ImagesPath.down_white_arrow}
                            labelField="user_name"
                            valueField="id"
                            onChange={(item) => setFieldValue('groupManager', item)}
                            value={values.groupManager.id}
                            placeholder={strings.SelectRoleforUser}
                            container={{ marginBottom: wp(5) }}
                        />
                        {(touched?.groupManager && errors.groupManager) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.role_required}</Text>}
                        <DropDownComponent
                            title={strings.Inspector}
                            data={isInspector}
                            image={ImagesPath.down_white_arrow}
                            labelField="user_name"
                            valueField="id"
                            onChange={(item) => setFieldValue('inspector', item)}
                            value={values.inspector.id}
                            placeholder={strings.GivePermission}
                            container={{ marginBottom: wp(5) }}

                        />
                        {(touched?.inspector && errors.inspector) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Permission_required}</Text>}
                        <MultileSelectDropDown
                            setIsVisible={setVisible}
                            isVisible={visible}
                            data={memberList}
                            title={strings.Groupmemeber}
                            setSelectedMembers={(data: DataTypes[]) => {
                                console.log({ data });
                                setSelectedMemberData(data)
                                setFieldValue('member', data)
                            }}
                            countTitle={strings.people}
                        />

                        {/* form list  */}
                        <MultileSelectDropDown
                            setIsVisible={setFormListVisible}
                            isVisible={formListVisible}
                            data={formsList}
                            title={strings.Forms}
                            setSelectedMembers={(data: DataTypes[]) => {
                                setSelectedFormsData(data)
                                setFieldValue('forms', data)
                            }}
                            container={{ marginTop: hp(2.5) }}
                            countTitle={strings.Forms}
                        />
                        {/* <DropDownComponent
                        title={strings.GroupForms}
                        data={formListData.results}
                        image={ImagesPath.down_white_arrow}
                        labelField="name"
                        valueField="id"
                        onChange={(item) => setFieldValue('forms', item)}
                        value={values.forms.id}
                        placeholder={strings.GivePermission}
                        container={{ marginTop: wp(5) }}
                    /> */}
                        <CustomBlackButton
                            title={strings.CreateGroup}
                            image={ImagesPath.plus_white_circle_icon}
                            onPress={handleSubmit}
                        />
                    </>
                </KeyboardAwareScrollView>
            </Container>
        </View>
    )
}

export default CreateGroupScreen
