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

const SignInScreen = () => {
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
                icon={<Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />}
            />
            <CustomBlackButton
                title="Sign In"
                onPress={() => { }}
                buttonStyle={{ marginVertical: wp(10) }}
            /> 
        </View>
    )
}

export default SignInScreen;
