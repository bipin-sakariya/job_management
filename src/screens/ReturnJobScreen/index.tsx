import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomModal, CustomSubTitleWithImageComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { strings } from '../../languages/localizedStrings';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import { colors } from '../../styles/Colors';

const ReturnJobScreen = () => {
    const navigation = useCustomNavigation('ReturnJobScreen');
    const [isDuplicate, setIsDuplicate] = useState(true)
    const [isModelVisible, setIsModelVisible] = useState(false)
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, { marginLeft: wp(2) }]}>{strings.returnJob}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomModal
                    visible={isModelVisible}
                    onRequestClose={() => { setIsModelVisible(false) }}
                    children={
                        <View style={styles.modalView}>
                            <Image source={ImagesPath.check_circle_icon} style={[globalStyles.modalImageStyle]} />
                            <Text style={styles.modalTxt}>{strings.Thejob} 9 Oxfort Street {strings.hasbeensuccessfullyreturnedto}P.Maintenance?</Text>
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "50%" }} title={strings.okay} />
                        </View>
                    } />
                <CustomSubTitleWithImageComponent disabled title={strings.ResoneofReturnjob} image={ImagesPath.arrow_counter_clockwise_black_icon} />
                <TouchableOpacity onPress={() => { setIsDuplicate(true) }} style={[globalStyles.rowView, styles.jobListMainView]}>
                    <Text style={styles.jobNameTxt}>{strings.Duplicate}</Text>
                    <View style={globalStyles.roundView} >
                        <View style={[styles.roundFillView, { backgroundColor: isDuplicate ? colors.fillColor : colors.white_5, }]} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.jobListMainView]}>
                    <TouchableOpacity onPress={() => { setIsDuplicate(false) }} style={[globalStyles.rowView, { justifyContent: 'space-between' }]}>
                        <Text style={styles.jobNameTxt}>{strings.WrongInformation}</Text>
                        <View style={globalStyles.roundView} >
                            <View style={[styles.roundFillView, { backgroundColor: !isDuplicate ? colors.fillColor : colors.white_5, }]} />
                        </View>
                    </TouchableOpacity>
                    <View style={globalStyles.rtlDirection}>
                        <TextInput
                            placeholder={strings.WriteResoneofreturnjob}
                            multiline
                            editable={!isDuplicate}
                            onChangeText={(text) => { }}
                            placeholderTextColor={colors.doc_bg_color_dark_gray}
                            style={[styles.textInputStyle, styles.textInputFontStyle, { textAlign: 'right' }]}
                        />
                    </View>
                </View>
                <CustomBlackButton onPress={() => { navigation.navigate('JobDuplicateListScreen') }} buttonStyle={{ width: '50%' }} title={strings.Return} image={ImagesPath.arrow_counter_clockwise_white_icon} />
            </Container>
        </View>
    )
}

export default ReturnJobScreen;