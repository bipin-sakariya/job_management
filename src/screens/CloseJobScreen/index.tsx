import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, I18nManager, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, Container, CustomBlackButton, CustomDashedComponent, CustomDetailsComponent, CustomModal, CustomOneItemSelect, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomTextInputWithImage from '../../components/CustomTextInputWithImage'
import CustomCarouselImageAndVideo from '../../components/CustomCarouselImageAndVideo'
import { styles } from './styles'
import TableHeaderView from '../../components/TableHeaderView'
import TableDetailsComponent from '../../components/TableDetailsComponent'
import { colors } from '../../styles/Colors'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { jobDetail, JobDetailsData, updatejob } from '../../redux/slices/AdminSlice/jobListSlice'
import { RootRouteProps } from '../../types/RootStackTypes'
import { groupDetails } from '../../redux/slices/AdminSlice/groupListSlice'
import { billData, billDetail } from '../../redux/slices/AdminSlice/billListSlice'
import DocumentPicker from 'react-native-document-picker';
import { isEmptyArray } from 'formik'

interface SignDataProps {
    id: number,
    name: string,
    image: any,
    selected: boolean,
}
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

const CloseJobScreen = () => {
    const navigation = useCustomNavigation('CloseJobScreen')
    const refRBSheet = useRef<RBSheet | null>(null);
    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()
    const route = useRoute<RootRouteProps<'JobDetailsScreen'>>();
    const { jobDetails, isLoading, formData } = useAppSelector(state => state.jobList)

    const [isSelected, setIsSelected] = useState(false)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [searchTxt, setSearchTxt] = useState('');
    const [searchData, setSearchData] = useState<SignDataProps[]>([])
    const [BillData, setBillData] = useState()
    const [imageError, setImageError] = useState(false)
    const [docError, setDocError] = useState(false)
    const [imageList, setImageList] = useState<imageList[]>(jobDetails.images)
    const [docList, setDocList] = useState<docList[] | []>([])
    const [updatedImage, setUpdatedImage] = useState<imageList[]>([])
    const [billIdArray, setBillIdArray] = useState<number[]>([])


    let id: number = route.params.params.id

    useEffect(() => {
        if (isFocused && route.params.params.id) {
            dispatch(jobDetail(id)).unwrap().then((res) => {
                // setFormDetails(res)
                console.log({ formDetails: res });
            }).catch((error) => {
                console.log({ error });
            })
        }

        //         const billData = formData?.map((item) => { 
        // setBillData(formData.bill)
        //         })
        //         console.log({ billData })
    }, [isFocused, billDetail])

    const SignData: SignDataProps[] = [
        {
            id: 1,
            name: 'sign name',
            image: ImagesPath.signImage,
            selected: false
        },
        {
            id: 2,
            name: 'sign name',
            image: ImagesPath.signImage,
            selected: false
        },
        {
            id: 3,
            name: 'sign name',
            image: ImagesPath.signImage,
            selected: false
        },
        {
            id: 4,
            name: 'form',
            image: ImagesPath.signImage,
            selected: false
        },
        {
            id: 5,
            name: 'bill',
            image: ImagesPath.signImage,
            selected: false
        },
    ]
    const [signData, setSignData] = useState(SignData)

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
    // const FormData = [
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: 'dssdfsdfsf'
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: 'dssdfsdfsf'
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: 'dssdfsdfsf'
    //     },

    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: 'dssdfsdfsf'
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: 'dssdfsdfsf'
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: 'dssdfsdfsf'
    //     },

    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },
    //     {
    //         srno: "01",
    //         name: "Asphalt Paint",
    //         qty: "1",
    //         unit: "15",
    //         parameter: "Meter",
    //         imageUrl: ''
    //     },

    // ]


    const setSelected = (item: SignDataProps, index: number) => {
        let emptySignList: Array<any> = []
        console.log({ item })
        signData.map((data) => {
            if (data.id == item.id) {
                emptySignList.push({
                    ...data,
                    selected: !data.selected,

                })
            } else {
                emptySignList.push(data)
            }
        })
        setSignData(emptySignList)
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TableDetailsComponent item={item} index={index} />
        )
    }

    let TempBillData: billData[] = []
    formData?.map(obj => {
        TempBillData = TempBillData.concat(obj.bill)
        console.log("CONCAT-->", TempBillData)
        return obj.bill
    })
    console.log({ TempBillData, BillData })

    let IsSign = TempBillData.filter((i: billData) => i.type == "Sign")
    console.log({ IsSign })
    useEffect(() => {
        if (TempBillData && isFocused) {
            let data: number[] = []
            TempBillData.map((i: billData) => {
                data.push(i.id)
            })
            setBillIdArray(data)
        }

    }, [isFocused])

    console.log({ billIdArray })

    const updateCloseJob = () => {
        let data = new FormData()
        data.append('status', strings.close)
        let image_array: image_arrayList[] = []

        if (updatedImage) {
            updatedImage.map((item, index) => {
                let images = {
                    uri: item.imgUrl,
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
        billIdArray.map((_bill) => {
            data.append("bill", _bill)
        })
        let params = {
            id: jobDetails.id,
            formData: data
        }
        console.log({ params })
        dispatch(updatejob(params)).unwrap().then((res) => {
            setIsModelVisible(false)
            navigation.goBack()
        }).catch((e) => {
            console.log({ error: e });
            setIsModelVisible(false)

        })
        // data.append('notes',)
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
            let UpdatedImageArray = []
            let ImageTempArray = [...imageList]
            let DocTempArray = [...docList]

            if (res[0]?.type?.split("/")[0] == 'application') {
                DocTempArray.push({ path: res[0].uri, type: res[0]?.type?.split("/")[1], mb: res[0].size, title: res[0].name })
                setDocError(false)
            }
            else {
                ImageTempArray.push({ imgUrl: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
                UpdatedImageArray.push({ imgUrl: res[0].uri, mediaType: res[0]?.type?.split("/")[0] == 'image' ? 'image' : 'video', id: Math.random() })
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
                        </View>
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent title={strings.closeJobForm} image={ImagesPath.check_circle_black_icon} />
                    <CustomTextInput
                        title={strings.jobId}
                        container={{ marginBottom: wp(4) }}
                        value={jobDetails?.id.toString()}
                    />
                    <CustomTextInputWithImage
                        title={jobDetails.address}
                        value={jobDetails.address_information}
                        mainContainerStyle={{ marginBottom: wp(5), flex: 1, }}
                        container={{ width: wp(64) }}
                        onPress={() => {
                            navigation.navigate('MapScreen', {
                                type: 'viewJob',
                                JobDetails: {
                                    title: 'Job Title',
                                    description: 'Lorem Ipsum is simply dummy text of the printing...',
                                    km: '5 km away',
                                    date: "16 may 2022",
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
                    {imageList.length != 0 && <CustomCarouselImageAndVideo
                        viewStyle={{ width: wp(90) }}
                        result={imageList} children={
                            <TouchableOpacity onPress={() => selectOneFile()} style={styles.roundBtnView}>
                                <Image source={ImagesPath.Pluscircle_icon} style={[styles.roundImageStyle]} />
                            </TouchableOpacity>
                        } />}
                    {imageList.length == 0 && <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        onPress={() => selectOneFile()}
                        title={strings.addimagesandattachments}
                        viewStyle={{ marginTop: wp(5), paddingVertical: wp(5) }} />}
                    <View style={[styles.sammedView, { marginTop: wp(5) }]}>
                        <View style={styles.formHeaderView}>
                            <Text style={[styles.noNameTxt, globalStyles.rtlStyle]}>{strings.forms}</Text>
                        </View>
                        {formData?.length != 0 && <FlatList
                            data={TempBillData}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={() => {
                                return (
                                    <TableHeaderView />
                                )
                            }}
                            ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                        />}
                        {IsSign.length != 0 && <TouchableOpacity onPress={() => { refRBSheet.current?.open() }}
                            style={[globalStyles.rowView, styles.addFormView, { backgroundColor: colors.light_blue_color }]}>
                            <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.primary_color }]} />
                            <Text style={[styles.addFormTxt, { color: colors.primary_color }]}>{strings.addForm}</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SelectFormScreen')}
                            style={[globalStyles.rowView, styles.addFormView]}>
                            <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.white }]} />
                            <Text style={[styles.addFormTxt]}>{strings.addForm}</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        onPress={() => { navigation.navigate('BillCreateScreen', { screenName: 'updatedJob' }) }}
                        title={strings.addField}
                        viewStyle={{ paddingVertical: wp(5), marginBottom: wp(5) }}
                    />
                    <CustomTextInput
                        title={strings.jobId}
                        container={{ marginBottom: wp(4) }}
                        value={jobDetails.notes || ''}
                    />
                    <TouchableOpacity onPress={() => { setIsSelected(!isSelected) }} style={[globalStyles.rowView, styles.jobListMainView]}>
                        <Text style={styles.jobNameTxt}>{strings.futhurBilling}</Text>
                        <View style={globalStyles.roundView} >
                            {(isSelected || jobDetails.further_inspection) && <Image source={ImagesPath.right_white_icon} style={styles.checkView} />}
                        </View>
                    </TouchableOpacity>
                    <CustomBlackButton onPress={() => setIsModelVisible(true)} title={strings.changeJobStatus} buttonStyle={{ marginVertical: wp(10) }} />
                </ScrollView>
                <BottomSheet
                    ref={refRBSheet}
                    children={
                        <>
                            <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.textInputContainer, { paddingHorizontal: wp(2), marginHorizontal: wp(4), marginTop: wp(5) }]}>
                                <Image source={ImagesPath.search_icon} style={{ height: wp(6), width: wp(6), resizeMode: 'contain' }} />
                                <TextInput
                                    style={[globalStyles.rtlStyle, { color: colors.dark_blue3_color, height: 40, marginHorizontal: wp(1.5), width: '80%', textAlign: I18nManager.isRTL ? 'right' : 'left', }]}
                                    placeholder={strings.searchHere}
                                    placeholderTextColor={colors.dark_blue3_color}
                                    onChangeText={(txt) => {
                                        const searchData = signData.filter((i) => i.name.includes(txt.toLowerCase()))
                                        setSearchData(searchData)
                                        setSearchTxt(txt)
                                    }}
                                />
                            </View>
                            <FlatList
                                data={searchTxt ? searchData : signData}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => { setSelected(item, index) }}
                                        style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(2.5), paddingVertical: wp(3.5), marginHorizontal: wp(2.5) }]}>
                                        <View style={globalStyles.rowView}>
                                            <Image source={item.image} resizeMode={'contain'} style={{ width: wp(5), height: wp(5) }} />
                                            <Text style={[styles.itemListTxt, { marginHorizontal: wp(2) }]}>{item.name}</Text>
                                        </View>
                                        {item.selected ?
                                            <Image source={ImagesPath.check_box_fill_icon} style={styles.checkBoxIcon} /> :
                                            <Image source={ImagesPath.check_box_border_icon} style={styles.checkBoxIcon1} />
                                        }
                                    </TouchableOpacity>
                                )}
                                style={{ maxHeight: wp(50) }}
                                showsVerticalScrollIndicator={false}
                                // extraData={list}
                                ItemSeparatorComponent={() => <View style={{ height: wp(0.1), backgroundColor: colors.text_input_border_color, marginHorizontal: wp(2.5) }} />}
                            />
                            <TouchableOpacity onPress={() => { refRBSheet.current?.close() }}
                                style={[globalStyles.rowView, styles.addFormView, { marginHorizontal: wp(4.5) }]}>
                                <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.white }]} />
                                <Text style={[styles.addFormTxt]}>{strings.add_mark}</Text>
                            </TouchableOpacity>
                        </>
                    }
                    height={360}
                />
            </Container>
        </View >
    )
}

export default CloseJobScreen
