import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';
import { RootState, useAppSelector } from '../../redux/Store';
import { strings } from '../../languages/localizedStrings';
import { useDispatch } from 'react-redux';
import { resetUserDataReducer } from '../../redux/slice/authSlices/AuthUserSlice';

const AdminDrawerBtn = [
    { btnTitle: 'User', image: ImagesPath.user_icon, route: 'UsersGroupsScreen' },
    { btnTitle: 'Group', image: ImagesPath.group_icon, route: 'UsersGroupsScreen' },
    { btnTitle: 'Report Generator', image: ImagesPath.report_icon, route: 'ReportGeneratorScreen' },
    { btnTitle: 'Bill Section', image: ImagesPath.bill_icon, route: 'BillListScreen' },
    { btnTitle: 'Form', image: ImagesPath.form_icon, route: 'FormScreen' },
]
const InspectorDrawerBtn = [
    { btnTitle: 'Group', image: ImagesPath.group_icon, route: 'UsersGroupsScreen' },
    { btnTitle: 'Add New Job', image: ImagesPath.add_icon, route: 'ReportGeneratorScreen' },
    { btnTitle: 'Return Job list', image: ImagesPath.arrow_counter_clockwise_icon, route: 'ReturnAndAddJobHistoryScreen' },
    { btnTitle: 'Added Job History', image: ImagesPath.clock_counter_clockwise_icon, route: 'ReturnAndAddJobHistoryScreen' },
]
const GroupManagerDrawerBtn = [
    { btnTitle: 'Group', image: ImagesPath.group_icon, route: 'UsersGroupsScreen' },
    { btnTitle: 'Transfer Job', image: ImagesPath.report_icon, route: 'ReportGeneratorScreen' },
    { btnTitle: 'Form list', image: ImagesPath.form_icon, route: 'FormScreen' },
]

const DrawerScreen = ({ navigation, descriptors, state }: DrawerContentComponentProps) => {

    const { userData } = useAppSelector((state) => state.userDetails)
    const dispatch = useDispatch()
    const drawerBtn = userData?.role == strings.Admin ? AdminDrawerBtn : userData?.role == strings.Inspector ? InspectorDrawerBtn : GroupManagerDrawerBtn
    return (
        <View style={[globalStyles.container, { direction: 'ltr' }]}>
            <View style={styles.topView} >
                <Image source={ImagesPath.user_placeholder_img} style={styles.userPlaceholderStyle} />
            </View>
            <View style={styles.userNameContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        navigation.closeDrawer()
                        navigation.navigate('ProfileScreen')
                    }}
                    style={globalStyles.rowView}>
                    <Text style={styles.userNameTxt}>Johnny Weis</Text>
                    <Image source={ImagesPath.pencil_icon} style={styles.penIcon} />
                </TouchableOpacity>
                <Text style={styles.roleTxt}>{userData?.role}</Text>
                <View style={styles.btnContainer}>
                    {drawerBtn.map((i) => (
                        <TouchableOpacity onPress={() => {
                            navigation.closeDrawer()
                            if (i.btnTitle == 'User') {
                                navigation.navigate(i.route, { type: 'users' })
                            } else if (i.btnTitle == 'Group') {
                                navigation.navigate(i.route, { type: 'groups' })
                            } else if (i.btnTitle == 'Return Job list') {
                                navigation.navigate(i.route, { type: strings.returnjob })
                            } else if (i.btnTitle == 'Added Job History') {
                                navigation.navigate(i.route, { type: strings.addedjob })
                            } else {
                                navigation.navigate(i.route)
                            }
                        }} style={globalStyles.rowView} >
                            <Image source={i.image} style={styles.btnIconStyle} />
                            <Text style={styles.btnTxtStyle}>{i.btnTitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                dispatch(resetUserDataReducer())
                navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] })
            }} style={styles.logoutBtnStyle}>
                <Text style={styles.logoutTxt}>{'Log Out'}</Text>
                <Image source={ImagesPath.logout_icon} style={styles.logoutBtn} />
            </TouchableOpacity>
        </View>
    )
}

export default DrawerScreen;
