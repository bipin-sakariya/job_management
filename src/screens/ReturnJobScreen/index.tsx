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
import { returnJobCreate } from '../../redux/slices/AdminSlice/returnJobListSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';

const ReturnJobScreen = () => {
    const navigation = useCustomNavigation('ReturnJobScreen');
    const route = useRoute<RootRouteProps<'ReturnJobScreen'>>();
    const [isDuplicate, setIsDuplicate] = useState(true)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isText, setIsText] = useState('')
    const dispatch = useAppDispatch()

    console.log({ route })

    const updateReturnJob = () => {
        let params = {
            status: 'מידע שגוי',
            comment: isText,
            job: route.params.jobId,
            // duplicate: 0
        }
        console.log({ params })
        dispatch(returnJobCreate(params)).unwrap().then((res) => {
            navigation.navigate('JobDetailsScreen', { params: res })
        }).catch((e) => {
            console.log({ error: e });

        })
    }

    const returnJob = () => {
        if (isUpdate) {
            updateReturnJob()
        }
        else {
            navigation.navigate('JobDuplicateListScreen')
        }
    }

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
                            <Text style={styles.modalTxt}>{strings.theJob} 9 Oxfort Street {strings.hasBeenSuccessfullyReturnedTo}P.Maintenance?</Text>
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "50%" }} title={strings.okay} />
                        </View>
                    } />
                <CustomSubTitleWithImageComponent disabled title={strings.responeOfReturnJob} image={ImagesPath.arrow_counter_clockwise_black_icon} />
                <TouchableOpacity onPress={() => { setIsUpdate(false), setIsDuplicate(true) }} style={[globalStyles.rowView, styles.jobListMainView]}>
                    <Text style={styles.jobNameTxt}>{strings.duplicate}</Text>
                    <View style={globalStyles.roundView} >
                        <View style={[styles.roundFillView, { backgroundColor: isDuplicate ? colors.dark_blue3_color : colors.white_5, }]} />
                    </View>
                </TouchableOpacity>
                <View style={[styles.jobListMainView]}>
                    <TouchableOpacity onPress={() => { setIsDuplicate(false), setIsUpdate(true) }} style={[globalStyles.rowView, { justifyContent: 'space-between' }]}>
                        <Text style={styles.jobNameTxt}>{strings.wrongInformation}</Text>
                        <View style={globalStyles.roundView} >
                            <View style={[styles.roundFillView, { backgroundColor: !isDuplicate ? colors.dark_blue3_color : colors.white_5, }]} />
                        </View>
                    </TouchableOpacity>
                    <View style={globalStyles.rtlDirection}>
                        <TextInput
                            placeholder={strings.writeResponeOfReturnJob}
                            multiline
                            editable={!isDuplicate}
                            value={isText}
                            onChangeText={(text) => { setIsText(text) }}
                            placeholderTextColor={colors.doc_bg_color_dark_gray}
                            style={[styles.textInputStyle, styles.textInputFontStyle, { textAlign: 'right' }]}
                        />
                    </View>
                </View>
                {<CustomBlackButton onPress={() => returnJob()} buttonStyle={{ width: '50%' }} title={strings.return} image={ImagesPath.arrow_counter_clockwise_white_icon} />}
            </Container>
        </View>
    )
}

export default ReturnJobScreen;