import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomDashedComponent, CustomDetailsComponent, CustomSubTitleWithImageComponent, CustomSwitchComponent, CustomTextInput, CustomTextInputWithImage, Header } from '../../components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { strings } from '../../languages/localizedStrings'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'
import { styles } from './styles'

const AddNewJobScreen = () => {
    const navigation = useCustomNavigation('AddNewJobScreen');
    const [isUrgentJob, setIsUrgentJob] = useState(false)
    const [isFinishNotification, setIsFinishNotification] = useState(false)

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3),
                    width: wp(55),
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.AddNewJob}</Text>
                    </TouchableOpacity>
                }
            />
            <Container>
                <ScrollView contentContainerStyle={[{ paddingHorizontal: wp(4), paddingBottom: wp(5) }]}>
                    <CustomSubTitleWithImageComponent title={strings.Fillfromtocreatejob} image={ImagesPath.list_bullet_image_icon} />
                    <CustomTextInput title={strings.JobId} container={{ marginTop: wp(3) }} placeholder={"#123"} />
                    <CustomTextInputWithImage
                        title={strings.Address}
                        value='ממש מאחורי הבית הצהוב החדש'
                        onChangeText={(text) => { }}
                        mainContainerStyle={{ marginTop: wp(5), flex: 1, }}
                        mapStyle={{ paddingVertical: Platform.OS == "ios" ? wp(4.2) : wp(5.5) }}
                        container={{ width: wp(68) }} />
                    <CustomTextInput title={strings.Addressinformation} container={{ marginTop: wp(5) }} placeholder={"ממש מאחורי הבית הצהוב החדש"} />
                    <Text style={[{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10, color: colors.dark_blue3_color }]}>{strings.Additionaladdressinformation}</Text>
                    <CustomDetailsComponent
                        detailsContainerStyle={{ marginTop: wp(4) }}
                        title={strings.Description}
                        bottomComponent={
                            <Text numberOfLines={3} style={[styles.bottomTxtStyle, globalStyles.rtlStyle, { textAlign: "left", }]}>Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס, ותעשיית הדפוס הייתה טקסט הדמה הסטנדרטי של התעשייה....</Text>
                        }
                    />
                    <CustomDashedComponent
                        image={ImagesPath.add_icon}
                        onPress={() => { }}
                        title={strings.Addimagesandattachments}
                        viewStyle={{ marginTop: wp(5), paddingVertical: wp(5) }} />
                    <CustomSwitchComponent
                        onPress={() => setIsUrgentJob(!isUrgentJob)}
                        value={isUrgentJob}
                        container={{ marginTop: wp(3) }}
                        title={strings.Priority}
                        subTitle={strings.UrgentJob} />
                    <CustomSwitchComponent
                        onPress={() => setIsFinishNotification(!isFinishNotification)}
                        value={isFinishNotification}
                        container={{ marginTop: wp(4) }}
                        title={strings.FurtherInspection}
                        subTitle={strings.FinishNotification} />
                    <CustomBlackButton
                        title={strings.CreateJob}
                        image={ImagesPath.add_icon}
                        imageStyle={{ tintColor: colors.white_color }}
                    />
                </ScrollView>
            </Container>
        </View>
    )
}

export default AddNewJobScreen
