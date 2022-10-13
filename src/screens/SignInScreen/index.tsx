import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import FontSizes from '../../styles/FontSizes';
import fonts from '../../styles/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomBlackButton, CustomTextInput } from '../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userDataReducer } from '../../redux/slice/authSlices/AuthUserSlice';

const SignInScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation()
    const dispatch = useDispatch()
    return (
        <View style={[globalStyles.container, { paddingHorizontal: wp(5), justifyContent: 'center' }]}>
            <Image source={ImagesPath.app_icon} style={styles.appLogo} />
            <View style={{ paddingTop: wp(4), paddingBottom: wp(8) }}>
                <Text style={styles.titleTxt}>{`Welcome to`}</Text>
                <Text style={styles.titleTxt}>{`Job Management!`}</Text>
            </View>
            <CustomTextInput
                title='User Name'
                container={{ marginBottom: wp(5) }}
            />
            <CustomTextInput
                title='Password'
                secureTextEntry
                icon={<Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />}
            />
            <CustomBlackButton
                title="Sign In"
                onPress={() => {
                    let data = {
                        email: "admin@123.gmail.com",
                        password: '123456',
                        // role: 'Group Manager',
                        role: 'Admin',
                        // role: 'Inspector',

                    }
                    dispatch(userDataReducer(data))
                    navigation.reset({ index: 0, routes: [{ name: "DrawerScreens" }] })
                }}
                buttonStyle={{ marginVertical: wp(10) }}
            />
        </View>
    )
}

export default SignInScreen;
