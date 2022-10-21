import { Alert, I18nManager, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import FontSizes from '../../styles/FontSizes';
import fonts from '../../styles/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BottomSheet, CustomBlackButton, CustomTextInput } from '../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userDataReducer } from '../../redux/slice/authSlices/AuthUserSlice';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';

const SignInScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState(strings.Admin)
    const [password, setPassword] = useState("")
    const [secureText, setSecureText] = useState(true)
    const refForgetPassRBSheet = useRef<RBSheet | null>(null);

    return (
        <View style={[globalStyles.container, { paddingHorizontal: wp(5), justifyContent: 'center' }]}>
            <Image source={ImagesPath.logo_of_job_managment} style={styles.appLogo} />
            <View style={[{ paddingTop: wp(4), paddingBottom: wp(8), }]}>
                <Text style={styles.titleTxt}>{strings.Welcometo}</Text>
                <Text style={styles.titleTxt}>{strings.JobManagement}</Text>
            </View>
            <CustomTextInput
                title={strings.UserName}
                placeholder={strings.UserName}
                onChangeText={(text) => { setUserName(text) }}
                container={{ marginBottom: wp(5) }}
            />
            <CustomTextInput
                title={strings.Password}
                placeholder={strings.Password}
                onChangeText={(text) => { setPassword(text) }}
                secureTextEntry={secureText}
                icon={
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />
                    </TouchableOpacity>
                }
            />
            <TouchableOpacity onPress={() => { refForgetPassRBSheet.current?.open() }}>
                <Text style={styles.forgetPassTxt}>{strings.Forgotpassword}</Text>
            </TouchableOpacity>
            <CustomBlackButton
                title={strings.Signin}
                onPress={() => {
                    if (userName && password) {
                        let data = {
                            email: userName,
                            password: password,
                            // role: 'Group Manager',
                            role: userName,
                            // role: strings.Inspector,
                        }
                        dispatch(userDataReducer(data))
                        navigation.reset({ index: 0, routes: [{ name: "DrawerScreens" }] })
                    } else {
                        Alert.alert("Enter valid details")
                    }
                }}
                buttonStyle={{ marginVertical: wp(10) }}
            />
            <BottomSheet
                ref={refForgetPassRBSheet}
                height={375}
                children={
                    <View style={styles.forgetPassViewStyle}>
                        <Text style={[styles.forgetPassTxtStyle, globalStyles.rtlStyle]}>{strings.Forgot_password}</Text>
                        <Text style={[styles.enterEmailTxtStyle, globalStyles.rtlStyle]}>{strings.Enteryouremail}</Text>
                        <CustomTextInput
                            title={strings.JobId}
                            container={{ marginVertical: wp(5), marginTop: wp(8) }}
                            value={'Example@gmail.com'} />
                        <CustomBlackButton onPress={() => refForgetPassRBSheet.current?.close()} title={strings.Requestaresetlink} buttonStyle={{ paddingHorizontal: wp(23) }} />
                    </View>
                }
            />
        </View>
    )
}

export default SignInScreen;
