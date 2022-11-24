import { Alert, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomCarouselImageAndVideo, CustomDashedComponent, CustomDetailsComponent, CustomModal, CustomSubTitleWithImageComponent, CustomSwitchComponent, CustomTextInput, CustomTextInputWithImage, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { styles } from './styles'
import { useFormik } from 'formik'
import * as yup from 'yup'
import DocumentPicker from 'react-native-document-picker';
import CommonPdfView from '../../components/CommonPdfView'
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

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

const AddNewJobScreen = () => {
    const navigation = useCustomNavigation('AddNewJobScreen');
    const [isUrgentJob, setIsUrgentJob] = useState(false)
    const [isFinishNotification, setIsFinishNotification] = useState(false)
    const [isModelVisible, setIsModelVisible] = useState(false)
    // const [imageUrl, setImageUrl] = useState('')
    const [imageList, setImageList] = useState<imageList[]>([])
    const [docList, setDocList] = useState<docList[] | []>([])


    const CreateJobValidationSchema = yup.object().shape({
        jobID: yup
            .string()
            .trim()
            .required(strings.jobid_required),
        address: yup.string().required(strings.address_required),
        addressInformation: yup.string().required(strings.addressInformation_required),
        description: yup.string().required(strings.description_required),
    });
    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: { jobID: '', address: '', addressInformation: '', description: '' },
            validationSchema: CreateJobValidationSchema,
            onSubmit: values => {
                // login(values)
            }
        })

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
            }
            else {
                ImageTempArray.push({ imgUrl: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
            }

            console.log(ImageTempArray)
            setImageList(ImageTempArray)
            console.log({ DocTempArray })
            setDocList(DocTempArray)
        } catch (err) {
            console.log("🚀 ~ file: index.tsx ~ line 63 ~ selectOneFile ~ err", err)
            if (DocumentPicker.isCancel(err)) {
            } else {
                Alert.alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    return (
        <View style={globalStyles.container}>
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
                <ScrollView contentContainerStyle={[{ paddingHorizontal: wp(4), paddingBottom: wp(5) }]}>
                    <CustomSubTitleWithImageComponent title={strings.Fillfromtocreatejob} image={ImagesPath.list_bullet_image_icon} />
                    <CustomTextInput
                        title={strings.JobId}
                        container={{ marginTop: wp(3) }}
                        placeholder={strings.JobId}
                        value={values.jobID}
                        onChangeText={handleChange("jobID")}
                    />
                    <CustomTextInputWithImage
                        title={strings.Address}
                        value={values.address}
                        placeholder={strings.Address}
                        placeholderTextColor={colors.dark_blue2_color}
                        onChangeText={handleChange("address")}
                        mainContainerStyle={{ marginTop: wp(5), flex: 1, }}
                        mapStyle={{ paddingVertical: Platform.OS == "ios" ? wp(4.2) : wp(5.5) }}
                        container={{ width: wp(68) }}
                        onPress={()=> navigation.navigate('CreateJobMapScreen')}
                    />
                    <CustomTextInput
                        title={strings.Addressinformation}
                        container={{ marginTop: wp(5) }}
                        value={values.addressInformation}
                        onChangeText={handleChange('addressInformation')}
                        placeholder={strings.Addressinformation}
                    />
                    <Text style={[{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10, color: colors.dark_blue3_color }]}>{strings.Additionaladdressinformation}</Text>
                    <CustomDetailsComponent
                        detailsContainerStyle={{ marginTop: wp(4) }}
                        title={strings.Description}
                        bottomComponent={
                            <TextInput
                                multiline
                                numberOfLines={3}
                                style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: 'right', maxHeight: wp(25) }]}
                                placeholderTextColor={colors.dark_blue2_color}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                placeholder={strings.Description}
                            />
                        }
                    />
                    {imageList && imageList.length != 0 && <CustomCarouselImageAndVideo
                        viewStyle={{ width: wp(90) }}
                        result={imageList} />}
                    {docList.length != 0 &&
                        <CustomDetailsComponent
                            title={strings.Attachment}
                            detailsContainerStyle={{ marginVertical: wp(4) }}
                            bottomComponent={
                                <FlatList
                                    numColumns={2}
                                    data={docList} renderItem={({ item, index }: any) => {
                                        return (
                                            <CommonPdfView
                                                onPress={() => {
                                                    const pdfName = item.url.split(/[#?]/)[0].split('/').pop().split('.')[0];
                                                    const extension = item.url.split(/[#?]/)[0].split(".").pop().trim();;
                                                    const localFile = `${RNFS.DocumentDirectoryPath}/${pdfName}.${extension}`;
                                                    const options = {
                                                        fromUrl: item.url,
                                                        toFile: localFile,
                                                    };
                                                    RNFS.downloadFile(options).promise.then(() =>
                                                        FileViewer.open(localFile)).then(() => {
                                                            
                                                        }).catch((error) => {
                                                            
                                                        });
                                                }}
                                                item={item} />
                                        )
                                    }} />
                            }
                        />}
                    <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        // onPress={() => { }}
                        onPress={() => selectOneFile()}
                        title={strings.Addimagesandattachments}
                        viewStyle={{ marginTop: wp(5), paddingVertical: wp(5) }} />
                    <CustomSwitchComponent
                        onPress={() => setIsUrgentJob(!isUrgentJob)}
                        value={isUrgentJob}
                        container={{ marginTop: wp(3) }}
                        title={strings.Priority}
                        subTitle={strings.UrgentJob} />
                    <CustomSwitchComponent
                        onPress={() => setIsFinishNotification(!isFinishNotification)}
                        value={isFinishNotification}
                        container={{ marginTop: wp(4) }}
                        title={strings.FurtherInspection}
                        subTitle={strings.FinishNotification} />
                    <CustomBlackButton
                        title={strings.CreateJob}
                        image={ImagesPath.add_icon}
                        imageStyle={{ tintColor: colors.white_color }}
                        onPress={() => setIsModelVisible(true)}
                    />
                    <CustomModal
                        visible={isModelVisible}
                        onRequestClose={() => { setIsModelVisible(false) }}
                        children={
                            <View style={styles.modalInnerView}>
                                <Image source={ImagesPath.check_icon_circle} style={globalStyles.modalImageStyle} />
                                <Text style={styles.modalDescriptionTxt}>{strings.NewJobAddedSuccessfully}</Text>
                                <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10), marginVertical: wp(2.5) }} onPress={() => { setIsModelVisible(false) }} title={strings.Okay} />
                            </View>
                        }
                    />
                </ScrollView>
            </Container>
        </View>
    )
}

export default AddNewJobScreen
