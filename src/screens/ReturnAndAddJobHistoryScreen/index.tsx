import { Alert, Dimensions, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomDashedComponent, CustomeJobListDetailsViewComponent, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { useRoute } from '@react-navigation/native'
import { RootRouteProps } from '../../types/RootStackTypes'
import { strings } from '../../languages/localizedStrings'
import CustomStatusBtn from '../../components/CustomStatusBtn'
import { styles } from './styles'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { convertDate } from '../../utils/screenUtils'

interface JobData {
    titlr: string
    description: string
    km: string
    status: string
    image: string
}



const data = [
    { title: 'Job Return', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobReturn, image: ImagesPath.demo1 },
    { title: 'Job Transfer', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobTransfer, image: ImagesPath.demo2 },
    { title: 'Job Transfer', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobTransfer, image: ImagesPath.demo1 },
    { title: 'Job Partial', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobPartial, image: ImagesPath.demo2 },
    { title: 'Job Open', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.Open, image: ImagesPath.demo1 },
    { title: 'Job Transfer', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', status: strings.JobTransfer, image: ImagesPath.demo2 },
]
const JobData = [
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo3 },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '15 ק"מ משם', date: "16 may 2022", button: strings.JobTransfer, status: strings.Open, image: ImagesPath.demo4 },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '15 ק"מ משם', date: "16 may 2022", button: strings.JobTransfer, status: strings.Open, image: ImagesPath.demo5 },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '20 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo3 },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo4 },
    { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing', km: '5 ק"מ משם', date: "16 may 2022", button: strings.Open, status: strings.Open, image: ImagesPath.demo5 }
]
const ReturnAndAddJobHistoryScreen = () => {
    const navigation = useCustomNavigation('ReturnAndAddJobHistoryScreen');
    const route = useRoute<RootRouteProps<'ReturnAndAddJobHistoryScreen'>>();
    const { type } = route.params


    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('JobDetailsScreen', { params: item, type: "returnJob" })}
                style={[styles.containerShadow, styles.recentallyView]}>
                <Image
                    source={item.image ? item.image : ImagesPath.job_list_image_icon}
                    style={styles.imageStyle} />
                <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginBottom: wp(1) }]}>
                    <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle,]}>{item.title}</Text>
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
                        <Text style={globalStyles.headerTitle}>{type == 'returnJob' ? strings.ReturnJob : strings.AddedJobHistory}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { }}>
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
                            data={data}
                            renderItem={renderItem}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            ItemSeparatorComponent={() => <View style={{ width: wp(3) }} />}
                        />
                    </View>
                    <CustomSubTitleWithImageComponent
                        viewStyle={{ paddingHorizontal: wp(4) }}
                        title={convertDate('2022-11-08T12:44:46.142691Z')}
                        image={ImagesPath.calender_icon}
                    />
                    <View style={styles.jobListViewStyle}>
                        <FlatList
                            data={JobData}
                            renderItem={({ item, index }: any) => {
                                return (
                                    <CustomJobListComponent
                                        item={item}
                                        onPress={() => navigation.navigate('JobDetailsScreen', { params: item, type: strings.JobOpen })}
                                    />
                                )
                            }}
                            showsVerticalScrollIndicator={false}
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
