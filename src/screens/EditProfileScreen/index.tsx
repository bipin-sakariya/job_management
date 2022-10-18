import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomTextInput, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { styles } from './styles';
import { colors } from '../../styles/Colors';

const EditProfileScreen = () => {
    const navigation = useCustomNavigation('EditProfileScreen');
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity
                        style={[globalStyles.rowView, { width: wp(50) }]}
                        onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>Edit Your Profile</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <Image source={ImagesPath.add_photo_icon} style={styles.profilePhoto} />
                <CustomTextInput
                    title='User Name'
                    container={{ marginBottom: wp(5) }}
                    value={'Stanley Lamb'}
                />
                <CustomTextInput
                    title='Email'
                    container={{ marginBottom: wp(5) }}
                    value={'stanleylamb@gmail.com'}
                />
                <CustomTextInput
                    title='Contact no.'
                    container={{ marginBottom: wp(5) }}
                    value={'0123456789'}
                />
                <CustomBlackButton
                    title={'Save'}
                    image={ImagesPath.save_icon}
                    imageStyle={{ tintColor: colors.white }}
                    onPress={() => { }}
                />
            </Container>
        </View>
    )
}

export default EditProfileScreen;
