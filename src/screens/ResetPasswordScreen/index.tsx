import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react'
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { ImagesPath } from '../../utils/ImagePaths';

const ResetPasswordScreen = () => {
    const navigation = useCustomNavigation('ResetPasswordScreen');

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity
                        style={[globalStyles.rowView, { width: wp(50) }]}
                        onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>Reset Password</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    title={'Fill the deatil to reset Password'}
                    image={ImagesPath.from_list_icon}
                />
                <CustomTextInput
                    title='Old Password'
                    container={{ marginVertical: wp(5) }}
                    value={'Stanley Lamb'}
                />
                <CustomTextInput
                    title='New Password'
                    container={{ marginBottom: wp(5) }}
                    value={'stanleylamb@gmail.com'}
                />
                <CustomTextInput
                    title='Confirm New Password'
                    container={{ marginBottom: wp(5) }}
                    value={'0123456789'}
                />
                <CustomBlackButton
                    title={'Reset Password'}
                    onPress={() => { }}
                />
            </Container>
        </View >
    )
}

export default ResetPasswordScreen;
