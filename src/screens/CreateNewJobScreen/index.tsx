import { Alert, FlatList, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomCarouselImageAndVideo, CustomDashedComponent, CustomDetailsComponent, CustomModal, CustomSubTitleWithImageComponent, CustomSwitchComponent, CustomTextInput, CustomTextInputWithImage, Header } from '../../components'
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
import { useIsFocused, useRoute } from '@react-navigation/native'
import CommonPdfView from '../../components/CommonPdfView'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { resetCreateJobLocationReducer } from '../../redux/slices/MapSlice/MapSlice'
import { jobDetail } from '../../redux/slices/AdminSlice/jobListSlice'
import { useFormik, isEmptyArray } from 'formik'
import * as yup from 'yup'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { recentReturnJobList, returnJobUpdate } from '../../redux/slices/AdminSlice/returnJobListSlice'

interface imageList {
    id?: number
    image?: string
    mediaType?: string
}

interface docList {
    path: string,
    type: string | undefined
    mb: number | null
    title: string | null
}

interface image_arrayList {
    uri: string,
    name: string,
    type: string
}

const CreateNewJobScreen = () => {

    const navigation = useCustomNavigation('CreateNewJobScreen');
    const route = useRoute<RootRouteProps<'CreateNewJobScreen'>>();
    const refRBSheet = useRef<RBSheet | null>(null)
    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()

    const { type } = route.params;
    const Id: number | undefined = route?.params?.jobId;

    const [isModelVisible, setIsModelVisible] = useState(false)
    const [isurgent, setIsUrgent] = useState(false)
    const [isnotification, setIsNotification] = useState(false)
    const [imageList, setImageList] = useState<imageList[]>([])
    const [docList, setDocList] = useState<docList[] | []>([])
    const [latlong, setLatLong] = useState({ latitude: '', longitude: '' })

    const { userData } = useAppSelector(state => state.userDetails)
    const { jobDetails, isLoading } = useAppSelector(state => state.jobList)

    useEffect(() => {
        if (isFocused && route?.params?.jobId) {
            dispatch(jobDetail(route?.params?.jobId)).unwrap().then((res) => {
            }).catch((error) => {
                console.log({ error });
            })
        }
        setImageList(jobDetails.images ?? [])
    }, [isFocused])

    useEffect(() => {
        dispatch(resetCreateJobLocationReducer())
    }, [])

    const CreateJobValidationSchema = yup.object().shape({
        jobID: yup.string().trim().required(strings.jobid_required),
    });

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                jobID: jobDetails.id ?? '',
                address: jobDetails.address ?? '',
                addressInformation: jobDetails.address_information ?? '',
                description: jobDetails.description ?? '',
            },
            validationSchema: CreateJobValidationSchema,
            onSubmit: values => {
                updateReturnJob(values)
            }
        })

    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                presentationStyle: 'fullScreen',
                mode: 'import',
                allowMultiSelection: true,
                copyTo: 'cachesDirectory'
            })
            let UpdatedImageArray: DocumentPickerResponse[] & imageList[] = []
            let ImageTempArray = [...imageList]
            let DocTempArray = [...docList]

            if (res[0]?.type?.split("/")[0] == 'application') {
                DocTempArray.push({ path: res[0].uri, type: res[0]?.type?.split("/")[1], mb: res[0].size, title: res[0].name })
            }
            else {
                ImageTempArray.push({ image: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
                UpdatedImageArray.push({ image: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
            }
            setImageList(ImageTempArray)
            setDocList(DocTempArray)
        }
        catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const updateReturnJob = (values: {
        jobID: string | number;
        address: string;
        addressInformation: string;
        description: string;
    }) => {
        if (values) {
            let data = new FormData()
            let image_array: image_arrayList[] = []
            if (imageList) {
                imageList.map((item, index) => {
                    let images = {
                        uri: item.image ?? '',
                        name: `photo${index}${item.mediaType == "image" ? '.jpg' : '.mp4'}`,
                        type: item.mediaType == "image" ? "image/jpeg" : 'video/mp4'
                    }
                    image_array.push(images)
                })
            }
            // data.append("id", values.jobID)
            data.append("address", values.address)
            data.append("address_information", values.addressInformation)
            data.append("description", values.description)
            if (latlong) {
                data.append("latitude", values.jobID)
                data.append("longitude", values.jobID)
            }
            data.append("priority", isurgent)
            data.append("further_inspection", isnotification)
            data.append("status", strings.jobOpen)

            if (!isEmptyArray(image_array)) {
                image_array.map((item) => {
                    data.append("image", item)
                })
            }
            dispatch(returnJobUpdate({ id: jobDetails.id, formData: data })).unwrap().then((value) => {
                dispatch(recentReturnJobList({ page: 1, search: '' }))
                setIsModelVisible(true)
            }).catch((error) => {
                console.log({ error })
            })
        }
    }

    const onCloseResponseModal = () => {
        setIsModelVisible(false)
        navigation.navigate('ReturnAndAddJobHistoryScreen', { type: 'returnJob' })
    }


    return (
        <View style={globalStyles.container} >
            <Header
                headerLeftStyle={{ width: "50%", paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{type == strings.returnJob ? strings.returnJob : strings.addNewJob}</Text>
                    </TouchableOpacity>
                }
                headerRightStyle={{
                    width: '50%',
                    paddingRight: wp(3)
                }}
                headerRightComponent={
                    <>
                        {
                            (userData?.role == strings.groupManager) &&
                            <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                                <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                            </TouchableOpacity>
                        }
                        {
                            type == strings.returnJob && (userData?.role == strings.admin || userData?.role == strings.inspector) ?
                                <TouchableOpacity onPress={() => { }} >
                                    <Text style={globalStyles.headerTitle}>{strings.done}</Text>
                                </TouchableOpacity> : null
                        }
                    </>
                } />
            <Container style={[globalStyles.container, { paddingHorizontal: wp(4) }]}>
                <CustomModal visible={isModelVisible} onClose={() => {
                    onCloseResponseModal()
                }} onRequestClose={() => {
                    onCloseResponseModal()
                }} children={
                    <View style={styles.modalInnerView}>
                        <Image source={ImagesPath.check_circle_icon} style={globalStyles.modalImageStyle} />
                        <Text style={{
                            fontFamily: fonts.FONT_POP_REGULAR,
                            fontSize: FontSizes.MEDIUM_16,
                            color: colors.black
                        }}>{strings.newJobAddedSuccessfully}</Text>
                        <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10), marginTop: wp(2) }} onPress={() => { onCloseResponseModal() }} title={strings.okay} />
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent disabled title={strings.fillFromToCreateJob} image={ImagesPath.list_bullet_image_icon} />
                    <View style={{ paddingVertical: wp(5) }}>
                        <CustomTextInput
                            editable={false}
                            title={strings.jobId}
                            container={{ marginBottom: wp(1) }}
                            placeholder={strings.jobId}
                            value={values.jobID.toString()}
                            onChangeText={handleChange("jobID")}
                            keyboardType={'number-pad'}
                        />
                        <CustomTextInputWithImage
                            title={values.address}
                            value={values.address}
                            placeholder={strings.address}
                            placeholderTextColor={colors.dark_blue2_color}
                            onChangeText={handleChange("address")}
                            mainContainerStyle={{ marginTop: wp(5), flex: 1, }}
                            mapStyle={{ paddingVertical: Platform.OS == "ios" ? wp(4.2) : wp(5.5) }}
                            container={{ width: wp(68) }}
                            onPress={() => navigation.navigate('CreateJobMapScreen', {
                                isEditing: true,
                                isAddressPreview: true,
                                isButtonVisible: true,
                                screenName: 'AddNewJobScreen',
                            })}
                        />
                        <CustomTextInput
                            container={{ marginTop: wp(5) }}
                            title={strings.addressInformation}
                            numberOfLines={2}
                            value={values.addressInformation}
                            onChangeText={handleChange('addressInformation')}
                            placeholder={strings.addressInformation}
                        />
                        <Text style={{ marginVertical: wp(1), marginBottom: wp(3), alignSelf: 'flex-end', color: '#B7B7B7', fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10 }}>{strings.additionaladdressinformation}</Text>
                        <CustomDetailsComponent
                            title={strings.description}
                            bottomComponent={
                                <TextInput
                                    multiline
                                    numberOfLines={3}
                                    style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: 'right', maxHeight: wp(25) }]}
                                    placeholderTextColor={colors.dark_blue2_color}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    placeholder={strings.description}
                                />
                            }
                        />
                        {
                            type == strings.returnJob ?
                                <>
                                    <CustomCarouselImageAndVideo viewStyle={{ width: wp(90) }} result={imageList} />
                                    {
                                        (jobDetails.attachments && jobDetails.attachments.length != 0) && <CustomDetailsComponent
                                            title={strings.attachment}
                                            detailsContainerStyle={{ marginVertical: wp(4) }}
                                            bottomComponent={
                                                <FlatList
                                                    data={jobDetails.attachments}
                                                    numColumns={2}
                                                    renderItem={({ item, index }: any) => {
                                                        return (
                                                            <CommonPdfView item={item} />
                                                        )
                                                    }}
                                                    showsVerticalScrollIndicator={false} />
                                            }
                                        />
                                    }
                                </> : null
                        }
                        <CustomDashedComponent
                            viewStyle={{ paddingVertical: wp(5) }}
                            image={ImagesPath.add_icon}
                            onPress={() => { selectOneFile() }}
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
                            title={type == strings.returnJob ? strings.saveChanges : strings.createJob}
                            onPress={() => {
                                handleSubmit()
                            }}
                            image={type == strings.returnJob ? ImagesPath.floppy_disk_icon : ImagesPath.plus_white_circle_icon}
                        />
                    </View >
                </ScrollView >
            </Container >
        </View >
    )
}

export default CreateNewJobScreen
