import { useIsFocused, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BottomSheet, CommonPdfView, Container, CustomActivityIndicator, CustomBlackButton, CustomCarouselImageAndVideo, CustomDetailsComponent, CustomJobAddedByComponent, CustomJobDetailsBottomButton, CustomStatusBtn, CustomTextInput, CustomTextInputWithImage, Header, TableDetailsComponent, TableHeaderView } from "../../components";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { styles } from "./styles";
import RBSheet from "react-native-raw-bottom-sheet";
import { RootState, useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { strings } from "../../languages/localizedStrings";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { colors } from "../../styles/Colors";
import { RootRouteProps } from "../../types/RootStackTypes";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import { jobDetail, JobDetailsData, resetSelectedFormsBillReducer, jobDetailReducer } from "../../redux/slices/AdminSlice/jobListSlice";
import { convertDate } from "../../utils/screenUtils";
// import Video from "react-native-video";
import { returnDeleteJob } from "../../redux/slices/AdminSlice/returnJobListSlice";

const JobDetailsScreen = () => {

    const navigation = useCustomNavigation('JobDetailsScreen')
    const route = useRoute<RootRouteProps<'JobDetailsScreen'>>();
    const refRBSheet = useRef<RBSheet | null>(null);
    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()
    const { userData } = useAppSelector((state: RootState) => state.userDetails)
    const { jobDetails, isLoading } = useAppSelector(state => state.jobList)


    let data: JobDetailsData | undefined = route.params.params
    let id: number | undefined = route?.params?.params?.id
    let type = route.params.type

    console.log({ type })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFocused && id) {
            dispatch(jobDetail(id)).unwrap().then((res) => {
                dispatch(jobDetailReducer(res))
                // setFormDetails(res)
                console.log({ formDetails: res });
            }).catch((error) => {
                console.log({ error });
            })
        }
        dispatch(resetSelectedFormsBillReducer())
    }, [isFocused])

    const deleteReturnJob = (id: number) => {
        if (id) {
            dispatch(returnDeleteJob(id)).unwrap().then(() => {
                navigation.goBack()
            })
        }

    }

    // const result = [
    //     {
    //         id: 1,
    //         mediaType: "image",
    //         imgUrl: "https://images.unsplash.com/photo-1473177027534-53d906e9abcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
    //     },
    //     {
    //         id: 2,
    //         mediaType: "video",
    //         imgUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
    //     },
    //     {
    //         id: 3,
    //         mediaType: "image",
    //         imgUrl: "https://images.unsplash.com/photo-1473177027534-53d906e9abcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
    //     },
    //     {
    //         id: 4,
    //         mediaType: "video",
    //         imgUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
    //     }
    // ]

    const FormData = [
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "",
            unit: "15",
            type_counting: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: 'dssdfsdfsf'
        },

        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            quantity: "1",
            unit: "15",
            type_counting: "Meter",
            imageUrl: ''
        },

    ]
    // const pdfData = [
    //     { title: "Doc_Name.pdf", type: 'Doc', mb: "12 mb", url: "https://www.math.hawaii.edu/~pavel/gcd.pdf" },
    //     { title: "Doc_Name.pdf", type: 'Doc', mb: "12 mb", url: "https://www.math.hawaii.edu/~pavel/gcd.pdf" },
    // ]

    const renderItem = ({ item, index }: any) => {
        return (
            <TableDetailsComponent item={item} index={index} />
        )
    }

    return (
        <View style={globalStyles.container} >
            {(loading || isLoading) && <CustomActivityIndicator />}
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.job}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <>
                        {
                            userData?.role != strings.inspector && (jobDetails.status == 'Open' || data?.status == strings.jobOpen || data?.status == strings.jobTransfer) ?
                                <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                                    <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                                </TouchableOpacity>
                                : null
                        }
                        {
                            userData?.role == strings.inspector && !type ?
                                <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                                    <Image source={ImagesPath.share_network_icon} style={globalStyles.headerIcon} />
                                </TouchableOpacity> : null
                        }
                    </>
                } />
            <Container>
                <ScrollView contentContainerStyle={[{ paddingHorizontal: wp(4) }]} showsVerticalScrollIndicator={false}>
                    {
                        jobDetails.status == strings.jobReturn ?
                            <View style={styles.warningView}>
                                <View style={globalStyles.rowView}>
                                    <Image source={ImagesPath.warning_icon} style={styles.imageStyle} />
                                    <Text style={styles.jobReturnTxt}>{strings.jobIsReturn}</Text>
                                </View>
                                <Text style={styles.reasonTxt}>{strings.reasonOfJobReturn}</Text>
                            </View> : null
                    }
                    <View style={[globalStyles.rowView, { justifyContent: "space-between", }]}>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", alignItems: "center" }]}>
                            <Image source={ImagesPath.infocircle_icon} style={styles.infoCircle} />
                            <Text numberOfLines={1} style={styles.jobTitle}>{jobDetails.address}</Text>
                        </View>
                        {
                            jobDetails.status ?
                                <CustomStatusBtn title={jobDetails.status} /> : null
                        }
                    </View>
                    <View style={{ paddingVertical: wp(5) }}>
                        <CustomTextInput
                            title={strings.jobId}
                            container={{ marginBottom: wp(5) }}
                            value={`${jobDetails.id}`}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        {/* {console.log({ data: jobDetails.return_job[0].duplicate })} */}
                        {jobDetails.status == strings.jobReturn ?
                            <CustomTextInput
                                title={strings.relatedJobId[0]}
                                container={{ marginBottom: wp(5) }}
                                value={jobDetails.return_job && '' + jobDetails?.return_job?.duplicate}
                                // editable={isEdit}
                                onChangeText={(text) => { }}
                            /> : null
                        }
                        <CustomTextInputWithImage
                            title={jobDetails.address}
                            value={jobDetails.address_information}
                            onChangeText={(text) => { }}
                            mainContainerStyle={{ marginBottom: wp(5), flex: 1, }}
                            container={{ width: wp(68) }}
                            onPress={() => {
                                console.log({ data: data });

                                navigation.navigate('MapScreen', {
                                    type: 'viewJob', JobDetails: {
                                        address: data?.address,
                                        description: data?.description,
                                        km: '',
                                        created_at: data?.created_at,
                                        images: data?.images,
                                        button: "Open",
                                        status: data?.status,
                                        coordinate: {
                                            latitude: Number(data?.latitude),
                                            longitude: Number(data?.longitude),
                                            latitudeDelta: 0.04864195044303443,
                                            longitudeDelta: 0.040142817690068,
                                        },
                                    }
                                })
                            }}
                        />
                        <CustomDetailsComponent
                            title={strings.description}
                            bottomComponent={
                                <Text style={[styles.bottomTxtStyle, globalStyles.rtlStyle]}>{jobDetails.description}</Text>
                            }
                        />
                        <CustomCarouselImageAndVideo viewStyle={{ width: wp(90) }} result={jobDetails.images} />

                        <CustomDetailsComponent
                            title={strings.attachment}
                            detailsContainerStyle={{ marginVertical: wp(4) }}
                            bottomComponent={
                                <FlatList
                                    data={jobDetails.attachments}
                                    numColumns={2}
                                    renderItem={({ item, index }: any) => {
                                        { console.log({ data: item.url }) }
                                        return (
                                            <CommonPdfView
                                                item={item}
                                                onPress={() => {
                                                    setLoading(true)
                                                    const pdfName = item.attachment.split(/[#?]/)[0].split('/').pop().split('.')[0];
                                                    const extension = item.attachment.split(/[#?]/)[0].split(".").pop().trim();
                                                    const localFile = `${RNFS.DocumentDirectoryPath}/${pdfName}.${extension}`;
                                                    const options = {
                                                        fromUrl: item.attachment,
                                                        toFile: localFile,
                                                    };
                                                    RNFS.downloadFile(options).promise.then(() =>
                                                        FileViewer.open(localFile)).then(() => {
                                                            setLoading(false)
                                                        }).catch((error) => {
                                                            setLoading(false)
                                                        });
                                                }}
                                            />
                                        )
                                    }}
                                    showsVerticalScrollIndicator={false} />
                            }
                        />
                        {jobDetails.status == strings.jobClose || jobDetails.status == strings.jobPartial ?
                            <>
                                <CustomDetailsComponent
                                    title={strings.transferTo}
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
                                        <Text style={[styles.noNameTxt]}>{strings.forms}</Text>
                                    </View>
                                    <FlatList
                                        data={jobDetails.bills}
                                        renderItem={renderItem}
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => {
                                            return (
                                                <TableHeaderView />
                                            )
                                        }}
                                        ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                                    />
                                </View>
                                <CustomDetailsComponent
                                    title={strings.notes}
                                    detailsContainerStyle={{ marginBottom: wp(4) }}
                                    bottomComponent={
                                        <Text numberOfLines={3} style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: "left" }]}>Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. לורם איפסום היה של התעשייה...</Text>
                                    }
                                />
                            </>
                            : null
                        }

                        <CustomDetailsComponent
                            title={strings.jobAddedBy}
                            bottomComponent={
                                <CustomJobAddedByComponent date={convertDate(jobDetails?.added_by?.date_joined)} image={{ uri: jobDetails?.added_by?.profile_image }} role={jobDetails?.added_by?.role?.title} userName={jobDetails?.added_by?.user_name} />
                            }
                        />
                        {jobDetails.status == strings.jobClose || jobDetails.status == strings.jobPartial ?
                            <CustomDetailsComponent
                                title={strings.jobClosedBy}
                                detailsContainerStyle={{ marginTop: wp(4) }}
                                bottomComponent={
                                    <CustomJobAddedByComponent date="16 may 2022" image={ImagesPath.image_white_border} role='inspector' userName="Oscar Fields" />
                                }
                            />
                            : null
                        }
                        {type && (jobDetails.status == 'Open' || jobDetails.status == strings.jobOpen || jobDetails.status == strings.jobReturn || jobDetails.status == strings.jobTransfer) ?
                            <CustomDetailsComponent
                                title={jobDetails.status == strings.jobTransfer ? strings.transferTo : strings.furtherInspection}
                                detailsContainerStyle={{ marginVertical: wp(4) }}
                                bottomComponent={
                                    <Text numberOfLines={1} style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: "left" }]}>{jobDetails.status == strings.jobTransfer ? 'P.Maintanence' : 'yes'}</Text>
                                }
                            />
                            : null
                        }
                        {(type == 'returnJob' && (userData?.role == strings.inspector || userData?.role == strings.admin) && jobDetails.status == strings.jobReturn) &&
                            <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginVertical: wp(5) }]}>
                                <CustomBlackButton
                                    onPress={() => { deleteReturnJob(jobDetails.id) }}
                                    title={strings.delete}
                                    image={ImagesPath.trash_icon}
                                    imageStyle={{ tintColor: colors.primary_color }}
                                    textStyle={{ color: colors.primary_color }}
                                    buttonStyle={styles.deleteBtnTxt} />
                                <CustomBlackButton
                                    onPress={() => { navigation.navigate("CreateNewJobScreen", { type: strings.returnJob, jobId: jobDetails.id }) }}
                                    title={strings.editJob}
                                    image={ImagesPath.pencil_simple_icon}
                                    buttonStyle={{ paddingHorizontal: wp(13), borderRadius: wp(2) }} />
                            </View>
                        }
                        {(type != 'returnJob' && (userData?.role == strings.admin || userData?.role == strings.groupManager) && (jobDetails.status == strings.jobOpen || jobDetails.status == strings.jobPartial || jobDetails.status == strings.jobReturn)
                            || (userData?.role == strings.admin && jobDetails.status == strings.jobTransfer))
                            ?
                            <CustomBlackButton
                                title={strings.close}
                                buttonStyle={{ paddingHorizontal: wp(10) }}
                                onPress={() => {
                                    navigation.navigate("CloseJobScreen", { params: id })
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
                                {userData?.role != strings.groupManager &&
                                    <CustomJobDetailsBottomButton image={ImagesPath.right_arrow_icon} buttonText={strings.transferJob} onPress={() => {
                                        navigation.navigate("TransferJobScreen", { jobId: jobDetails.id })
                                        refRBSheet.current?.close()
                                    }} />
                                }
                                {
                                    userData?.role != strings.groupManager &&
                                    <CustomJobDetailsBottomButton image={ImagesPath.round_arrow_icon} buttonText={strings.returnJob} onPress={() => {
                                        navigation.navigate("ReturnJobScreen", {
                                            jobId: jobDetails.id, status: jobDetails.status
                                        })
                                        refRBSheet.current?.close()
                                    }} />
                                }
                                <CustomJobDetailsBottomButton image={ImagesPath.share_icon} buttonText={strings.askAboutJobs} onPress={() => {
                                    navigation.navigate('JobDuplicateListScreen')
                                    refRBSheet.current?.close()
                                }} />
                            </View>
                        }
                        height={200}
                    />
                </ScrollView>
            </Container>
        </View >
    )
}

export default JobDetailsScreen