import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { customMapStyle, globalStyles } from '../../styles/globalStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MapView, { Marker } from 'react-native-maps';
import { CustomBlackButton, Header } from '../../components';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { strings } from '../../languages/localizedStrings';
import { ImagesPath } from '../../utils/ImagePaths';
import { colors } from '../../styles/Colors';
import Geolocation from '@react-native-community/geolocation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import { manageMapRoutesReducer, setJobLocation, storeCreateJoblocationReducer } from '../../redux/slices/MapSlice/MapSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { styles } from './styles';
import Geocoder from 'react-native-geocoder';
import { MapPositionProps } from '../../types/commanTypes';

const JobData = [
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" }
]

const CreateJobMapScreen = () => {

    const navigation = useCustomNavigation('CreateJobMapScreen')
    const route = useRoute<RootRouteProps<'CreateJobMapScreen'>>();
    const mapRef = useRef<MapView>(null);
    const dispatch = useAppDispatch()

    const [isCurrentLoaction, setIsCurruntLocation] = useState(false)
    const [address, setAddres] = useState('')
    const [curruntLoaction, setCurruntLoaction] = useState<MapPositionProps | undefined>(undefined);
    const [tapLoaction, setTapLoaction] = useState<MapPositionProps | null>(null);
    const [ChoosefromMap, setChooseFromMap] = useState(false)

    useEffect(() => {
        console.log({ route })
        if (route.params?.isEditing) {
            getUserCurrentLocation()
        } else {
            setTapLoaction({
                latitude: route.params?.jobLocation?.latitude ?? 0,
                longitude: route.params?.jobLocation?.longitude ?? 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }

    }, [])

    const getUserCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                setCurruntLoaction({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
                let params = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                getAddress(params)
                setTapLoaction({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
                console.log(position)
                if (!route?.params?.isButtonVisible) {
                    setChooseFromMap(true)
                    setTapLoaction({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                    getAddress({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                }
            },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 20000 },
        );
    }

    useEffect(() => {
        if (route?.params?.isButtonVisible) {
            setIsCurruntLocation(true)
        }
        console.log(isCurrentLoaction, curruntLoaction)
        if (isCurrentLoaction && curruntLoaction) {
            mapRef.current?.animateToRegion(curruntLoaction, 1000);
            setTapLoaction(curruntLoaction)
            dispatch(setJobLocation({
                latitude: curruntLoaction.latitude,
                longitude: curruntLoaction.longitude
            }))
        }

    }, [isCurrentLoaction])

    const getAddress = (location: MapPositionProps) => {
        if (location) {
            console.log({ lat: curruntLoaction?.latitude, lng: curruntLoaction?.longitude })
            Geocoder.geocodePosition({ lat: location?.latitude, lng: location?.longitude }).then((res: any) => {
                setAddres(res[0]?.formattedAddress ?? `${location?.latitude} ${location?.longitude}`)
                console.log(res[0]?.formattedAddress)
            }).catch((err: any) => console.log(err))
        }
    }

    return (
        <View style={globalStyles.container}>
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

            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                provider={'google'}
                customMapStyle={customMapStyle}
                showsUserLocation={isCurrentLoaction}
                initialRegion={{
                    latitude: (!route.params?.isEditing) ? route.params?.jobLocation?.latitude : 21.247181,
                    longitude: (!route.params?.isEditing) ? route.params?.jobLocation?.longitude : 72.890877,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPress={(e: any) => {
                    if (ChoosefromMap) {
                        getAddress(e.nativeEvent.coordinate)
                    }
                    if (route.params?.isEditing) {
                        if (ChoosefromMap) {
                            // dispatch(setJobLocation({
                            //     latitude: e.nativeEvent.coordinate.latitude,
                            //     longitude: e.nativeEvent.coordinate.longitude,
                            // }))
                            setTapLoaction({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            })
                        }
                    }
                }}
            >
                {tapLoaction && ChoosefromMap &&
                    <Marker
                        coordinate={tapLoaction}>
                        <Image source={ImagesPath.marker} style={{ width: wp(15), height: wp(15) }}></Image>
                    </Marker>}

            </MapView>
            {route?.params?.isButtonVisible &&
                <View style={[globalStyles.rowView, { justifyContent: 'space-around', position: 'absolute', bottom: route?.params?.isAddressPreview ? hp(17) : 20, width: wp(100) }]}>
                    {route.params?.isEditing &&
                        <>
                            <CustomBlackButton
                                title={strings.chooseFromMap}
                                buttonStyle={{ width: wp(45) }}
                                imageStyle={{ tintColor: colors.white }}
                                textStyle={{ color: colors.white }}
                                onPress={() => {
                                    setIsCurruntLocation(false)
                                    setChooseFromMap(true)
                                }}
                                image={ImagesPath.map_pin_line_icon}
                            />
                            <CustomBlackButton
                                title={strings.current_loaction}
                                buttonStyle={{ width: wp(45), backgroundColor: colors.light_blue_color }}
                                imageStyle={{ tintColor: colors.primary_color }}
                                textStyle={{ color: colors.primary_color }}
                                onPress={() => {
                                    getUserCurrentLocation()
                                    setChooseFromMap(false)
                                    setIsCurruntLocation(true)
                                }}
                                image={ImagesPath.cross_hair_icon}
                            />
                        </>}
                </View>}
            {route?.params?.isAddressPreview &&
                <View style={styles.bottomContainer}>
                    <Text style={styles.addressTxt} numberOfLines={2}>{address}</Text>
                    <CustomBlackButton
                        title={strings.done}
                        buttonStyle={{ width: wp(45) }}
                        imageStyle={{ tintColor: colors.white }}
                        textStyle={{ color: colors.white }}
                        onPress={() => {
                            dispatch(setJobLocation({
                                latitude: tapLoaction?.latitude,
                                longitude: tapLoaction?.longitude,
                            }))
                            let params = {
                                id: tapLoaction?.latitude,
                                coordinates: {
                                    latitude: tapLoaction?.latitude,
                                    longitude: tapLoaction?.longitude,
                                },
                                address: address,
                                description: 'selected location from map',
                            }
                            if (route?.params?.screenName == 'RouteChooseLocationDetailScreen') {
                                dispatch(manageMapRoutesReducer(params))
                                navigation?.navigate('RouteScreen')
                            } else if (route?.params?.screenName == 'AddNewJobScreen' || route?.params?.screenName == 'CreateNewJobScreen') {
                                dispatch(storeCreateJoblocationReducer(params))
                                navigation.goBack()
                            } else {
                                navigation.goBack()
                            }
                        }}
                        image={ImagesPath.map_pin_line_icon}
                    />
                </View>}
        </View>
    )
}

export default CreateJobMapScreen
