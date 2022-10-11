import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';

const AdminDrawerBtn = [
    { btnTitle: 'User', image: ImagesPath.user_icon, route: 'UsersScreen' },
    { btnTitle: 'Group', image: ImagesPath.group_icon, route: 'UsersScreen' },
    { btnTitle: 'Report Generator', image: ImagesPath.report_icon, route: 'UsersScreen' },
    { btnTitle: 'Bill Section', image: ImagesPath.bill_icon, route: 'UsersScreen' },
    { btnTitle: 'Form', image: ImagesPath.form_icon, route: 'UsersScreen' },
]

const DrawerScreen = ({ navigation, descriptors, state }: DrawerContentComponentProps) => {
    return (
        <View style={globalStyles.container}>
            <View style={styles.topView} >
                <Image source={ImagesPath.user_placeholder_img} style={styles.userPlaceholderStyle} />
            </View>
            <View style={styles.userNameContainer}>
                <View style={globalStyles.rowView}>
                    <Text style={styles.userNameTxt}>Johnny Weis</Text>
                    <Image source={ImagesPath.pencil_icon} style={styles.penIcon} />
                </View>
                <Text style={styles.roleTxt}>Admin</Text>
                <View style={styles.btnContainer}>
                    {AdminDrawerBtn.map((i) => (
                        <TouchableOpacity onPress={() => {
                            navigation.closeDrawer()
                            navigation.navigate(i.route)
                        }} style={globalStyles.rowView} >
                            <Image source={i.image} style={styles.btnIconStyle} />
                            <Text style={styles.btnTxtStyle}>{i.btnTitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity style={styles.logoutBtnStyle}>
                <Text style={styles.logoutTxt}>Log Out</Text>
                <Image source={ImagesPath.logout_icon} style={styles.logoutBtn} />
            </TouchableOpacity>
        </View>
    )
}

export default DrawerScreen;
