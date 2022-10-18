import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { ImagesPath } from '../../utils/ImagePaths';
import { styles } from './styles';
import FontSizes from '../../styles/FontSizes';
import fonts from '../../styles/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomBlackButton, CustomTextInput } from '../../components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userDataReducer } from '../../redux/slice/authSlices/AuthUserSlice';
import { strings } from '../../languages/localizedStrings';

const SignInScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={[globalStyles.container, { paddingHorizontal: wp(5), justifyContent: 'center' }]}>
            <Image source={ImagesPath.app_icon} style={styles.appLogo} />
            <View style={{ paddingTop: wp(4), paddingBottom: wp(8) }}>
                <Text style={styles.titleTxt}>{`Welcome to`}</Text>
                <Text style={styles.titleTxt}>{`Job Management!`}</Text>
            </View>
            <CustomTextInput
                title='User Name'
                placeholder='User Name'
                onChangeText={(text) => { setUserName(text) }}
                container={{ marginBottom: wp(5) }}
            />
            <CustomTextInput
                title='Password'
                placeholder='Password'
                onChangeText={(text) => { setPassword(text) }}
                secureTextEntry
                icon={<Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />}
            />
            <CustomBlackButton
                title="Sign In"
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
        </View>
    )
}

export default SignInScreen;
