import { FlatList, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { LocationData, resetJobLocation, setDestination, setRouteList, setSource } from '../../redux/slices/MapSlice/MapSlice';
import { location } from '../../types/commanTypes';
import Geocoder from 'react-native-geocoder';
import { getAddress } from '../../utils/screenUtils';
import { store } from '../../redux/Store';
import { useIsFocused } from '@react-navigation/native';


interface JobDetail {
    title: string
    id: number
    description: string
}

const locationn = [
    { latitude: 21.247181, longitude: 72.890877 },
    { latitude: 21.228125, longitude: 72.833771 },
    { latitude: 21.214088, longitude: 72.887639 },
    { latitude: 21.211527, longitude: 72.853284 },
    { latitude: 21.230250, longitude: 72.813096 },
]

const RouteScreen = () => {
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()
    const [sourceAddress, setSourceAddress] = useState<String>('')
    const [destinationAddress, setDestinationAddress] = useState<String>('')
    const [selectedAddress, setSelectedAddress] = useState<JobDetail[]>([]);
    const { job_location, routeList } = useAppSelector(state => state.mapData)
    const [locationList, setLocationList] = useState<location[]>([]);
    const navigation = useCustomNavigation('RouteScreen');

    const JobData = [
        { id: 1, title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
        { id: 2, title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", status: "info" },
        { id: 3, title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer" },
        { id: 4, title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", status: "info" },
        { id: 5, title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
        { id: 6, title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" }
    ]

    const handleJobSelection = (address: JobDetail) => {
        console.log({ address })
        if (!sourceAddress) {
            setSourceAddress(address)
        } else if (!destinationAddress) {
            setDestinationAddress(address)
        } else {
            let addresses = [...selectedAddress, address]
            console.log({ addresses, con: selectedAddress.length <= 8 })
            selectedAddress.length <= 8 && setSelectedAddress(addresses)
        }
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item} onPress={() => handleJobSelection(item)} />
        )
    }

    // const getAddress = (location: location) => {
    //     Geocoder.geocodePosition({ lat: location?.latitude, lng: location?.longitude }).then((res: any) => {
    //         setAddres(res[0]?.formattedAddress)
    //         console.log(res[0]?.formattedAddress)
    //     }).catch((err: any) => console.log(err))
    // }

    useEffect(() => {
        let job = store?.getState()?.mapData?.job_location


        let locationListData: LocationData[] = routeList
        // console.log("beforelist", locationListData)
        console.log("job_location_main", job)

        const unsubscribe = navigation.addListener('focus', () => {
            // console.log("job_location_main2", job)

            if (job && !sourceAddress) {
                // console.log(getAddress(job))
                // setSourceAddress(getAddress(job))
            }

            // if (job) {
            //     locationListData.push(job)
            // }
            // console.log("afterlist", locationListData)
            // setLocationList(locationListData)
            // dispatch(setRouteList(locationList))

        });
        return unsubscribe;
    }, [navigation, sourceAddress])


    const getLocation = async (isFocus: boolean) => {
        if (isFocus && job_location) {
            let location_res = await getAddress(job_location)
            if (!sourceAddress) {
                setSourceAddress(location_res)
                dispatch(setSource(job_location))
            }
            else if (!destinationAddress) {
                setDestinationAddress(location_res)
                dispatch(setDestination(job_location))
            } else {
                dispatch(setRouteList([]))
            }
        }
    }

    useEffect(() => {
        getLocation(isFocus)
    }, [isFocus, job_location])


    // useEffect(() => {

    // }, [sourceAddress])



    return (
        <ScrollView style={globalStyles.container}>
            <Header
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, { marginHorizontal: wp(2) }]}>{strings.Route}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <View style={[globalStyles.rowView, { alignItems: "flex-start", marginTop: wp(3) }]}>
                    <Image source={ImagesPath.map_direction_icon} style={styles.mapdirectionIcon} />
                    <View style={{ flex: 1 }}>
                        <View style={styles.btnContainer}>
                            <Text style={[styles.textInputStyle, globalStyles.rtlStyle, { flex: 1, marginBottom: 0 }]} onPress={() => navigation.navigate("RouteChooseLocationDetailScreen")}>
                                {sourceAddress ? sourceAddress : strings.ChooseStartingLocation}
                            </Text>
                            {sourceAddress && <TouchableOpacity style={styles.closeIconContainer} onPress={() => setSourceAddress('')}>
                                <Image source={ImagesPath.close_icon} style={styles.closeIcon} />
                            </TouchableOpacity>}
                        </View>
                        <View style={styles.btnContainer}>
                            <Text style={[styles.textInputStyle, globalStyles.rtlStyle, { flex: 1, marginBottom: 0 }]} onPress={() => navigation.navigate("RouteChooseLocationDetailScreen")}>
                                {destinationAddress ? destinationAddress : strings.ChooseDestination}
                            </Text>
                            {destinationAddress && <TouchableOpacity style={styles.closeIconContainer} onPress={() => setDestinationAddress('')}>
                                <Image source={ImagesPath.close_icon} style={styles.closeIcon} />
                            </TouchableOpacity>}
                        </View>
                        {selectedAddress.length ? selectedAddress.slice(0, 8).map((item) => {
                            console.log({ item })
                            return (
                                <View style={styles.btnContainer}>
                                    <Text style={[styles.textInputStyle, globalStyles.rtlStyle, { flex: 1, marginBottom: 0 }]} onPress={() => navigation.navigate("RouteChooseLocationDetailScreen")}>
                                        {item?.title}
                                    </Text>
                                    <TouchableOpacity style={styles.closeIconContainer} onPress={() => {
                                        let latestAddress = selectedAddress.filter((i) => i.id !== item.id)
                                        setSelectedAddress(latestAddress)
                                    }}>
                                        <Image source={ImagesPath.close_icon} style={styles.closeIcon} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null}

                        <CustomDashedComponent
                            title={strings.AddOtherField}
                            image={ImagesPath.plus_circle_white_border_icon}
                            onPress={() => {
                                navigation.navigate("RouteChooseLocationDetailScreen")
                                dispatch(resetJobLocation())
                                dispatch(setRouteList([]))
                            }}
                            viewStyle={{ paddingVertical: wp(3), borderColor: colors.bottom_sheet_tab, marginTop: wp(0) }}
                            textStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.dark_blue1_color }}
                        />
                    </View>
                </View>
                <CustomSubTitleWithImageComponent disabled title={strings.Recent} image={ImagesPath.clock_counter_clockwise_icon} />
                <FlatList
                    data={JobData}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: wp(20) }}
                />
                <CustomBlackButton
                    title={strings.Done}
                    textStyle={{ marginVertical: wp(1) }}
                    image={ImagesPath.route_icon}
                    buttonStyle={{ ...styles.boxShadowStyle, bottom: Platform.OS == "ios" ? wp(5) : 0 }}
                    onPress={() => {
                        navigation.navigate("RouteMapViewScreen")
                    }}
                />
            </Container>
        </ScrollView >
    )
}

export default RouteScreen