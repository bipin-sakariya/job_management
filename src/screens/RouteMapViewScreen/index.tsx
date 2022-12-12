import { Image, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { customMapStyle, globalStyles } from '../../styles/globalStyles'
import { BottomSheet, CustomStatusBtn, CustomSubTitleWithImageComponent, Header } from '../../components'
import { colors } from '../../styles/Colors'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import MapView, { Marker } from 'react-native-maps'
import RBSheet from 'react-native-raw-bottom-sheet'
import { strings } from '../../languages/localizedStrings'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSizes from '../../styles/FontSizes'
import { styles } from './styles'
import { getDistance, getPreciseDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAP_API } from '../../config/Host'
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import DashedLine from 'react-native-dashed-line'
import { location } from '../../types/commanTypes'


interface JobDetail {
    id: number
    time: string
    title: string
    description: string
    coordinates: {
        latitude: number
        longitude: number
    }
    status?: string
}

const RouteMapViewScreen = () => {
    const [jobDetail, setJobDetail] = useState<JobDetail[]>([])
    const navigation = useCustomNavigation('RouteMapViewScreen');
    const refRouteRBSheet = useRef<RBSheet | null>(null);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null)
    const [showBottomModel, setShowBottomModel] = useState<boolean>(false)

    useEffect(() => {
        refRouteRBSheet.current?.open()
        setShowBottomModel(true)
    }, [])

    useEffect(() => {
        const data: JobDetail[] = [
            { id: 0, time: '09:00', title: 'Event 1', description: 'Event 1 Description', coordinates: { latitude: 4.659710, longitude: 18.201869 }, },
            { id: 1, time: '10:45', title: 'Event 2', description: 'Event 2 Description', coordinates: { latitude: 4.558415, longitude: 18.276076 } },
            { id: 2, time: '12:00', title: 'Event 3', description: 'Event 3 Description', coordinates: { latitude: 4.394123, longitude: 18.501446 } },
            { id: 3, time: '14:00', title: 'Event 4', description: 'Event 4 Description', coordinates: { latitude: 3.948409, longitude: 18.471092 } },
            { id: 4, time: '16:30', title: 'Event 5', description: 'Event 5 Description', coordinates: { latitude: 7.208756, longitude: 18.501446 } }
        ]
        setJobDetail(data)
    }, [])


    // const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    // 21.240880638879975, 72.88060530857202
    const origin = { latitude: 21.240880638879975, longitude: 72.88060530857202 };
    // const destination = { latitude: 37.771707, longitude: -122.4053769 };
    //21.21519161004509, 72.88814448486836
    const destination = { latitude: 21.21519161004509, longitude: 72.88814448486836 };

    const calculateDistance = (location1: location, location2: location) => {
        let dis = getDistance(location1, location2);
        console.log('distance', `${dis / 1000} KM`)
        return `${dis / 1000} KM`
    };

    const calculatePreciseDistance = (location1: location, location2: location) => {
        let pdis = getPreciseDistance(location1, location1);
        console.log('distance', `${pdis / 1000} KM`)
        return `${pdis / 1000} KM`
    };

    // const renderDetail = (rowData: any, sectionID: number, rowID: number) => {
    const renderDetail = ({ item, getIndex, isActive, drag }: RenderItemParams<JobDetail>) => {
        console.log("UPDATE===", { item, index: getIndex(), isActive, drag })
        // console.log("dataaa", { item, id: item.id, getIndex: getIndex() })
        // console.log("dataaa.length - 1 != index", { len: jobDetail.length, con: jobDetail.length - 1 != getIndex() })
        // console.log("dataaa[index + 1]?.coordinates", { next: data[item.id + 1]?.coordinates, index })
        // let rowData = item
        // let sectionID = index
        let currIndex = getIndex()
        return (
            <ScaleDecorator>
                <TouchableOpacity style={styles.mainTimeLineView} onLongPress={drag} disabled={isActive}>
                    {(jobDetail.length - 1 != getIndex() && selectedAddressIndex !== getIndex()) && <DashedLine style={{ alignItems: "center", height: '90%', position: "absolute", top: 42, left: 10 }} axis='vertical' dashLength={5} dashColor={colors.gray_1} />}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginTop: wp(5), marginRight: wp(3) }}>
                            <Text style={styles.indexValue}>{getIndex()}</Text>
                        </View>
                        <View style={[globalStyles.rowView, { marginBottom: jobDetail.length <= 2 ? wp(1) : wp(3), flex: 1, }]}>
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
                                        <Text numberOfLines={1} style={[styles.commonDarkTxt, globalStyles.rtlStyle, { textAlign: "left" }]}>Your Current location</Text>
                                    </View>
                                    <CustomStatusBtn txtStyle={{ ...styles.smallBut, ...globalStyles.rtlStyle }} style={{ ...styles.openButton }} title='button' />
                                </View>
                                {
                                    jobDetail.length <= 2 &&
                                    <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { marginHorizontal: wp(3) }]}>13 may 2022</Text>
                                }
                                <View style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(3) }]}>
                                    <Text numberOfLines={jobDetail.length <= 2 ? 2 : 1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { width: '60%', color: colors.dark_blue2_color, fontSize: FontSizes.EXTRA_SMALL_12 }]}>{jobDetail.length <= 2 ? "Lorem Ipsum הוא פשוט טקסט דמה של הכתיבה......." : "13 may 2022"}</Text>
                                    <View style={[globalStyles.rowView, { direction: "ltr" }]}>
                                        <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.mapPinStyle} />
                                        <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { maxWidth: wp(25) }]}>5 km away</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View >
                    {
                        (jobDetail.length - 1 != currIndex) &&
                        <View style={{ marginLeft: wp(10) }}>
                            <Text numberOfLines={1} style={[styles.commonDarkTxt, globalStyles.rtlStyle,]}>{calculateDistance(item?.coordinates, jobDetail[getIndex() + 1]?.coordinates)}</Text>
                            <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle]}>8 min Drive</Text>
                        </View>
                    }
                </TouchableOpacity >
            </ScaleDecorator>
        )
    }


    return (
        <View style={globalStyles.container}>
            <Header
                containerStyle={{ backgroundColor: colors.white }}
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle, { marginHorizontal: wp(2) }]}>{strings.Route}</Text>
                    </TouchableOpacity>
                }
            />
            <MapView
                style={{ flex: 1 }}
                provider={'google'}
                customMapStyle={customMapStyle}
                region={{
                    // latitude: 37.3318456,
                    // longitude: -122.0296002,
                    ...origin,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} >
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAP_API}
                    strokeWidth={6}
                    waypoints={[{ latitude: 21.231550647089815, longitude: 72.86620565393997 },]}
                    //  { latitude: 21.204841593085703, longitude: 72.84109955506634 }
                    strokeColor={colors.black}
                />
                <Marker coordinate={origin} >
                    <Image source={ImagesPath.selected_marker_pin} style={{ height: wp(12), width: wp(12) }} />
                </Marker>
                <Marker coordinate={{ latitude: 21.231550647089815, longitude: 72.86620565393997 }} >
                    <Image source={ImagesPath.selected_marker_pin} style={{ height: wp(12), width: wp(12) }} />
                </Marker>
                <Marker coordinate={destination} >
                    <Image source={ImagesPath.selected_marker_pin} style={{ height: wp(12), width: wp(12) }} />
                </Marker>
            </MapView>
            <BottomSheet
                ref={refRouteRBSheet}
                height={350}
                children={
                    <View style={{ paddingHorizontal: wp(4), flex: 1 }}>
                        <CustomSubTitleWithImageComponent disabled title={strings.SeetheDistance} image={ImagesPath.route_drak_line_icon} titleStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.dark_blue2_color }} />
                        <DraggableFlatList
                            data={jobDetail}
                            keyExtractor={(item) => item.time}
                            renderItem={renderDetail}
                            // showsVerticalScrollIndicator={false}
                            onDragEnd={({ data }) => {
                                console.log('onDragEnd', { data })
                                setSelectedAddressIndex(null)
                                setJobDetail(data)
                            }}
                            onDragBegin={(index) => {
                                console.log("onDragBegin", { index })
                                setSelectedAddressIndex(index)
                            }}
                            containerStyle={{ flex: 1 }}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                            style={{}}
                            extraData={jobDetail}
                        />
                        {/* </NestableScrollContainer> */}
                    </View>
                }
            />
            {/* <Modal visible={showBottomModel} transparent={true} onRequestClose={() => setShowBottomModel(false)} style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ paddingHorizontal: wp(4), flex: 1 }}>
                    <CustomSubTitleWithImageComponent disabled title={strings.SeetheDistance} image={ImagesPath.route_drak_line_icon} titleStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.dark_blue2_color }} />
                    <DraggableFlatList
                        data={jobDetail}
                        keyExtractor={(item) => item.time}
                        renderItem={renderDetail}
                        // showsVerticalScrollIndicator={false}
                        onDragEnd={({ data }) => {
                            console.log('onDragEnd', { data })
                            setSelectedAddressIndex(null)
                            setJobDetail(data)
                        }}
                        onDragBegin={(index) => {
                            console.log("onDragBegin", { index })
                            setSelectedAddressIndex(index)
                        }}
                        containerStyle={{ flex: 1 }}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        style={{}}
                        extraData={jobDetail}
                    />
                    {/* </NestableScrollContainer> */}
            {/* </View>
            </Modal> */}
        </View>
    )
}

export default RouteMapViewScreen
