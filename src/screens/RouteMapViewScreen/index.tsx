import React, { memo, useEffect, useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { customMapStyle, globalStyles } from '../../styles/globalStyles'
import { CustomStatusBtn, CustomSubTitleWithImageComponent, Header } from '../../components'
import { colors } from '../../styles/Colors'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import MapView, { Marker } from 'react-native-maps'
import { strings } from '../../languages/localizedStrings'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSizes from '../../styles/FontSizes'
import { styles } from './styles'
import { getDistance, getPreciseDistance } from 'geolib';
import MapViewDirections, { MapDirectionsLegs } from 'react-native-maps-directions'
import { GOOGLE_MAP_API } from '../../config/Host'
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import DashedLine from 'react-native-dashed-line'
import { location } from '../../types/commanTypes'
import { useAppSelector } from '../../hooks/reduxHooks'
import { LocationData } from '../../redux/slices/MapSlice/MapSlice'
import { convertDate } from '../../utils/screenUtils'


interface JobDetail {
    id: number
    time: string
    title: string
    description: string
    coordinates: Coordinates
    status?: string
}

interface Coordinates {
    latitude: number
    longitude: number
}

interface RenderDetailProps extends RenderItemParams<LocationData> {
    jobDetail: LocationData[]
    selectedAddressIndex: number | null
    isOnlySourceAndDestination: boolean
    distanceAndDuration: MapDirectionsLegs | []
}

const RenderDetail = memo(({ item, getIndex, isActive, drag, jobDetail, selectedAddressIndex, isOnlySourceAndDestination, distanceAndDuration }: RenderDetailProps) => {
    const [distanceFromSource, setDistanceFromSource] = useState<string>('')

    const getDistanceFromLatLong = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${lat2 + "," + lon2}&waypoints=&destination=${lat1 + "," + lon1}&mode=driving&language=he&region=undefined&key=AIzaSyB4UlbIcjYgMoBLJ_dpWmhwr24VHSeiFpw`
        fetch(url)
            .then(res => res.json())
            .then((res) => {
                console.log("SUCCESSS ---------->>>>>>> ", { res })
                setDistanceFromSource(res?.routes[0].legs[0].distance?.text)
            }).catch((e) => {
                console.log("**GET DISTANCE --------------------------------------------------------------**", { e })
                console.log("**LAT LONG ----------------------------------", lat1, lon1, lat2, lon2)
                setDistanceFromSource('')
            })
    }

    useEffect(() => {
        getIndex() != 0 && getDistanceFromLatLong(item?.coordinates?.latitude, item?.coordinates?.longitude, jobDetail[0]?.coordinates?.latitude, jobDetail[0]?.coordinates?.longitude)
    }, [jobDetail]);

    console.log("RenderDetail --", { jobDetail, item })
    let currIndex = getIndex() ?? 0
    return (
        <ScaleDecorator>
            <TouchableOpacity style={styles.mainTimeLineView} onLongPress={drag} disabled={isActive}>
                {(jobDetail.length - 1 != getIndex() && selectedAddressIndex !== getIndex()) && <DashedLine style={styles.dashedLine} axis='vertical' dashLength={5} dashColor={colors.gray_1} />}
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.timeLineContainer}>
                        {isOnlySourceAndDestination ?
                            <Image source={getIndex() == 0 ? ImagesPath.checkBlackCircle : getIndex() == 1 && ImagesPath.mapGrayPin} style={[styles.sourceIconStyle, { tintColor: getIndex() == 1 ? colors.black : undefined, right: getIndex() == 1 ? -1 : undefined }]} />
                            :
                            <Text style={styles.indexValue}>{getIndex()}</Text>
                        }
                    </View>
                    <View style={[globalStyles.rowView, { marginBottom: jobDetail.length <= 2 ? wp(1) : wp(3), flex: 1 }]}>
                        <View style={[globalStyles.centerView, styles.imageView, { height: jobDetail.length <= 2 ? wp(16) : wp(15), width: jobDetail.length <= 2 ? wp(16) : wp(15) }]}>
                            <Image source={ImagesPath.image_white_border} style={[styles.imageStyle]} />
                        </View>
                        <View style={styles.itemDetailsView}>
                            <View style={[globalStyles.rowView, styles.itemAndBtnView]}>
                                <View style={[globalStyles.rowView,]}>
                                    {
                                        item?.status &&
                                        <Image source={ImagesPath.infocircle_icon} style={styles.infoImageView} />
                                    }
                                    <Text numberOfLines={1} style={[styles.commonDarkTxt, globalStyles.rtlStyle, { textAlign: "left" }]}>{item?.description}</Text>
                                </View>
                                <CustomStatusBtn txtStyle={{ ...styles.smallBut, ...globalStyles.rtlStyle }} style={{ ...styles.openButton }} title='button' />
                            </View>
                            {
                                jobDetail.length <= 2 &&
                                <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { marginHorizontal: wp(3) }]}>{convertDate('2022-12-05T12:57:17.611704Z')}</Text>
                            }
                            <View style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(3) }]}>
                                <Text numberOfLines={jobDetail.length <= 2 ? 2 : 1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { width: '60%', color: colors.dark_blue2_color, fontSize: FontSizes.EXTRA_SMALL_12 }]}>{jobDetail.length <= 2 ? "Lorem Ipsum הוא פשוט טקסט דמה של הכתיבה......." : "13 may 2022"}</Text>
                                {currIndex != 0 &&
                                    <View style={[globalStyles.rowView, { direction: "ltr" }]}>
                                        <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.mapPinStyle} />
                                        <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { maxWidth: wp(25) }]}>{distanceFromSource}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </View >
                {
                    (jobDetail.length - 1 != currIndex) &&
                    <View style={{ marginLeft: wp(10) }}>
                        <Text numberOfLines={1} style={[styles.commonDarkTxt, globalStyles.rtlStyle,]}>{distanceAndDuration[currIndex]?.distance?.text}</Text>
                        <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle]}> {distanceAndDuration[currIndex]?.duration?.text} {strings.drive}  </Text>
                    </View>
                }
            </TouchableOpacity >
        </ScaleDecorator>
    )
})

const RouteMapViewScreen = () => {
    const navigation = useCustomNavigation('RouteMapViewScreen');

    const { finalJobRouteList } = useAppSelector(state => state.mapData)

    const [jobDetail, setJobDetail] = useState<LocationData[]>([])
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null)
    const [wayPoints, setWayPoints] = useState<Coordinates[]>([])
    const [isOnlySourceAndDestination, setIsOnlySourceAndDestination] = useState(false)
    const [distanceAndDuration, setDistanceAndDuration] = useState<MapDirectionsLegs | []>([])

    useEffect(() => {
        setJobDetail(finalJobRouteList)
    }, [finalJobRouteList])

    useEffect(() => {
        handleWayPoints()
    }, [jobDetail])


    const handleWayPoints = () => {
        setIsOnlySourceAndDestination(finalJobRouteList.length <= 2 ? true : false)
        let wayPointsArray: Coordinates[] = []
        jobDetail.slice(1, jobDetail.length - 1).map((jobInfo) => {
            jobInfo?.coordinates && wayPointsArray.push(jobInfo?.coordinates)
        })
        console.log("WAY POINTS ==", { wayPointsArray })
        wayPointsArray.length && setWayPoints(wayPointsArray)
    }
    const origin = { latitude: 21.240880638879975, longitude: 72.88060530857202 };
    const destination = { latitude: 21.21519161004509, longitude: 72.88814448486836 };

    const calculateDistance = (location1: location, location2: location) => {
        let dis = getDistance(location1, location2);
        console.log('distance', `${dis / 1000} KM`)
        return `${dis / 1000}`
    };

    const calculatePreciseDistance = (location1: location, location2: location) => {
        let pdis = getPreciseDistance(location1, location1);
        console.log('distance', `${pdis / 1000} KM`)
        return `${pdis / 1000} KM`
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180)
    }

    return (
        <View style={[globalStyles.container]}>
            <Header
                containerStyle={{ backgroundColor: colors.white }}
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle, { marginHorizontal: wp(2) }]}>{strings.route}</Text>
                    </TouchableOpacity>
                }
            />
            <MapView
                style={{ height: hp(60) }}
                provider={'google'}
                customMapStyle={customMapStyle}
                region={
                    (jobDetail.length > 0) ? {
                        ...jobDetail[0]?.coordinates,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    } :
                        {
                            latitude: 37.3318456,
                            longitude: -122.0296002,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }} >
                {(jobDetail.length > 0) &&
                    <>
                        <MapViewDirections
                            origin={jobDetail[0]?.coordinates}
                            destination={jobDetail[jobDetail.length - 1]?.coordinates}
                            apikey={GOOGLE_MAP_API}
                            strokeWidth={6}
                            language={"he"}
                            waypoints={wayPoints}
                            strokeColor={colors.black}
                            onReady={result => {
                                console.log('Distance: Duration', { result, jobDetail })
                                setDistanceAndDuration(result?.legs)
                            }}
                            onError={(e) => {
                                console.log("ERROR WHILE MAP DIREACTION -----", e)
                            }}
                        />
                        <Marker coordinate={jobDetail[0]?.coordinates} >
                            <Image source={ImagesPath.sourceMarker} style={{ height: wp(16), width: wp(15) }} />
                        </Marker>
                        {jobDetail.slice(1, jobDetail.length - 1).map((location) => {
                            return (
                                <Marker coordinate={location?.coordinates} >
                                    <Image source={ImagesPath.selected_marker_pin} style={{ height: wp(12), width: wp(12) }} />
                                </Marker>
                            )
                        })}

                        <Marker coordinate={jobDetail[jobDetail.length - 1]?.coordinates} >
                            <Image source={ImagesPath.sourceMarker} style={{ height: wp(16), width: wp(15) }} />
                        </Marker>
                    </>}
            </MapView>
            <View style={styles.jobListContainer}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <CustomSubTitleWithImageComponent disabled title={strings.seeTheDistance} image={ImagesPath.route_drak_line_icon} titleStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.dark_blue2_color }} />
                    <DraggableFlatList
                        data={jobDetail}
                        keyExtractor={(item) => {
                            return item?.index ? item?.index.toString() : item?.id.toString()
                        }}
                        renderItem={({ drag, getIndex, isActive, item }) => <RenderDetail drag={drag} getIndex={() => getIndex()} isActive={isActive} item={item} distanceAndDuration={distanceAndDuration} isOnlySourceAndDestination={isOnlySourceAndDestination} jobDetail={jobDetail} selectedAddressIndex={selectedAddressIndex} />}
                        showsVerticalScrollIndicator={false}
                        onDragEnd={({ data }) => {
                            setSelectedAddressIndex(null)
                            setJobDetail(data)
                        }}
                        onDragBegin={(index) => {
                            setSelectedAddressIndex(index)
                        }}
                        containerStyle={{ flex: 1 }}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        style={{}}
                        extraData={jobDetail}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default RouteMapViewScreen
