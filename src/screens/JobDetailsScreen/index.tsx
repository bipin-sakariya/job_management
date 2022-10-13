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

const JobDetailsScreen = () => {
    const navigation = useNavigation()
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

    const [activeSlide, setActiveSlide] = useState<number>(0)

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={styles.imageMainView}>
                {item.mediaType == "image"
                    ?
                    <Image source={{ uri: item.imgUrl }} onError={() => { }} style={[globalStyles.container, styles.imageView]} />
                    :
                    <Video source={{ uri: item.imgUrl }}
                        onBuffer={(data: any) => {
                            console.log({ data: data });
                        }}
                        onError={(err: any) => {
                            console.log({ err: err });
                        }}
                        paused={!(index == activeSlide)}
                        resizeMode={"cover"}
                        repeat={true}
                        style={styles.backgroundVideo}
                    />
                }
            </View>
        )
    }

    return (
        <View style={globalStyles.container} >
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={styles.leftArrowIcon} />
                        <Text style={styles.JobTxt}>{strings.Job}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    userData?.role != "Inspector" &&
                    <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                } />
            <Container style={[globalStyles.container, { paddingHorizontal: wp(3) }]}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={globalStyles.modalView}>
                        <View style={styles.modalInnerView}>
                            <Image source={ImagesPath.check_circle_icon} style={globalStyles.modalImageStyle} />
                            <Text style={{}}>{strings.NewJobAddedSuccessfully}</Text>
                            <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10) }} onPress={() => { setIsModelVisible(false) }} title={strings.Okay} />
                        </View>
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        userData?.role == "Inspector" &&
                        <CustomSubTitleWithImageComponent title='Fill from to create job' image={ImagesPath.list_bullet_image_icon} />
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
                            title='Job Id'
                            container={{ marginBottom: wp(1) }}
                            value={"#123"}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        <View style={[globalStyles.rowView, { marginVertical: wp(4), justifyContent: "space-around" }]}>
                            <CustomDetailsComponent
                                title={'9 Oxfort street'}
                                detailsContainerStyle={{ flex: 1 }}
                                bottomComponent={
                                    <TextInput
                                        placeholder="Enter Address"
                                        value="just behind new yellow house"
                                        numberOfLines={1}
                                        // editable={isEdit}
                                        style={styles.bottomTxtStyle} />
                                }
                            />
                            <TouchableOpacity style={styles.dashedStyle}>
                                <Image source={ImagesPath.map_pin_line_icon} style={styles.mapPinIcon} />
                            </TouchableOpacity>
                        </View>
                        {
                            userData?.role == "Inspector" &&
                            <CustomTextInput
                                title='Address information'
                                numberOfLines={2}
                                value={"Just behind new yellow house"}
                                // editable={isEdit}
                                onChangeText={(text) => { }}
                            />
                        }
                        {userData?.role == "Inspector" &&
                            <Text style={{ marginVertical: wp(1), marginBottom: wp(3), alignSelf: 'flex-end', color: '#B7B7B7', fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10 }}>Additional Address Information</Text>
                        }
                        <CustomDetailsComponent
                            title={'Description :'}
                            bottomComponent={
                                <Text numberOfLines={3} style={styles.bottomTxtStyle}>Lorem Ipsum is simply dummy text of the printing and,typesetting industry has been the industry's standard dummy text....</Text>
                            }
                        />
                        {
                            userData?.role == "Inspector" ?
                                <>
                                    <CustomDashedComponent
                                        viewStyle={{ paddingVertical: wp(5), marginTop: wp(5) }}
                                        image={ImagesPath.add_icon}
                                        onPress={() => { }}
                                        title='Add Photos and Attachments'
                                    />
                                    <CustomSwitchComponent container={{
                                        marginVertical: wp(5)
                                    }} title="Priority"
                                        subTitle="Urgent Job"
                                        value={isurgent}
                                        onPress={() => setIsUrgent(!isurgent)} />
                                    <CustomSwitchComponent
                                        title="Finish Notification"
                                        subTitle='Finish Notification'
                                        value={isnotification}
                                        onPress={() => setIsNotification(!isnotification)}
                                    />
                                </>
                                :
                                <>
                                    <View style={{ marginTop: wp(5) }}>
                                        <Carousel
                                            data={result}
                                            sliderWidth={wp(95)}
                                            itemWidth={wp(100)}
                                            renderItem={renderItem}
                                            layout={'default'}
                                            onSnapToItem={(index: number) => setActiveSlide(index)}
                                        />
                                        <Pagination dotsLength={result.length}
                                            activeDotIndex={activeSlide}
                                            containerStyle={styles.paginationDots}
                                            dotStyle={styles.activeDotStyle}
                                            inactiveDotStyle={styles.inactiveDotStyle}
                                            inactiveDotOpacity={0.9}
                                            inactiveDotScale={0.6} />
                                    </View>
                                    <CustomDetailsComponent
                                        title={'Attachment'}
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
                                        title={'Job Added by '}
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
                                        title={'Further Inspection'}
                                        detailsContainerStyle={{ marginVertical: wp(4) }}
                                        bottomComponent={
                                            <Text numberOfLines={1} style={styles.bottomTxtStyle}>Yes</Text>
                                        }
                                    />
                                </>
                        }
                        <CustomBlackButton
                            title={userData?.role == "Inspector" ? strings.CreateJob : strings.Close}
                            onPress={() => {
                                if (userData?.role == "Inspector") {
                                    setIsModelVisible(true)
                                } else {

                                }
                            }}
                            image={userData?.role == "Inspector" ? ImagesPath.plus_white_circle_icon : ImagesPath.check_circle}
                        />
                    </View>
                    <BottomSheet
                        ref={refRBSheet}
                        children={
                            <View style={[globalStyles.rowView, styles.bottomBtnView]}>
                                <CustomJobDetailsBottomButton image={ImagesPath.right_arrow_icon} buttonText="Transfer Job" onPress={() => { refRBSheet.current?.close() }} />
                                {
                                    userData?.role != "GroupManager" &&
                                    < CustomJobDetailsBottomButton image={ImagesPath.round_arrow_icon} buttonText="Return Job" onPress={() => { refRBSheet.current?.close() }} />
                                }
                                <CustomJobDetailsBottomButton image={ImagesPath.share_icon} buttonText="Ask about jobs" onPress={() => { refRBSheet.current?.close() }} />
                            </View>
                        } height={200} />
                </ScrollView>
            </Container>
        </View >
    )
}

export default JobDetailsScreen