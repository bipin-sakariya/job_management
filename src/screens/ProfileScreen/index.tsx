import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomTextInput, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { strings } from '../../languages/localizedStrings';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import FastImage from 'react-native-fast-image';
// import { userInfo } from '../../redux/slices/AdminSlice/userListSlice';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../../styles/Colors';

const ProfileScreen = () => {
    const navigation = useCustomNavigation('ProfileScreen')
    const { userInformation, error } = useAppSelector(state => state.userList)
    const { token } = useAppSelector(state => state.userDetails)


    const phoneNumber = token?.user?.phone.substring(4)

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity
                        style={[globalStyles.rowView]}
                        onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>{strings.profile}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <FastImage source={{ uri: token && token.user.profile_image }} style={styles.profilePhoto} />
                <CustomTextInput
                    editable={false}
                    title={strings.userName}
                    container={{ marginBottom: wp(5) }}
                    value={token && token.user.user_name}
                />
                <CustomTextInput
                    editable={false}
                    title={strings.email}
                    container={{ marginBottom: wp(5) }}
                    value={token && token.user.email}
                />
                {/* {errors.confirm_new_password && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{}</Text> } */}
                <CustomTextInput
                    editable={false}
                    title={strings.contactNo}
                    container={{ marginBottom: wp(5) }}
                    value={phoneNumber}
                />
                <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')} style={styles.btnView}>
                    <Text style={styles.btnTxtStyle}>{strings.changePassword}</Text>
                    <Image source={ImagesPath.left_arrow_icon} style={[globalStyles.backArrowStyle, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} style={styles.btnView}>
                    <Text style={styles.btnTxtStyle}>{strings.editYourProfile}</Text>
                    <Image source={ImagesPath.left_arrow_icon} style={[globalStyles.backArrowStyle, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
            </Container>
        </View>
    )
}

export default ProfileScreen;
