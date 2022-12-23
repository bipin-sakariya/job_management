import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { DrawerActions, useIsFocused } from '@react-navigation/native';
import { styles } from './styles';
import { ButtonTab, CalendarView, Container, CustomBlackButton, CustomBottomSheet, CustomModal, CustomSubTitleWithImageComponent, Header, JobListComponent } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { globalStyles } from '../../styles/globalStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RBSheet from "react-native-raw-bottom-sheet";
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootState, useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { JobDetailsData, jobStatusWiseList } from '../../redux/slices/AdminSlice/jobListSlice';
import moment from 'moment';
import { GroupData, groupList, selectedGroupReducers } from '../../redux/slices/AdminSlice/groupListSlice';
import { GroupParams } from '../TransferJobScreen';
import FontSizes from '../../styles/FontSizes';
import fonts from '../../styles/Fonts';

interface jobListParams {
    page?: number,
    search?: string,
    status?: string,
    id?: number,
    to_date?: string | undefined
    from_date?: string | undefined
}

interface DateParams {
    toDate?: string | undefined
    fromDate?: string | undefined
}

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
    const [finalAllGroup, setFinalAllGroup] = useState<GroupParams[]>([])
    const [selectedDate, setSelectedDate] = useState<DateParams>({})
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [sdate, setSdate] = useState('');
    const [edate, setEdate] = useState(' ');
    const [selectedId, setSelectedId] = useState({})

    const { userData } = useAppSelector((state: RootState) => state.userDetails)
    const { jobListData } = useAppSelector(state => state.jobList)
    const { groupListData, selectedGroupData } = useAppSelector(state => state.groupList)

    useEffect(() => {
        let defaultSelected = finalGroupData.find((i) => i.selected == true)
        setSelectedItem(defaultSelected)
        setSelectedId(selectedGroupData)
        selectedGroup()
    }, [])

    useEffect(() => {
        if (isFocus) { JobListApiCall(page, text) }

    }, [isFocus, btn])

    const selectedGroup = () => {
        if (selectedGroupData) {
            const data = finalAllGroup.map((i) => {

                if (i.name == selectedGroupData.name) {
                    return {
                        ...i,
                        selected: !i.selected,
                    };
                } else {
                    return i;
                }

            })
            setFinalAllGroup(data)
            console.log({ data })
        }
    }

    useEffect(() => {
        let params = {
            search: '',
            page: groupPage
        }

        dispatch(groupList(params)).unwrap().then((res) => {
            setGroupData(res.results)
            setGroupPage(groupPage + 1)
        }).catch((error) => {
            console.log({ error });
        })


    }, [isFocus, btn, groupListData.results,])

    const JobListApiCall = (page: number, input?: string, id?: number, to_date?: string, from_date?: string) => {
        let params: jobListParams = {
            page: page,
            search: input,
            status: btn.open ? strings.open : strings.close,
            id: selectedItem?.id ? selectedItem?.id : id,
            to_date: to_date,
            from_date: from_date
        }

        dispatch(jobStatusWiseList(params)).unwrap().then((res) => {
            if (res.next && !!input) {
                setPage(page + 1)
                setOpenJobList(res.results)
            }
        }).catch((error) => {
            console.log({ error });
        })
    }

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

    // useEffect(() => {
    //     dispatch(selectedGroupReducers(finalAllGroup))


    // }, [finalAllGroup])

    useEffect(() => {
        if (finalGroupData.length) {
            let catList: any = [{ name: 'All', selected: true, id: 0 }]

            finalGroupData.map((listItem: GroupParams) => {
                catList.push({
                    name: listItem.name,
                    selected: false,
                    id: listItem.id
                });
                setFinalAllGroup(catList);

            });
        }

    }, [finalGroupData]);

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
                        <Text style={styles.jobTypeTxt}>{selectedGroupData?.name ? selectedGroupData?.name : 'All'}</Text>
                        <Image source={ImagesPath.down_icon} style={styles.downIcon} />
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity onPress={() => setIsSearch(!isSearch)} style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        {
                            userData?.role != strings.groupManager &&
                            <TouchableOpacity onPress={() => {
                                if (userData?.role == strings.admin) {
                                    navigation.navigate("NotificationScreen")
                                } else {
                                    navigation.navigate('CreateNewJobScreen', { type: strings.newJob })
                                }
                            }}>
                                <Image source={userData?.role == strings.admin ? ImagesPath.notification_icon : ImagesPath.add_icon} style={globalStyles.headerIcon} />
                            </TouchableOpacity>
                        }
                    </View>
                }
            />

            <Container>
                {isSearch &&
                    <View style={[styles.searchInputView, {}]}>
                        <Image source={ImagesPath.search_icon} style={styles.searchViewImage} />
                        <TextInput
                            style={[styles.searchInputText]}
                            placeholder={strings.searchHere}
                            onChangeText={(text) => {
                                setText(text)
                                JobListApiCall(page, text)
                            }}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                        <TouchableOpacity style={[globalStyles.rowView, {}]} onPress={() => { setIsSearch(false) }}>
                            <TouchableOpacity onPress={() => { setIsSearch(false), setText('') }} >
                                <Image source={ImagesPath.close_icon} style={globalStyles.backArrowStyle} />
                            </TouchableOpacity>

                            <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}></Text>
                        </TouchableOpacity>
                    </View>
                }
                <ButtonTab
                    btnOneTitle={strings.open}
                    btnTwoTitle={strings.close}
                    setBtn={setBtn}
                    btnValue={btn}
                    onReset={setPage}
                />

                <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginHorizontal: wp(4) }]}>
                    <CustomSubTitleWithImageComponent
                        disabled
                        title={strings.AddedGroups}
                        image={ImagesPath.group_icon}
                        viewStyle={{ marginBottom: hp(0), }}
                        titleStyle={{ fontSize: FontSizes.MEDIUM_16 }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setIsModelVisible(true)
                        }} style={{ padding: wp(1.5) }}>
                        <Text style={[styles.dateTxtStyle, globalStyles.rtlStyle, { fontFamily: fonts.FONT_POP_SEMI_BOLD, paddingHorizontal: 0 }]}>{strings.date}</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={jobListData?.results}
                    renderItem={({ item, index }) => {
                        const isDateVisible = index != 0 ? moment(jobListData?.results[index].created_at).format('ll') == moment(jobListData?.results[index - 1].created_at).format('ll') ? false : true : true
                        return (
                            <JobListComponent
                                item={item}
                                isDateVisible={isDateVisible}
                            />
                        )
                    }}
                    onEndReached={() => {
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
                    ListEmptyComponent={() => {
                        return (
                            <View>
                                <Text>{strings.empty_list}</Text>
                            </View>
                        )
                    }}
                />
            </Container>

            {/* group list  */}
            <CustomBottomSheet
                ref={refRBSheet}
                data={finalAllGroup}
                defaultSelected={selectedGroupData}
                onSelectedTab={(item) => {
                    JobListApiCall(page, text, item.id)
                    setSelectedItem(item)
                    dispatch(selectedGroupReducers(item))
                    // selectedGroup()
                    refRBSheet.current?.close()
                }}
            />

            {/* calendar model */}
            <CustomModal
                visible={isModelVisible}
                onRequestClose={() => { setIsModelVisible(false) }}
                onClose={() => { setIsModelVisible(false) }}
                children={
                    <View style={{ width: wp(90), alignSelf: 'center' }}>
                        <CalendarView
                            setSelectedDate={setSelectedDate}
                            setSdate={setSdate}
                            setEdate={setEdate}
                            sdate={sdate}
                            edate={edate}
                        />
                        <CustomBlackButton
                            title={strings.apply}
                            onPress={() => {
                                setIsModelVisible(false)
                                JobListApiCall(page, text, undefined, selectedDate?.toDate, selectedDate?.fromDate)
                            }}
                        />
                    </View>
                }
            />
        </View>
    )
}

export default JobsScreen;