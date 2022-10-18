import { Image, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
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
        { title: 'Remove', onPress: onPress, imageSource: ImagesPath.bin_icon },
        { title: 'edit', onPress: onPress, imageSource: ImagesPath.edit_icon }
    ]

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>{type == strings.users ? strings.AddUser : strings.AddGroup}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={styles.headerMenu} />
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent
                        disabled
                        title={type == strings.users ? strings.FillfromtocreateUser : strings.FillfromtoCreateGroup}
                        image={ImagesPath.from_list_icon}
                    />
                    <Image source={ImagesPath.add_photo_icon} style={styles.addPhotoStyle} />
                    <CustomTextInput
                        title={type == strings.users ? strings.UserName : strings.GroupName}
                        container={{ marginBottom: wp(5) }}
                        value={'Stanley Lamb'}
                    />
                    {
                        type == strings.users &&
                        <>
                            <CustomTextInput
                                title={strings.Email}
                                container={{ marginBottom: wp(5) }}
                                value={'Stanley Lamb'}
                            />
                            <CustomTextInput
                                title={strings.Contactno}
                                container={{ marginBottom: wp(5) }}
                                value={'stanleylamb@gmail.com'}
                            />
                            <CustomTextInput
                                title={strings.Password}
                                secureTextEntry
                                icon={<Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />}
                                container={{ marginBottom: wp(5) }}
                                value={'Stanley Lamb'}
                            />
                        </>
                    }
                    <DropDownComponent
                        title={type == strings.users ? strings.Role : strings.Group_Manager}
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setRole(item)}
                        value={role.value}
                        placeholder={strings.SelectRoleforUser}
                        container={{ marginBottom: wp(5) }}
                    />
                    <DropDownComponent
                        title={type == strings.users ? strings.Permission : strings.Group_Inspector}
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setPermission(item)}
                        value={permission.value}
                        placeholder={strings.GivePermission}
                        container={{ marginBottom: wp(5) }}
                    />
                    {
                        type != strings.users &&
                        <>
                            <CustomDetailsComponent
                                title={strings.Groupmemeber}
                                detailsContainerStyle={{ marginBottom: wp(5) }}
                                bottomComponent={
                                    <View style={{ width: "100%", marginVertical: wp(1) }}>
                                        <Text style={[styles.commonTxtStyle, { fontSize: FontSizes.EXTRA_SMALL_12 }]}>{`Total ${userData.length} people`}</Text>
                                        <View style={[globalStyles.rowView, { flexWrap: "wrap", alignItems: "center" }]}>
                                            {userData.map((item, index) => {
                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        const tempuserdata = userData.filter((x, _index) => {
                                                            return _index !== index
                                                        })
                                                        setUserData(tempuserdata)
                                                    }} style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: "#DEDEDE", borderRadius: wp(2) }]}>
                                                        <Text style={[styles.commonTxtStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14 }]}>{item.name}</Text>
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
                                            }} style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: '#B5B5B5', }]}>
                                                <Image source={ImagesPath.plus_icon} style={styles.commonIconStyle} />
                                                <Text style={[styles.commonTxtStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14 }]}>{strings.AddUser}</Text>
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
                        onPress={() => { }}
                    />
                </ScrollView>
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

export default UserGroupDetailScreen;

