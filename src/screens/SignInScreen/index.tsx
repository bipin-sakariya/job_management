import { Image, Text, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BottomSheet, CustomBlackButton, CustomTextInput } from '../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resetPassword, signin, userDataReducer } from '../../redux/slices/AuthUserSlice';
import { strings } from '../../languages/localizedStrings';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import { AppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const SignInScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const refForgetPassRBSheet = useRef<RBSheet | null>(null);
    const refForgetPassErrorRBSheet = useRef<RBSheet | null>(null);

    const [IsSucess, setIsSucess] = useState(false)
    const [secureText, setSecureText] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { isLoading: loading, error } = useAppSelector(state => state.userDetails)
    const SignInValidationSchema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email(strings.email_invalid)
            .required(strings.email_invalid),
        password: yup.string().trim().min(5, strings.enter_max_6_character).required(strings.password_invalid)
    });

    const ForgetPassEmailValidationSchema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .email(strings.email_invalid)
            .required(strings.email_invalid),
    });

    const login = (values: any) => {
        setIsLoading(true)
        let data = {
            email: values.email,
            password: values.password,
        }
        dispatch(signin(data)).unwrap().then((res) => {
            if (res) {
                let userData = {
                    email: values.email,
                    role: res.role == "Admin" ? strings.Admin : res.role == "Group Manager" ? strings.GroupManager : strings.Inspector,
                    accesToken: res.access
                }
                dispatch(userDataReducer(userData))
                setIsLoading(false)
                navigation.reset({ index: 0, routes: [{ name: "DrawerScreens" }] })
                setIsError(false)
            }
        }).catch((error) => {
            setIsLoading(false)
            console.log({ error: error });
            setIsError(true)
        })
    }

    const forgetPassword = (values: any) => {
        let param = {
            email: values.email
        }
        dispatch(resetPassword(param)).unwrap().then((res) => {
            console.log({ res });
            if (res) {
                setIsSucess(true)
            }
        }).catch((error) => {
            setIsSucess(true)
            setIsError(true)
            console.log({ error })
        })
    }

    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: { email: '', password: '' },
            validationSchema: SignInValidationSchema,
            onSubmit: values => {
                login(values)
            }
        })

    useEffect(() => {
        setIsError(false)
    }, [values])

    return (
        <View style={[globalStyles.container, { paddingHorizontal: wp(5), justifyContent: 'center' }]}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}>
                <Image source={ImagesPath.logo_of_job_managment} style={styles.appLogo} />
                <View style={[{ paddingTop: wp(4), paddingBottom: wp(8), }]}>
                    <Text style={styles.titleTxt}>{strings.Welcometo}</Text>
                    <Text style={styles.titleTxt}>{strings.JobManagement}</Text>
                </View>
                <CustomTextInput
                    title={strings.UserName}
                    placeholder={strings.UserName}
                    onChangeText={handleChange("email")}
                    value={values.email}
                    container={{ marginBottom: wp(5) }}
                    keyboardType={'email-address'}
                />
                {touched.email && errors.email ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.email}</Text> : null}
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
                {touched.password && errors.password ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{errors.password}</Text> : null}
                {isError ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{error}</Text> : null}
                <TouchableOpacity onPress={() => {
                    refForgetPassRBSheet.current?.open()
                }}>
                    <Text style={styles.forgetPassTxt}>{strings.Forgotpassword}</Text>
                </TouchableOpacity>
                <CustomBlackButton
                    title={strings.Signin}
                    onPress={() => handleSubmit()}
                    buttonStyle={{ marginVertical: wp(10) }}
                />
                <BottomSheet
                    onClose={() => {
                        setIsSucess(false)
                    }}
                    ref={refForgetPassRBSheet}
                    height={375}
                    children={<>
                        {loading && <ActivityIndicator style={styles.indicatorStyle} />}
                        {!IsSucess ?
                            <View style={styles.forgetPassViewStyle}>
                                <Text style={[styles.forgetPassTxtStyle, globalStyles.rtlStyle]}>{strings.Forgot_password}</Text>
                                <Text style={[styles.enterEmailTxtStyle, globalStyles.rtlStyle]}>{strings.Enteryouremail}</Text>
                                <Formik
                                    validationSchema={ForgetPassEmailValidationSchema}
                                    initialValues={{ email: '' }}
                                    enableReinitialize={true}
                                    onSubmit={(values) => { forgetPassword(values) }}>
                                    {({
                                        handleChange,
                                        handleSubmit,
                                        values,
                                        errors,
                                        touched,
                                    }) => (
                                        <>
                                            <CustomTextInput
                                                title={strings.Email_new}
                                                container={{ marginVertical: wp(5), marginTop: wp(8) }}
                                                placeholder={strings.Email_new}
                                                value={values.email}
                                                onChangeText={handleChange("email")} />
                                            {touched.email && errors.email && <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors.email}</Text>}
                                            <CustomBlackButton
                                                onPress={() => { handleSubmit() }}
                                                title={strings.Requestaresetlink}
                                                buttonStyle={{ paddingHorizontal: wp(23) }} />
                                        </>
                                    )}
                                </Formik>

                            </View> :
                            <>
                                <View style={[styles.forgetPassViewStyle, { alignItems: 'center' }]}>
                                    <Image source={!isError ? ImagesPath.check_icon_circle : ImagesPath.information_icon} resizeMode={'contain'} style={styles.imageStyle} />
                                    {!isError ? <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgot_sucess_text}</Text> :
                                        <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgot_error_text}</Text>
                                    }
                                    <CustomBlackButton
                                        onPress={() => {
                                            setIsError(false);
                                            setIsSucess(false);
                                            refForgetPassRBSheet.current?.close()
                                        }}
                                        title={!isError ? strings.Thanks : strings.send_again} buttonStyle={{ paddingHorizontal: isError ? wp(33) : wp(36.5), paddingVertical: wp(3.5) }} />
                                </View>
                            </>
                        }
                    </>}
                />
                <BottomSheet
                    ref={refForgetPassErrorRBSheet}
                    height={360}
                    children={
                        <View style={[styles.forgetPassViewStyle, { alignItems: 'center' }]}>
                            <Image source={ImagesPath.information_icon} resizeMode={'contain'} style={styles.imageStyle} />
                            <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgot_error_text}</Text>
                            <CustomBlackButton title={strings.send_again} buttonStyle={{ paddingHorizontal: wp(33), paddingVertical: wp(3.5) }} />
                        </View>
                    }
                />
            </KeyboardAvoidingView>
            {isLoading && <CustomActivityIndicator size={'small'} />}
        </View>
    )
}

export default SignInScreen;
