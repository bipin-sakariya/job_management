import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomDashedComponent, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
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
import { useAppDispatch } from '../../hooks/reduxHooks'
import { resetCreateJobLocationReducer } from '../../redux/slices/MapSlice/MapSlice'
import { recentReturnJobList, returnJobList } from '../../redux/slices/AdminSlice/returnJobListSlice'

interface jobListParams {
    page?: number,
    search?: string
}

const ReturnAndAddJobHistoryScreen = () => {
    const navigation = useCustomNavigation('ReturnAndAddJobHistoryScreen');
    const route = useRoute<RootRouteProps<'ReturnAndAddJobHistoryScreen'>>();
    const { type } = route.params
    const isFocus = useIsFocused()
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const [jobPage, setJobPage] = useState(1)
    const [recentJob, setRecentJob] = useState<JobDetailsData[]>([])
    const [isJobList, setJobList] = useState<JobDetailsData[]>([])

    useEffect(() => {

        if (isFocus)
            return () => {
                setPage(1)
                setJobPage(1)
            }
    }, [isFocus])
    useEffect(() => {
        recentJobListApiCall(page)
        jobListApiCall(jobPage)
    }, [])

    const recentJobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: ''
        }
        {
            type == 'returnJob' ?
                dispatch(recentReturnJobList(params)).unwrap().then((res) => {
                    console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
                    setRecentJob(res.results)
                    setPage(page + 1)
                }).catch((error) => {
                    console.log({ error });
                })
                :
                dispatch(recentJobList(params)).unwrap().then((res) => {
                    console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
                    setRecentJob(res.results)
                    setPage(page + 1)
                }).catch((error) => {
                    console.log({ error });
                })
        }
    }

    const jobListApiCall = (jobpage: number) => {
        let params: jobListParams = {
            page: jobPage,
            search: ''
        }
        type == 'returnJob' ? dispatch(returnJobList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setJobList(res.results)
            setJobPage(jobpage + 1)
        }).catch((error) => {
            console.log({ error });
        }) :
            dispatch(jobList(params)).unwrap().then((res) => {
                console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
                setJobList(res.results)
                setJobPage(jobpage + 1)
            }).catch((error) => {
                console.log({ error });
            })
    }

    const renderItem = ({ item, index }: { item: JobDetailsData, index: number }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('JobDetailsScreen', { params: item, type: "returnJob" })}
                style={[styles.containerShadow, styles.recentallyView]}>
                <Image
                    source={ImagesPath.job_list_image_icon}
                    style={styles.imageStyle} />
                <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginBottom: wp(1) }]}>
                    <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle,]}>{item.address}</Text>
                    <CustomStatusBtn
                        onPress={() => {
                            navigation.navigate("JobDetailsScreen", { params: item, type: "returnJob" })
                        }} title={item.status} />
                </View>
                <Text numberOfLines={2} style={[styles.desTxt, globalStyles.rtlStyle,]}>{item.description}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={globalStyles.container}>
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
                <ScrollView showsVerticalScrollIndicator={false}>
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
                            data={recentJob}
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
                            data={isJobList}
                            renderItem={({ item, index }: { item: JobDetailsData, index: number }) => {
                                return (
                                    <CustomJobListComponent
                                        item={item}
                                        onPress={() => navigation.navigate('JobDetailsScreen', { params: item })}
                                    />
                                )
                            }}
                            showsVerticalScrollIndicator={false}

                            onEndReached={() => {
                                console.log('hello')
                            }}
                            onEndReachedThreshold={0.5}
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
