import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomCarouselImageAndVideo from '../../components/CustomCarouselImageAndVideo'
import CustomTextInputWithImage from '../../components/CustomTextInputWithImage'
import { RootRouteProps } from '../../types/RootStackTypes'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { jobDetail, JobDetailsData } from '../../redux/slices/AdminSlice/jobListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { returnJobCreate } from '../../redux/slices/AdminSlice/returnJobListSlice'

const DuplicateScreen = () => {

    const navigation = useCustomNavigation('DuplicateScreen')
    const route = useRoute<RootRouteProps<'DuplicateScreen'>>()
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()

    const { jobDetails, isLoading } = useAppSelector(state => state.jobList)

    const selectedJobDetailsForDuplicate: JobDetailsData | undefined = route.params?.jobDetails

    const updateReturnJob = () => {
        let params = {
            status: strings.wrongInformation,
            comment: '',
            job: selectedJobDetailsForDuplicate?.id,
            duplicate: jobDetails?.id
        }

        dispatch(returnJobCreate(params)).unwrap().then((res) => {
            navigation.navigate('JobDetailsScreen', { params: jobDetails })
        }).catch((e) => {
            console.log({ error: e });
        })
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.duplicate}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent disabled title={strings.duplicateJob} image={ImagesPath.files_icon} viewStyle={{ marginBottom: hp(0.5) }} />
                    <View style={styles.duplicateFirstView}>
                        <CustomTextInput
                            title={strings.jobId}
                            container={{ marginBottom: wp(4) }}
                            value={jobDetails?.id.toString()}
                        />
                        <CustomTextInputWithImage
                            disabled
                            title={jobDetails?.address}
                            value={jobDetails?.address_information}
                            mainContainerStyle={{ flex: 1, }}
                            container={{ width: wp(61) }}
                            mapStyle={{
                                paddingHorizontal: wp(3)
                            }} />
                        <CustomCarouselImageAndVideo result={jobDetails.images ?? []} viewStyle={{ width: '81%', }} />
                    </View>
                    <CustomSubTitleWithImageComponent
                        disabled
                        title={strings.originalJob}
                        image={ImagesPath.files_icon}
                        viewStyle={{ marginVertical: hp(1) }}
                    />
                    <View style={[styles.duplicateFirstView, {}]}>
                        <CustomTextInput
                            title={strings.jobId}
                            container={{ marginBottom: wp(4) }}
                            value={selectedJobDetailsForDuplicate?.id.toString()}
                        />
                        <CustomTextInputWithImage title={jobDetails.address}
                            disabled
                            value={selectedJobDetailsForDuplicate?.address_information}
                            mainContainerStyle={{ flex: 1, }}
                            container={{ width: wp(61) }}
                            mapStyle={{
                                paddingHorizontal: wp(3)
                            }} />
                        <CustomCarouselImageAndVideo result={selectedJobDetailsForDuplicate?.images ?? []} viewStyle={{ width: '81%', }} />
                    </View>
                    <CustomBlackButton
                        onPress={() => updateReturnJob()}
                        buttonStyle={{ marginVertical: wp(10) }}
                        image={ImagesPath.arrow_counter_clockwise_white_icon}
                        title={strings.returnToInspector}
                    />
                </ScrollView>
            </Container>
        </View>
    )
}

export default DuplicateScreen