import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { customMapStyle, globalStyles } from '../../styles/globalStyles';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MapView, { Marker } from 'react-native-maps';
import { CustomBlackButton, Header } from '../../components';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { strings } from '../../languages/localizedStrings';
import { ImagesPath } from '../../utils/ImagePaths';
import { colors } from '../../styles/Colors';
import Geolocation from '@react-native-community/geolocation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import { setJobLocation } from '../../redux/slices/MapSlice/MapSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';

const JobData = [
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" }
]

interface MapPositionProps {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}

const CreateJobMapScreen = () => {

    const navigation = useCustomNavigation('CreateJobMapScreen')
    const route = useRoute<RootRouteProps<'CreateJobMapScreen'>>();
    const mapRef = useRef<MapView>(null);
    const dispatch = useAppDispatch()
    const [isCurrentLoaction, setIsCurruntLocation] = useState(false)
    const [curruntLoaction, setCurruntLoaction] = useState<MapPositionProps | null>(null);
    const [tapLoaction, setTapLoaction] = useState<MapPositionProps | null>(null);
    const [ChoosefromMap, setChooseFromMap] = useState(false)

    useEffect(() => {

        if (route.params.isEditing) {
            Geolocation.getCurrentPosition(
                position => {
                    setCurruntLoaction({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                },
                error => {
                    console.log(error.code, error.message);
                }
            );
        } else {
            setTapLoaction({
                latitude: route.params.jobLocation.latitude,
                longitude: route.params.jobLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    }, [])

    useEffect(() => {
        if (isCurrentLoaction && curruntLoaction) {
            mapRef.current?.animateToRegion(curruntLoaction);
            setTapLoaction(curruntLoaction)
            dispatch(setJobLocation({
                latitude: curruntLoaction.latitude,
                longitude: curruntLoaction.longitude
            }))
        }

    }, [isCurrentLoaction])

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
                        <Text style={globalStyles.headerTitle}>{strings.Place}</Text>
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
                    latitude: !route.params.isEditing ? route.params.jobLocation.latitude : 21.247181,
                    longitude: !route.params.isEditing ? route.params.jobLocation.longitude : 72.890877,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPress={(e: any) => {
                    if (route.params.isEditing) {
                        if (ChoosefromMap) {
                            dispatch(setJobLocation({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                            }))
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

                {tapLoaction && <Marker
                    coordinate={tapLoaction}>
                    <Image source={ImagesPath.map_pin_line_icon} style={{ width: wp(10), height: wp(10) }}></Image>
                </Marker>}

            </MapView>
            <View style={[globalStyles.rowView, { justifyContent: 'space-around', position: 'absolute', bottom: 20, width: wp(100) }]}>
                {route.params.isEditing &&
                    <>
                        <CustomBlackButton
                            title={strings.ChoosefromMap}
                            buttonStyle={{ width: wp(45) }}
                            imageStyle={{ tintColor: colors.white }}
                            textStyle={{ color: colors.white }}
                            onPress={() => setChooseFromMap(true)}
                            image={ImagesPath.map_pin_line_icon}
                        />
                        <CustomBlackButton
                            title={strings.current_loaction}
                            buttonStyle={{ width: wp(45), backgroundColor: colors.light_blue_color }}
                            imageStyle={{ tintColor: colors.primary_color }}
                            textStyle={{ color: colors.primary_color }}
                            onPress={() => setIsCurruntLocation(true)}
                            image={ImagesPath.cross_hair_icon}
                        />
                    </>}
            </View>
        </View>
    )
}

export default CreateJobMapScreen
