import { useRoute } from "@react-navigation/native";
import React, { useRef } from "react";
import { Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BottomSheet, CommonPdfView, Container, CustomBlackButton, CustomCarouselImageAndVideo, CustomDetailsComponent, CustomJobAddedByComponent, CustomJobDetailsBottomButton, CustomStatusBtn, CustomTextInput, CustomTextInputWithImage, Header, TableDetailsComponent, TableHeaderView } from "../../components";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { styles } from "./styles";
import RBSheet from "react-native-raw-bottom-sheet";
import { strings } from "../../languages/localizedStrings";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { colors } from "../../styles/Colors";
import { RootRouteProps } from "../../types/RootStackTypes";
import moment from "moment";
import { RootState, useAppSelector } from "../../hooks/reduxHooks";

interface JobDetailsScreenRouteProps {
    description: string
    km: string
    status: string
    title: string
}

const JobDetailsScreen = () => {

    const navigation = useCustomNavigation('JobDetailsScreen')
    const route = useRoute<RootRouteProps<'JobDetailsScreen'>>();
    const refRBSheet = useRef<RBSheet | null>(null);
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
    const FormData = [
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },

        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },

        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },

    ]
    const pdfData = [
        { title: "Doc_Name.pdf", type: 'Doc', mb: "12 mb" },
        { title: "Doc_Name.pdf", type: 'Doc', mb: "12 mb" },
    ]

    let data: JobDetailsScreenRouteProps = route.params.params
    let type = route.params.type

    const renderItem = ({ item, index }: any) => {
        return (
            <TableDetailsComponent item={item} />
        )
    }

    return (
        <View style={globalStyles.container} >
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.Job}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <>
                        {
                            userData?.role != strings.Inspector && (data.status == strings.JobOpen || data.status == strings.JobReturn || data.status == strings.JobTransfer) ?
                                <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                                    <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                                </TouchableOpacity>
                                : null
                        }
                        {
                            userData?.role == strings.Inspector && !type ?
                                <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                                    <Image source={ImagesPath.share_network_icon} style={globalStyles.headerIcon} />
                                </TouchableOpacity> : null
                        }
                    </>
                } />
            <Container>
                <ScrollView contentContainerStyle={[{ paddingHorizontal: wp(4) }]}>
                    {
                        data.status == strings.JobReturn ?
                            <View style={styles.warningView}>
                                <View style={globalStyles.rowView}>
                                    <Image source={ImagesPath.warning_icon} style={styles.imageStyle} />
                                    <Text style={styles.jobReturnTxt}>{strings.JobisReturn}</Text>
                                </View>
                                <Text style={styles.reasonTxt}>{strings.Reasonofjobreturn}</Text>
                            </View> : null
                    }
                    <View style={[globalStyles.rowView, { justifyContent: "space-between", }]}>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", alignItems: "center" }]}>
                            <Image source={ImagesPath.infocircle_icon} style={styles.infoCircle} />
                            <Text numberOfLines={1} style={styles.jobTitle}>{route.params?.params.title}</Text>
                        </View>
                        {
                            data.status ?
                                <CustomStatusBtn title={route.params?.params.status} /> : null
                        }
                    </View>
                    <View style={{ paddingVertical: wp(5) }}>
                        <CustomTextInput
                            title={strings.JobId}
                            container={{ marginBottom: wp(5) }}
                            value={"#123"}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        {
                            data.status == strings.JobReturn || data.status == strings.JobTransfer ?
                                <CustomTextInput
                                    title={strings.RelatedJobID}
                                    container={{ marginBottom: wp(5) }}
                                    value={"#123"}
                                    // editable={isEdit}
                                    onChangeText={(text) => { }}
                                /> : null
                        }
                        <CustomTextInputWithImage
                            title="רחוב אוקספורד 9"
                            value='ממש מאחורי הבית הצהוב החדש'
                            onChangeText={(text) => { }}
                            mainContainerStyle={{ marginBottom: wp(5), flex: 1, }}
                            container={{ width: wp(68) }} />
                        <CustomDetailsComponent
                            title={strings.Description}
                            bottomComponent={
                                <Text numberOfLines={3} style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: "left", }]}>Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס, ותעשיית הדפוס הייתה טקסט הדמה הסטנדרטי של התעשייה....</Text>
                            }
                        />
                        <CustomCarouselImageAndVideo viewStyle={{ width: wp(90) }} result={result} />
                        <CustomDetailsComponent
                            title={strings.Attachment}
                            detailsContainerStyle={{ marginVertical: wp(4) }}
                            bottomComponent={
                                <FlatList data={pdfData} numColumns={2} renderItem={({ item, index }: any) => {
                                    return (
                                        <CommonPdfView item={item} />
                                    )
                                }} />
                            }
                        />
                        {
                            data.status == strings.JobClose || data.status == strings.JobPartial ?
                                <>
                                    <CustomDetailsComponent
                                        title={strings.Transferto}
                                        detailsContainerStyle={{ marginBottom: wp(4) }}
                                        bottomComponent={
                                            <>
                                                <Text numberOfLines={1} style={[styles.commonTxt, globalStyles.rtlStyle, { textAlign: "left" }]}>P. Maintanence</Text>
                                                <Text numberOfLines={1} style={[styles.commonTxt, globalStyles.rtlStyle, { textAlign: "left" }]}>Paint / Signs</Text>
                                            </>
                                        }
                                    />
                                    <View style={[styles.sammedView, { height: wp(100) }]}>
                                        <View style={styles.formHeaderView}>
                                            <Text style={[styles.noNameTxt]}>{strings.Forms}</Text>
                                        </View>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={FormData} renderItem={renderItem}
                                            ListHeaderComponent={() => {
                                                return (
                                                    <TableHeaderView />
                                                )
                                            }}
                                            ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                                        />
                                    </View>
                                    <CustomDetailsComponent
                                        title={strings.Notes}
                                        detailsContainerStyle={{ marginBottom: wp(4) }}
                                        bottomComponent={
                                            <Text numberOfLines={3} style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: "left" }]}>Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. לורם איפסום היה של התעשייה...</Text>
                                        }
                                    />
                                </>
                                : null
                        }

                        <CustomDetailsComponent
                            title={strings.JobAddedby}
                            bottomComponent={
                                <CustomJobAddedByComponent date={moment('16 May 2022').format('ll')} image={ImagesPath.image_white_border} role='Inspector' userName="Oscar Fields" />
                            }
                        />
                        {
                            data.status == strings.JobClose || data.status == strings.JobPartial ?
                                <CustomDetailsComponent
                                    title={strings.JobClosedby}
                                    detailsContainerStyle={{ marginTop: wp(4) }}
                                    bottomComponent={
                                        <CustomJobAddedByComponent date="16 may 2022" image={ImagesPath.image_white_border} role='Inspector' userName="Oscar Fields" />
                                    }
                                />
                                : null
                        }
                        {
                            !type && (data.status == strings.JobOpen || data.status == strings.JobReturn || data.status == strings.JobTransfer) ?
                                <CustomDetailsComponent
                                    title={data.status == strings.JobTransfer ? strings.Transferto : strings.FurtherInspection}
                                    detailsContainerStyle={{ marginVertical: wp(4) }}
                                    bottomComponent={
                                        <Text numberOfLines={1} style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: "left" }]}>{data.status == strings.JobTransfer ? 'P.Maintanence' : 'Yes'}</Text>
                                    }
                                />
                                : null
                        }
                        {
                            type && userData?.role == strings.Inspector &&
                            <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginVertical: wp(5) }]}>
                                <CustomBlackButton title={strings.Delete} image={ImagesPath.trash_icon} textStyle={{ color: colors.black }} buttonStyle={styles.deleteBtnTxt} />
                                <CustomBlackButton onPress={() => { navigation.navigate("CreateNewJobScreen", { type: strings.returnJob }) }} title={strings.Edit_job} image={ImagesPath.pencil_simple_icon} buttonStyle={{ paddingHorizontal: wp(13), borderRadius: wp(2) }} />
                            </View>
                        }
                        {
                            userData?.role != strings.Inspector && data.status != strings.JobClose || userData?.role == strings.Inspector && data.status == strings.JobPartial ?
                                <CustomBlackButton
                                    title={strings.Close}
                                    buttonStyle={{ paddingHorizontal: wp(10) }}
                                    onPress={() => {
                                        navigation.navigate("CloseJobScreen")
                                    }}
                                    image={ImagesPath.check_circle}
                                />
                                : null
                        }
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