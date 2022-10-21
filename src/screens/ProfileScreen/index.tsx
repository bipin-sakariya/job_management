import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomTextInput, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { strings } from '../../languages/localizedStrings';

const ProfileScreen = () => {
    const navigation = useCustomNavigation('ProfileScreen')
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
                        <Text style={globalStyles.headerTitle}>{strings.Profile}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <Image source={ImagesPath.add_photo_icon} style={styles.profilePhoto} />
                <CustomTextInput
                    title={strings.UserName}
                    container={{ marginBottom: wp(5) }}
                    value={'Stanley Lamb'}
                />
                <CustomTextInput
                    title={strings.Email}
                    container={{ marginBottom: wp(5) }}
                    value={'stanleylamb@gmail.com'}
                />
                <CustomTextInput
                    title={strings.Contactno}
                    container={{ marginBottom: wp(5) }}
                    value={'0123456789'}
                />
                <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')} style={styles.btnView}>
                    <Text style={styles.btnTxtStyle}>{strings.Changepassword}</Text>
                    <Image source={ImagesPath.left_arrow_icon} style={[globalStyles.backArrowStyle, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} style={styles.btnView}>
                    <Text style={styles.btnTxtStyle}>{strings.EdityourProfile}</Text>
                    <Image source={ImagesPath.left_arrow_icon} style={[globalStyles.backArrowStyle, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
            </Container>
        </View>
    )
}

export default ProfileScreen;
