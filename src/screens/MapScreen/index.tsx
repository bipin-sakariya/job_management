import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import { customMapStyle, globalStyles } from '../../styles/globalStyles';
import { CustomJobListComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DrawerActions, NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
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
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", status: "info" },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open" }
]
const MapScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation();
    const refRBSheet = useRef<RBSheet | null>(null);
    const refJobListSheet = useRef<RBSheet | null>(null);
    const [selectedItem, setSelectedItem] = useState<ListDataProps | undefined>(undefined);
    const isFocused = useIsFocused()
    const [isVisibleCarousel, setIsVisibleCarousel] = useState(false)

    useEffect(() => {
        if (isFocused) {
            refJobListSheet.current?.open()
        } else {
            setIsVisibleCarousel(false)
        }
    }, [isFocused])

    useEffect(() => {
        return () => setIsVisibleCarousel(false)
    }, [])

    useEffect(() => {
        let defaultSelected = data.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item} type='carousel' />
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
            {
                isVisibleCarousel ?
                    <View style={[styles.carouselStyle, { bottom: Platform.OS == 'ios' ? wp(35) : wp(30) }]}>
                        <TouchableOpacity style={[styles.routeBut, styles.routeButShadow,]}>
                            <Image source={ImagesPath.route_icon} style={styles.pathIconStyle} />
                        </TouchableOpacity>
                        <Carousel
                            data={JobData}
                            sliderWidth={wp("100%")}
                            itemWidth={wp("83%")}
                            renderItem={renderItem}
                        />
                    </View> :
                    <CustomJobBottomListSheet
                        onClose={() => {
                            console.log("this is call");
                            isFocused && setIsVisibleCarousel(true)
                        }}
                        ref={refJobListSheet}
                        data={JobData}
                    />
            }

        </View>
    )
}

export default MapScreen;
