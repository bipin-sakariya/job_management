import { Alert, Image, Text, TouchableOpacity, View, ActivityIndicator, } from 'react-native';
import React, { useRef, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BottomSheet, CustomBlackButton, CustomTextInput } from '../../components';
import { NavigationProp, PrivateValueStore, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signin, userDataReducer } from '../../redux/slices/AuthUserSlice';
import { strings } from '../../languages/localizedStrings';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AppDispatch } from '../../redux/Store';
import * as yup from "yup";
import { Formik } from "formik";
import { colors } from '../../styles/Colors';

const SignInScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const [userName, setUserName] = useState(strings.Admin)
    const [password, setPassword] = useState("")
    const [IsSucess, setIsSucess] = useState(false)
    const [secureText, setSecureText] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const refForgetPassRBSheet = useRef<RBSheet | null>(null);
    const refForgetPassSucessRBSheet = useRef<RBSheet | null>(null);
    const refForgetPassErrorRBSheet = useRef<RBSheet | null>(null);

    const SignInValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email(strings.email_invalid)
            .required(strings.email_invalid),

        password: yup.string().min(5, strings.enter_max_6_character).required(strings.password_invalid)
    });

    const login = (values: any) => {

        let data = {
            email: values.email,
            password: values.password,
            // role: 'Group Manager',
            // role: userName,
            // role: strings.Inspector,
        }
        dispatch(signin(data)).unwrap().then((res) => {
            console.log({ res });
            if (res) { navigation.reset({ index: 0, routes: [{ name: "DrawerScreens" }] }) }
        })
    }



    return (
        <View style={[globalStyles.container, { paddingHorizontal: wp(5), justifyContent: 'center' }]}>
            <Image source={ImagesPath.logo_of_job_managment} style={styles.appLogo} />
            <View style={[{ paddingTop: wp(4), paddingBottom: wp(8), }]}>
                <Text style={styles.titleTxt}>{strings.Welcometo}</Text>
                <Text style={styles.titleTxt}>{strings.JobManagement}</Text>
            </View>
            <Formik
                validationSchema={SignInValidationSchema}
                initialValues={{ email: '', password: '' }}
                enableReinitialize={true}
                onSubmit={(values) => { login(values) }}
            >{({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <>
                    <CustomTextInput
                        title={strings.UserName}
                        placeholder={strings.UserName}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        container={{ marginBottom: wp(5) }}
                    />
                    {touched.email && errors.email && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.email}</Text>}
                    <CustomTextInput
                        title={strings.Password}
                        placeholder={strings.Password}
                        onChangeText={handleChange("password")}
                        value={values.password}
                        secureTextEntry={secureText}
                        icon={
                            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                <Image source={secureText ? ImagesPath.close_eye_icon : ImagesPath.open_eye_icon} style={styles.iconStyle} />
                            </TouchableOpacity>
                        }
                    />
                    {touched.password && errors.password && <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{errors.password}</Text>}
                    <TouchableOpacity onPress={() => { refForgetPassRBSheet.current?.open() }}>
                        <Text style={styles.forgetPassTxt}>{strings.Forgotpassword}</Text>
                    </TouchableOpacity>
                    <CustomBlackButton
                        title={strings.Signin}
                        onPress={() => handleSubmit()}
                        buttonStyle={{ marginVertical: wp(10) }}
                    />
                </>)}
            </Formik>
            <BottomSheet
                ref={refForgetPassRBSheet}
                height={375}
                children={<>
                    {!IsSucess && isLoading ?
                        <View style={styles.forgetPassViewStyle}>
                            <Text style={[styles.forgetPassTxtStyle, globalStyles.rtlStyle]}>{strings.Forgot_password}</Text>
                            <Text style={[styles.enterEmailTxtStyle, globalStyles.rtlStyle]}>{strings.Enteryouremail}</Text>
                            <CustomTextInput
                                title={strings.JobId}
                                container={{ marginVertical: wp(5), marginTop: wp(8) }}
                                value={'Example@gmail.com'} />
                            <CustomBlackButton onPress={() => { setIsLoading(false), setTimeout(() => { setIsSucess(!IsSucess), setIsLoading(true) }, 2000) }} title={strings.Requestaresetlink} buttonStyle={{ paddingHorizontal: wp(23) }} />
                        </View> :
                        <>
                            {!isLoading ?
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size='small' />
                                </View> :
                                <View style={[styles.forgetPassViewStyle, { alignItems: 'center' }]}>
                                    <Image source={ImagesPath.check_icon_circle} resizeMode={'contain'} style={styles.imageStyle} />
                                    <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgot_sucess_text}</Text>
                                    <CustomBlackButton
                                        onPress={() => setIsSucess(!IsSucess)}
                                        title={strings.Thanks} buttonStyle={{ paddingHorizontal: wp(36.5), paddingVertical: wp(3.5) }} />
                                </View>
                            }
                        </>
                    }
                </>}
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
