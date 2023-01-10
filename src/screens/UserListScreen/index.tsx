import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomDashedComponent, CustomSubTitleWithImageComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './styles';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import UserListComponent from '../../components/UserListComponent';
import { strings } from '../../languages/localizedStrings';
import { getListOfUsers } from '../../redux/slices/AdminSlice/userListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import FontSizes from '../../styles/FontSizes';

const UserListScreen = () => {
    const navigation = useCustomNavigation('UserListScreen');
    const dispatch = useAppDispatch();
    const isFoucs = useIsFocused();

    const [page, setpage] = useState(1);
    const { isLoading, userListData } = useAppSelector(state => state.userList);

    useEffect(() => {
        if (isFoucs) {
            let params = {
                page: 1
            }
            dispatch(getListOfUsers(params)).unwrap().then((res) => {
                setpage(params.page + 1)
            }).catch((error) => {
                console.log("🚀 ~ file: index.tsx ~ line 38 ~ dispatch ~ error", error)
            })
        }
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
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.users}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity
                            style={{ marginRight: wp(3) }}
                            onPress={() => {
                                navigation.navigate('CreateUserScreen')
                            }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('SearchScreen', { screenName: 'userScreen' }) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomDashedComponent
                    textStyle={styles.dashViewTxt}
                    viewStyle={styles.dashView}
                    imageStyle={styles.dashViewImg}
                    title={strings.addNewUser}
                    image={ImagesPath.add_icon}
                    onPress={() => navigation.navigate('CreateUserScreen')}
                />
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.addedUsers}
                    image={ImagesPath.group_icon}
                    viewStyle={{ marginBottom: hp(1) }}
                    titleStyle={{ fontSize: FontSizes.MEDIUM_16 }}
                />
                <FlatList
                    data={userListData}
                    renderItem={({ item }) => {
                        return (
                            <UserListComponent item={item} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
        </View>
    )
}

export default UserListScreen;
