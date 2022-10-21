import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { colors } from '../../styles/Colors';
import { strings } from '../../languages/localizedStrings';

const EditProfileScreen = () => {
    const navigation = useCustomNavigation('EditProfileScreen');
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3),
                    width: "70%",
                }}
                headerLeftComponent={
                    <TouchableOpacity
                        style={[globalStyles.rowView]}
                        onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.EditYourProfile}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <Image source={ImagesPath.add_photo_icon} style={styles.profilePhoto} />
                <CustomTextInput
                    title={strings.UserName}
                    container={{ marginBottom: wp(5) }}
                    value={'Stanley Lamb'}
                />
                <CustomTextInput
                    title={strings.Email}
                    container={{ marginBottom: wp(5) }}
                    value={'stanleylamb@gmail.com'}
                />
                <CustomTextInput
                    title={strings.Contactno}
                    container={{ marginBottom: wp(5) }}
                    value={'0123456789'}
                />
                <CustomBlackButton
                    title={strings.Save}
                    image={ImagesPath.save_icon}
                    imageStyle={{ tintColor: colors.white }}
                    onPress={() => { }}
                />
            </Container>
        </View>
    )
}

export default EditProfileScreen;
