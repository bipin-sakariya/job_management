import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomDashedComponent, CustomSubTitleWithImageComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import UserListComponent from '../../components/UserListComponent';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { useDispatch } from 'react-redux';
import { getListOfUsers } from '../../redux/slices/AdminSlice/userListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

const groups = [
    { name: 'P. Maintanence', role: '10 members in group', date: '12 May 2022' },
    { name: 'P. Maintanence', role: '12 members in group', date: '12 May 2022' },
    { name: 'P. Maintanence', role: '14 members in group', date: '12 May 2022' },
    { name: 'P. Maintanence', role: '16 members in group', date: '12 May 2022' },
    { name: 'P. Maintanence', role: '18 members in group', date: '12 May 2022' },
]

const UsersScreen = () => {
    const navigation = useCustomNavigation('UsersGroupsScreen')
    const route = useRoute<RootRouteProps<'UsersGroupsScreen'>>();
    const dispatch = useAppDispatch()
    const { type } = route.params
    const { isLoading, userListData } = useAppSelector(state => state.userList)

    const isFoucs = useIsFocused()
    useEffect(() => {
        dispatch(getListOfUsers("")).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 41 ~ dispatch ~ res", res)
        }).catch((error) => {
            console.log("🚀 ~ file: index.tsx ~ line 38 ~ dispatch ~ error", error)
        })
    }, [isFoucs])

    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator size={'small'} />}
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingRight: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{type == 'users' ? strings.users : strings.groups}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => {
                            navigation.navigate('UserGroupDetailScreen', { type: type })
                        }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>

                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomDashedComponent
                    textStyle={{ color: colors.dark_blue1_color }}
                    viewStyle={{ paddingVertical: wp(5), borderColor: colors.gray_color }}
                    title={type == 'users' ? strings.ADDNEWUSER : strings.ADDNEWGROUP}
                    image={ImagesPath.add_icon}
                    onPress={() => {
                        navigation.navigate('UserGroupDetailScreen', { type: type })
                    }}
                />
                <CustomSubTitleWithImageComponent
                    disabled
                    title={type == 'users' ? strings.AddedUsers : strings.AddedGroups}
                    image={ImagesPath.group_icon}
                />
                <FlatList
                    data={type == 'users' ? userListData : groups}
                    renderItem={({ item, index }) => {
                        return (
                            <UserListComponent item={item} type={type} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </Container>
        </View>
    )
}

export default UsersScreen;
