import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BottomSheet, Container, CustomJobDetailsBottomButton, Header } from "../../components";
import CustomDetailsComponent from "../../components/CustomDetailsComponent";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { styles } from "./styles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomBlackButton from "../../components/CustomBlackButton";
import Video from 'react-native-video';
import RBSheet from "react-native-raw-bottom-sheet";

const JobDetailsScreen = () => {
    const navigation = useNavigation()
    const route: any = useRoute()
    const refRBSheet = useRef<RBSheet | null>(null);

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
                        <Text style={styles.JobTxt}>Job</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                } />
            <Container style={[globalStyles.container, { paddingHorizontal: wp(3) }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                        <CustomDetailsComponent
                            title={'Job Id'}
                            bottomComponent={
                                <Text numberOfLines={1} style={styles.bottomTxtStyle}>#123</Text>
                            }
                        />
                        <View style={[globalStyles.rowView, { marginVertical: wp(4), justifyContent: "space-around" }]}>
                            <CustomDetailsComponent
                                title={'9 Oxfort street'}
                                detailsContainerStyle={{ flex: 1 }}
                                bottomComponent={
                                    <Text numberOfLines={1} style={styles.bottomTxtStyle}>just behind new yellow house</Text>
                                }
                            />
                            <View style={styles.dashedStyle}>
                                <Image source={ImagesPath.map_pin_line_icon} style={styles.mapPinIcon} />
                            </View>
                        </View>
                        <CustomDetailsComponent
                            title={'Description :'}
                            bottomComponent={
                                <Text numberOfLines={3} style={styles.bottomTxtStyle}>Lorem Ipsum is simply dummy text of the printing and,typesetting industry has been the industry's standard dummy text....</Text>
                            }
                        />
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
                        <CustomBlackButton title="Close" onPress={() => { }} image={ImagesPath.check_circle} />
                    </View>
                    <BottomSheet
                        ref={refRBSheet}
                        children={
                            <View style={[globalStyles.rowView, styles.bottomBtnView]}>
                                <CustomJobDetailsBottomButton image={ImagesPath.right_arrow_icon} buttonText="Transfer Job" onPress={() => { refRBSheet.current?.close() }} />
                                <CustomJobDetailsBottomButton image={ImagesPath.round_arrow_icon} buttonText="Return Job" onPress={() => { refRBSheet.current?.close() }} />
                                <CustomJobDetailsBottomButton image={ImagesPath.share_icon} buttonText="Ask about jobs" onPress={() => { refRBSheet.current?.close() }} />
                            </View>
                        } height={200} />
                </ScrollView>
            </Container>
        </View >
    )
}

export default JobDetailsScreen