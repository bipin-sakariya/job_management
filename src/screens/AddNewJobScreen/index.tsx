import { Alert, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomActivityIndicator, CustomBlackButton, CustomCarouselImageAndVideo, CustomDashedComponent, CustomDetailsComponent, CustomModal, CustomSubTitleWithImageComponent, CustomSwitchComponent, CustomTextInput, CustomTextInputWithImage, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { styles } from './styles'
import { isEmptyArray, useFormik } from 'formik'
import * as yup from 'yup'
import DocumentPicker from 'react-native-document-picker';
import CommonPdfView from '../../components/CommonPdfView'
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { jobCreate } from '../../redux/slices/AdminSlice/jobListSlice'

interface imageList {
    id: number
    imgUrl: string
    mediaType: string
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
interface doc_arrayList {
    uri: string,
    name: string | null
    type: string | undefined,
    mb: number | null
}
const AddNewJobScreen = () => {
    const navigation = useCustomNavigation('AddNewJobScreen');
    const [isUrgentJob, setIsUrgentJob] = useState(false)
    const [isFinishNotification, setIsFinishNotification] = useState(false)
    const [isModelVisible, setIsModelVisible] = useState(false)
    // const [imageUrl, setImageUrl] = useState('')
    const [imageList, setImageList] = useState<imageList[]>([])
    const [docList, setDocList] = useState<docList[] | []>([])
    const [imageError, setImageError] = useState(false)
    const [docError, setDocError] = useState(false)
    const { isLoading } = useAppSelector(state => state.jobList)
    const [latlong, setLatLong] = useState({ latitude: '', longitude: '' })
    const dispatch = useAppDispatch()
    const [error, setError] = useState({
        id: '',
        address: '',
        address_information: '',
        description: '',
        images: '',
        attachments: ''
    })

    const createJob = (values: {
        jobID: string;
        address: string;
        addressInformation: string;
        description: string;
    }) => {
        if (values && !imageError && !docError) {
            let data = new FormData

            let image_array: image_arrayList[] = []
            let doc_array: doc_arrayList[] = []

            if (imageList) {
                imageList.map((item, index) => {
                    let images = {
                        uri: item.imgUrl,
                        name: `photo${index}${item.mediaType == "image" ? '.jpg' : '.mp4'}`,
                        type: item.mediaType == "image" ? "image/jpeg" : 'video/mp4'
                    }
                    image_array.push(images)
                })
            }
            if (docList) {
                docList.map((item, index) => {
                    let docs = {
                        uri: item.path,
                        name: item.title,
                        type: item.type,
                        mb: item.mb
                    }
                    doc_array.push(docs)
                })
            }
            data.append("id", values.jobID)
            data.append("address", values.address)
            data.append("address_information", values.addressInformation)
            data.append("description", values.description)
            if (latlong) {
                data.append("latitude", values.jobID)
                data.append("longitude", values.jobID)
            }
            data.append("priority", isUrgentJob)
            data.append("further_inspection", isFinishNotification)
            data.append("status", strings.JobOpen)
            if (!isEmptyArray(image_array)) {
                data.append("image", image_array)
            }
            if (!isEmptyArray(doc_array)) {
                data.append("attachment", docList)
            }
            dispatch(jobCreate(data)).unwrap().then((datas) => {
                console.log({ datas: datas });
                setIsModelVisible(true)
            }).catch((error) => {
                console.log({ Error: error });
                setError(error.data)
            })
        } else {
            if (isEmptyArray(imageList)) {
                setImageError(true)
            }
            if (isEmptyArray(docList)) {
                setDocError(true)
            }
        }
    }

    const CreateJobValidationSchema = yup.object().shape({
        jobID: yup
            .string()
            .trim()
            .required(strings.jobid_required),
        address: yup.string().required(strings.address_required),
        addressInformation: yup.string().required(strings.addressInformation_required),
        description: yup.string().required(strings.description_required),
    });
    const { values, errors, touched, handleSubmit, handleChange } =
        useFormik({
            enableReinitialize: true,
            initialValues: { jobID: '', address: '', addressInformation: '', description: '', },
            validationSchema: CreateJobValidationSchema,
            onSubmit: values => {
                createJob(values)
            }
        })


    useEffect(() => {
        if (values.jobID) {
            setError({ ...error, id: '' })
        }
        if (values.address) {
            setError({ ...error, address: '' })
        }
        if (values.addressInformation) {
            setError({ ...error, address_information: '' })
        }
        if (values.description) {
            setError({ ...error, description: '' })
        }
    }, [values])

    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                // type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.video],
                type: [DocumentPicker.types.allFiles],
                presentationStyle: 'fullScreen',
                mode: 'import',
                allowMultiSelection: true,
                copyTo: 'cachesDirectory'
            })
            let ImageTempArray = [...imageList]
            let DocTempArray = [...docList]
            if (res[0]?.type?.split("/")[0] == 'application') {
                DocTempArray.push({ path: res[0].uri, type: res[0]?.type?.split("/")[1], mb: res[0].size, title: res[0].name })
                setDocError(false)
            }
            else {
                ImageTempArray.push({ imgUrl: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
                setImageError(false)
            }
            console.log(ImageTempArray)
            setImageList(ImageTempArray)
            console.log({ DocTempArray })
            setDocList(DocTempArray)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator size={'small'} />}
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3),
                    width: wp(55),
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.AddNewJob}</Text>
                    </TouchableOpacity>
                }
            />
            <Container>
                <ScrollView contentContainerStyle={[{ paddingHorizontal: wp(4), paddingBottom: wp(5) }]} showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent title={strings.fillFromToCreateJob} image={ImagesPath.list_bullet_image_icon} />
                    <CustomTextInput
                        title={strings.jobId}
                        container={{ marginTop: wp(3) }}
                        placeholder={strings.jobId}
                        value={values.jobID}
                        onChangeText={handleChange("jobID")}
                    />
                    {(touched?.jobID && errors?.jobID) || error?.id ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{errors?.jobID ? errors.jobID : error?.id}</Text> : null}
                    <CustomTextInputWithImage
                        title={strings.Address}
                        value={values.address}
                        placeholder={strings.Address}
                        placeholderTextColor={colors.dark_blue2_color}
                        onChangeText={handleChange("address")}
                        mainContainerStyle={{ marginTop: wp(5), flex: 1, }}
                        mapStyle={{ paddingVertical: Platform.OS == "ios" ? wp(4.2) : wp(5.5) }}
                        container={{ width: wp(68) }}
                        onPress={() => navigation.navigate('CreateJobMapScreen')}
                    />
                    {(touched?.address && errors?.address) || error?.address ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{errors?.address ? errors.address : error?.address}</Text> : null}
                    <CustomTextInput
                        title={strings.addressInformation}
                        container={{ marginTop: wp(5) }}
                        value={values.addressInformation}
                        onChangeText={handleChange('addressInformation')}
                        placeholder={strings.addressInformation}
                    />
                    <Text style={[{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10, color: colors.dark_blue3_color }]}>{strings.Additionaladdressinformation}</Text>
                    {(touched?.addressInformation && errors?.addressInformation) || error?.address_information ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{errors?.addressInformation ? errors.addressInformation : error?.address_information}</Text> : null}
                    <CustomDetailsComponent
                        detailsContainerStyle={{ marginTop: wp(4) }}
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
                    {(touched?.description && errors?.description) || error?.description ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{errors?.description ? errors.description : error?.description}</Text> : null}
                    {imageList && imageList.length != 0 &&
                        <CustomCarouselImageAndVideo
                            viewStyle={{ width: wp(90) }}
                            result={imageList} />}
                    {docList.length != 0 &&
                        <CustomDetailsComponent
                            title={strings.attachment}
                            detailsContainerStyle={{ marginVertical: wp(4) }}
                            bottomComponent={
                                <FlatList
                                    numColumns={2}
                                    data={docList}
                                    renderItem={({ item, index }: any) => {
                                        return (
                                            <CommonPdfView
                                                onPress={() => {
                                                    const pdfName = item.path.split(/[#?]/)[0].split('/').pop().split('.')[0];
                                                    const extension = item.path.split(/[#?]/)[0].split(".").pop().trim();;
                                                    const localFile = `${RNFS.DocumentDirectoryPath}/${pdfName}.${extension}`;
                                                    const options = {
                                                        fromUrl: item.path,
                                                        toFile: localFile,
                                                    };
                                                    RNFS.downloadFile(options).promise.then(() =>
                                                        FileViewer.open(localFile)).then(() => {
                                                        }).catch((error) => {
                                                        });
                                                }}
                                                item={item} />
                                        )
                                    }}
                                    showsVerticalScrollIndicator={false} />
                            }
                        />}
                    <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        onPress={() => selectOneFile()}
                        title={strings.Addimagesandattachments}
                        viewStyle={{ marginTop: wp(5), paddingVertical: wp(5) }} />
                    {
                        imageError && docError ?
                            <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{strings.ImageandAttachments_required}</Text> :
                            <>
                                {imageError || error.images ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{error.images ? error.images : strings.Image_required}</Text> : null}
                                {docError || error.attachments ? <Text style={[globalStyles.rtlStyle, { color: 'red' }]}>{error.attachments ? error.attachments : strings.Attachments_required}</Text> : null}
                            </>
                    }
                    <CustomSwitchComponent
                        onPress={() => setIsUrgentJob(!isUrgentJob)}
                        value={isUrgentJob}
                        container={{ marginTop: wp(3) }}
                        title={strings.priority}
                        subTitle={strings.UrgentJob} />
                    <CustomSwitchComponent
                        onPress={() => setIsFinishNotification(!isFinishNotification)}
                        value={isFinishNotification}
                        container={{ marginTop: wp(4) }}
                        title={strings.furtherInspection}
                        subTitle={strings.finishNotification} />
                    <CustomBlackButton
                        title={strings.createJob}
                        image={ImagesPath.add_icon}
                        imageStyle={{ tintColor: colors.white_color }}
                        onPress={() => {
                            if (isEmptyArray(imageList)) {
                                setImageError(true)
                            }
                            if (isEmptyArray(docList)) {
                                setDocError(true)
                            }
                            handleSubmit()
                        }}
                    />
                    <CustomModal
                        visible={isModelVisible}
                        onRequestClose={() => { setIsModelVisible(false) }}
                        children={
                            <View style={styles.modalInnerView}>
                                <Image source={ImagesPath.check_icon_circle} style={globalStyles.modalImageStyle} />
                                <Text style={styles.modalDescriptionTxt}>{strings.newJobAddedSuccessfully}</Text>
                                <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10), marginVertical: wp(2.5) }} onPress={() => {
                                    setIsModelVisible(false)
                                    navigation.goBack()
                                }} title={strings.okay} />
                            </View>
                        }
                    />
                    <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }}
                        children={
                            <View style={styles.modalInnerView}>
                                <Image source={ImagesPath.check_icon_circle} style={globalStyles.modalImageStyle} />
                                <Text style={{
                                    fontFamily: fonts.FONT_POP_REGULAR,
                                    fontSize: FontSizes.MEDIUM_16,
                                    color: colors.black
                                }}>{strings.newJobAddedSuccessfully}</Text>
                                <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10), marginTop: wp(2) }} onPress={() => { setIsModelVisible(false) }} title={strings.okay} />
                            </View>
                        } />
                </ScrollView>
            </Container>
        </View>
    )
}

export default AddNewJobScreen
