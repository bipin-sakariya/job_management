import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
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

const RouteChooseLocationDetailScreen = () => {
    const navigation = useCustomNavigation('RouteChooseLocationDetailScreen');
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
                <View style={[globalStyles.rowView, { borderColor: colors.gray_9, borderWidth: wp(0.3), borderRadius: wp(3), paddingVertical: wp(3), marginVertical: wp(3) }]}>
                    <Image source={ImagesPath.map_pin_dark_line_icon} style={{ width: wp(7), height: wp(7), resizeMode: 'contain', marginHorizontal: wp(2) }} />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder={strings.ChooseStartingLocation}
                    />
                </View>
                <CustomSubTitleWithImageComponent title={strings.YourLocation} image={ImagesPath.cross_hair_icon} titleStyle={styles.commonTxtStyle} />
                <CustomSubTitleWithImageComponent title={strings.ChoosefromMap} image={ImagesPath.map_pin_darkline_icon} titleStyle={styles.commonTxtStyle} />
                <View style={{
                    height: wp(0.5), backgroundColor: "#B3B3B3",
                    marginTop: wp(2)
                }} />
                <CustomSubTitleWithImageComponent viewStyle={{ marginVertical: wp(2) }} disabled title={strings.Recent} image={ImagesPath.clock_counter_clockwise_icon} />
                <FlatList showsVerticalScrollIndicator={false} data={JobData} renderItem={renderItem} />
            </Container>
        </View>
    )
}

export default RouteChooseLocationDetailScreen
