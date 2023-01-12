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
import Carousel from 'react-native-reanimated-carousel'
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { manageMapRoutesReducer, resetMapRoutesReducer } from '../../redux/slices/MapSlice/MapSlice';
import { RootRouteProps } from '../../types/RootStackTypes';
import { JobDetailsData, jobStatusWiseList } from '../../redux/slices/AdminSlice/jobListSlice';
import { GroupData, groupList, selectedGroupReducers } from '../../redux/slices/AdminSlice/groupListSlice';
import { GroupParams } from '../TransferJobScreen';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';

interface jobListParams {
    page?: number,
    search?: string,
    id?: number,
    status: string
}

const MapScreen = () => {
    const navigation = useCustomNavigation('MapScreen')
    const refRBSheet = useRef<RBSheet | null>(null);
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()
    const route = useRoute<RootRouteProps<'MapScreen'>>();

    const [selectedItem, setSelectedItem] = useState<GroupParams | undefined>(undefined);
    const { jobListData, openedJobList } = useAppSelector(state => state.jobList)
    const [selectedindex, setSelectdeIndex] = useState(0)
    const [page, setPage] = useState<number>(1)
    const [groupPage, setGroupPage] = useState(1)
    const [groupData, setGroupData] = useState<GroupData[]>([])
    const [finalGroupData, setfinalGroupList] = useState<GroupParams[]>([])
    const [finalAllGroup, setFinalAllGroup] = useState<GroupParams[]>([])
    const { groupListData, selectedGroupData } = useAppSelector(state => state.groupList)

    useEffect(() => {
        if (isFocused) {
            dispatch(resetMapRoutesReducer())
        }
        jobListApiCall()
    }, [navigation, isFocused])

    useEffect(() => {
        let defaultSelected = finalGroupData.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    const jobListApiCall = (input?: string, id?: number) => {
        let params: jobListParams = {
            page: page,
            search: input,
            id: id != undefined ? id : selectedItem?.id ?? undefined,
            status: strings.open,
        }
        dispatch(jobStatusWiseList(params)).unwrap().then((res) => {
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
        if (finalGroupData.length) {
            let categoryList: any = [{ name: 'All', selected: true, id: 0 }]
            finalGroupData.map((listItem: GroupParams) => {
                categoryList.push({
                    name: listItem.name,
                    selected: false,
                    id: listItem.id
                });
                setFinalAllGroup(categoryList);
            });

            const data = categoryList.map((item: GroupParams) => {
                if (selectedGroupData.name != 'All') {
                    if (item.name == selectedGroupData.name) {
                        return {
                            ...item,
                            selected: !item.selected,
                        };
                    } else if (item.name == 'All') {
                        return {
                            ...item,
                            selected: false,
                        };
                    } else {
                        return item;
                    }
                } else {
                    if (item.name == 'All') {
                        return {
                            ...item,
                            selected: true,
                        };
                    } else {
                        return {
                            ...item,
                            selected: false,
                        };
                    }
                }
            })
            setFinalAllGroup(data)
            console.log({ data })
        }
    }, [finalGroupData, groupListData.results, selectedGroupData]);

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

    // for set source and destination address in redux 
    const handleAddressAndNavigation = () => {
        if (route?.params?.type == 'viewJob') {
            Geolocation.getCurrentPosition(
                position => {
                    Geocoder.geocodePosition({ lat: position?.coords?.latitude, lng: position?.coords?.longitude }).then((response: [{ formattedAddress: string }]) => {
                        let params = {
                            id: position.coords.latitude,
                            coordinates: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                            address: response[0].formattedAddress,
                            description: 'current location of user',
                            isCheckBlank: true
                        }
                        dispatch(manageMapRoutesReducer(params))
                    })
                })
            let params = {
                id: route?.params?.JobDetails?.coordinate ? route?.params?.JobDetails?.coordinate.latitude : 0,
                coordinates: {
                    latitude: route?.params?.JobDetails?.coordinate && route?.params?.JobDetails?.coordinate.latitude,
                    longitude: route?.params?.JobDetails?.coordinate && route?.params?.JobDetails?.coordinate.longitude,
                },
                address: route?.params?.JobDetails?.address,
                description: route?.params?.JobDetails?.description,
                isCheckBlank: true
            }
            dispatch(manageMapRoutesReducer(params))
            navigation.navigate("RouteScreen")
        } else {
            navigation.navigate("RouteScreen")
        }
    }

    const renderItem = ({ item }: { item: JobDetailsData }) => {
        return (
            <View style={{ paddingHorizontal: wp(2) }}>
                <CustomJobListComponent item={item} type='carousel' listStyle={{ height: hp(15) }} />
            </View>
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
                            <Text style={globalStyles.headerTitle}>{strings.place}</Text>
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
                            <Text style={styles.jobTypeTxt}>{selectedGroupData?.name ? selectedGroupData?.name : 'All'}</Text>
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
                data={finalAllGroup}
                defaultSelected={selectedGroupData}
                onSelectedTab={(item) => {
                    console.log({ item })
                    jobListApiCall('', item.id)
                    setSelectedItem(item)
                    dispatch(selectedGroupReducers(item))
                    refRBSheet.current?.close()
                }}
            />

            <MapView
                style={{ flex: 1 }}
                provider={'google'}
                customMapStyle={customMapStyle}
                region={route?.params?.type == 'viewJob' ? route?.params?.JobDetails?.coordinate : {
                    latitude: openedJobList.results[selectedindex]?.latitude ? Number(openedJobList.results[selectedindex].latitude) : 0,
                    longitude: openedJobList.results[selectedindex]?.longitude ? Number(openedJobList.results[selectedindex].longitude) : 0,
                    latitudeDelta: 0.04864195044303443,
                    longitudeDelta: 0.040142817690068,
                }}>
                {(route?.params?.type && route?.params?.type == 'viewJob' && route?.params?.JobDetails?.coordinate) ?
                    <Marker coordinate={route?.params?.JobDetails?.coordinate}>
                        <Animated.View style={[styles.markerWrap]}>
                            <Image source={(route?.params?.JobDetails?.images && route?.params?.JobDetails?.images[0]) ? { uri: route?.params?.JobDetails.images[0]?.image } : ImagesPath.selected_marker_pin}
                                style={styles.selected_markerPinIcon} />
                        </Animated.View>
                    </Marker>
                    :
                    openedJobList.results.map((marker, index) => {
                        if (marker.latitude != null) {
                            return (
                                <Marker key={index} coordinate={{
                                    latitude: Number(marker?.latitude), longitude: Number(marker.longitude),
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
                <TouchableOpacity style={[styles.routeBut, styles.routeButShadow]} onPress={() => handleAddressAndNavigation()}>
                    <Image source={ImagesPath.route_icon} style={styles.pathIconStyle} />
                </TouchableOpacity>
                <Carousel
                    data={route?.params?.type == 'viewJob' ? route?.params?.JobDetails ? [route?.params?.JobDetails].reverse() : [] : [...openedJobList?.results].reverse()}
                    width={wp("100%")}
                    height={wp('30%')}
                    loop={false}
                    scrollAnimationDuration={1000}
                    mode='parallax'
                    autoPlay={false}
                    style={globalStyles.rtlDirection}
                    renderItem={renderItem}
                    defaultIndex={openedJobList?.results?.length - 1}
                    onSnapToItem={(index: any) => {
                        setSelectdeIndex(index)
                    }}
                />
            </View>
        </View>
    )
}

export default MapScreen;
