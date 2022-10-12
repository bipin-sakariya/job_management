import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import UserListComponent from '../../components/UserListComponent';

const users = [
    { name: 'Stanley Lamb', role: 'Role of User', date: '12 May 2022' },
    { name: 'Stanley Lamb', role: 'Role of User', date: '12 May 2022' },
    { name: 'Stanley Lamb', role: 'Role of User', date: '12 May 2022' },
    { name: 'Stanley Lamb', role: 'Role of User', date: '12 May 2022' },
    { name: 'Stanley Lamb', role: 'Role of User', date: '12 May 2022' },
]

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
    const { type } = route.params
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>{type == 'users' ? 'Users' : 'Groups'}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <View style={styles.addUserContainer}>
                    <Image source={ImagesPath.add_icon} style={styles.addBtnStyle} />
                    <Text style={styles.addNewUserTxt}>{type == 'users' ? 'ADD NEW USER' : 'ADD NEW GROUP'}</Text>
                </View>
                <View style={[globalStyles.rowView, { paddingVertical: wp(1.5) }]}>
                    <Image source={ImagesPath.group_icon} style={styles.folderIcon} />
                    <Text style={styles.subTitleTxt}>{type == 'users' ? 'Added Users' : 'Added Groups'}</Text>
                </View>
                <FlatList
                    data={type == 'users' ? users : groups}
                    renderItem={({ item, index }) => {
                        return (
                            <UserListComponent item={item} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </Container>
        </View>
    )
}

export default UsersScreen;
