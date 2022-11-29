import { Alert, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { AssignedJobsComponent, Container, CustomBlackButton, CustomDetailsComponent, CustomDropdown, CustomTextInput, DropDownComponent, Header, MultileSelectDropDown } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { strings } from '../../languages/localizedStrings';
import { useFormik } from 'formik';
import * as yup from "yup";
import { colors } from '../../styles/Colors';
import FontSizes from '../../styles/FontSizes';
import { groupDelete, groupDetail } from '../../redux/slices/AdminSlice/groupListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useIsFocused, useRoute } from '@react-navigation/core';
import { RootRouteProps } from '../../types/RootStackTypes';
import { DropdownProps } from '../../types/commanTypes';

const CreateGroupValidationSchema = yup.object().shape({
    groupName: yup.string().required(strings.Groupname_required),
    groupManager: yup.string().required(strings.groupmanger_required),
    inspector: yup.string().trim().required(strings.Contectno_invalid),
    groupMamber: yup.string().trim().required(strings.groupMember_required),
    forms: yup.string().required(strings.forms_required)
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
const GroupDetailScreen = () => {
    const navigation = useCustomNavigation('GroupDetailScreen');
    const menuRef = useRef(null);
    const dispatch = useAppDispatch()
    const route = useRoute<RootRouteProps<'GroupDetailScreen'>>()
    const isFocused = useIsFocused()
    const { groupDetails, isLoading } = useAppSelector(state => state.groupList)
    const { userGroupManagerList, userInsepectorList } = useAppSelector(state => state.userList)
    console.log({ userGroupManagerList })

    useEffect(() => {
        if (isFocused) {
            dispatch(groupDetail(route.params.params.id)).unwrap().then((res) => {
                console.log({ res });
                setImageUrl(res.image)
            }).catch((error) => {
                console.log({ error });
            })
        }
    }, [isFocused])
    console.log(route.params.params)

    const deleteGroupData = (id: number) => {

        dispatch(groupDelete(id)).unwrap().then(() => {
        })
    }

    const optionData = [
        { title: strings.Remove, onPress: () => deleteGroupData(route.params.params.id), imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEditable(true)
                setVisible(false)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const [assignedJobs, setAssignedJobs] = useState([{}, {}, {}])
    const [isEditable, setIsEditable] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [visible, setVisible] = useState(false);
    const [modalShow, setModalShow] = useState(false);
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
                groupName: groupDetails.name ? groupDetails.name : '',
                groupManager: {
                    id: !isEditable ? groupDetails.manager : 1,
                    name: groupDetails.manager_details?.user_name ? groupDetails.manager_details?.user_name : '',
                },
                inspector: {
                    id: !isEditable ? groupDetails.inspector : 1,
                    name: groupDetails.inspector_details?.user_name ? groupDetails.inspector_details?.user_name : '',
                },
                groupMamber: '',
                forms: ''

            },
            validationSchema: CreateGroupValidationSchema,
            onSubmit: values => {
                Alert.alert("dsf")
            }
        })

    const renderItem = ({ item, index }: any) => {
        return (
            <AssignedJobsComponent item={item} />
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingHorizontal: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(60) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>P. תחזוקה</Text>
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
                        onChangeText={handleChange('userName')}
                    />
                    {(touched?.groupName && errors?.groupName) ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.groupName ? errors.groupName : ''}</Text> : null}
                    <DropDownComponent
                        disable={!isEditable}
                        title={strings.Group_Manager}
                        data={!isEditable ? [groupDetails?.manager_details] : userGroupManagerList}
                        image={!isEditable ? '' : ImagesPath.down_white_arrow}
                        labelField={"user_name"}
                        valueField="id"
                        onChange={(item) => setFieldValue('groupManager', item)}
                        value={values.groupManager.id}
                        placeholder={strings.SelectRoleforUser}
                        container={{ marginBottom: wp(5) }}
                    />
                    {/* {console.log({ countingValue })} */}
                    {(touched?.groupManager) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.role_required}</Text>}
                    <DropDownComponent
                        disable={!isEditable}
                        title={strings.Group_Inspector}
                        data={!isEditable ? [groupDetails?.inspector_details] : userInsepectorList}
                        image={!isEditable ? '' : ImagesPath.down_white_arrow}
                        labelField="user_name"
                        valueField="id"
                        onChange={(item) => setFieldValue('inspector', item)}
                        value={values.inspector.id}
                        placeholder={strings.GivePermission}
                        container={{ marginBottom: wp(5) }}
                    />
                    {(touched?.inspector) && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{strings.Permission_required}</Text>}
                    <MultileSelectDropDown
                        disabled={!isEditable}
                        setIsVisible={setModalShow}
                        isVisible={modalShow}
                        data={[{ name: 'abc', selected: true }, { name: 'def', selected: true }, { name: 'ghi', selected: false }]}
                        title={strings.Groupmemeber}
                    />
                    <CustomDetailsComponent
                        title={strings.GroupForms}
                        detailsContainerStyle={{ marginVertical: wp(5) }}
                        bottomComponent={
                            <View style={[globalStyles.rowView, { flexWrap: "wrap", alignItems: "center" }]}>
                                {groupDetails?.form_details?.map((item, index) => {
                                    return (
                                        <View style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: colors.gray_light_color, borderRadius: wp(2) }]}>
                                            <Text style={[styles.commonTxtStyle, globalStyles.rtlStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14, color: colors.dark_blue1_color }]}>{item.name}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        }
                    />
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
                                {assignedJobs.length > 2 &&
                                    <TouchableOpacity style={[globalStyles.rowView, styles.viewAllJobs]}>
                                        <Text style={styles.viewAllJobsTxt}>{strings.ViewallJobs}</Text>
                                        <Image source={ImagesPath.arrow_right_black_border_icon} style={[styles.iconStyle, { transform: [{ rotate: '180deg' }] }]} />
                                    </TouchableOpacity>
                                }
                            </>
                        }
                    />
                    {isEditable && <CustomBlackButton
                        title={strings.CreateGroup}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => {

                        }}
                    />}
                </KeyboardAwareScrollView>
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

export default GroupDetailScreen;
