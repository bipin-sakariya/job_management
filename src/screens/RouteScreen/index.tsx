import { FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomDashedComponent, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import Timeline from 'react-native-timeline-flatlist'
import { colors } from '../../styles/Colors'
import { styles } from './styles'
import FontSizes from '../../styles/FontSizes'

const RouteScreen = () => {
    const navigation = useCustomNavigation('RouteScreen');
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
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{ width: "40%", paddingLeft: wp(3) }}
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
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder={strings.ChooseStartingLocation}
                        />
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder={strings.ChooseDestination}
                        />
                        <CustomDashedComponent
                            title={strings.AddOtherField}
                            image={ImagesPath.plus_circle_white_border_icon}
                            onPress={() => { }}
                            viewStyle={{ paddingVertical: wp(3), borderColor: colors.gray_9, marginTop: wp(0) }}
                            textStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.gray_9 }}
                        />
                    </View>
                </View>
                <CustomSubTitleWithImageComponent disabled title={strings.Recent} image={ImagesPath.clock_counter_clockwise_icon} />
                <FlatList showsVerticalScrollIndicator={false} data={JobData} renderItem={renderItem} contentContainerStyle={{ paddingBottom: wp(20) }} />
                <CustomBlackButton title={strings.Done} image={ImagesPath.route_icon} buttonStyle={{ ...styles.boxShadowStyle, bottom: Platform.OS == "ios" ? wp(5) : 0 }} onPress={() => {
                    // navigation.navigate("RouteChooseLocationDetailScreen")
                    navigation.navigate("RouteMapViewScreen")

                }} />
            </Container>
        </View>
    )
}

export default RouteScreen