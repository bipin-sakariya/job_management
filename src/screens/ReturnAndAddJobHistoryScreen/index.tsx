import { Alert, Dimensions, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomDashedComponent, CustomeJobListDetailsViewComponent, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
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
import { JobDetailsData, jobList, recentJobList } from '../../redux/slices/AdminSlice/jobListSlice'
import { useAppDispatch } from '../../hooks/reduxHooks'

interface JobData {
    titlr: string
    description: string
    km: string
    status: string
    image: string
}

interface jobListParams {
    page?: number,
    search?: string
}

// const data = [
//     { title: 'Job Return', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobReturn, image: ImagesPath.demo1 },
//     { title: 'Job Transfer', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobTransfer, image: ImagesPath.demo2 },
//     { title: 'Job Transfer', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobTransfer, image: ImagesPath.demo1 },
//     { title: 'Job Partial', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobPartial, image: ImagesPath.demo2 },
//     { title: 'Job Open', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.Open, image: ImagesPath.demo1 },
//     { title: 'Job Transfer', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobTransfer, image: ImagesPath.demo2 },
// ]
// const JobData = [
//     { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo3 },
//     { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '15 ק"מ משם', date: "16 may 2022", button: strings.JobTransfer, status: strings.Open, image: ImagesPath.demo4 },
//     { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '15 ק"מ משם', date: "16 may 2022", button: strings.JobTransfer, status: strings.Open, image: ImagesPath.demo5 },
//     { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '20 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo3 },
//     { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo4 },
//     { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo5 }
// ]
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
            recentJobListApiCall(page)
        jobListApiCall(jobPage)
        return () => {
            setPage(1)
            setJobPage(1)
        }
    }, [isFocus])

    const recentJobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: ''
        }
        dispatch(recentJobList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setRecentJob(res.results)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }
    const jobListApiCall = (jobpage: number) => {
        let params: jobListParams = {
            page: jobPage,
            search: ''
        }
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
                        <Text style={globalStyles.headerTitle}>{type == 'returnJob' ? strings.returnJob : strings.AddedJobHistory}</Text>
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
                            title={strings.ADDNEWJOB}
                            viewStyle={styles.dottedViewStyle}
                            textStyle={styles.dottedTxtStyle}
                            imageStyle={styles.dottedImageStyle}
                            image={ImagesPath.add_icon}
                            onPress={() => { navigation.navigate('AddNewJobScreen') }}
                        />
                        : null
                    }
                    <CustomSubTitleWithImageComponent
                        viewStyle={{ paddingHorizontal: wp(4) }}
                        title={type == "addJob" ? strings.addedjob : strings.RecentallyReturnedJobs}
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
