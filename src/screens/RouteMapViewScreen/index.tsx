import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { customMapStyle, globalStyles } from '../../styles/globalStyles'
import { BottomSheet, CustomBottomSheet, CustomStatusBtn, CustomSubTitleWithImageComponent, Header } from '../../components'
import { colors } from '../../styles/Colors'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import MapView from 'react-native-maps'
import RBSheet from 'react-native-raw-bottom-sheet'
import { strings } from '../../languages/localizedStrings'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSizes from '../../styles/FontSizes'
import Timeline from 'react-native-timeline-flatlist'
import { styles } from './styles'
import Dash from 'react-native-dash'
import fonts from '../../styles/Fonts'

const RouteMapViewScreen = () => {
    const navigation = useCustomNavigation('RouteMapViewScreen');
    const refRouteRBSheet = useRef<RBSheet | null>(null);
    useEffect(() => {
        refRouteRBSheet.current?.open()
    }, [])
    const data = [
        { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
        { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
        { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
        { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
        { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
    ]
    console.log(data.length);


    const renderDetail = (rowData: any, sectionID: number, rowID: number) => {
        return (
            <View style={styles.mainTimeLineView}>
                <View style={[globalStyles.rowView, { marginBottom: data.length <= 2 ? wp(1) : wp(3), flex: 1, }]}>
                    <View style={[globalStyles.centerView, styles.imageView, { height: data.length <= 2 ? wp(16) : wp(15), width: data.length <= 2 ? wp(16) : wp(15) }]}>
                        <Image source={ImagesPath.image_white_border} style={[styles.imageStyle]} />
                    </View>
                    <View style={styles.itemDetailsView}>
                        <View style={[globalStyles.rowView, styles.itemAndBtnView]}>
                            <View style={[globalStyles.rowView,]}>
                                {
                                    rowData?.status &&
                                    <Image source={ImagesPath.infocircle_icon} style={styles.infoImageView} />
                                }
                                <Text numberOfLines={1} style={[styles.commonDarkTxt, globalStyles.rtlStyle, { textAlign: "left" }]}>Your Current location</Text>
                            </View>
                            <CustomStatusBtn txtStyle={{ ...styles.smallBut, ...globalStyles.rtlStyle }} style={{ ...styles.openButton }} title='button' />
                        </View>
                        {
                            data.length <= 2 &&
                            <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { marginHorizontal: wp(3) }]}>13 may 2022</Text>
                        }
                        <View style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(3) }]}>
                            <Text numberOfLines={data.length <= 2 ? 2 : 1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { width: '60%', color: colors.dark_blue2_color, fontSize: FontSizes.EXTRA_SMALL_12 }]}>{data.length <= 2 ? "Lorem Ipsum ?????? ???????? ???????? ?????? ???? ????????????......." : "13 may 2022"}</Text>
                            <View style={[globalStyles.rowView, { direction: "ltr" }]}>
                                <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.mapPinStyle} />
                                <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle, { maxWidth: wp(25) }]}>5 km away</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    data.length - 1 != sectionID &&
                    <>
                        <Text numberOfLines={1} style={[styles.commonDarkTxt, globalStyles.rtlStyle,]}>300 M  Distance</Text>
                        <Text numberOfLines={1} style={[styles.commonLightTxt, globalStyles.rtlStyle]}>8 min Drive</Text>
                    </>
                }
            </View>
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
                    latitude: 42.882004,
                    longitude: 74.582748,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} />
            <BottomSheet
                ref={refRouteRBSheet}
                height={350}
                children={
                    <View style={{ paddingHorizontal: wp(4), flex: 1 }}>
                        <CustomSubTitleWithImageComponent disabled title={strings.SeetheDistance} image={ImagesPath.route_drak_line_icon} titleStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.dark_blue2_color }} />
                        <Timeline
                            data={data}
                            circleSize={20}
                            showTime={false}
                            dashLine={true}
                            columnFormat={'single-column-left'}
                            renderCircle={(rowData: any, sectionID: number, rowID: number) => {
                                return (
                                    <View style={[styles.boxView, { borderWidth: data.length <= 2 ? 0 : wp(0.3), }]} >
                                        {
                                            data.length <= 2
                                                ?
                                                <Image source={sectionID == 0 ? ImagesPath.check_circle_fill_icon : ImagesPath.map_pin_fill_icon} style={{ height: wp(8), width: wp(8), backgroundColor: colors.white_5, resizeMode: 'contain' }} />
                                                :
                                                <Text style={{ color: colors.dark_blue1_color }}>{sectionID}</Text>
                                        }
                                    </View>
                                )
                            }}
                            renderDetail={renderDetail}
                            isUsingFlatlist={true}
                        />
                    </View>
                }
            />
        </View>
    )
}

export default RouteMapViewScreen
