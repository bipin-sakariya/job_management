import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomDashedComponent, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { styles } from './styles';
import FontSizes from '../../styles/FontSizes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { manageMapRoutesReducer, resetPerticularRoutesReducer, updateFinalMapRoutesReducer, updatePerticularSelectionOfAddress } from '../../redux/slices/MapSlice/MapSlice';
import { useIsFocused } from '@react-navigation/native';
import { jobList, recentSearchList } from '../../redux/slices/AdminSlice/jobListSlice';

interface JobDetail {
    address?: string
    id?: number
    description?: string
}

interface jobListParams {
    page?: number,
    search?: string
}

const RouteScreen = () => {
    const dispatch = useAppDispatch()
    const navigation = useCustomNavigation('RouteScreen');
    const isFocused = useIsFocused()

    const [sourceAddress, setSourceAddress] = useState<JobDetail | null>(null)
    const [destinationAddress, setDestinationAddress] = useState<JobDetail | null>(null)
    const [selectedAddress, setSelectedAddress] = useState<JobDetail[]>([]);
    const [page, setPage] = useState(1)

    const { routeList, destination, source } = useAppSelector(state => state.mapData)
    const { jobListData } = useAppSelector(state => state.jobList)

    useEffect(() => {
        if (isFocused) { jobListApiCall(page) }
    }, [navigation, isFocused])

    const jobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: ''
        }
        dispatch(recentSearchList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            // setJobList(res.results)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item.jobs} onPress={() => dispatch(manageMapRoutesReducer({ id: item?.id, address: item?.address, coordinates: item?.coordinates, description: item?.description, isCheckBlank: true }))} />
        )
    }

    useEffect(() => {
        setSourceAddress({ address: source?.address })
        setDestinationAddress({ address: destination?.address })
        setSelectedAddress(routeList)
    }, [source, destination, routeList])

    return (
        <View style={globalStyles.container}>
            <ScrollView style={globalStyles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
                <Header
                    headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
                    headerLeftComponent={
                        <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                            <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                            <Text style={[globalStyles.headerTitle, { marginHorizontal: wp(2) }]}>{strings.route}</Text>
                        </TouchableOpacity>
                    }
                />
                <Container style={{ paddingHorizontal: wp(4) }}>
                    <View style={[globalStyles.rowView, { alignItems: "flex-start", marginTop: wp(3) }]}>
                        <Image source={ImagesPath.map_direction_icon} style={styles.mapdirectionIcon} />
                        <View style={{ flex: 1 }}>
                            <View style={styles.btnContainer}>
                                <Text style={[styles.textInputStyle, globalStyles.rtlStyle, { flex: 1, marginBottom: 0 }]} numberOfLines={2} onPress={() => { dispatch(updatePerticularSelectionOfAddress('source')), navigation.navigate("RouteChooseLocationDetailScreen") }}>
                                    {sourceAddress?.address ? sourceAddress.address : strings.chooseStartingLocation}
                                </Text>
                                {sourceAddress?.address && <TouchableOpacity style={styles.closeIconContainer} onPress={() => dispatch(resetPerticularRoutesReducer({ type: 'source' }))}>
                                    <Image source={ImagesPath.close_icon} style={styles.closeIcon} />
                                </TouchableOpacity>}
                            </View>
                            <View style={styles.btnContainer}>
                                <Text style={[styles.textInputStyle, globalStyles.rtlStyle, { flex: 1, marginBottom: 0 }]} numberOfLines={2} onPress={() => {
                                    if (!source) {
                                        Alert.alert(strings.please_select_a_source, "")
                                    } else {
                                        dispatch(updatePerticularSelectionOfAddress('destination'))
                                        navigation.navigate("RouteChooseLocationDetailScreen")
                                    }
                                }}>
                                    {destinationAddress?.address ? destinationAddress.address : strings.chooseDestination}
                                </Text>
                                {destinationAddress?.address && <TouchableOpacity style={styles.closeIconContainer} onPress={() => dispatch(resetPerticularRoutesReducer({ type: 'destination' }))}>
                                    <Image source={ImagesPath.close_icon} style={styles.closeIcon} />
                                </TouchableOpacity>}
                            </View>
                            {selectedAddress.length ? selectedAddress.slice(0, 8).map((item) => {
                                return (
                                    <View style={styles.btnContainer}>
                                        <Text style={[styles.textInputStyle, globalStyles.rtlStyle, { flex: 1, marginBottom: 0 }]} numberOfLines={2} onPress={() => { dispatch(updatePerticularSelectionOfAddress('waypoints')), navigation.navigate("RouteChooseLocationDetailScreen") }}>
                                            {item?.address}
                                        </Text>
                                        <TouchableOpacity style={styles.closeIconContainer} onPress={() => {
                                            dispatch(resetPerticularRoutesReducer({ type: 'waypoints', id: item?.id }))
                                        }}>
                                            <Image source={ImagesPath.close_icon} style={styles.closeIcon} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }) : null}

                            <CustomDashedComponent
                                title={strings.addOtherField}
                                image={ImagesPath.plus_circle_white_border_icon}
                                onPress={() => {
                                    if (!source && !destination) {
                                        Alert.alert(strings.please_select_a_source_and_destination, "")
                                    } else if (!source) {
                                        Alert.alert(strings.please_select_a_source, "")
                                    } else if (!destination) {
                                        Alert.alert(strings.please_select_a_destination, "")
                                    } else {
                                        dispatch(updatePerticularSelectionOfAddress('waypoints'))
                                        navigation.navigate('RouteChooseLocationDetailScreen')
                                    }
                                }}
                                viewStyle={{ paddingVertical: wp(3), borderColor: colors.bottom_sheet_tab, marginTop: wp(0) }}
                                textStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.dark_blue1_color }}
                            />
                        </View>
                    </View>
                    <CustomSubTitleWithImageComponent disabled title={strings.recent} image={ImagesPath.clock_counter_clockwise_icon} />
                    <FlatList
                        data={jobListData?.results}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: wp(20) }}
                        scrollEnabled={false}
                    />
                </Container>
            </ScrollView>

            <CustomBlackButton
                title={strings.done}
                textStyle={{ marginVertical: wp(1) }}
                image={ImagesPath.route_icon}
                buttonStyle={{ ...styles.boxShadowStyle, bottom: Platform.OS == "ios" ? wp(5) : 0, width: '90%' }}
                onPress={() => {
                    dispatch(updateFinalMapRoutesReducer())
                    if (!source) {
                        Alert.alert(strings.please_select_a_source_and_destination, "")
                    } else if (!destination) {
                        Alert.alert(strings.please_select_a_destination, "")
                    } else {
                        navigation.navigate("RouteMapViewScreen")
                    }
                }}
            />
        </View>
    )
}

export default RouteScreen;