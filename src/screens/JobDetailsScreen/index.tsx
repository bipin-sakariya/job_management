import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BottomSheet, Container, CustomDashedComponent, CustomJobDetailsBottomButton, CustomSubTitleWithImageComponent, CustomTextInput, Header } from "../../components";
import CustomDetailsComponent from "../../components/CustomDetailsComponent";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { styles } from "./styles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomBlackButton from "../../components/CustomBlackButton";
import Video from 'react-native-video';
import RBSheet from "react-native-raw-bottom-sheet";
import { RootState, useAppSelector } from "../../redux/Store";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";
import CustomSwitchComponent from "../../components/CustomSwitchComponent";
import { strings } from "../../languages/localizedStrings";
import { BlurView } from "@react-native-community/blur";
import CustomModal from "../../components/CustomModal";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import CustomCarouselImageAndVideo from "../../components/CustomCarouselImageAndVideo";
import CustomTextInputWithImage from "../../components/CustomTextInputWithImage";
import { colors } from "../../styles/Colors";

const JobDetailsScreen = () => {
    const navigation = useCustomNavigation('JobDetailsScreen')
    const route: any = useRoute()
    const refRBSheet = useRef<RBSheet | null>(null);
    const [isurgent, setIsUrgent] = useState(false)
    const [isnotification, setIsNotification] = useState(false)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const { userData } = useAppSelector((state: RootState) => state.userDetails)
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
    return (
        <View style={globalStyles.container} >
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={styles.JobTxt}>{strings.Job}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    userData?.role != strings.Inspector &&
                    <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                } />
            <Container style={[globalStyles.container, { paddingHorizontal: wp(3) }]}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalInnerView}>
                        <Image source={ImagesPath.check_circle_icon} style={globalStyles.modalImageStyle} />
                        <Text style={{
                            fontFamily: fonts.FONT_POP_REGULAR,
                            fontSize: FontSizes.MEDIUM_16,
                            color: colors.black
                        }}>{strings.NewJobAddedSuccessfully}</Text>
                        <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10), marginTop: wp(2) }} onPress={() => { setIsModelVisible(false) }} title={strings.Okay} />
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        userData?.role == strings.Inspector &&
                        <CustomSubTitleWithImageComponent title={strings.Fillfromtocreatejob} image={ImagesPath.list_bullet_image_icon} />
                    }
                    <View style={[globalStyles.rowView, { justifyContent: "space-between" }]}>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", alignItems: "center" }]}>
                            <Image source={ImagesPath.infocircle_icon} style={styles.infoCircle} />
                            <Text style={styles.jobTitle}>{route.params?.params.title}</Text>
                        </View>
                        {
                            route.params?.params.status &&
                            <TouchableOpacity style={styles.statusBut}>
                                <Text style={styles.statusBtnTxt}>{route.params?.params.status}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ paddingVertical: wp(5) }}>
                        <CustomTextInput
                            title={strings.JobId}
                            container={{ marginBottom: wp(1) }}
                            value={"#123"}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        <CustomTextInputWithImage
                            title="9 Oxfort street"
                            value='9 Oxfort street'
                            container={{ marginVertical: wp(5), width: wp(70) }} />
                        {
                            userData?.role == strings.Inspector &&
                            <CustomTextInput
                                title={strings.Addressinformation}
                                numberOfLines={2}
                                value={"Just behind new yellow house"}
                                // editable={isEdit}
                                onChangeText={(text) => { }}
                            />
                        }
                        {userData?.role == strings.Inspector &&
                            <Text style={{ marginVertical: wp(1), marginBottom: wp(3), alignSelf: 'flex-end', color: '#B7B7B7', fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10 }}>Additional Address Information</Text>
                        }
                        <CustomDetailsComponent
                            title={strings.Description}
                            bottomComponent={
                                <Text numberOfLines={3} style={styles.bottomTxtStyle}>Lorem Ipsum is simply dummy text of the printing and,typesetting industry has been the industry's standard dummy text....</Text>
                            }
                        />
                        {
                            userData?.role == strings.Inspector ?
                                <>
                                    <CustomDashedComponent
                                        viewStyle={{ paddingVertical: wp(5), marginTop: wp(5) }}
                                        image={ImagesPath.add_icon}
                                        onPress={() => { }}
                                        title={strings.AddPhotosandAttachments}
                                    />
                                    <CustomSwitchComponent container={{
                                        marginVertical: wp(5)
                                    }}
                                        title={strings.Priority}
                                        subTitle="Urgent Job"
                                        value={isurgent}
                                        onPress={() => setIsUrgent(!isurgent)} />
                                    <CustomSwitchComponent
                                        title={strings.FinishNotification}
                                        subTitle='Finish Notification'
                                        value={isnotification}
                                        onPress={() => setIsNotification(!isnotification)}
                                    />
                                </>
                                :
                                <>
                                    <CustomCarouselImageAndVideo result={result} />
                                    <CustomDetailsComponent
                                        title={strings.Attachment}
                                        detailsContainerStyle={{ marginVertical: wp(4) }}
                                        bottomComponent={
                                            <View style={[globalStyles.rowView, styles.mainDocView]}>
                                                <View style={[globalStyles.rowView, styles.docStyle]}>
                                                    <View style={[globalStyles.centerView, styles.docPdfViewStyle]}>
                                                        <Text style={styles.docTypeTxt}>PDF</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: wp(2) }}>
                                                        <Text style={styles.docFileNameTxt}>Doc_Name.pdf</Text>
                                                        <Text style={styles.docFileSizeTxt}>12 mb</Text>
                                                    </View>
                                                </View>
                                                <View style={[globalStyles.rowView, styles.docStyle]}>
                                                    <View style={[globalStyles.centerView, styles.docPdfViewStyle]}>
                                                        <Text style={styles.docTypeTxt}>DOC</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: wp(2) }}>
                                                        <Text style={styles.docFileNameTxt}>Doc_Name.pdf</Text>
                                                        <Text style={styles.docFileSizeTxt}>12 mb</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        }
                                    />
                                    <CustomDetailsComponent
                                        title={strings.JobAddedby}
                                        bottomComponent={
                                            <View style={[globalStyles.rowView, styles.jobView]}>
                                                <View style={[globalStyles.rowView, globalStyles.spaceAroundView]}>
                                                    <View style={styles.jobImageView}>
                                                        <Image source={ImagesPath.image_white_border} style={styles.jobImage} />
                                                    </View>
                                                    <View style={styles.jobDetailsView}>
                                                        <Text style={styles.fieldTxt} numberOfLines={1}>Oscar Fields</Text>
                                                        <Text style={styles.roleTxt} numberOfLines={1}>Inspector</Text>
                                                    </View>
                                                </View>
                                                <Text style={styles.dateTxt}>{"Job added on\n 16 may 2022"}</Text>
                                            </View>
                                        }
                                    />
                                    <CustomDetailsComponent
                                        title={strings.FurtherInspection}
                                        detailsContainerStyle={{ marginVertical: wp(4) }}
                                        bottomComponent={
                                            <Text numberOfLines={1} style={styles.bottomTxtStyle}>Yes</Text>
                                        }
                                    />
                                </>
                        }
                        <CustomBlackButton
                            title={userData?.role == strings.Inspector ? strings.CreateJob : strings.Close}
                            onPress={() => {
                                if (userData?.role == strings.Inspector) {
                                    setIsModelVisible(true)
                                } else {
                                    navigation.navigate("CloseJobScreen")
                                }
                            }}
                            image={userData?.role == strings.Inspector ? ImagesPath.plus_white_circle_icon : ImagesPath.check_circle}
                        />
                    </View>
                    <BottomSheet
                        ref={refRBSheet}
                        children={
                            <View style={[globalStyles.rowView, styles.bottomBtnView]}>
                                <CustomJobDetailsBottomButton image={ImagesPath.right_arrow_icon} buttonText={strings.TransferJob} onPress={() => {
                                    navigation.navigate("TransferJobScreen")
                                    refRBSheet.current?.close()
                                }} />
                                {
                                    userData?.role != strings.GroupManager &&
                                    < CustomJobDetailsBottomButton image={ImagesPath.round_arrow_icon} buttonText={strings.ReturnJob} onPress={() => {
                                        navigation.navigate("ReturnJobScreen")
                                        refRBSheet.current?.close()
                                    }} />
                                }
                                <CustomJobDetailsBottomButton image={ImagesPath.share_icon} buttonText={strings.Askaboutjobs} onPress={() => {
                                    navigation.navigate('DuplicateScreen')
                                    refRBSheet.current?.close()
                                }} />
                            </View>
                        } height={200} />
                </ScrollView>
            </Container>
        </View >
    )
}

export default JobDetailsScreen