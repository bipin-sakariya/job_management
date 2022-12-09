import { FlatList, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomDashedComponent, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
import { styles } from './styles';
import FontSizes from '../../styles/FontSizes';


interface JobDetail {
    title: string
    id: number
    description: string
}


const RouteScreen = () => {
    const [sourceAddress, setSourceAddress] = useState<JobDetail | null>(null)
    const [destinationAddress, setDestinationAddress] = useState<JobDetail | null>(null)
    const [selectedAddress, setSelectedAddress] = useState<JobDetail[]>([]);

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
                                {sourceAddress ? sourceAddress?.title : strings.ChooseStartingLocation}
                            </Text>
                            {sourceAddress && <TouchableOpacity style={styles.closeIconContainer} onPress={() => setSourceAddress(null)}>
                                <Image source={ImagesPath.close_icon} style={styles.closeIcon} />
                            </TouchableOpacity>}
                        </View>
                        <View style={styles.btnContainer}>
                            <Text style={[styles.textInputStyle, globalStyles.rtlStyle, { flex: 1, marginBottom: 0 }]} onPress={() => navigation.navigate("RouteChooseLocationDetailScreen")}>
                                {destinationAddress ? destinationAddress.title : strings.ChooseDestination}
                            </Text>
                            {destinationAddress && <TouchableOpacity style={styles.closeIconContainer} onPress={() => setDestinationAddress(null)}>
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