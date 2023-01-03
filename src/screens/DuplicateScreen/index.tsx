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
import { jobDetail } from '../../redux/slices/AdminSlice/jobListSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { returnJobCreate } from '../../redux/slices/AdminSlice/returnJobListSlice'

const DuplicateScreen = () => {
    const navigation = useCustomNavigation('DuplicateScreen')
    const route = useRoute<RootRouteProps<'DuplicateScreen'>>()
    const isFocused = useIsFocused()
    const dispatch = useAppDispatch()

    const { jobDetails, isLoading, jobDetailsData } = useAppSelector(state => state.jobList)
    const id: number | undefined = route.params?.params

    useEffect(() => {
        if (isFocused && route.params && id) {
            dispatch(jobDetail(id)).unwrap().then((res) => {
            }).catch((error) => {
                console.log({ error });
            })
        }
    }, [])

    const updateReturnJob = () => {
        let params = {
            status: 'לְשַׁכְפֵּל',
            comment: '',
            job: jobDetailsData?.id,
            duplicate: id
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
                            value={jobDetailsData?.id.toString()}
                        />
                        <CustomTextInputWithImage
                            disabled
                            title={jobDetailsData?.address}
                            value={jobDetailsData?.address_information}
                            mainContainerStyle={{ flex: 1, }}
                            container={{ width: wp(61) }}
                            mapStyle={{
                                paddingHorizontal: wp(3)
                            }} />
                        <CustomCarouselImageAndVideo result={jobDetails.images} viewStyle={{ width: '81%', }} />
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
                            value={jobDetails.id.toString()}
                        />
                        <CustomTextInputWithImage title={jobDetails.address}
                            value={jobDetails.address_information}
                            mainContainerStyle={{ flex: 1, }}
                            container={{ width: wp(61) }}
                            mapStyle={{
                                paddingHorizontal: wp(3)
                            }} />
                        <CustomCarouselImageAndVideo result={jobDetails.images} viewStyle={{ width: '81%', }} />
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