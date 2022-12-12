import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import { styles } from './styles'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import Geocoder from 'react-native-geocoder';
import { resetJobLocation, setJobLocation } from '../../redux/slices/MapSlice/MapSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { store } from '../../redux/Store'
import Geolocation from '@react-native-community/geolocation'

const RouteChooseLocationDetailScreen = () => {
    const navigation = useCustomNavigation('RouteChooseLocationDetailScreen');
    const dispatch = useAppDispatch()
    const { job_location, routeList } = useAppSelector(state => state.mapData)
    const [selectedAddress, setSelectedAddress] = useState<string>('')

    const JobData = [
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", status: "info" },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer" },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", status: "info" },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" }
    ]
    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item} />
        )
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("job_location", store.getState().mapData.job_location)
            if (store.getState().mapData.job_location) {
                navigation.goBack()
            }
        });
        return unsubscribe;
    }, [navigation])


    useEffect(() => {
        let text = "How /are you doing today?";
        const myArray = text.split("/");
        console.log(myArray)
        console.log(routeList)
    }, [])

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position.coords)
                dispatch(setJobLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }))
                navigation.goBack()
            },
            error => {
                console.log(error.code, error.message);
            }
        );
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle]}>{strings.Route}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <View style={[globalStyles.rowView, styles.TxtInputviewStyle]}>
                    <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.mapPinImageStyle} />
                    <TextInput
                        style={[styles.textInputStyle, globalStyles.rtlStyle, { textAlign: "right" }]}
                        placeholder={strings.ChooseStartingLocation}
                        placeholderTextColor={colors.dark_blue3_color}
                        value={selectedAddress}
                    />
                </View>
                <CustomSubTitleWithImageComponent title={strings.YourLocation} image={ImagesPath.cross_hair_icon} titleStyle={styles.commonTxtStyle}
                    onPress={() => {
                        getCurrentLocation()
                    }}
                />
                <CustomSubTitleWithImageComponent title={strings.ChoosefromMap} image={ImagesPath.map_pin_darkline_icon} titleStyle={styles.commonTxtStyle}
                    onPress={() => {
                        navigation.navigate("CreateJobMapScreen", {
                            isEditing: true,
                            jobLocation: {
                                latitude: 42.882004,
                                longitude: 74.582748,
                            },
                            isButtonVisible: false
                        })
                    }} />
                <View style={{
                    height: wp(0.5), backgroundColor: colors.bottom_sheet_tab,
                    marginTop: wp(2)
                }} />
                <CustomSubTitleWithImageComponent viewStyle={{ marginVertical: wp(2) }} disabled title={strings.Recent} image={ImagesPath.clock_counter_clockwise_icon} />
                <FlatList showsVerticalScrollIndicator={false} data={JobData} renderItem={renderItem} />
            </Container>
        </View>
    )
}

export default RouteChooseLocationDetailScreen
