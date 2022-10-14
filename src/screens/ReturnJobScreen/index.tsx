import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomModal, CustomSubTitleWithImageComponent, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { strings } from '../../languages/localizedStrings'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import { colors } from '../../styles/Colors'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'

const ReturnJobScreen = () => {
    const navigation = useCustomNavigation('ReturnJobScreen');
    const [isDuplicate, setIsDuplicate] = useState(true)
    const [isModelVisible, setIsModelVisible] = useState(false)
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: wp(50)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, { marginLeft: wp(2) }]}>{strings.ReturnJob}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(5) }}>
                <CustomModal
                    visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }}
                    children={
                        <View style={styles.modalView}>
                            <Image source={ImagesPath.check_circle_icon} style={[globalStyles.modalImageStyle]} />
                            <Text style={styles.modalTxt}>{strings.Thejob} 9 Oxfort Street {strings.hasbeensuccessfullyreturnedto}P.Maintenance?</Text>
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "50%" }} title={strings.Okay} />
                        </View>
                    } />
                <CustomSubTitleWithImageComponent title={strings.ResoneofReturnjob} image={ImagesPath.arrow_counter_clockwise_black_icon} />
                <TouchableOpacity onPress={() => { setIsDuplicate(true) }} style={[globalStyles.rowView, styles.jobListMainView]}>
                    <Text style={styles.jobNameTxt}>{strings.Duplicate}</Text>
                    <View style={styles.roundView} >
                        <View style={[styles.roundFillView, { backgroundColor: isDuplicate ? colors.brown : colors.white_5, }]} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.jobListMainView]}>
                    <TouchableOpacity onPress={() => { setIsDuplicate(false) }} style={[globalStyles.rowView, { justifyContent: 'space-between' }]}>
                        <Text style={styles.jobNameTxt}>{strings.WrongInformation}</Text>
                        <View style={styles.roundView} >
                            <View style={[styles.roundFillView, { backgroundColor: !isDuplicate ? colors.brown : colors.white_5, }]} />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        placeholder={strings.WriteResoneofreturnjob}
                        multiline
                        editable={!isDuplicate}
                        onChangeText={(text) => { }}
                        placeholderTextColor={colors.doc_bg_color_dark_gray}
                        style={[styles.textInputStyle, styles.textInputFontStyle]}
                    />
                </View>
                <CustomBlackButton onPress={() => { setIsModelVisible(true) }} buttonStyle={{ width: '50%' }} title={strings.Return} image={ImagesPath.arrow_counter_clockwise_white_icon} />
            </Container>
        </View >
    )
}

export default ReturnJobScreen