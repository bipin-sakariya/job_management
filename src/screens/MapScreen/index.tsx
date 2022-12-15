import { Image, Platform, Text, TouchableOpacity, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import { customMapStyle, globalStyles } from '../../styles/globalStyles';
import { CustomJobListComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DrawerActions, useIsFocused, useRoute } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomBottomSheet, { ListDataProps } from '../../components/CustomBottomSheet';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../styles/Colors';
import Carousel from 'react-native-snap-carousel';
import CustomJobBottomListSheet from '../../components/CustomJobBottomListSheet';
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { resetMapRoutesReducer } from '../../redux/slices/MapSlice/MapSlice';
import { RootRouteProps } from '../../types/RootStackTypes';


const data = [
    { id: 1, title: strings.all, selected: true },
    { id: 2, title: strings.PMaintanence, selected: false },
    { id: 3, title: strings.Paint, selected: false },
    { id: 4, title: strings.Council, selected: false },
]
const JobData =
{
    data: [
        {
            title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info",
            coordinate: {
                latitude: 45.524548,
                longitude: -122.6749817,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        },
        {
            title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", status: "info",
            coordinate: {
                latitude: 45.524698,
                longitude: -122.6655507,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        },
        {
            title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer",
            coordinate: {
                latitude: 45.5230786,
                longitude: -122.6701034,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        },
        {
            title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", status: "info", coordinate: {
                latitude: 45.521016,
                longitude: -122.6561917,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        },
        {
            title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info",
            coordinate: {
                latitude: 45.540004,
                longitude: -122.66268,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        },
        {
            title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open",
            coordinate: {
                latitude: 45.536183,
                longitude: -122.671400,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        }
    ],
    region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
    },
}
const MapScreen = () => {
    const navigation = useCustomNavigation('MapScreen')
    const refRBSheet = useRef<RBSheet | null>(null);
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()
    const route = useRoute<RootRouteProps<'MapScreen'>>();

    const [selectedItem, setSelectedItem] = useState<ListDataProps | undefined>(undefined);
    const [selectedindex, setSelectdeIndex] = useState(0)

    useEffect(() => {
        dispatch(resetMapRoutesReducer())
    }, [navigation, isFocused])

    useEffect(() => {
        let defaultSelected = data.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item} type='carousel' />
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
                            <Text style={styles.jobTypeTxt}>{selectedItem?.title}</Text>
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
                data={data}
                onSelectedTab={(item) => {
                    setSelectedItem(item)
                    refRBSheet.current?.close()
                }}
            />
            <MapView
                style={{ flex: 1 }}
                provider={'google'}
                customMapStyle={customMapStyle}
                region={route?.params?.type == 'viewJob' ? route?.params?.JobDetails?.coordinate : JobData.data[selectedindex].coordinate}>
                {route?.params?.type == 'viewJob' ?
                    <Marker coordinate={route?.params?.JobDetails?.coordinate}>
                        <Animated.View style={[styles.markerWrap]}>
                            <Image source={ImagesPath.selected_marker_pin}
                                style={styles.selected_markerPinIcon} />
                        </Animated.View>
                    </Marker>
                    :
                    JobData.data.map((marker, index) => {
                        return (
                            <Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap]}>
                                    <Image source={selectedindex == index ? ImagesPath.selected_marker_pin : ImagesPath.unselected_marker_pin}
                                        style={[selectedindex == index ? styles.selected_markerPinIcon : styles.unselected_markerPinIcon]} />
                                </Animated.View>
                            </Marker>
                        )
                    })
                }

            </MapView>
            <View style={[styles.carouselStyle, { bottom: wp(5) }]}>
                <TouchableOpacity style={[styles.routeBut, styles.routeButShadow]} onPress={() => navigation.navigate("RouteScreen")}>
                    <Image source={ImagesPath.route_icon} style={styles.pathIconStyle} />
                </TouchableOpacity>
                <Carousel
                    data={route?.params?.type == 'viewJob' ? [route?.params?.JobDetails] : JobData.data}
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
