import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomDashedComponent, CustomSubTitleWithImageComponent, GroupListComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import FontSizes from '../../styles/FontSizes';
import { useAppDispatch } from '../../hooks/reduxHooks';

const groups = [
    { id: 10, is_active: true, phone: '+97223456787', name: 'P. Maintanence', user_name: 'divyesh10', profile_image: "https://bochan-dj.herokuapp.com/media/User/21/photo.jpg", role: { id: 1, title: 'Admin' }, date: '12 May 2022', email: 'divyesh10@gmail.com', date_joined: '2022-11-09T12:33:38.417751Z' },
    { id: 10, is_active: true, phone: '+97223456787', name: 'P. Maintanence', user_name: 'divyesh10', profile_image: "https://bochan-dj.herokuapp.com/media/User/21/photo.jpg", role: { id: 1, title: 'Admin' }, date: '12 May 2022', email: 'divyesh10@gmail.com', date_joined: '2022-11-09T12:33:38.417751Z' },
]

const GroupListScreen = () => {
    const navigation = useCustomNavigation('GroupListScreen');
    const route = useRoute<RootRouteProps<'GroupListScreen'>>();
    const dispatch = useAppDispatch();

    return (
        <View style={globalStyles.container}>
            {/* {isLoading && <CustomActivityIndicator size={'small'} />} */}
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingRight: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.groups}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity
                            style={{ marginRight: wp(3) }}
                            onPress={() => {
                                navigation.navigate('CreateGroupScreen')
                            }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomDashedComponent
                    textStyle={{ color: colors.dark_blue1_color, fontSize: FontSizes.EXTRA_LARGE_24 }}
                    viewStyle={{ paddingVertical: wp(5), borderColor: colors.gray_color }}
                    imageStyle={{ height: wp(10), width: wp(10), tintColor: colors.dark_blue1_color }}
                    title={strings.ADDNEWGROUP}
                    image={ImagesPath.add_icon}
                    onPress={() => {
                        navigation.navigate('CreateGroupScreen')
                    }}
                />
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.AddedGroups}
                    image={ImagesPath.group_icon}
                    viewStyle={{ marginBottom: hp(1) }}
                    titleStyle={{ fontSize: FontSizes.MEDIUM_16 }}
                />
                <FlatList
                    data={groups}
                    renderItem={({ item, index }) => {
                        return (
                            <GroupListComponent item={item} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </Container>
        </View>
    )
}

export default GroupListScreen;