import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomCarouselImageAndVideo, CustomDashedComponent, CustomDetailsComponent, CustomJobDetailsBottomButton, CustomModal, CustomSubTitleWithImageComponent, CustomSwitchComponent, CustomTextInput, CustomTextInputWithImage, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import RBSheet from 'react-native-raw-bottom-sheet'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { RootRouteProps } from '../../types/RootStackTypes'
import { useRoute } from '@react-navigation/native'
import CommonPdfView from '../../components/CommonPdfView'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { resetCreateJobLocationReducer } from '../../redux/slices/MapSlice/MapSlice'

interface ValuesProps {
    status: string;
    id: number;
}

const CreateNewJobScreen = () => {
    const navigation = useCustomNavigation('CreateNewJobScreen')
    const route = useRoute<RootRouteProps<'CreateNewJobScreen'>>();
    const { type } = route.params
    const { userData } = useAppSelector(state => state.userDetails)
    const refRBSheet = useRef<RBSheet | null>(null)
    const dispatch = useAppDispatch()

    const [isModelVisible, setIsModelVisible] = useState(false)
    const [isurgent, setIsUrgent] = useState(false)
    const [isnotification, setIsNotification] = useState(false)
    const pdfData = [
        { title: "Doc_Name.pdf", type: 'Doc', mb: "12 mb" },
        { title: "Doc_Name.pdf", type: 'Doc', mb: "12 mb" },
    ]
    const result = [
        {
            id: 1,
            mediaType: "image",
            imgUrl: "https://images.unsplash.com/photo-1473177027534-53d906e9abcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
        },
        {
            id: 2,
            mediaType: "video",
            imgUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
        },
        {
            id: 3,
            mediaType: "image",
            imgUrl: "https://images.unsplash.com/photo-1473177027534-53d906e9abcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
        },
        {
            id: 4,
            mediaType: "video",
            imgUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
        }

    ]

    useEffect(() => {
        dispatch(resetCreateJobLocationReducer())
    }, [])


    // const createbills = (values: ValuesProps) => {

    //         var data = new FormData()

    //         data.append('id',)
    //         data.append("type", type == 'material' ? "Material" : 'Sign')

    //         console.log("🚀 ~ file: index.tsx ~ line 73 ~ createbills ~ data", data)

    //         dispatch(updatejob(data)).unwrap().then((res) => {
    //             console.log({ res: res });
    //             navigation.navigate('BillListScreen', { billType: type })
    //         }).catch((e) => {
    //             console.log({ error: e });
    //         })

    // }

    return (
        <View style={globalStyles.container} >
            <Header
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{type == strings.returnJob ? strings.returnJob : strings.AddNewJob}</Text>
                    </TouchableOpacity>
                }
                headerRightStyle={{
                    width: '50%',
                    paddingRight: wp(3)
                }}
                headerRightComponent={
                    <>
                        {
                            (userData?.role == strings.Group_Manager) &&
                            <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                                <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                            </TouchableOpacity>
                        }
                        {
                            type == strings.returnJob && (userData?.role == strings.Admin || userData?.role == strings.Inspector) ?
                                <TouchableOpacity onPress={() => { }} >
                                    <Text style={globalStyles.headerTitle}>{strings.Done}</Text>
                                </TouchableOpacity> : null
                        }
                    </>
                } />
            <Container style={[globalStyles.container, { paddingHorizontal: wp(4) }]}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalInnerView}>
                        <Image source={ImagesPath.check_circle_icon} style={globalStyles.modalImageStyle} />
                        <Text style={{
                            fontFamily: fonts.FONT_POP_REGULAR,
                            fontSize: FontSizes.MEDIUM_16,
                            color: colors.black
                        }}>{strings.newJobAddedSuccessfully}</Text>
                        <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10), marginTop: wp(2) }} onPress={() => { setIsModelVisible(false) }} title={strings.okay} />
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent disabled title={strings.fillFromToCreateJob} image={ImagesPath.list_bullet_image_icon} />
                    <View style={{ paddingVertical: wp(5) }}>
                        <CustomTextInput
                            title={strings.jobId}
                            container={{ marginBottom: wp(1) }}
                            value={"#123"}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        <CustomTextInputWithImage
                            title="9 Oxfort street"
                            value='9 Oxfort street'
                            container={{ marginVertical: wp(5), width: wp(67) }}
                            onPress={() => {
                                navigation.navigate('CreateJobMapScreen', {
                                    isEditing: true,
                                    jobLocation: {
                                        latitude: 21.247181,
                                        longitude: 72.890877,
                                    },
                                    isButtonVisible: true,
                                    isAddressPreview: true,
                                    screenName: 'CreateNewJobScreen'
                                })
                            }}
                        />
                        <CustomTextInput
                            title={strings.addressInformation}
                            numberOfLines={2}
                            value={"Just behind new yellow house"}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        <Text style={{ marginVertical: wp(1), marginBottom: wp(3), alignSelf: 'flex-end', color: '#B7B7B7', fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10 }}>{strings.Additionaladdressinformation}</Text>
                        <CustomDetailsComponent
                            title={strings.description}
                            bottomComponent={
                                <Text numberOfLines={3} style={styles.bottomTxtStyle}>Lorem Ipsum is simply dummy text of the printing and,typesetting industry has been the industry's standard dummy text....</Text>
                            }
                        />
                        {
                            type == strings.returnJob && userData?.role == strings.Inspector ?
                                <>
                                    <CustomCarouselImageAndVideo viewStyle={{ width: wp(90) }} result={result} />
                                    <CustomDetailsComponent
                                        title={strings.attachment}
                                        detailsContainerStyle={{ marginVertical: wp(4) }}
                                        bottomComponent={
                                            <FlatList
                                                data={pdfData}
                                                numColumns={2}
                                                renderItem={({ item, index }: any) => {
                                                    return (
                                                        <CommonPdfView item={item} />
                                                    )
                                                }}
                                                showsVerticalScrollIndicator={false} />
                                        }
                                    />
                                </> : null
                        }
                        <CustomDashedComponent
                            viewStyle={{ paddingVertical: wp(5) }}
                            image={ImagesPath.add_icon}
                            onPress={() => { }}
                            title={strings.addPhotosAndAttachments}
                        />
                        <CustomSwitchComponent container={{
                            marginVertical: wp(3)
                        }}
                            title={strings.priority}
                            subTitle="Urgent Job"
                            value={isurgent}
                            onPress={() => setIsUrgent(!isurgent)} />
                        <CustomSwitchComponent
                            title={strings.finishNotification}
                            subTitle='Finish Notification'
                            value={isnotification}
                            onPress={() => setIsNotification(!isnotification)}
                        />
                        <CustomBlackButton
                            title={type == strings.returnJob ? strings.SaveChanges : strings.createJob}
                            onPress={() => {
                                setIsModelVisible(true)
                            }}
                            image={type == strings.returnJob ? ImagesPath.floppy_disk_icon : ImagesPath.plus_white_circle_icon}
                        />
                    </View>
                </ScrollView>
            </Container>
        </View >
    )
}

export default CreateNewJobScreen
