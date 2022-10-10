import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import FontSizes from '../../styles/FontSizes';
import fonts from '../../styles/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';

const SignInScreen = () => {
    return (
        <View style={[globalStyles.container, globalStyles.centerView]}>
            <Image source={ImagesPath.app_icon} style={styles.appLogo} />
            <Text style={{ fontSize: RFValue(34), fontFamily: fonts.FONT_POP_SEMI_BOLD, width: "80%" }}>Welcome to Job Management! </Text>
        </View>
    )
}

export default SignInScreen;
