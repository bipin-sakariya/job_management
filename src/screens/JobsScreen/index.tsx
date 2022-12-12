import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { DrawerActions, useIsFocused } from '@react-navigation/native';
import { styles } from './styles';
import { ButtonTab, Container, CustomBottomSheet, Header, JobListComponent } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { globalStyles } from '../../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RBSheet from "react-native-raw-bottom-sheet";
import { ListDataProps } from '../../components/CustomBottomSheet';
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootState, useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { JobDetailsData, jobList, jobStatusWiseList } from '../../redux/slices/AdminSlice/jobListSlice';
import moment from 'moment';

interface jobListParams {
    page?: number,
    search?: string,
    status?: string
}

const data = [
    { id: 1, title: strings.all, selected: true },
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

    const [btn, setBtn] = useState({ open: true, close: false })
    const isFocus = useIsFocused()
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const [openJobList, setOpenJobList] = useState<JobDetailsData[]>([])

    const { userData } = useAppSelector((state: RootState) => state.userDetails)
    useEffect(() => {
        let defaultSelected = data.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    useEffect(() => {
        if (isFocus)
            console.log("useeffect", btn)
        JobListApiCall(page)

    }, [isFocus, btn])

    const JobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: '',
            status: btn.open ? 'open' : 'close'
        }
        dispatch(jobStatusWiseList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setOpenJobList(res.results)
            // setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    return (
        <View style={globalStyles.container}>
            {/* {console.log({ openJobList })} */}
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
                <ButtonTab btnOneTitle={strings.open} btnTwoTitle={strings.close} setBtn={setBtn} btnValue={btn} onReset={setPage} />
                <FlatList
                    data={openJobList}
                    renderItem={({ item, index }) => {
                        console.log({ data: openJobList[index].created_at })
                        const isDateVisible = index != 0 ? moment(openJobList[index].created_at).format('ll') == moment(openJobList[index - 1].created_at).format('ll') ? false : true : true
                        return (
                            <JobListComponent item={item} index={index} isDateVisible={isDateVisible} />
                        )

                    }}
                    onEndReached={() => {
                        console.log("On reach call");
                    }}
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