import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomDashedComponent, CustomeJobListDetailsViewComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { useRoute } from '@react-navigation/native'
import { RootRouteProps } from '../../types/RootStackTypes'
import { strings } from '../../languages/localizedStrings'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import CustomStatusBtn from '../../components/CustomStatusBtn'
import { colors } from '../../styles/Colors'
import { styles } from './styles'

const ReturnAndAddJobHistoryScreen = () => {
    const navigation = useCustomNavigation('ReturnAndAddJobHistoryScreen');
    const route = useRoute<RootRouteProps<'ReturnAndAddJobHistoryScreen'>>();
    const { type } = route.params
    console.log("🚀 ~ file: index.tsx ~ line 15 ~ ReturnAndAddJobHistoryScreen ~ type", type)

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={styles.recentallyView}>
                <View style={styles.imageViewStyle}>
                    <Image source={ImagesPath.job_list_image_icon} style={styles.imageStyle} />
                </View>
                <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginBottom: wp(1) }]}>
                    <Text style={styles.titleTxt}>{item.title}</Text>
                    <CustomStatusBtn onPress={() => {
                        navigation.navigate("JobDetailsScreen", { params: item, type: strings.returnjob })
                    }} title={strings.Open} />
                </View>
                <Text numberOfLines={2} style={styles.desTxt}>{item.description}</Text>
            </View>
        )
    }

    const data = [
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Return' },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Return' },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Return' },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Return' },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Return' },
        { title: 'Job Title', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', status: 'Return' },
    ]
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
                        <Text style={globalStyles.headerTitle}>{type == strings.returnjob ? strings.ReturnJob : strings.AddedJobHistory}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { }}>
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container >
                {
                    type == strings.addedjob ?
                        <CustomDashedComponent title={strings.ADDNEWJOB} viewStyle={{ marginHorizontal: wp(4), marginVertical: wp(3), paddingVertical: wp(5.5) }} image={ImagesPath.add_icon} onPress={() => { }} />
                        : null
                }
                <CustomSubTitleWithImageComponent viewStyle={{ paddingHorizontal: wp(4) }} title={strings.RecentallyReturnedJobs} image={ImagesPath.folder_user_icon} imageStyle={globalStyles.headerIcon} />
                <View style={{ height: "31%", marginVertical: wp(3) }}>
                    <FlatList data={data} showsHorizontalScrollIndicator={false} horizontal renderItem={renderItem} />
                </View>
                <CustomSubTitleWithImageComponent viewStyle={{ paddingHorizontal: wp(4) }} title='15 May 2022' image={ImagesPath.calender_icon} />
                <FlatList data={data} showsVerticalScrollIndicator={false} style={{ marginTop: wp(2), paddingHorizontal: wp(4) }} showsHorizontalScrollIndicator={false} renderItem={({ item, index }: any) => {
                    return (
                        <CustomeJobListDetailsViewComponent onPress={() => { }} item={item} />
                    )
                }} />
            </Container>
        </View>
    )
}

export default ReturnAndAddJobHistoryScreen
