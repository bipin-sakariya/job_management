import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomActivityIndicator, CustomDashedComponent, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { RootRouteProps } from '../../types/RootStackTypes'
import { strings } from '../../languages/localizedStrings'
import CustomStatusBtn from '../../components/CustomStatusBtn'
import { styles } from './styles'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { convertDate } from '../../utils/screenUtils'
import { JobDetailsData, jobList, recentJobList, } from '../../redux/slices/AdminSlice/jobListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { resetCreateJobLocationReducer } from '../../redux/slices/MapSlice/MapSlice'
import { recentReturnJobList, returnJobList } from '../../redux/slices/AdminSlice/returnJobListSlice'

interface jobListParams {
    page: number,
    search?: string
}

const ReturnAndAddJobHistoryScreen = () => {

    const isFocus = useIsFocused()
    const dispatch = useAppDispatch();
    const navigation = useCustomNavigation('ReturnAndAddJobHistoryScreen');
    const route = useRoute<RootRouteProps<'ReturnAndAddJobHistoryScreen'>>();

    const [JobListApiPage, SetJobListApiPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOnEndReachedApiLoading, setIsOnEndReachedApiLoading] = useState<boolean>(false)

    const { returnJobListData, isLoading: isReturnJobListApiLoader, resentReturnJobList } = useAppSelector(state => state.returnJobList)
    const { recentjobListData, jobListData, isLoading: jobListApiLoader } = useAppSelector(state => state.jobList)

    const { type } = route.params

    useEffect(() => {
        if (isFocus) {
            setIsLoading(true)
            recentJobListApiCall(1)
            jobListApiCall(1)
        }
    }, [isFocus])

    const recentJobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: ''
        }
        if (type == 'returnJob') {
            dispatch(recentReturnJobList(params)).unwrap().catch((error) => {
                console.log({ error });
                setIsLoading(false)
            })
        } else {
            dispatch(recentJobList(params)).unwrap().catch((error) => {
                console.log({ error });
                setIsLoading(false)
            })
        }
    }

    const jobListApiCall = (jobPage?: number) => {
        let params: jobListParams = {
            page: jobPage ?? JobListApiPage,
            search: ''
        }
        if (type == 'returnJob') {
            dispatch(returnJobList(params)).unwrap().then((res) => {
                SetJobListApiPage(params.page + 1)
                setIsOnEndReachedApiLoading(false)
                setIsLoading(false)
            }).catch((error) => {
                setIsLoading(false)
                setIsOnEndReachedApiLoading(false)
                console.log({ error });
            })
        } else {
            dispatch(jobList(params)).unwrap().then((res) => {
                SetJobListApiPage(params.page + 1)
                setIsOnEndReachedApiLoading(false)
                setIsLoading(false)
            }).catch((error) => {
                setIsLoading(false)
                setIsOnEndReachedApiLoading(false)
                console.log({ error });
            })
        }
    }

    const renderItem = ({ item, index }: { item: JobDetailsData, index: number }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('JobDetailsScreen', { params: item, type: type })}
                style={[styles.containerShadow, styles.recentallyView]}>
                <Image
                    source={(item?.images && item?.images[0]?.image) ? { uri: item?.images[0]?.image } : ImagesPath.job_list_image_icon}
                    style={styles.imageStyle} />
                <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginBottom: wp(1) }]}>
                    <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle,]}>{item.address}</Text>
                    <CustomStatusBtn
                        onPress={() => {
                            navigation.navigate("JobDetailsScreen", { params: item })
                        }} title={item.status} />
                </View>
                <Text numberOfLines={2} style={[styles.desTxt, globalStyles.rtlStyle,]}>{item.description}</Text>
            </TouchableOpacity>
        )
    }


    const isCloseToBottom = (nativeEvent: any) => {
        const paddingToBottom = 20;
        return nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - paddingToBottom;
    }



    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
            <Header
                headerLeftStyle={{
                    width: "70%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{type == 'returnJob' ? strings.returnJob : strings.addedJobHistory}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.navigate('SearchScreen', { screenName: 'recentAndHistoryScreen' }) }}>
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            if (type == 'returnJob' && returnJobListData?.next && !isReturnJobListApiLoader) {
                                setIsOnEndReachedApiLoading(true)
                                jobListApiCall()
                            } else if ((type != 'returnJob' && jobListData?.next && !jobListApiLoader)) {
                                setIsOnEndReachedApiLoading(true)
                                jobListApiCall()
                            }
                        }
                    }}>
                    {type == "addJob" ?
                        <CustomDashedComponent
                            title={strings.addNewJob}
                            viewStyle={styles.dottedViewStyle}
                            textStyle={styles.dottedTxtStyle}
                            imageStyle={styles.dottedImageStyle}
                            image={ImagesPath.add_icon}
                            onPress={() => {
                                dispatch(resetCreateJobLocationReducer())
                                navigation.navigate('AddNewJobScreen')
                            }}
                        />
                        : null
                    }
                    <CustomSubTitleWithImageComponent
                        viewStyle={{ paddingHorizontal: wp(4) }}
                        title={type == "addJob" ? strings.addedJob : strings.recentllyReturnedJobs}
                        titleStyle={{ fontSize: FontSizes.MEDIUM_16, color: colors.dark_blue2_color }}
                        image={ImagesPath.folder_user_icon}
                        imageStyle={globalStyles.headerIcon}
                    />
                    <View style={{ marginLeft: wp(2) }}>
                        <FlatList
                            data={type == 'returnJob' ? resentReturnJobList?.results : recentjobListData?.results}
                            renderItem={renderItem}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            onEndReached={() => {
                                console.log('hello')
                            }}
                            ItemSeparatorComponent={() => <View style={{ width: wp(3) }} />}
                        />
                    </View>
                    <CustomSubTitleWithImageComponent
                        viewStyle={{ paddingHorizontal: wp(4) }}
                        title={convertDate('2022-11-08T12:44:46.142691Z')}
                        image={ImagesPath.calender_icon}
                    />
                    <View style={[styles.jobListViewStyle]}>
                        <FlatList
                            data={type == 'returnJob' ? returnJobListData?.results : jobListData?.results}
                            renderItem={({ item, index }: { item: JobDetailsData, index: number }) => {
                                return (
                                    <CustomJobListComponent
                                        item={item}
                                        onPress={() => navigation.navigate('JobDetailsScreen', { params: item, type: type })}
                                    />
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={() => (
                                <>
                                    {isOnEndReachedApiLoading && <ActivityIndicator />}
                                </>
                            )}
                            style={{ marginTop: wp(2), }}
                            ItemSeparatorComponent={() => <View style={{ height: wp(3) }} />}
                        />
                    </View>
                </ScrollView>
            </Container>
        </View>
    )
}

export default ReturnAndAddJobHistoryScreen
