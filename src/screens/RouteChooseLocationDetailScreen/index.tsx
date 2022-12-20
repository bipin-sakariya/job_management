import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import { styles } from './styles'
import { colors } from '../../styles/Colors'
import Geocoder from 'react-native-geocoder';
import { manageMapRoutesReducer, setJobLocation } from '../../redux/slices/MapSlice/MapSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import Geolocation from '@react-native-community/geolocation'
import { jobList } from '../../redux/slices/AdminSlice/jobListSlice'
import { useIsFocused } from '@react-navigation/native'

interface jobListParams {
    page?: number,
    search?: string
}

const RouteChooseLocationDetailScreen = () => {
    const navigation = useCustomNavigation('RouteChooseLocationDetailScreen');
    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()

    const { jobListData } = useAppSelector(state => state.jobList)
    const [selectedAddress, setSelectedAddress] = useState<string>('')
    const [page, setPage] = useState(1)

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item} onPress={() => {
                dispatch(manageMapRoutesReducer({ id: item?.id, address: item?.address, coordinates: item?.coordinates, description: item?.description }))
                navigation.goBack()
            }} />
        )
    }

    useEffect(() => {
        jobListApiCall(page)
    }, [navigation, isFocused])

    const jobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: ''
        }
        dispatch(jobList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            // setJobList(res.results)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log("getCurrentPosition", position.coords)
                dispatch(setJobLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }))
                Geocoder.geocodePosition({ lat: position?.coords?.latitude, lng: position?.coords?.longitude }).then((response: [{ formattedAddress: string }]) => {
                    let params = {
                        id: position.coords.latitude,
                        coordinates: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                        address: response[0].formattedAddress,
                        description: 'current location of user',
                    }
                    dispatch(manageMapRoutesReducer(params))
                    navigation.goBack()
                })
            },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 20000 },
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
                        navigation.navigate('CreateJobMapScreen', {
                            isEditing: true,
                            jobLocation: {
                                latitude: 42.882004,
                                longitude: 74.582748,
                            },
                            isButtonVisible: false,
                            isAddressPreview: true,
                            screenName: 'RouteChooseLocationDetailScreen',
                        })
                    }} />
                <View style={{
                    height: wp(0.5), backgroundColor: colors.bottom_sheet_tab,
                    marginTop: wp(2)
                }} />
                <CustomSubTitleWithImageComponent viewStyle={{ marginVertical: wp(2) }} disabled title={strings.Recent} image={ImagesPath.clock_counter_clockwise_icon} />
                <FlatList showsVerticalScrollIndicator={false} data={jobListData.results} renderItem={renderItem} />
            </Container>
        </View>
    )
}

export default RouteChooseLocationDetailScreen
