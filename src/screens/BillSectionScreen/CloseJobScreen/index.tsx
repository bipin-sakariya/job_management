import { FlatList, I18nManager, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import RBSheet from 'react-native-raw-bottom-sheet'
import { ImagesPath } from '../../../utils/ImagePaths'
import { colors } from '../../../styles/Colors'
import { strings } from '../../../languages/localizedStrings'
import { globalStyles } from '../../../styles/globalStyles'
import useCustomNavigation from '../../../hooks/useCustomNavigation'
import { CustomCarouselImageAndVideo, CustomTextInput, CustomTextInputWithImage, TableDetailsComponent, TableHeaderView, BottomSheet, Container, CustomBlackButton, CustomDashedComponent, CustomDetailsComponent, CustomModal, CustomSubTitleWithImageComponent, Header } from '../../../components'

interface SignDataProps {
    id: number,
    name: string,
    image: any,
    selected: boolean,

}
const CloseJobScreen = () => {
    const navigation = useCustomNavigation('CloseJobScreen')
    const [isSelected, setIsSelected] = useState(false)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [isSign, setISSign] = useState('sign')
    const refRBSheet = useRef<RBSheet | null>(null);
    const [searchTxt, setSearchTxt] = useState('');
    const [searchData, setSearchData] = useState<SignDataProps[]>([])

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
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.CloseJob}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalView}>
                        <Image source={ImagesPath.check_icon_circle} style={[globalStyles.modalImageStyle]} />
                        <Text style={styles.modalTxt}>{strings.ClosejobModalText}</Text>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                            <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%", backgroundColor: colors.light_blue_color }} title={strings.Partial} />
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%" }} title={strings.Close} />
                        </View>
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent title={strings.CloseJobForm} image={ImagesPath.check_circle_black_icon} />
                    <CustomTextInput
                        title={strings.jobId}
                        container={{ marginBottom: wp(4) }}
                        value={'123'}
                    />
                    <CustomTextInputWithImage
                        title="9 Oxfort street"
                        value='9 Oxfort street'
                        mainContainerStyle={{ marginBottom: wp(5), flex: 1, }}
                        container={{ width: wp(64) }} />
                    <CustomDetailsComponent
                        title={strings.description}
                        bottomComponent={
                            <Text numberOfLines={3} style={styles.bottomTxtStyle}>Lorem Ipsum is simply dummy text of the printing and,typesetting industry has been the industry's standard dummy text....</Text>
                        }
                    />
                    <CustomCarouselImageAndVideo
                        viewStyle={{ width: wp(90) }}
                        result={result} children={
                            <TouchableOpacity style={styles.roundBtnView}>
                                <Image source={ImagesPath.Pluscircle_icon} style={[styles.roundImageStyle]} />
                            </TouchableOpacity>
                        } />
                    <View style={[styles.sammedView, { height: wp(100), marginTop: wp(5) }]}>
                        <View style={styles.formHeaderView}>
                            <Text style={[styles.noNameTxt, globalStyles.rtlStyle]}>{strings.Forms}</Text>
                        </View>
                        <FlatList
                            data={FormData}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={() => {
                                return (
                                    <TableHeaderView />
                                )
                            }}
                            ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                        />
                        {isSign == 'sign' && <TouchableOpacity onPress={() => { refRBSheet.current?.open() }}
                            style={[globalStyles.rowView, styles.addFormView, { backgroundColor: colors.light_blue_color }]}>
                            <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.primary_color }]} />
                            <Text style={[styles.addFormTxt, { color: colors.primary_color }]}>{strings.AddForm}</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SelectFormScreen')}
                            style={[globalStyles.rowView, styles.addFormView]}>
                            <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1), tintColor: colors.white }]} />
                            <Text style={[styles.addFormTxt]}>{strings.AddForm}</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        onPress={() => { navigation.navigate('SignBillDetailScreen', { type: 'sign' }) }}
                        title={strings.AddField}
                        viewStyle={{ paddingVertical: wp(5), marginBottom: wp(5) }}
                    />
                    <CustomTextInput
                        title={strings.jobId}
                        container={{ marginBottom: wp(4) }}
                        value={'123'}
                    />
                    <TouchableOpacity onPress={() => { setIsSelected(!isSelected) }} style={[globalStyles.rowView, styles.jobListMainView]}>
                        <Text style={styles.jobNameTxt}>{strings.FuthurBilling}</Text>
                        <View style={globalStyles.roundView} >
                            {isSelected && <Image source={ImagesPath.right_white_icon} style={styles.checkView} />}
                        </View>
                    </TouchableOpacity>
                    <CustomBlackButton onPress={() => setIsModelVisible(true)} title={strings.ChangeJobStatus} buttonStyle={{ marginVertical: wp(10) }} />
                </ScrollView>
                <BottomSheet
                    ref={refRBSheet}
                    children={
                        <>
                            <View style={[globalStyles.rowView, globalStyles.rtlDirection, { paddingHorizontal: wp(2), marginHorizontal: wp(4), marginTop: wp(5) }]}>
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
        </View>
    )
}

export default CloseJobScreen
