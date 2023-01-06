import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomActivityIndicator, CustomBlackButton, CustomModal, CustomSubTitleWithImageComponent, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'
import CustomOneItemSelect from '../../components/CustomOneItemSelect'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { GroupData, groupList, MemberDetailsProps } from '../../redux/slices/AdminSlice/groupListSlice'
import { updateTransferJob } from '../../redux/slices/AdminSlice/jobListSlice'
import { RootRouteProps } from '../../types/RootStackTypes'

interface groupListParams {
    page?: number,
    search?: string,
}

export interface GroupParams {
    id: number,
    manager_details?: {
        user_name: string,
        email: string
        id: number
        phone: string
        profile_image: string
        role: number
    },
    inspector_details?: {
        user_name: string,
        email: string
        id: number
        phone: string
        profile_image: string
        role: number
    },
    member_details?: MemberDetailsProps[],
    form_details?: [{
        bill: [],
        created_at: string,
        id: number,
        is_sign: boolean,
        name: string,
        updated_at: string
    }],
    total_member_in_group?: string,
    assign_jobs?: [],
    created_at?: string,
    updated_at?: string,
    name?: string,
    image?: string,
    manager?: number,
    inspector?: number,
    member?: number[],
    selected?: boolean
}

const TransferJobScreen = () => {
    const navigation = useCustomNavigation('TransferJobScreen');
    const dispatch = useAppDispatch();
    const isFocus = useIsFocused();
    const route = useRoute<RootRouteProps<'TransferJobScreen'>>();

    const [text, setText] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    const [isModelVisible, setIsModelVisible] = useState(false);
    const [IsErrorModal, setIsErrorModal] = useState(false);
    const [jobData, setJobData] = useState<GroupData[]>([]);
    const [page, setPage] = useState(1);
    const [finalJobList, setFinaljobList] = useState<GroupParams[]>([]);
    const { error } = useAppSelector(state => state.jobList);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isFocus)
            groupListApiCall(page, text)
        return () => {
            setPage(1)
        }
    }, [isFocus, text])
    
    const groupListApiCall = (page: number, input?: string) => {
        let params: groupListParams = {
            page: page,
            search: input
        }
        setIsLoading(true)
        dispatch(groupList(params)).unwrap().then((res) => {
            setIsLoading(false)
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

        dispatch(updateTransferJob(params)).unwrap().then((res) => {
            setIsModelVisible(false)
            navigation.goBack()
        }).catch((e) => {
            setIsModelVisible(false)
            setIsErrorModal(true)
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
            {isLoading && <CustomActivityIndicator />}
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
                        <TouchableOpacity style={[globalStyles.rowView, {}]} onPress={() => { setIsSearch(false), setText('') }}>
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
                            <Text style={styles.modalTxt}>{strings.areYouSureYou} P.Maintenance?</Text>
                            <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                                <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%", backgroundColor: colors.light_blue_color }} title={strings.no} />
                                <CustomBlackButton onPress={() => { transferJob() }} buttonStyle={{ width: "45%" }} title={strings.yes} />
                            </View>
                        </View>
                    } />
                <CustomModal
                    visible={IsErrorModal} onRequestClose={() => { setIsErrorModal(false) }}
                    children={
                        <View style={[styles.modalView, { height: wp(30) }]}>
                            <Text style={[styles.modalTxt, { marginTop: wp(5) }]}>{error}</Text>
                            <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                                <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { setIsErrorModal(false) }} buttonStyle={{ width: "45%", backgroundColor: colors.light_blue_color }} title={strings.try_again} />
                            </View>
                        </View>
                    } />
                <CustomSubTitleWithImageComponent disabled title={strings.transferJobTo} image={ImagesPath.arrow_bend_right_icon} />
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

