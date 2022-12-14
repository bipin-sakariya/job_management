import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomModal, CustomSubTitleWithImageComponent, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'
import CustomOneItemSelect from '../../components/CustomOneItemSelect'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { GroupData, groupList, MemberDetailsProps } from '../../redux/slices/AdminSlice/groupListSlice'
import { updateTransferJobList } from '../../redux/slices/AdminSlice/jobListSlice'
import { RootRouteProps } from '../../types/RootStackTypes'

interface groupListParams {
    page?: number,
    search?: string,
}

export interface GroupParams {
    id: number,
    manager_details: {
        user_name: string,
        email: string
        id: number
        phone: string
        profile_image: string
        role: number
    },
    inspector_details: {
        user_name: string,
        email: string
        id: number
        phone: string
        profile_image: string
        role: number
    },
    member_details: MemberDetailsProps[],
    form_details: [{
        bill: [],
        created_at: string,
        id: number,
        is_sign: boolean,
        name: string,
        updated_at: string
    }],
    total_member_in_group: string,
    assign_jobs: [],
    created_at: string,
    updated_at: string,
    name: string,
    image: string,
    manager: number,
    inspector: number,
    member: number[],
    selected?: boolean
}

const TransferJobScreen = () => {
    const navigation = useCustomNavigation('TransferJobScreen');
    // const data = [
    //     { id: 1, title: 'titljbhjbgjhbgjk1', selected: false },
    //     { id: 2, title: 'title1', selected: false },
    //     { id: 3, title: 'title1', selected: false },
    //     { id: 4, title: 'title1', selected: false },
    //     { id: 5, title: 'title1', selected: false },
    //     { id: 6, title: 'title1', selected: false },
    //     { id: 7, title: 'title1', selected: false },
    //     { id: 8, title: 'title1', selected: false },
    //     { id: 9, title: 'title1', selected: false },
    //     { id: 10, title: 'title1', selected: false },
    // ]
    const [text, setText] = useState("");
    const [isSearch, setIsSearch] = useState(false)

    const dispatch = useAppDispatch();
    const isFocus = useIsFocused()
    const route = useRoute<RootRouteProps<'TransferJobScreen'>>();

    const [isModelVisible, setIsModelVisible] = useState(false)
    const [jobData, setJobData] = useState<GroupData[]>([])
    const [page, setPage] = useState(1)
    const [finalJobList, setFinaljobList] = useState<GroupParams[]>([])

    useEffect(() => {
        if (isFocus)
            groupListApiCall(page, text)
        return () => {
            setPage(1)
        }
    }, [isFocus])
    const groupListApiCall = (page: number, input?: string) => {
        let params: groupListParams = {
            page: page,
            search: input
        }
        // setIsFooterLoading(true)
        dispatch(groupList(params)).unwrap().then((res) => {
            // setIsFooterLoading(false)
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            if (res.next && !!input) {
                setJobData(res.results)
                setPage(page + 1)
            } else {
                setJobData(res.results)
                // setPage(page + 1)
            }
        }).catch((error) => {
            console.log({ error });
        })
    }

    useEffect(() => {
        const findData: GroupParams[] = jobData.map((i: GroupData) => {
            return {
                ...i,
                user_name: i.name,
                selected: false,
            }
        })
        setFinaljobList(findData)
    }, [jobData])

    const groupId: GroupParams | undefined = finalJobList.find((i) => i.selected == true)

    const transferJob = () => {
        let params = {
            group: groupId?.id,
            job: route.params.jobId,
        }

        dispatch(updateTransferJobList(params)).unwrap().then((res) => {
            setIsModelVisible(false)
            navigation.goBack()
        }).catch((e) => {
            console.log({ error: e });
        })
    }

    const renderItem = ({ item, index }: { item: GroupParams, index: number }) => {
        return (
            <CustomOneItemSelect item={item} data={finalJobList} onSetData={setFinaljobList} />
        )
    }

    return (
        <View style={globalStyles.container}>
            {/* {console.log({ finalJobList })} */}
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.transferJob}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity onPress={() => { setIsSearch(!isSearch) }} >
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                {isSearch &&
                    <View style={[styles.searchinputview]}>
                        <Image source={ImagesPath.search_icon} style={styles.searchviewimage} />
                        <TextInput
                            style={[styles.searchinputtext]}
                            placeholder={strings.searchHere}
                            onChangeText={(text) => {
                                setText(text)
                                groupListApiCall(page, text)
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
                <CustomModal
                    visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }}
                    children={
                        <View style={styles.modalView}>
                            <Image source={ImagesPath.colorLeftArrow} style={[globalStyles.modalImageStyle]} />
                            <Text style={styles.modalTxt}>{strings.Areyousureyou} P.Maintenance?</Text>
                            <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                                <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%", backgroundColor: colors.light_blue_color }} title={strings.No} />
                                <CustomBlackButton onPress={() => { transferJob() }} buttonStyle={{ width: "45%" }} title={strings.Yes} />
                            </View>
                        </View>
                    } />
                <CustomSubTitleWithImageComponent disabled title={strings.Transferjobto} image={ImagesPath.arrow_bend_right_icon} />
                <FlatList
                    data={finalJobList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: wp(3) }}
                    contentContainerStyle={{ paddingBottom: wp(20) }}
                    ItemSeparatorComponent={() => <View style={{ height: wp(4), backgroundColor: colors.white_5 }} />
                    } />
                <CustomBlackButton onPress={() => { setIsModelVisible(true) }} title={strings.transferJob} image={ImagesPath.arrow_bend_right_white_icon} buttonStyle={styles.buttonView} />
            </Container>
        </View>
    )
}

export default TransferJobScreen

