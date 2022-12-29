import { Image, Text, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { globalStyles } from '../../styles/globalStyles';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import { BottomSheet, CustomBlackButton, CustomTextInput } from '../../components';
import { resetPassword, signin, userDataReducer } from '../../redux/slices/AuthUserSlice';
import { strings } from '../../languages/localizedStrings';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { colors } from '../../styles/Colors';
import { jobStatusWiseList } from '../../redux/slices/AdminSlice/jobListSlice';

const SignInScreen = () => {
    const navigation = useCustomNavigation('AuthStack')
    const dispatch = useAppDispatch();

    const refForgetPassRBSheet = useRef<RBSheet | null>(null);
    const refForgetPassErrorRBSheet = useRef<RBSheet | null>(null);

    const [IsSucess, setIsSucess] = useState(false)
    const [secureText, setSecureText] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { isLoading: loading, error } = useAppSelector(state => state.userDetails)
    const { selectedGroupData } = useAppSelector(state => state.groupList)

    const SignInValidationSchema = yup.object().shape({
        email: yup.string().trim().email(strings.emailInvalid).required(strings.emailInvalid),
        password: yup.string().trim().min(5, strings.enter_max_6_character).required(strings.passwordInvalid)
    });

    const ForgetPassEmailValidationSchema = yup.object().shape({
        email: yup.string().trim().email(strings.emailInvalid).required(strings.emailInvalid),
    });

    const login = (values: {
        email: string;
        password: string;
    }) => {
        setIsLoading(true)
        let data = {
            email: values.email,
            password: values.password,
        }
        dispatch(signin(data)).unwrap().then((res) => {
            if (res) {
                let userData = {
                    email: values.email,
                    role: res.role,
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

    const forgetPassword = (values: {
        email: string;
    }) => {
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
        <View style={[globalStyles.container, { paddingHorizontal: wp(4), justifyContent: 'center' }]}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}>
                <Image source={ImagesPath.logo_of_job_managment} style={styles.appLogo} />
                <View style={[{ paddingTop: wp(4), paddingBottom: wp(8), }]}>
                    <Text style={styles.titleTxt}>{strings.welcomeTo}</Text>
                    <Text style={styles.titleTxt}>{strings.jobManagement}</Text>
                </View>
                <CustomTextInput
                    title={strings.userName}
                    placeholder={strings.userName}
                    onChangeText={handleChange("email")}
                    value={values.email}
                    container={{ marginBottom: wp(4) }}
                    keyboardType={'email-address'}
                />
                <Text style={[globalStyles.rtlStyle, { bottom: wp(4), color: colors.red, }]}>{(touched.email && errors.email) ? errors.email : ' '}</Text>
                <CustomTextInput
                    title={strings.password}
                    placeholder={strings.password}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    secureTextEntry={secureText}
                    icon={
                        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                            <Image source={secureText ? ImagesPath.close_eye_icon : ImagesPath.open_eye_icon} style={styles.iconStyle} />
                        </TouchableOpacity>
                    }
                />
                <Text style={[globalStyles.rtlStyle, { color: colors.red }]}>{(touched.password && errors.password) ? errors.password : isError ? error : ' '}</Text>
                {/* <Text style={[globalStyles.rtlStyle, { color: colors.red }]}>{}</Text> */}
                <TouchableOpacity onPress={() => {
                    refForgetPassRBSheet.current?.open()
                }}>
                    <Text style={styles.forgetPassTxt}>{strings.forgotPassword}</Text>
                </TouchableOpacity>
                <CustomBlackButton
                    title={strings.signIn}
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
                                <Text style={[styles.forgetPassTxtStyle, globalStyles.rtlStyle]}>{strings.forgotPassword}</Text>
                                <Text style={[styles.enterEmailTxtStyle, globalStyles.rtlStyle]}>{strings.enterYourEmail}</Text>
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
                                                title={strings.emailNew}
                                                container={{ marginVertical: wp(5), marginTop: wp(8) }}
                                                placeholder={strings.emailNew}
                                                value={values.email}
                                                onChangeText={handleChange("email")} />
                                            <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{(touched.email && errors.email) ? errors.email : ' '}</Text>
                                            <CustomBlackButton

                                                onPress={() => { handleSubmit() }}
                                                title={strings.requestResetLink}
                                                buttonStyle={{ paddingHorizontal: wp(23), marginTop: 0 }} />
                                        </>
                                    )}
                                </Formik>

                            </View> :
                            <>
                                <View style={[styles.forgetPassViewStyle, { alignItems: 'center' }]}>
                                    <Image source={!isError ? ImagesPath.check_icon_circle : ImagesPath.information_icon} resizeMode={'contain'} style={styles.imageStyle} />
                                    {!isError ? <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgotSucessText}</Text> :
                                        <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgotErrorText}</Text>
                                    }
                                    <CustomBlackButton
                                        onPress={() => {
                                            setIsError(false);
                                            setIsSucess(false);
                                            refForgetPassRBSheet.current?.close()
                                        }}
                                        title={!isError ? strings.thanks : strings.sendAgain} buttonStyle={{ paddingHorizontal: isError ? wp(33) : wp(36.5), paddingVertical: wp(3.5) }} />
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
                            <Text style={[styles.sucessText, globalStyles.rtlStyle]}>{strings.forgotErrorText}</Text>
                            <CustomBlackButton title={strings.sendAgain} buttonStyle={{ paddingHorizontal: wp(33), paddingVertical: wp(3.5) }} />
                        </View>
                    }
                />
            </KeyboardAvoidingView>
            {isLoading && <CustomActivityIndicator size={'small'} />}
        </View>
    )
}

export default SignInScreen;
