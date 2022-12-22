import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react'
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { ImagesPath } from '../../utils/ImagePaths';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { styles } from './styles';

const ResetPasswordScreen = () => {
    const navigation = useCustomNavigation('ResetPasswordScreen');

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
                    onChangeText={(text) => { }}
                    secureTextEntry
                    icon={
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />
                        </TouchableOpacity>
                    }
                />
                <CustomTextInput
                    title={strings.newPassword}
                    placeholder={strings.password}
                    container={{ marginVertical: wp(5) }}
                    onChangeText={(text) => { }}
                    secureTextEntry
                    icon={
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />
                        </TouchableOpacity>
                    }
                />
                <CustomTextInput
                    title={strings.confirmNewPassword}
                    placeholder={strings.password}
                    container={{ marginVertical: wp(5) }}
                    onChangeText={(text) => { }}
                    secureTextEntry
                    icon={
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />
                        </TouchableOpacity>
                    }
                />
                <CustomBlackButton
                    title={strings.changePassword}
                    onPress={() => { }}
                />
            </Container>
        </View >
    )
}

export default ResetPasswordScreen;
