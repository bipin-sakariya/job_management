import { Alert, I18nManager, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, } from 'react-native';
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
    const [IsSucess, setIsSucess] = useState(false)
    const [secureText, setSecureText] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const refForgetPassRBSheet = useRef<RBSheet | null>(null);
    const refForgetPassSucessRBSheet = useRef<RBSheet | null>(null);
    const refForgetPassErrorRBSheet = useRef<RBSheet | null>(null);


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
                children={<>

                    {!IsSucess && isLoading ? <View style={styles.forgetPassViewStyle}>
                        <Text style={[styles.forgetPassTxtStyle, globalStyles.rtlStyle]}>{strings.Forgot_password}</Text>
                        <Text style={[styles.enterEmailTxtStyle, globalStyles.rtlStyle]}>{strings.Enteryouremail}</Text>
                        <CustomTextInput
                            title={strings.JobId}
                            container={{ marginVertical: wp(5), marginTop: wp(8) }}
                            value={'Example@gmail.com'} />
                        <CustomBlackButton onPress={() => { setIsLoading(false), setTimeout(() => { setIsSucess(!IsSucess), setIsLoading(true) }, 2000) }} title={strings.Requestaresetlink} buttonStyle={{ paddingHorizontal: wp(23) }} />
                    </View> : <>
                        {!isLoading ?
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='small' />
                            </View>
                            : <View style={[styles.forgetPassViewStyle, { alignItems: 'center' }]}>
                                <Image source={ImagesPath.check_icon_circle} resizeMode={'contain'} style={styles.imageStyle} />
                                <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgot_sucess_text}</Text>
                                <CustomBlackButton
                                    onPress={() => setIsSucess(!IsSucess)}
                                    title={strings.Thanks} buttonStyle={{ paddingHorizontal: wp(36.5), paddingVertical: wp(3.5) }} />
                            </View>}</>}
                </>
                }
            />

            {/* <BottomSheet
                ref={refForgetPassErrorRBSheet}
                height={360}
                children={
                    <View style={[styles.forgetPassViewStyle, { alignItems: 'center' }]}>
                        <Image source={ImagesPath.information_icon} resizeMode={'contain'} style={styles.imageStyle} />
                        <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgot_error_text}</Text>
                        <CustomBlackButton title={strings.send_again} buttonStyle={{ paddingHorizontal: wp(33), paddingVertical: wp(3.5) }} />
                    </View>
                }
            />  */}
        </View>
    )
}

export default SignInScreen;
