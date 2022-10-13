import { View, Text, TouchableOpacity, Image, I18nManager } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { ButtonTab, Container, CustomBottomSheet, Header, JobListComponent } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { globalStyles } from '../../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RBSheet from "react-native-raw-bottom-sheet";
import { ListDataProps } from '../../components/CustomBottomSheet';
import { FlatList } from 'react-native-gesture-handler';
import { RootState, useAppSelector } from '../../redux/Store';
import { strings } from '../../languages/localizedStrings';

const data = [
    { id: 1, title: strings.All, selected: true },
    { id: 2, title: strings.PMaintanence, selected: false },
    { id: 3, title: strings.Paint, selected: false },
    { id: 4, title: strings.Council, selected: false },
]

const JobData = [
    {
        data: '16 May 2022',
        jobs: [
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' },
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' },
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' }
        ]
    },
    {
        data: '16 May 2022',
        jobs: [
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' },
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' },
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' }
        ]
    },
    {
        data: '16 May 2022',
        jobs: [
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' },
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' },
            { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Open' }
        ]
    }
]

const JobsScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation();
    const refRBSheet = useRef<RBSheet | null>(null);
    const [selectedItem, setSelectedItem] = useState<ListDataProps | undefined>(undefined);
    const [btn, setBtn] = useState({
        open: true,
        close: false
    })
    const { userData } = useAppSelector((state: RootState) => state.userDetails)
    useEffect(() => {
        let defaultSelected = data.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    return (
        <View style={globalStyles.container}>
            <Header
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
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ReportGeneratorScreen')
                        }} style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        {
                            userData?.role != "Group Manager" &&
                            <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
                                <Image source={userData?.role == "Admin" ? ImagesPath.notification_icon : ImagesPath.add_icon} style={globalStyles.headerIcon} />
                            </TouchableOpacity>
                        }
                    </View>
                }
            />
            <Container>
                <ButtonTab btnOneTitle={strings.Open} btnTwoTitle={strings.Close} setBtn={setBtn} btnValue={btn} />
                <FlatList
                    style={{ marginBottom: wp(28) }}
                    data={JobData}
                    renderItem={({ item, index }) => (
                        <JobListComponent item={item} index={index} />
                    )}
                />
            </Container>
            <CustomBottomSheet
                ref={refRBSheet}
                data={data}
                onSelectedTab={(item) => {
                    setSelectedItem(item)
                    refRBSheet.current?.close()
                }}
            />
        </View>
    )
}

export default JobsScreen;