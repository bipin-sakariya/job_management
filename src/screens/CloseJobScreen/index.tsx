import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomDashedComponent, CustomModal, CustomOneItemSelect, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomTextInputWithImage from '../../components/CustomTextInputWithImage'
import CustomCarouselImageAndVideo from '../../components/CustomCarouselImageAndVideo'
import { styles } from './styles'
import TableHeaderView from '../../components/TableHeaderView'
import TableDetailsComponent from '../../components/TableDetailsComponent'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'

const CloseJobScreen = () => {
    const navigation = useCustomNavigation('CloseJobScreen')
    const [isSelected, setIsSelected] = useState(false)
    const [isModelVisible, setIsModelVisible] = useState(false)
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
    const renderItem = ({ item, index }: any) => {
        return (
            <TableDetailsComponent item={item} />
        )
    }
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: "50%"
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.CloseJob}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(5) }}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalView}>
                        <Image source={ImagesPath.check_circle_icon} style={[globalStyles.modalImageStyle]} />
                        <Text style={styles.modalTxt}>{strings.Areyousureyou} P.Maintenance?</Text>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                            <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%", backgroundColor: colors.gray_10 }} title={strings.Partial} />
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%" }} title={strings.Close} />
                        </View>
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent title={strings.CloseJobForm} image={ImagesPath.check_circle_black_icon} />
                    <CustomTextInput
                        title={strings.JobId}
                        container={{ marginBottom: wp(4) }}
                        value={'123'}
                    />
                    <CustomTextInputWithImage
                        title='9 Oxfort street'
                        value={'123'}
                        container={{ width: wp(65) }}
                        mainContainerStyle={{ marginBottom: wp(5) }}
                    />
                    <CustomTextInput
                        title={strings.Description}
                        multiline
                        numberOfLines={2}
                        style={{ height: wp(20) }}
                        value={'Lorem Ipsum is simply dummy text of the printing and,typesetting industry has been the industrys standard dummy text....'}
                    />
                    <CustomCarouselImageAndVideo
                        viewStyle={{ width: wp(90) }}
                        result={result} children={
                            <TouchableOpacity style={styles.roundBtnView}>
                                <Image source={ImagesPath.plus_circle_icon} style={styles.roundImageStyle} />
                            </TouchableOpacity>
                        } />
                    <View style={[styles.sammedView, { height: wp(100), marginTop: wp(5) }]}>
                        <View style={styles.formHeaderView}>
                            <Text style={[styles.noNameTxt]}>Forms</Text>
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
                        <TouchableOpacity style={[globalStyles.rowView, styles.addFormView]}>
                            <Image source={ImagesPath.add_form_icon} style={[globalStyles.headerIcon, { marginHorizontal: wp(1) }]} />
                            <Text style={styles.addFormTxt}>{strings.AddForm}</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: strings.material }) }}
                        title={strings.AddField}
                        viewStyle={{ paddingVertical: wp(5), marginBottom: wp(5) }}
                    />
                    <CustomTextInput
                        title={strings.JobId}
                        container={{ marginBottom: wp(4) }}
                        value={'123'}
                    />
                    <TouchableOpacity onPress={() => { setIsSelected(!isSelected) }} style={[globalStyles.rowView, styles.jobListMainView]}>
                        <Text style={styles.jobNameTxt}>{strings.FuthurBilling}</Text>
                        <View style={styles.roundView} >
                            {isSelected && <Image source={ImagesPath.right_white_icon} style={styles.checkView} />}
                        </View>
                    </TouchableOpacity>
                    <CustomBlackButton onPress={() => setIsModelVisible(true)} title={strings.ChangeJobStatus} buttonStyle={{ marginVertical: wp(10) }} />
                </ScrollView>
            </Container>
        </View>
    )
}

export default CloseJobScreen
