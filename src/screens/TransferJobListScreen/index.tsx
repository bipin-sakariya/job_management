import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomJobListComponent, CustomSubTitleWithImageComponent, Header } from '../../components'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { useIsFocused } from '@react-navigation/native'
import CustomStatusBtn from '../../components/CustomStatusBtn'
import { styles } from './styles'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { convertDate } from '../../utils/screenUtils'
import { JobDetailsData, recentTransferJobList, transferJobList } from '../../redux/slices/AdminSlice/jobListSlice'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { strings } from '../../languages/localizedStrings'

interface jobListParams {
  page?: number,
  search?: string
}

const ReturnAndAddJobHistoryScreen = () => {
  const navigation = useCustomNavigation('ReturnAndAddJobHistoryScreen');
  const isFocus = useIsFocused()
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [jobPage, setJobPage] = useState(1)
  const [recentJob, setRecentJob] = useState<JobDetailsData[]>([])
  const [isJobList, setJobList] = useState<JobDetailsData[]>([])

  useEffect(() => {
    if (isFocus)
      recentTransferJobListApiCall(page)
    transferJobListApiCall(jobPage)
    return () => {
      setPage(1)
    }
  }, [isFocus])

  const recentTransferJobListApiCall = (page: number) => {
    let params: jobListParams = {
      page: page,
      search: ''
    }
    dispatch(recentTransferJobList(params)).unwrap().then((res) => {
      setRecentJob(res.results)
      setPage(page + 1)
    }).catch((error) => {
      console.log({ error });
    })
  }

  const transferJobListApiCall = (jobpage: number) => {
    let params: jobListParams = {
      page: jobPage,
      search: ''
    }
    dispatch(transferJobList(params)).unwrap().then((res) => {
      setJobList(res.results)
      setJobPage(jobpage + 1)
    }).catch((error) => {
      console.log({ error });
    })
  }

  const renderItem = ({ item }: { item: JobDetailsData }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('JobDetailsScreen', { params: item })}
        style={[styles.containerShadow, styles.recentallyView]}>
        <Image
          source={ImagesPath.job_list_image_icon}
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
            <Text style={globalStyles.headerTitle}>Transfered Job</Text>
          </TouchableOpacity>
        }
        headerRightComponent={
          <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.navigate('SearchScreen', { screenName: 'transferJobScreen' }) }}>
            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
          </TouchableOpacity>
        }
      />
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomSubTitleWithImageComponent
            viewStyle={{ paddingHorizontal: wp(4) }}
            title={strings.recently_assigned_jobs}
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
              style={{ marginTop: wp(2), }}
              ItemSeparatorComponent={() => <View style={{ height: wp(3) }} />}
            />
          </View>
        </ScrollView>
      </Container>
    </View>
  )
}

export default ReturnAndAddJobHistoryScreen;
