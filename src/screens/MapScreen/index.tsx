import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Animated } from 'react-native';
import { styles } from './styles';
import { customMapStyle, globalStyles } from '../../styles/globalStyles';
import { CustomJobListComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DrawerActions, useIsFocused, useRoute } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../styles/Colors';
import Carousel from 'react-native-snap-carousel';
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { resetMapRoutesReducer } from '../../redux/slices/MapSlice/MapSlice';
import { RootRouteProps } from '../../types/RootStackTypes';
import { jobList } from '../../redux/slices/AdminSlice/jobListSlice';
import { GroupData, groupList } from '../../redux/slices/AdminSlice/groupListSlice';
import { GroupParams } from '../TransferJobScreen';

interface jobListParams {
    page?: number,
    search?: string
}

const MapScreen = () => {
    const navigation = useCustomNavigation('MapScreen')
    const refRBSheet = useRef<RBSheet | null>(null);
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()
    const route = useRoute<RootRouteProps<'MapScreen'>>();

    const [selectedItem, setSelectedItem] = useState<GroupParams | undefined>(undefined);
    const { jobListData } = useAppSelector(state => state.jobList)
    const [selectedindex, setSelectdeIndex] = useState(0)
    const [page, setPage] = useState(1)
    const [groupPage, setGroupPage] = useState(1)
    const [groupData, setGroupData] = useState<GroupData[]>([])
    const [finalGroupData, setfinalGroupList] = useState<GroupParams[]>([])

    useEffect(() => {
        dispatch(resetMapRoutesReducer())
        jobListApiCall(page)
    }, [navigation, isFocused])

    useEffect(() => {
        let defaultSelected = finalGroupData.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    const jobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: ''
        }
        dispatch(jobList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    useEffect(() => {
        const findData: GroupParams[] = groupData.map((i: GroupData) => {
            return {
                ...i,
                user_name: i.name,
                selected: false,
            }
        })
        setfinalGroupList(findData)

    }, [groupData])

    useEffect(() => {
        let params = {
            search: '',
            page: groupPage
        }
        dispatch(groupList(params)).unwrap().then((res) => {
            setGroupData(res.results)
            setGroupPage(groupPage + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }, [isFocused])

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item} type='carousel' listStyle={{ backgroundColor: 'red' }} />
        )
    }
    return (
        <View style={globalStyles.container}>
            {route?.params?.type == 'viewJob' ?
                <Header
                    headerLeftStyle={{
                        width: "50%",
                        paddingLeft: wp(3)
                    }}
                    headerLeftComponent={
                        <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                            <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                            <Text style={globalStyles.headerTitle}>{strings.Place}</Text>
                        </TouchableOpacity>
                    }
                />
                :
                <Header
                    containerStyle={{ backgroundColor: colors.white }}
                    headerLeftComponent={
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <Image source={ImagesPath.menu_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    }
                    headerCenterComponent={
                        <TouchableOpacity onPress={() => refRBSheet.current?.open()} activeOpacity={1} style={globalStyles.rowView}>
                            <Text style={styles.jobTypeTxt}>{selectedItem?.name}</Text>
                            <Image source={ImagesPath.down_icon} style={styles.downIcon} />
                        </TouchableOpacity>
                    }
                    headerRightComponent={
                        <TouchableOpacity>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    }
                />
            }

            <CustomBottomSheet
                ref={refRBSheet}
                data={groupData}
                onSelectedTab={(item) => {
                    setSelectedItem(item)
                    refRBSheet.current?.close()
                }}
            />
            <MapView
                style={{ flex: 1 }}
                provider={'google'}
                customMapStyle={customMapStyle}
                region={route?.params?.type == 'viewJob' ? route?.params?.JobDetails?.coordinate : {
                    latitude: Number(jobListData.results[selectedindex].latitude), longitude: Number(jobListData.results[selectedindex].longitude),
                    latitudeDelta: 0.04864195044303443,
                    longitudeDelta: 0.040142817690068,
                }}>
                {route?.params?.type && route?.params?.JobDetails == 'viewJob' ?
                    <Marker coordinate={route?.params?.JobDetails?.coordinate}>
                        <Animated.View style={[styles.markerWrap]}>
                            <Image source={route?.params?.JobDetails?.image[0] ? { uri: route?.params?.JobDetails?.image[0] } : ImagesPath.selected_marker_pin}
                                style={styles.selected_markerPinIcon} />
                        </Animated.View>
                    </Marker>
                    :
                    jobListData.results.map((marker, index) => {
                        console.log("data", marker)
                        if (marker.latitude != null) {
                            return (
                                <Marker key={index} coordinate={{
                                    latitude: Number(marker?.latitude), longitude: Number(marker.longitude), latitudeDelta: 0.04864195044303443,
                                    longitudeDelta: 0.040142817690068,
                                }}>
                                    <Animated.View style={[styles.markerWrap]}>
                                        <Image source={selectedindex == index ? ImagesPath.selected_marker_pin : ImagesPath.unselected_marker_pin}
                                            style={[selectedindex == index ? styles.selected_markerPinIcon : styles.unselected_markerPinIcon]} />
                                    </Animated.View>
                                </Marker>
                            )
                        }
                        else {

                        }

                    })

                }

            </MapView>
            <View style={[styles.carouselStyle, { bottom: wp(5) }]}>
                <TouchableOpacity style={[styles.routeBut, styles.routeButShadow]} onPress={() => navigation.navigate("RouteScreen")}>
                    <Image source={ImagesPath.route_icon} style={styles.pathIconStyle} />
                </TouchableOpacity>
                <Carousel
                    data={route?.params?.type == 'viewJob' ? [route?.params?.JobDetails] : jobListData.results}
                    sliderWidth={wp("100%")}
                    itemWidth={wp("83%")}
                    renderItem={renderItem}
                    onSnapToItem={(index: any) => setSelectdeIndex(index)}
                />
            </View>
        </View>
    )
}

export default MapScreen;
