import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
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
import { GroupData, groupList } from '../../redux/slices/AdminSlice/groupListSlice';
import { GroupParams } from '../TransferJobScreen';

interface jobListParams {
    page?: number,
    search?: string,
    status?: string,
    id?: number
}

const data = [
    { id: 1, title: strings.all, selected: true },
    { id: 2, title: strings.PMaintanence, selected: false },
    { id: 3, title: strings.Paint, selected: false },
    { id: 4, title: strings.Council, selected: false },
]

const JobsScreen = () => {
    const navigation = useCustomNavigation('JobsScreen')
    const refRBSheet = useRef<RBSheet | null>(null);
    const dispatch = useAppDispatch();
    const isFocus = useIsFocused()

    const [selectedItem, setSelectedItem] = useState<GroupParams | undefined>(undefined);

    const [btn, setBtn] = useState({ open: true, close: false })
    const [page, setPage] = useState(1);
    const [groupPage, setGroupPage] = useState(1)
    const [openJobList, setOpenJobList] = useState<JobDetailsData[]>([])
    const [isSearch, setIsSearch] = useState(false)
    const [text, setText] = useState("");
    const [isFooterLoading, setIsFooterLoading] = useState<boolean>(false)
    const [groupData, setGroupData] = useState<GroupData[]>([])
    const [finalGroupData, setfinalGroupList] = useState<GroupParams[]>([])

    const { userData } = useAppSelector((state: RootState) => state.userDetails)
    const { jobListData } = useAppSelector(state => state.jobList)
    const { groupListData } = useAppSelector(state => state.groupList)
    useEffect(() => {
        let defaultSelected = finalGroupData.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
    }, [])

    useEffect(() => {
        if (isFocus)
            console.log("useeffect", btn)
        JobListApiCall(page, text)
        return () => {
            setPage(1)
        }
    }, [isFocus, btn])

    useEffect(() => {
        let params = {
            search: '',
            page: groupPage
        }
        // setIsFooterLoading(true)
        dispatch(groupList(params)).unwrap().then((res) => {
            // setIsFooterLoading(false) setPage(page + 1)
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setGroupData(res.results)
            setGroupPage(groupPage + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }, [isFocus, btn, groupListData.results,])

    const JobListApiCall = (page: number, input?: string, id?: number) => {
        let params: jobListParams = {
            page: page,
            search: input,
            status: btn.open ? strings.Open : strings.Close,
            id: selectedItem?.id ? selectedItem?.id : id
        }

        dispatch(jobStatusWiseList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            // setOpenJobList(res.results)
            if (res.next && !!input) {
                setPage(page + 1)
                setOpenJobList(res.results)
            }
            // else {
            //     setOpenJobList(res.results)
            //     setPage(page + 1)
            // }
            // setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }
    { console.log({ openJobList }) }
    useEffect(() => {
        const findData: GroupParams[] = groupData.map((i: GroupData) => {
            return {
                ...i,

                user_name: i.name,
                selected: false,
            }
        })
        setfinalGroupList(findData)

    }, [groupData])
    console.log({ finalGroupData })

    const groupId: GroupParams | undefined = finalGroupData.find((i) => i.selected == true)
    console.log('groupId', { data: selectedItem?.id })

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
                        <Text style={styles.jobTypeTxt}>{selectedItem?.name}</Text>
                        <Image source={ImagesPath.down_icon} style={styles.downIcon} />
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity onPress={() => setIsSearch(!isSearch)} style={{ marginRight: wp(3) }}>
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
                {isSearch &&
                    <View style={[styles.searchinputview]}>
                        <Image source={ImagesPath.search_icon} style={styles.searchviewimage} />
                        <TextInput
                            style={[styles.searchinputtext]}
                            placeholder={strings.searchHere}
                            onChangeText={(text) => {
                                setText(text)
                                JobListApiCall(page, text)
                            }}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                        <TouchableOpacity style={[globalStyles.rowView, {}]} onPress={() => { setIsSearch(false) }}>
                            <Image source={ImagesPath.close_icon} style={globalStyles.backArrowStyle} />
                            <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}></Text>
                        </TouchableOpacity>

                    </View>
                }
                <ButtonTab btnOneTitle={strings.Open} btnTwoTitle={strings.Close} setBtn={setBtn} btnValue={btn} onReset={setPage} />
                <FlatList
                    data={jobListData?.results}
                    renderItem={({ item, index }) => {
                        const isDateVisible = index != 0 ? moment(jobListData?.results[index].created_at).format('ll') == moment(jobListData?.results[index - 1].created_at).format('ll') ? false : true : true
                        return (
                            <JobListComponent item={item} index={index} isDateVisible={isDateVisible} />
                        )
                    }}
                    onEndReached={() => {
                        console.log("On reach call");
                        if (jobListData?.next) {
                            JobListApiCall(page)
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => {
                        return (
                            <>
                                {isFooterLoading && <ActivityIndicator size={'small'} />}
                            </>
                        )
                    }}
                />
            </Container>
            <CustomBottomSheet
                ref={refRBSheet}
                data={finalGroupData}
                onSelectedTab={(item) => {
                    console.log({ item })
                    JobListApiCall(page, text, item.id)
                    setSelectedItem(item)
                    refRBSheet.current?.close()
                }}
            />
        </View>
    )
}

export default JobsScreen;