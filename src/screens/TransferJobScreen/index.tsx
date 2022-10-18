import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomModal, CustomSubTitleWithImageComponent, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'
import CustomOneItemSelect from '../../components/CustomOneItemSelect'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'

const TransferJobScreen = () => {
    const navigation = useCustomNavigation('TransferJobScreen');
    const [isModelVisible, setIsModelVisible] = useState(false)
    const data = [
        { id: 1, title: 'title1', selected: false },
        { id: 2, title: 'title1', selected: false },
        { id: 3, title: 'title1', selected: false },
        { id: 4, title: 'title1', selected: false },
        { id: 5, title: 'title1', selected: false },
        { id: 6, title: 'title1', selected: false },
        { id: 7, title: 'title1', selected: false },
        { id: 8, title: 'title1', selected: false },
        { id: 9, title: 'title1', selected: false },
        { id: 10, title: 'title1', selected: false },
    ]
    const [jobData, setJobData] = useState(data)



    const renderItem = ({ item, index }: any) => {
        return (
            <CustomOneItemSelect item={item} data={jobData} onSetData={setJobData} />
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
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.TransferJob}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity >
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomModal
                    visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }}
                    children={
                        <View style={styles.modalView}>
                            <Image source={ImagesPath.arrow_bend_up_right_white_bg_icon} style={[globalStyles.modalImageStyle]} />
                            <Text style={styles.modalTxt}>{strings.Areyousureyou} P.Maintenance?</Text>
                            <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                                <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%", backgroundColor: colors.gray_10 }} title={strings.No} />
                                <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%" }} title={strings.Yes} />
                            </View>
                        </View>
                    } />
                <CustomSubTitleWithImageComponent disabled title={strings.Transferjobto} image={ImagesPath.arrow_bend_right_icon} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={jobData}
                    renderItem={renderItem}
                    style={{ marginTop: wp(3) }}
                    contentContainerStyle={{ paddingBottom: wp(20) }}
                    ItemSeparatorComponent={() => <View style={{ height: wp(4), backgroundColor: colors.white_5 }} />
                    } />
                <CustomBlackButton onPress={() => { setIsModelVisible(true) }} title={strings.TransferJob} image={ImagesPath.arrow_bend_right_white_icon} buttonStyle={styles.buttonView} />
            </Container>
        </View>
    )
}

export default TransferJobScreen

