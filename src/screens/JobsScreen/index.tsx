import { View, Text, TouchableOpacity, Image, I18nManager, Platform } from 'react-native';
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
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import moment from 'moment';
import { RootState, useAppSelector } from '../../hooks/reduxHooks';

const data = [
    { id: 1, title: strings.All, selected: true },
    { id: 2, title: strings.PMaintanence, selected: false },
    { id: 3, title: strings.Paint, selected: false },
    { id: 4, title: strings.Council, selected: false },
]

const JobData = [
    {
        data: '16 may 2022',
        jobs: [
            { title: 'Job Open', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobOpen },
            { title: 'Job Return', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobReturn },
            { title: 'Job Transfer', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobTransfer }
        ]
    },
    {
        data: '16 may 2022',
        jobs: [
            { title: 'Job Close', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobClose },
            { title: 'Job Partial', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobPartial },
            { title: 'Job Open', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobOpen }
        ]
    },
    {
        data: '16 may 2022',
        jobs: [
            { title: 'Job Open', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobOpen },
            { title: 'Job Open', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobOpen },
            { title: 'Job Open', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: strings.JobOpen }
        ]
    }
]

const JobsScreen = () => {
    const navigation = useCustomNavigation('JobsScreen')
    const refRBSheet = useRef<RBSheet | null>(null);

    const [selectedItem, setSelectedItem] = useState<ListDataProps | undefined>(undefined);
    const [page, setPage] = useState(1)
    const [btn, setBtn] = useState({ open: true, close: false })

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
                            // navigation.navigate('ReportGeneratorScreen')
                        }} style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        {
                            userData?.role != strings.Group_Manager &&
                            <TouchableOpacity onPress={() => {
                                if (userData?.role == strings.Admin) {
                                    navigation.navigate("NotificationScreen")
                                } else {
                                    navigation.navigate('CreateNewJobScreen', { type: strings.newJob })
                                }
                            }}>
                                <Image source={userData?.role == strings.Admin ? ImagesPath.notification_icon : ImagesPath.add_icon} style={globalStyles.headerIcon} />
                            </TouchableOpacity>
                        }
                    </View>
                }
            />
            <Container>
                <ButtonTab btnOneTitle={strings.Open} btnTwoTitle={strings.Close} setBtn={setBtn} btnValue={btn} onReset={setPage} />
                <FlatList
                    data={JobData}
                    renderItem={({ item, index }) => (
                        <JobListComponent item={item} index={index} />
                    )}
                    showsVerticalScrollIndicator={false}
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