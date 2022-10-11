import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';
import { Container, CustomBlackButton, CustomTextInput, Header } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { colors } from '../../styles/Colors';

const UserGroupDetailScreen = () => {
    const navigation = useCustomNavigation('UserGroupDetailScreen');
    const route = useRoute<RootRouteProps<'UserGroupDetailScreen'>>();
    const { name } = route.params;

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>Add User</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={ImagesPath.menu_dots_icon} style={styles.headerMenu} />
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={globalStyles.rowView}>
                        <Image source={ImagesPath.from_list_icon} style={styles.noteIconStyle} />
                        <Text style={styles.noteTxt}>Fill from to Create Group</Text>
                    </View>
                    <Image source={ImagesPath.add_photo_icon} style={styles.addPhotoStyle} />
                    <CustomTextInput
                        title='User Name'
                        container={{ marginBottom: wp(5) }}
                        value={'Stanley Lamb'}
                    />
                    <CustomTextInput
                        title='Email'
                        container={{ marginBottom: wp(5) }}
                        value={'Stanley Lamb'}
                    />
                    <CustomTextInput
                        title='Contact no.'
                        container={{ marginBottom: wp(5) }}
                        value={'stanleylamb@gmail.com'}
                    />
                    <CustomTextInput
                        title='Password'
                        secureTextEntry
                        icon={<Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />}
                        container={{ marginBottom: wp(5) }}
                        value={'Stanley Lamb'}
                    />
                    <CustomTextInput
                        title='Role'
                        container={{ marginBottom: wp(5) }}
                        value={'Select Role for User'}
                    />
                    <CustomTextInput
                        title='Permission'
                        container={{ marginBottom: wp(5) }}
                        value={'Give Permission'}
                    />
                    <CustomBlackButton
                        image={ImagesPath.add_icon}
                        title="Create Group"
                        onPress={() => { }}
                        buttonStyle={{}}
                        imageStyle={{ tintColor: colors.white }}
                    />
                </ScrollView>
            </Container>
        </View>
    )
}

export default UserGroupDetailScreen;

