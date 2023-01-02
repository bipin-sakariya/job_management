import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomDashedComponent, CustomSubTitleWithImageComponent, GroupListComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import FontSizes from '../../styles/FontSizes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { groupDelete, groupList } from '../../redux/slices/AdminSlice/groupListSlice';

interface groupListParams {
    page?: number,
    search?: string,
}

const GroupListScreen = () => {
    const navigation = useCustomNavigation('GroupListScreen');
    const route = useRoute<RootRouteProps<'GroupListScreen'>>();
    const dispatch = useAppDispatch();
    const isFocus = useIsFocused()
    const [isFooterLoading, setIsFooterLoading] = useState<boolean>(false)


    const [page, setPage] = useState(1)

    const { groupListData, isLoading } = useAppSelector(state => state.groupList)

    useEffect(() => {
        if (isFocus)
            groupListApiCall(page)
        return () => {
            setPage(1)
        }
    }, [isFocus, groupListData])
    const groupListApiCall = (page: number) => {
        let params: groupListParams = {
            page: page,
            search: ''
        }

        dispatch(groupList(params)).unwrap().then((res) => {
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{ width: '50%', paddingRight: wp(3) }}
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
                        <TouchableOpacity onPress={() => { navigation.navigate('SearchScreen', { screenName: 'groupScreen' }) }}>
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
                    title={strings.addNewGroup}
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
                    data={groupListData?.results}
                    renderItem={({ item, index }) => {
                        return (
                            <GroupListComponent item={item} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => {
                        console.log("On reach call");
                        if (groupListData.next) {
                            groupListApiCall(page)
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => {
                        return (
                            <>
                                {isFooterLoading && <ActivityIndicator size={'small'} />}
                            </>
                        )
                    }}
                />
            </Container>
        </View>
    )
}

export default GroupListScreen;
