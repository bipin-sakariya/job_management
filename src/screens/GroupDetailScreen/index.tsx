import { Alert, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { AssignedJobsComponent, Container, CustomBlackButton, CustomDetailsComponent, CustomDropdown, CustomTextInput, DropDownComponent, Header, MultipleSelectDropDown } from '../../components';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { strings } from '../../languages/localizedStrings';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { colors } from '../../styles/Colors';
import FontSizes from '../../styles/FontSizes';
import { groupDelete, groupDetail, groupUpdate, MemberDetailsProps } from '../../redux/slices/AdminSlice/groupListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RootRouteProps } from '../../types/RootStackTypes';
import { roleList } from '../../redux/slices/AdminSlice/userListSlice';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { billData } from '../../redux/slices/AdminSlice/billListSlice';
import { AssignJobTypeProps } from '../../components/AssignedJobsComponent';

interface DataTypes {
    user_name?: string
    date_joined?: string
    email?: string
    id: number
    is_active?: boolean
    phone?: string
    profile_image?: string,
    role?: { id: number, title?: string }
    selected?: boolean,
    bill?: billData[],
    created_at?: string,
    updated_at?: string
}
interface GroupValue {
    id: number
    image: string
    groupName: string
    groupManager: { id: number, name?: string },
    inspector: { id: number, name?: string },
    groupMember: number[],
    forms: number[] | [{}]
    selected?: boolean
}


const CreateGroupValidationSchema = Yup.object().shape({
    groupName: Yup.string().required(strings.Groupname_required),
    groupManager: Yup.object().shape({
        id: Yup.number().required(strings.groupmanger_required)
    }),
    inspector: Yup.object().shape({
        id: Yup.number().required(strings.inspector_required)
    }),
    groupMember: Yup.array().required(strings.groupMember_required),
    forms: Yup.array().required(strings.forms_required)
});

const GroupDetailScreen = () => {
    const navigation = useCustomNavigation('GroupDetailScreen');
    const menuRef = useRef(null);
    const dispatch = useAppDispatch()
    const route = useRoute<RootRouteProps<'GroupDetailScreen'>>()
    const isFocused = useIsFocused()

    const [isInspector, setIsInspector] = useState<DataTypes[]>([])
    const [isManager, setIsManager] = useState<DataTypes[]>([])
    const [isUser, setIsUser] = useState<DataTypes[]>([])
    const [isMember, setIsMember] = useState<DataTypes[]>([])
    const [list, isList] = useState<DataTypes[]>([])
    const [formsList, setFormList] = useState<DataTypes[]>([])
    const [selectedFormsList, setSelectedFormList] = useState<DataTypes[]>([])
    const [assignedJobs, setAssignedJobs] = useState([{}, {}, {}])
    const [isEditable, setIsEditable] = useState(route?.params?.isEdit == true ? true : false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [visible, setVisible] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectedMemberData, setSelectedMemberData] = useState<DataTypes[]>([])
    const [selectedFormsData, setSelectedFormsData] = useState<DataTypes[]>()
    const [formListVisible, setFormListVisible] = useState(false);
    const [isId, setIsId] = useState<number>()

    const [setAllMember, isSetAllMember] = useState<DataTypes[]>([])
    const [setAllForm, isSetAllForm] = useState<DataTypes[]>([])

    const { formListData } = useAppSelector(state => state.formList);
    const { groupDetails, isLoading } = useAppSelector(state => state.groupList)
    const [finalArray, setFinalArray] = useState<number[]>([])
    const [finalFormsArray, setFinalFormsArray] = useState<number[]>([])

    useEffect(() => {
        if (isFocused) {
            dispatch(groupDetail(route.params.params.id)).unwrap().then((res) => {
                console.log({ res });
                setImageUrl(res.image)
            }).catch((error) => {
                console.log({ error });
            })
            let params = {
                role: strings.Inspector
            }
            dispatch(roleList(params)).unwrap().then((res) => {
                console.log({ res });
                setIsInspector(res.results)
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 21 ~ dispatch ~ res", res)
            }).catch((error) => {
                console.log("🚀 ~ file: DrawerStack.tsx ~ line 20 ~ dispatch ~ error", error)
            })
            let param = {
                role: strings.Group_Manager
            }
            dispatch(roleList(param)).unwrap().then((res) => {
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
    }, [isFocused])

    useEffect(() => {
        const findData = isUser.map((i: DataTypes) => {
            return {
                ...i,
                selected: false
            }
        })
        isList(findData)

        if (groupDetails.member_details) {
            const finalData: DataTypes[] = groupDetails.member_details.map((i) => {
                return {
                    ...i,
                    role: { id: i.role },
                    selected: true
                }
            })
            console.log({ finalData })
            setIsMember(finalData)

        }

    }, [isUser])

    useEffect(() => {
        const results: DataTypes[] = isUser.map((i) => {
            console.log("🚀 ~ file: index.tsx:212 ~ constresults:MemberValues[]=isUser.map ~ i", i)
            return {
                ...i,
                selected: !!(groupDetails.member_details?.find((e) => e.id == i.id))
            }
        })
        isSetAllMember(results)

        const formResult = formListData.results.map((i) => {
            return {
                ...i,
                user_name: i.name,
                selected: !!(groupDetails.form_details.find(e => e.id == i.id))
            }
        })
        isSetAllForm(formResult)

    }, [groupDetails.member_details, isUser, formListData.results])

    const deleteGroupData = (id: number) => {

        const deleteGroupData = (id: number) => {
            dispatch(groupDelete(id)).unwrap().then(() => {
            })
        }
    }
    const optionData = [
        {
            title: strings.remove, onPress: () => {
                deleteGroupData(route.params.params.id)
                navigation.goBack()
            }, imageSource: ImagesPath.bin_icon
        },
        {
            title: strings.edit, onPress: () => {
                setIsEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]



    // const [countingValue, setCountingValue] = useState<DropdownProps>({
    //     label: groupDetails.inspector_details?.user_name ?? '',
    //     value: groupDetails.inspector_details?.user_name ?? ''
    // })
    // useEffect(() => {
    //     if (groupDetails.inspector_details) {
    //         setCountingValue({
    //             label: groupDetails.inspector_details?.user_name ? groupDetails.inspector_details?.user_name : '',
    //             value: groupDetails.inspector_details?.user_name ? groupDetails.inspector_details?.user_name : ''
    //         })
    //     }
    // }, [groupDetails.inspector_details])

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                id: 0,
                image: '',
                groupName: groupDetails.name ? groupDetails.name : '',
                groupManager: {
                    id: !isEditable ? groupDetails.manager : groupDetails.manager_details.id,
                    name: groupDetails.manager_details?.user_name ? groupDetails.manager_details?.user_name : '',
                },
                inspector: {
                    id: !isEditable ? groupDetails.inspector : groupDetails.inspector,
                    name: groupDetails.inspector_details?.user_name ? groupDetails.inspector_details?.user_name : '',
                },
                groupMember: !isEditable ? groupDetails.member : finalArray,
                forms: !isEditable ? groupDetails.form_details : finalFormsArray,
            },
            validationSchema: CreateGroupValidationSchema,
            onSubmit: (values: GroupValue) => {
                console.log({ values })
                updateGroup(values)
            }
        })

    useEffect(() => {
        let data: number[] = []
        // if (groupDetails.member_details) {
        //     groupDetails.member_details?.map((item) => {
        //         data.push(item.id)
        //     })
        // }
        selectedMemberData?.map((item) => {
            data.push(item.id)
        })
        setFinalArray(data)
        setIsId(route.params.params.id)
    }, [groupDetails.member_details, selectedMemberData])

    useEffect(() => {
        let data: number[] = []
        selectedFormsData?.map((item) => {
            data.push(item.id)
        })
        setFinalFormsArray(data)
    }, [selectedFormsData])

    // console.log('route========', { route: route.params.id })
    // const createForm = (values: any) => {
    //     let params = {
    //         id: route.params.id,
    //         name: values.groupName,
    //         groupManager: values.groupManager.id,
    //         inspector: values.inspector.id,
    //         groupMember: finalArray,
    //         forms: groupDetails?.form_details
    //     }
    //     console.log({ params })
    //     dispatch(groupUpdate(params)).unwrap().then((res) => {

    //         navigation.goBack()
    //         // navigation.navigate('FormScreen')
    //     }).catch((e) => {
    //         console.log({ error: e });

    //     })
    // }

    const updateGroup = (values: {
        id: number
        groupName: string;
        image: string,
        groupManager: {
            id: number;
        };
        inspector: {
            id: number;
        };
        groupMember: number[]
        forms: number[] | [{}]
    }

    ) => {
        if (!imageUrl) {
            Alert.alert(strings.profile_pic_required)
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
                data.append("member", _member)
            })
            finalFormsArray.map((_form) => {
                data.append("form", _form)
            })

            let params = {
                data: data,
                id: isId
            }
            dispatch(groupUpdate(params)).unwrap().then((res) => {
                console.log({ res: res });
                navigation.goBack()
            }).catch((e) => {
                console.log({ error: e });
                // setError(e.data)
            })
        }
    }
    console.log('=============', { id: values.groupManager.id, })
    console.log('=============', { id: values.inspector.id, })
    const renderItem = ({ item, index }: { item: AssignJobTypeProps, index: number }) => {
        console.log('assignjob', { item })
        return (
            <AssignedJobsComponent item={item} index={index} />
        )
    }

    return (
        <View style={globalStyles.container}>
            {/* {console.log("FORMIK ------", { error: errors, values: values })}
            {console.log('ujghuygtuigh', { selectedMemberData, selectedFormsData })} */}
            <Header
                headerLeftStyle={{
                    paddingHorizontal: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(60) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{groupDetails.name}</Text>
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
                        title={strings.GroupName}
                        container={{ marginBottom: wp(5) }}
                        value={values.groupName}
                        onChangeText={handleChange('groupName')}
                    />
                    {(touched?.groupName && errors?.groupName) ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.groupName ? errors.groupName : ''}</Text> : null}
                    <DropDownComponent
                        disable={!isEditable}
                        title={strings.Group_Manager}
                        data={!isEditable ? [groupDetails?.manager_details] : isManager}
                        image={!isEditable ? '' : ImagesPath.down_white_arrow}
                        labelField={"user_name"}
                        valueField="id"
                        onChange={(item) => setFieldValue('groupManager', item)}
                        value={groupDetails.manager_details?.id ? groupDetails.manager_details?.id : values.groupManager.id}
                        placeholder={groupDetails.manager_details?.user_name ? groupDetails.manager_details?.user_name : strings.SelectRoleforUser}
                        container={{ marginBottom: wp(5) }}
                    />
                    {/* {console.log({ countingValue })} */}
                    {(touched?.groupManager && errors.groupMember) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{strings.role_required}</Text>}
                    <DropDownComponent
                        disable={!isEditable}
                        title={strings.Inspector}
                        data={!isEditable ? [groupDetails?.inspector_details] : isInspector}
                        image={!isEditable ? '' : ImagesPath.down_white_arrow}
                        labelField="user_name"
                        valueField="id"
                        onChange={(item) => setFieldValue('inspector', item)}
                        value={groupDetails.inspector_details.id ? groupDetails.inspector_details?.id : values.inspector.id}
                        placeholder={groupDetails.inspector_details?.user_name ? groupDetails.inspector_details?.user_name : strings.GivePermission}
                        container={{ marginBottom: wp(5) }}
                    />
                    {(touched?.inspector && errors.inspector) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{strings.Permission_required}</Text>}
                    {/* <MultipleSelectDropDown
                        disabled={!isEditable}
                        setIsVisible={setModalShow}
                        isVisible={modalShow}
                        data={!isEditable ? isMember : list}
                        title={strings.Groupmemeber}
                        setSelectedMembers={(data: DataTypes[]) => {
                            setSelectedMemberData(data)
                            setFieldValue('member', data)
                        }}
                        countTitle={strings.people}
                    /> */}
                    <MultipleSelectDropDown
                        disabled={!isEditable}
                        setIsVisible={setModalShow}
                        isVisible={modalShow}
                        data={setAllMember}
                        title={strings.Groupmemeber}
                        setSelectedMembers={(data: DataTypes[]) => {
                            setSelectedMemberData(data)
                            setFieldValue('groupMember', data)

                            console.log('setfield value', { data, isMember })
                        }}
                        countTitle={strings.people}
                    />
                    {
                        isEditable ?
                            <MultipleSelectDropDown
                                disabled={!isEditable}
                                setIsVisible={setFormListVisible}
                                isVisible={formListVisible}
                                data={setAllForm}
                                title={strings.GroupForms}
                                setSelectedMembers={(data: DataTypes[]) => {
                                    setSelectedFormsData(data)
                                    setFieldValue('forms', data)
                                    // console.log('setfield value', { data, set })
                                }}
                                countTitle={strings.Forms}
                                container={{ marginVertical: heightPercentageToDP(2) }}
                            />
                            :
                            <CustomDetailsComponent
                                title={strings.GroupForms}
                                detailsContainerStyle={{ marginVertical: wp(5) }}
                                bottomComponent={
                                    <View style={[globalStyles.rowView, { flexWrap: "wrap", alignItems: "center" }]}>
                                        {groupDetails?.form_details?.map((item, index) => {
                                            return (
                                                <View style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, borderRadius: wp(2) }]}>
                                                    <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14, color: colors.dark_blue1_color }]}>{item?.name}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                }
                            />
                    }
                    {/* <CustomDetailsComponent
                        title={strings.GroupForms}
                        detailsContainerStyle={{ marginVertical: wp(5) }}
                        bottomComponent={
                            <View style={[globalStyles.rowView, { flexWrap: "wrap", alignItems: "center" }]}>
                                {groupDetails?.form_details?.map((item, index) => {
                                    return (
                                        <View style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, borderRadius: wp(2) }]}>
                                            <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14, color: colors.dark_blue1_color }]}>{item?.name}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        }
                    /> */}
                    <CustomDetailsComponent
                        title={strings.Assignedjobs}
                        detailsContainerStyle={{ marginBottom: wp(5) }}
                        bottomComponent={
                            <>
                                <FlatList
                                    data={groupDetails.assign_jobs.slice(0, 2)}
                                    renderItem={renderItem}
                                    style={{ paddingVertical: wp(2) }}
                                    ItemSeparatorComponent={() => {
                                        return (
                                            <View style={{ height: wp(2), backgroundColor: colors.white_5 }} />
                                        )
                                    }}
                                    showsVerticalScrollIndicator={false}
                                />
                                {groupDetails.assign_jobs.length > 2 &&
                                    <TouchableOpacity onPress={() => { navigation.navigate('AssignJobScreen') }} style={[globalStyles.rowView, styles.viewAllJobs]}>
                                        <Text style={styles.viewAllJobsTxt}>{strings.ViewallJobs}</Text>
                                        <Image source={ImagesPath.arrow_right_black_border_icon} style={[styles.iconStyle, { transform: [{ rotate: '180deg' }] }]} />
                                    </TouchableOpacity>
                                }
                            </>
                        }
                    />
                    {
                        isEditable && <CustomBlackButton
                            title={strings.CreateGroup}
                            image={ImagesPath.plus_white_circle_icon}
                            onPress={() => {
                                handleSubmit()
                            }}
                        />
                    }
                </KeyboardAwareScrollView >
            </Container >
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

export default GroupDetailScreen;
