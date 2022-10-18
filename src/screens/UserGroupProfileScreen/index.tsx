import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { AssignedJobsComponent, Container, CustomBlackButton, CustomDetailsComponent, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import { strings } from '../../languages/localizedStrings'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { useRoute } from '@react-navigation/native'
import { RootRouteProps } from '../../types/RootStackTypes'
import { styles } from './styles'
import CustomDropdown from '../../components/CustomDropDown'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'

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
    const { type } = route.params;
    const [visible, setVisible] = useState(false);
    const menuRef = useRef(null);
    const [isEditable, setIsEditable] = useState(false)
    const [assignedJobs, setAssignedJobs] = useState([{}, {}, {}])
    const onPress = () => {
        console.log("Remove")
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
    const optionData = [
        { title: 'Remove', onPress: onPress, imageSource: ImagesPath.bin_icon },
        {
            title: 'edit', onPress: () => {
                setIsEditable(true)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const renderItem = ({ item, index }: any) => {
        return (
            <AssignedJobsComponent />
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>Stanley Lamb</Text>
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
                    <Image source={ImagesPath.image_for_user_icon} style={styles.addPhotoStyle} />
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
                                value={'stanleylamb@gmail.com'}
                            />
                            <CustomTextInput
                                title={strings.Contactno}
                                container={{ marginBottom: wp(5) }}
                                value={'4563123123'}
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
                    <CustomTextInput
                        title={type == strings.users ? strings.Role : strings.Group_Manager}
                        container={{ marginBottom: wp(5) }}
                        value={'Inspector'}
                    />
                    <CustomTextInput
                        title={type == strings.users ? strings.Permission : strings.Group_Inspector}
                        container={{ marginBottom: wp(5) }}
                        value={'Inspector'}
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
                                                    <View style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: "#DEDEDE", borderRadius: wp(2) }]}>
                                                        <Text style={[styles.commonTxtStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14 }]}>{item.name}</Text>
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
                                                <View style={[globalStyles.rowView, styles.tagStyle, { backgroundColor: "#DEDEDE", borderRadius: wp(2) }]}>
                                                    <Text style={[styles.commonTxtStyle, { paddingHorizontal: wp(2), fontSize: FontSizes.SMALL_14 }]}>{item.name}</Text>
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
                                                <Text>{strings.ViewallJobs}</Text>
                                                <Image source={ImagesPath.arrow_right_black_border_icon} style={styles.iconStyle} />
                                            </TouchableOpacity>
                                        }
                                    </>
                                } />
                        </>
                    }
                </ScrollView>
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