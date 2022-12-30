import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomTextInput, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { strings } from '../../languages/localizedStrings';
import { useAppSelector } from '../../hooks/reduxHooks';
import FastImage from 'react-native-fast-image';

const ProfileScreen = () => {
    const navigation = useCustomNavigation('ProfileScreen')
    const { userData, token } = useAppSelector(state => state.userDetails)
    console.log({ userData })

    // const chooseFile = () => {
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log("User cancelled image picker");
    //         } else if (response.error) {
    //             console.log("ImagePicker Error: ", response.error);
    //         } else if (response.customButton) {
    //             console.log("User tapped custom button: ", response.customButton);
    //         } else {
    //             const source = { uri: response.uri };
    //             console.log({
    //                 response,
    //             });

    //             if (response) {
    //                 isImageClick(true)
    //             }
    //             else {
    //                 isImageClick(false)
    //             }
    //             setUserDetail({ ...userDetail, profile_image: response.assets[0].uri });
    //         }
    //         setIsImage(true);
    //     });
    // };

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
                <CustomTextInput
                    editable={false}
                    title={strings.contactNo}
                    container={{ marginBottom: wp(5) }}
                    value={token && token.user.phone}
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
