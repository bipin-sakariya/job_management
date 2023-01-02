import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';
import { strings } from '../../languages/localizedStrings';
import { useDispatch } from 'react-redux';
import { resetUserDataReducer } from '../../redux/slices/AuthUserSlice';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../../hooks/reduxHooks';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';
import { resetSelectedGroupReducer } from '../../redux/slices/AdminSlice/groupListSlice';
import { USER_LOGOUT } from '../../redux/Store';

const AdminDrawerBtn = [
    { btnTitle: strings.drawer_User, image: ImagesPath.user_icon, route: 'UserListScreen' },
    { btnTitle: strings.drawer_Group, image: ImagesPath.group_icon, route: 'GroupListScreen' },
    { btnTitle: strings.drawer_ReportGenerator, image: ImagesPath.report_icon, route: 'ReportGeneratorScreen' },
    { btnTitle: strings.drawer_BillSection, image: ImagesPath.bill_icon, route: 'BillListScreen' },
    { btnTitle: strings.drawer_Form, image: ImagesPath.form_icon, route: 'FormScreen' },
    { btnTitle: strings.drawer_AddJob, image: ImagesPath.add_icon, route: 'ReturnAndAddJobHistoryScreen' },
    { btnTitle: strings.drawer_ReturnJoblist, image: ImagesPath.arrow_counter_clockwise_black_icon, route: 'ReturnAndAddJobHistoryScreen' },
]
const InspectorDrawerBtn = [
    { btnTitle: strings.drawer_Group, image: ImagesPath.group_icon, route: 'GroupListScreen' },
    { btnTitle: strings.drawer_AddNewJob, image: ImagesPath.add_icon, route: 'ReportGeneratorScreen' },
    { btnTitle: strings.drawer_ReturnJoblist, image: ImagesPath.arrow_counter_clockwise_icon, route: 'ReturnAndAddJobHistoryScreen' },
    // { btnTitle: strings.drawer_AddedJobHistory, image: ImagesPath.clock_counter_clockwise_icon, route: 'ReturnAndAddJobHistoryScreen' },
]
const GroupManagerDrawerBtn = [
    { btnTitle: strings.drawer_Group, image: ImagesPath.group_icon, route: 'UsersGroupsScreen' },
    { btnTitle: strings.drawer_TransferJob, image: ImagesPath.report_icon, route: 'TransferJobListScreen' },
    { btnTitle: strings.drawer_Formlist, image: ImagesPath.form_icon, route: 'FormScreen' },
]

const DrawerScreen = ({ navigation, descriptors, state }: DrawerContentComponentProps) => {

    const { userData, token } = useAppSelector((state) => state.userDetails)
    const dispatch = useDispatch()
    const drawerBtn = userData?.role == strings.admin ? AdminDrawerBtn : userData?.role == strings.inspector ? InspectorDrawerBtn : GroupManagerDrawerBtn

    return (
        <View style={[globalStyles.container,]}>
            <View style={styles.topView} >
                <Image source={ImagesPath.drawer_Bg} style={styles.drawerBackGroundColor} />
                <Image source={{ uri: token && token.user.profile_image }} style={styles.userPlaceholderStyle} />
            </View>
            <View style={styles.userNameContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        navigation.closeDrawer()
                        navigation.navigate('ProfileScreen')
                    }}
                    style={globalStyles.rowView}>
                    <Text style={[styles.userNameTxt, globalStyles.rtlStyle]}>{token && token.user.user_name}</Text>
                    <Image source={ImagesPath.pencil_icon} style={styles.penIcon} />
                </TouchableOpacity>
                <Text style={[styles.roleTxt, globalStyles.rtlStyle]}>{userData?.role}</Text>
                <View style={styles.btnContainer}>
                    {drawerBtn.map((i) => (
                        <TouchableOpacity onPress={() => {
                            navigation.closeDrawer()
                            if (i.btnTitle == strings.drawer_User) {
                                navigation.navigate(i.route, { type: 'users' })
                            } else if (i.btnTitle == strings.drawer_Group) {
                                navigation.navigate(i.route, { type: 'groups' })
                            } else if (i.btnTitle == strings.drawer_ReturnJoblist) {
                                navigation.navigate(i.route, { type: 'returnJob' })
                            } else if (i.btnTitle == strings.drawer_AddJob) {
                                navigation.navigate(i.route, { type: 'addJob' })
                            } else {
                                navigation.navigate(i.route)
                            }
                        }} style={globalStyles.rowView} >
                            <Image source={i.image} style={styles.btnIconStyle} />
                            <Text style={[styles.btnTxtStyle, globalStyles.rtlStyle]}>{i.btnTitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                // dispatch(resetUserDataReducer())
                // dispatch(resetSelectedGroupReducer())
                dispatch({ type: USER_LOGOUT })
                navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] })
            }} style={styles.logoutBtnStyle}>
                <Image source={ImagesPath.logout_icon} style={styles.logoutBtn} />
                <Text style={styles.logoutTxt}>{strings.logOut}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DrawerScreen;
