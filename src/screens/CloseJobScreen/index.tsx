import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, I18nManager, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, Container, CustomActivityIndicator, CustomBlackButton, CustomDashedComponent, CustomDetailsComponent, CustomModal, CustomOneItemSelect, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomTextInputWithImage from '../../components/CustomTextInputWithImage'
import CustomCarouselImageAndVideo from '../../components/CustomCarouselImageAndVideo'
import { styles } from './styles'
import TableHeaderView from '../../components/TableHeaderView'
import TableDetailsComponent from '../../components/TableDetailsComponent'
import { colors } from '../../styles/Colors'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { jobDetail, JobDetailsData, storeUserInteractionWithBillCreation, updatejob, updateSelectedSignBillListReducer } from '../../redux/slices/AdminSlice/jobListSlice'
import { RootRouteProps } from '../../types/RootStackTypes'
import { groupDetails } from '../../redux/slices/AdminSlice/groupListSlice'
import { billData, billDetail } from '../../redux/slices/AdminSlice/billListSlice'
import DocumentPicker from 'react-native-document-picker';
import { isEmptyArray } from 'formik';
import { billList } from '../../redux/slices/AdminSlice/billListSlice';
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface SignDataProps {
    id: number,
    name: string,
    image: any,
    selected: boolean,
}
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
    uri?: string,
    name: string,
    type: string
}

const CloseJobScreen = () => {
    const navigation = useCustomNavigation('CloseJobScreen')
    const refRBSheet = useRef<RBSheet | null>(null);
    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()
    const route = useRoute<RootRouteProps<'JobDetailsScreen'>>();
    const { jobDetails, selectedFormsDetailForJob, newlyCreatedBillsForCloseJob, selectedSignBillsForCloseJob } = useAppSelector(state => state.jobList)
    const { billListData } = useAppSelector(state => state.billList)

    const [isSelected, setIsSelected] = useState(false)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [docError, setDocError] = useState(false)
    const [imageList, setImageList] = useState<imageList[]>(jobDetails.images ? jobDetails.images : [])
    const [docList, setDocList] = useState<docList[] | []>([])
    const [updatedImage, setUpdatedImage] = useState<imageList[]>([])
    const [billIdArray, setBillIdArray] = useState<number[]>([])
    const [selectedFormsBillList, setSelectedFormBillList] = useState<billData[]>([])
    const [isOnReachedEndLoading, setIsOnReachedEndLoading] = useState<boolean>()
    const [billApiPage, setBillApiPage] = useState<number>(2)
    const [selectedSignBills, setSelectedSignBills] = useState<billData[]>([])
    const [searchBill, setSearchBill] = useState<string>("")
    const [notesValue, setNotesValue] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)


    let id: number = route?.params?.params?.id ?? 0

    useEffect(() => {
        if (isFocused && route.params.params?.id) {
            dispatch(jobDetail(id)).unwrap().then((res) => {
                // setFormDetails(res)
                console.log({ formDetails: res });
            }).catch((error) => {
                console.log({ error });
            })
        }
        if (isFocused) {
            searchBills('')
            selectedSignBillsForCloseJob.length && setSelectedSignBills(selectedSignBillsForCloseJob)
        }
    }, [isFocused, billDetail])

    useEffect(() => {
        if (jobDetails.notes) {
            setNotesValue(jobDetails.notes)
        }
    }, [jobDetails])


    useEffect(() => {
        setSelectedFormBillList([...newlyCreatedBillsForCloseJob, ...selectedSignBillsForCloseJob, ...selectedFormsDetailForJob.selectedFormsBillList])
    }, [selectedFormsDetailForJob, newlyCreatedBillsForCloseJob, selectedSignBillsForCloseJob])

    //pagination in sign bill list API call
    const onEndReachedBillList = () => {
        if (billListData.next) {
            setIsOnReachedEndLoading(true)
            let params = {
                page: billApiPage,
                bill_type: 'Sign',
                search: searchBill,
            }
            dispatch(billList(params)).unwrap().then((res) => {
                setIsOnReachedEndLoading(false)
                setBillApiPage(billApiPage + 1)
            }).catch((error) => {
                setIsOnReachedEndLoading(false)
                console.log({ error });
            })
        }
    }

    //For call Search sign bill API call
    const searchBills = (value: string) => {
        console.log('HERE IS SERCH')
        setBillApiPage(2)
        setSearchBill(value)
        let params = {
            page: 1,
            bill_type: 'Sign',
            search: value.trim(),
        }
        dispatch(billList(params)).unwrap().then((res) => {
            setBillApiPage(2)
        }).catch((error) => {
            console.log({ error });
        })
    }

    // const setSelected = (item: SignDataProps, index: number) => {
    //     let emptySignList: Array<any> = []
    //     signData.map((data) => {
    //         if (data.id == item.id) {
    //             emptySignList.push({
    //                 ...data,
    //                 selected: !data.selected,

    //             })
    //         } else {
    //             emptySignList.push(data)
    //         }
    //     })
    //     setSignData(emptySignList)
    // }

    const renderItem = ({ item, index }: any) => {
        return (
            <TableDetailsComponent item={item} index={index} isViewOnly />
        )
    }


    const handleSelectionOfBill = (item: billData) => {
        const checkAvailablityOfForm = selectedSignBills.find((bill) => bill.id === item.id)
        console.log("handleSelectionOfBill before Update", { selectedSignBills })
        if (checkAvailablityOfForm) {
            setSelectedSignBills(selectedSignBills.filter((bill) => bill.id !== item.id))
        } else {
            setSelectedSignBills([...selectedSignBills, item])
        }
    }


    const signBillListRenderItem = (item) => {
        let isCheckMarked = selectedSignBills.find((i) => i.id == item.id)
        return (
            <TouchableOpacity
                onPress={() => { handleSelectionOfBill(item) }}
                style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(2.5), paddingVertical: wp(3.5), marginHorizontal: wp(2.5) }]}>
                <View style={globalStyles.rowView}>
                    <FastImage source={{ uri: item.image }} resizeMode={'contain'} style={{ width: wp(5), height: wp(5) }} />
                    <Text style={[styles.itemListTxt, { marginHorizontal: wp(2) }]}>{item.name}</Text>
                </View>
                <Image source={isCheckMarked ? ImagesPath.select_check_box : ImagesPath.check_box} style={styles.checkIcon} />
            </TouchableOpacity>
        )
    }

    // let TempBillData: billData[] = []
    // formData?.map(obj => {
    //     TempBillData = TempBillData.concat(obj.bill)
    //     return obj.bill
    // })
    // console.log({ TempBillData, BillData })

    // let IsSign = TempBillData.filter((i: billData) => i.type == "Sign")

    // console.log({ IsSign })
    // useEffect(() => {
    //     if (TempBillData && isFocused) {
    //         let data: number[] = []
    //         TempBillData.map((i: billData) => {
    //             data.push(i.id)
    //         })
    //         setBillIdArray(data)
    //     }

    // }, [isFocused])

    // console.log({ billIdArray })

    //for update close job API call
    const updateCloseJob = () => {
        setIsLoading(true)
        setIsModelVisible(false)
        let data = new FormData()
        data.append('status', strings.close)
        let image_array: image_arrayList[] = []

        if (updatedImage) {
            updatedImage.map((item, index) => {
                let images = {
                    uri: item.image,
                    name: `photo${index}${item.mediaType == "image" ? '.jpg' : '.mp4'}`,
                    type: item.mediaType == "image" ? "image/jpeg" : 'video/mp4'
                }
                image_array.push(images)
            })
        }
        if (!isEmptyArray(image_array)) {
            image_array.map((item) => {
                data.append("image", item)
            })
        }
        data.append("further_inspection", jobDetails.further_inspection == true ? jobDetails.further_inspection : isSelected)
        selectedFormsBillList.map((_bill) => {
            data.append("bill", _bill.id)
        })
        data.append('notes', notesValue)
        let params = {
            id: jobDetails.id,
            formData: data
        }
        dispatch(updatejob(params)).unwrap().then((res) => {
            dispatch(jobDetail(jobDetails.id))
            navigation.goBack()
            setIsLoading(false)
        }).catch((e) => {
            setIsLoading(false)
            console.log({ error: e });
        })
    }

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
            let UpdatedImageArray: imageList[] = []
            let ImageTempArray = [...imageList]
            let DocTempArray = [...docList]

            if (res[0]?.type?.split("/")[0] == 'application') {
                DocTempArray.push({ path: res[0].uri, type: res[0]?.type?.split("/")[1], mb: res[0].size, title: res[0].name })
                setDocError(false)
            }
            else {
                ImageTempArray.push({ image: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
                UpdatedImageArray.push({ image: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
                setImageError(false)
            }
            setUpdatedImage(UpdatedImageArray)
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



    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3),
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.closeJob}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalView}>
                        <Image source={ImagesPath.check_icon_circle} style={[globalStyles.modalImageStyle]} />
                        <Text style={styles.modalTxt}>{strings.closeJobModalText}</Text>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                            <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { updateCloseJob() }} buttonStyle={{ width: "45%", backgroundColor: colors.light_blue_color }} title={strings.partial} />
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%" }} title={strings.close} />
                        </View >
                    </View >
                } />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} extraScrollHeight={hp(5)} >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <CustomSubTitleWithImageComponent title={strings.closeJobForm} image={ImagesPath.check_circle_black_icon} />
                        <CustomTextInput
                            title={strings.jobId}
                            container={{ marginBottom: wp(4) }}
                            value={jobDetails?.id.toString()}
                        />
                        <CustomTextInputWithImage
                            editable={false}
                            title={jobDetails?.address}
                            value={jobDetails?.address_information}
                            mainContainerStyle={{ marginBottom: wp(5), flex: 1, }}
                            container={{ width: wp(64) }}
                            onPress={() => {
                                navigation.navigate('MapScreen', {
                                    type: 'viewJob',
                                    JobDetails: {
                                        address: jobDetails?.address,
                                        description: jobDetails?.description,
                                        km: '5 km away',
                                        created_at: moment(jobDetails?.created_at).format("lll"),
                                        button: "Open",
                                        status: "info",
                                        coordinate: {
                                            latitude: 45.524548,
                                            longitude: -122.6749817,
                                            latitudeDelta: 0.04864195044303443,
                                            longitudeDelta: 0.040142817690068,
                                        },
                                    }
                                })
                            }} />
                        <CustomDetailsComponent
                            title={strings.description}
                            bottomComponent={
                                <Text numberOfLines={3} style={[styles.bottomTxtStyle, globalStyles.rtlStyle]}>{jobDetails.description}</Text>
                            }
                        />
                        {
                            imageList.length != 0 && <CustomCarouselImageAndVideo
                                viewStyle={{ width: wp(90) }}
                                result={imageList} children={
                                    <TouchableOpacity onPress={() => selectOneFile()} style={styles.roundBtnView}>
                                        <Image source={ImagesPath.Pluscircle_icon} style={[styles.roundImageStyle]} />
                                    </TouchableOpacity>
                                } />
                        }
                        {
                            imageList.length == 0 && <CustomDashedComponent
                                image={ImagesPath.add_icon}
                                onPress={() => selectOneFile()}
                                title={strings.addimagesandattachments}
                                viewStyle={{ marginTop: wp(5), paddingVertical: wp(5) }} />
                        }
                        <View style={[styles.sammedView, { marginTop: wp(5), maxHeight: selectedFormsBillList.length != 0 ? hp(40) : undefined }]}>
                            <View style={styles.formHeaderView}>
                                <Text style={[styles.noNameTxt, globalStyles.rtlStyle]}>{strings.forms}</Text>
                            </View>
                            {(selectedFormsBillList.length != 0) && <FlatList
                                data={selectedFormsBillList}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponent={() => {
                                    return (
                                        <TableHeaderView />
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={selectedFormsBillList}
                                ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                            />}
                            {selectedFormsDetailForJob?.isSignBill && <TouchableOpacity onPress={() => {
                                setSelectedSignBills(selectedSignBillsForCloseJob)
                                refRBSheet.current?.open()
                            }}
                                style={[globalStyles.rowView, styles.addFormView, { backgroundColor: colors.light_blue_color }]}>
                                <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.primary_color }]} />
                                <Text style={[styles.addFormTxt, { color: colors.primary_color }]}>{strings.add_mark}</Text>
                            </TouchableOpacity >}
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SelectFormScreen')}
                                style={[globalStyles.rowView, styles.addFormView]}>
                                <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.white }]} />
                                <Text style={[styles.addFormTxt]}>{strings.addForm}</Text>
                            </TouchableOpacity>
                        </View >
                        <CustomDashedComponent
                            image={ImagesPath.add_icon}
                            onPress={() => {
                                dispatch(storeUserInteractionWithBillCreation())
                                navigation.navigate('BillCreateScreen', { screenName: 'updatedJob' })
                            }}
                            title={strings.addField}
                            viewStyle={{ paddingVertical: wp(5), marginBottom: wp(5) }}
                        />
                        <CustomTextInput
                            title={strings.notes}
                            container={{ marginBottom: wp(4) }}
                            placeholder={strings.notes.slice(0, strings.notes.length - 1)}
                            value={notesValue}
                            // placeholder={strings.addNotes}
                            onChangeText={(value) => {
                                setNotesValue(value)
                            }}
                        />
                        <TouchableOpacity onPress={() => { setIsSelected(!isSelected) }} style={[globalStyles.rowView, styles.jobListMainView]}>
                            <Text style={styles.jobNameTxt}>{strings.futhurBilling}</Text>
                            <View style={globalStyles.roundView} >
                                {(isSelected || jobDetails.further_inspection) && <Image source={ImagesPath.right_white_icon} style={styles.checkView} />}
                            </View>
                        </TouchableOpacity>
                        <CustomBlackButton onPress={() => setIsModelVisible(true)} title={strings.changeJobStatus} buttonStyle={{ marginVertical: wp(10) }} />
                    </ScrollView >
                </KeyboardAwareScrollView>
                <BottomSheet
                    ref={refRBSheet}
                    onClose={() => {
                        setSelectedSignBills(selectedSignBillsForCloseJob)
                        searchBills('')
                    }}
                    children={
                        <>
                            <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.textInputContainer, { paddingHorizontal: wp(2), marginHorizontal: wp(4), marginTop: wp(5) }]}>
                                <Image source={ImagesPath.search_icon} style={{ height: wp(6), width: wp(6), resizeMode: 'contain' }} />
                                <TextInput
                                    style={[globalStyles.rtlStyle, { color: colors.dark_blue3_color, height: 40, marginHorizontal: wp(1.5), width: '80%', textAlign: I18nManager.isRTL ? 'right' : 'left', }]}
                                    placeholder={strings.searchHere}
                                    placeholderTextColor={colors.dark_blue3_color}
                                    onChangeText={(value) => {
                                        searchBills(value)
                                    }}
                                />
                            </View>
                            <FlatList
                                data={billListData.results}
                                renderItem={({ item, index }) => signBillListRenderItem(item)}
                                style={{ maxHeight: wp(50) }}
                                keyExtractor={(item, index) => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                extraData={billListData.results}
                                ItemSeparatorComponent={() => <View style={{ height: wp(0.1), backgroundColor: colors.text_input_border_color, marginHorizontal: wp(2.5) }} />}
                                onEndReached={() => onEndReachedBillList()}
                                refreshing={isOnReachedEndLoading}
                                onEndReachedThreshold={0.01}
                                ListFooterComponent={() => (
                                    <>
                                        {isOnReachedEndLoading && <ActivityIndicator />}
                                    </>
                                )}
                            />
                            <TouchableOpacity onPress={() => {
                                dispatch(updateSelectedSignBillListReducer({ type: 'Sign', signBills: selectedSignBills }))
                                refRBSheet.current?.close()
                            }}
                                style={[globalStyles.rowView, styles.addFormView, { marginHorizontal: wp(4.5) }]}>
                                <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.white }]} />
                                <Text style={[styles.addFormTxt]}>{strings.add_mark}</Text>
                            </TouchableOpacity>
                        </>
                    }
                    height={360}
                />
            </Container >
        </View >
    )
}

export default CloseJobScreen
