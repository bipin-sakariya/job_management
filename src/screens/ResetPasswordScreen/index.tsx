import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { ImagesPath } from '../../utils/ImagePaths';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { styles } from './styles';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch } from '../../hooks/reduxHooks';
import { changePassword } from '../../redux/slices/AdminSlice/userListSlice';

const ResetPasswordScreen = () => {
    const navigation = useCustomNavigation('ResetPasswordScreen');
    const dispatch = useAppDispatch();

    const [secureText, setSecureText] = useState(true)
    const [oldPassText, setOldPassText] = useState(true)
    const [newPassText, setNewPassText] = useState(true)
    const [error, setError] = useState({
        detail: ''
    })

    const CreateEditProfileValidationSchema = yup.object().shape({
        new_password: yup.string().trim().min(5, strings.enter_max_6_character).required(strings.passwordInvalid),
        confirm_new_password: yup.string()
            .oneOf([yup.ref('new_password'), null], 'password should be not match'),
    });

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                old_password: '',
                new_password: '',
                confirm_new_password: ''
            },
            validationSchema: CreateEditProfileValidationSchema,
            onSubmit: values => {
                UserChangePassword()
            }
        })
    const UserChangePassword = () => {
        let params = {
            old_password: values.old_password,
            new_password: values.new_password
        }
        dispatch(changePassword(params)).unwrap().then((res) => {
            console.log({ res: res });
            navigation.goBack()
        }).catch((e) => {
            console.log({ error: e });
            setError(e.data)
        })
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: '60%',
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity
                        style={[globalStyles.rowView]}
                        onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>{strings.resetPassword}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    titleStyle={{ color: colors.dark_blue1_color }}
                    title={strings.fillTheDetailToResetPassword}
                    image={ImagesPath.from_list_icon}
                />
                <CustomTextInput
                    title={strings.oldPassword}
                    placeholder={strings.password}
                    container={{ marginVertical: wp(5) }}
                    value={values.old_password}
                    onChangeText={handleChange('old_password')}
                    secureTextEntry={secureText}
                    icon={
                        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                            <Image source={secureText ? ImagesPath.close_eye_icon : ImagesPath.open_eye_icon} style={styles.iconStyle} />
                        </TouchableOpacity>
                    }
                />
                {error.detail ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{error.detail}</Text> : null}
                <CustomTextInput
                    title={strings.newPassword}
                    placeholder={strings.password}
                    container={{ marginVertical: wp(5) }}
                    value={values.new_password}
                    onChangeText={handleChange('new_password')}
                    secureTextEntry={oldPassText}
                    icon={
                        <TouchableOpacity onPress={() => setOldPassText(!oldPassText)}>
                            <Image source={oldPassText ? ImagesPath.close_eye_icon : ImagesPath.open_eye_icon} style={styles.iconStyle} />
                        </TouchableOpacity>
                    }
                />
                {errors.new_password ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.new_password ? errors?.new_password : ''}</Text> : null}
                <CustomTextInput
                    title={strings.confirmNewPassword}
                    placeholder={strings.password}
                    container={{ marginVertical: wp(5) }}
                    value={values.confirm_new_password}
                    onChangeText={handleChange('confirm_new_password')}
                    secureTextEntry={newPassText}
                    icon={
                        <TouchableOpacity onPress={() => setNewPassText(!newPassText)}>
                            <Image source={newPassText ? ImagesPath.close_eye_icon : ImagesPath.open_eye_icon} style={styles.iconStyle} />
                        </TouchableOpacity>
                    }
                />
                {errors.confirm_new_password ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: colors.red }]}>{errors?.confirm_new_password ? errors?.confirm_new_password : ''}</Text> : null}
                <CustomBlackButton
                    title={strings.changePassword}
                    onPress={() => { handleSubmit() }}
                />
            </Container>
        </View >
    )
}

export default ResetPasswordScreen;
