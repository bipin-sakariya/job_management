import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomDashedComponent, CustomDetailsComponent, CustomSubTitleWithImageComponent, CustomSwitchComponent, CustomTextInput, CustomTextInputWithImage, Header } from '../../components'
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

const AddNewJobScreen = () => {
    const navigation = useCustomNavigation('AddNewJobScreen');
    const [isUrgentJob, setIsUrgentJob] = useState(false)
    const [isFinishNotification, setIsFinishNotification] = useState(false)

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

    // const selectOneFile = async () => {
    //     //Opening Document Picker for selection of one file
    //     try {
    //         const res = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.images, DocumentPicker.types.pdf,],
    //             // type: [DocumentPicker.types.allFiles],
    //             presentationStyle: 'fullScreen',
    //             mode: 'import',
    //             allowMultiSelection: true,
    //             copyTo: 'cachesDirectory'
    //         })
    //         // const res = await DocumentPicker.pick({
    //         //     type: [DocumentPicker.types.allFiles],
    //         //     // DocumentPicker.types.allFiles
    //         //     // DocumentPicker.types.images
    //         //     // DocumentPicker.types.pdf
    //         // });
    //         console.log("🚀 ~ file: index.tsx ~ line 53 ~ selectOneFile ~ res", res)
    //         //Printing the log realted to the file
    //         console.log('res : ' + JSON.stringify(res));
    //         console.log('URI : ' + res.uri);
    //         console.log('Type : ' + res.type);
    //         console.log('File Name : ' + res.name);
    //         console.log('File Size : ' + res.size);
    //         //Setting the state to show single file attributes
    //         // setSingleFile(res);
    //     } catch (err) {
    //         console.log("🚀 ~ file: index.tsx ~ line 63 ~ selectOneFile ~ err", err)
    //         //Handling any exception (If any)
    //         if (DocumentPicker.isCancel(err)) {
    //             //If user canceled the document selection
    //             Alert.alert('Canceled from single doc picker');
    //         } else {
    //             //For Unknown Error
    //             Alert.alert('Unknown Error: ' + JSON.stringify(err));
    //             throw err;
    //         }
    //     }
    // };
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
                    <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        onPress={() => { }}
                        // onPress={() => selectOneFile()}
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
                    />
                </ScrollView>
            </Container>
        </View>
    )
}

export default AddNewJobScreen
