import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import { customMapStyle, globalStyles } from '../../styles/globalStyles';
import { Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DrawerActions, useIsFocused, useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomBottomSheet, { ListDataProps } from '../../components/CustomBottomSheet';
import MapView from 'react-native-maps';
import { colors } from '../../styles/Colors';
import Carousel from 'react-native-snap-carousel';
import FontSizes from '../../styles/FontSizes';
import CustomJobBottomListSheet from '../../components/CustomJobBottomListSheet';

const data = [
    { id: 1, title: 'All', selected: true },
    { id: 2, title: 'P. Maintanence', selected: false },
    { id: 3, title: 'Paint / Signs', selected: false },
    { id: 4, title: 'Council', selected: false },
]

const JobData = [
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" }
]
const MapScreen = () => {
    const navigation = useNavigation();
    const refRBSheet = useRef<RBSheet | null>(null);
    const refJobListSheet = useRef<RBSheet | null>(null);
    const [selectedItem, setSelectedItem] = useState<ListDataProps | undefined>(undefined);
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            refJobListSheet.current?.open()
        }
    }, [isFocused])

    useEffect(() => {
        let defaultSelected = data.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={[styles.jobContainerStyle, styles.jobContainerBoxShadowStyle]}>
                <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
                <View style={{ flex: 1 }}>
                    <View style={styles.jobTitleContainer}>
                        <Text style={styles.titleTxt}>{item.title}</Text>
                        <View style={[globalStyles.rowView, { justifyContent: "center" }]}>
                            <Image source={ImagesPath.map_pin_icon} style={styles.mapPinIcon} />
                            <Text style={styles.distanceTxt}>{item.km}</Text>
                        </View>
                    </View>
                    <Text style={[styles.descriptionTxt, { fontSize: FontSizes.SMALL_7 }]}>{item.date}</Text>
                    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                        <Text numberOfLines={2} style={[styles.descriptionTxt, { width: wp("30%") }]}>{item.description}</Text>
                        <TouchableOpacity onPress={() => { }} style={styles.openButton}>
                            <Text style={styles.smallBut}>{item.button}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                containerStyle={{ backgroundColor: colors.white }}
                headerLeftComponent={
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={ImagesPath.menu_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
                headerCenterComponent={
                    <TouchableOpacity onPress={() => refRBSheet.current?.open()} activeOpacity={1} style={globalStyles.rowView}>
                        <Text style={styles.jobTypeTxt}>{selectedItem?.title}</Text>
                        <Image source={ImagesPath.down_icon} style={styles.downIcon} />
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity>
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <CustomBottomSheet
                ref={refRBSheet}
                data={data}
                onSelectedTab={(item) => {
                    setSelectedItem(item)
                    refRBSheet.current?.close()
                }}
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
            <CustomJobBottomListSheet
                ref={refJobListSheet}
                data={JobData}
            />
            <View style={styles.carouselStyle}>
                <TouchableOpacity style={[styles.routeBut, styles.routeButShadow]}>
                    <Image source={ImagesPath.route_icon} style={styles.pathIconStyle} />
                </TouchableOpacity>
                <Carousel
                    data={JobData}
                    sliderWidth={wp("100%")}
                    itemWidth={wp("83%")}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}

export default MapScreen;
