import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { BottomSheet, Container, CustomBlackButton, CustomCarouselImageAndVideo, CustomDashedComponent, CustomDetailsComponent, CustomJobDetailsBottomButton, CustomModal, CustomSubTitleWithImageComponent, CustomSwitchComponent, CustomTextInput, CustomTextInputWithImage, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { useAppSelector } from '../../redux/Store'
import RBSheet from 'react-native-raw-bottom-sheet'
import fonts from '../../styles/Fonts'
import FontSizes from '../../styles/FontSizes'
import { colors } from '../../styles/Colors'

const CreateNewJobScreen = () => {
    const navigation = useCustomNavigation('CreateNewJobScreen')
    const { userData } = useAppSelector(state => state.userDetails)
    const refRBSheet = useRef<RBSheet | null>(null)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [isurgent, setIsUrgent] = useState(false)
    const [isnotification, setIsNotification] = useState(false)
    return (
        <View style={globalStyles.container} >
            <Header
                headerLeftStyle={{ width: "50%" }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.AddNewJob}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    userData?.role != strings.Inspector &&
                    <TouchableOpacity onPress={() => { refRBSheet.current?.open() }} >
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                } />
            <Container style={[globalStyles.container, { paddingHorizontal: wp(4) }]}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalInnerView}>
                        <Image source={ImagesPath.check_circle_icon} style={globalStyles.modalImageStyle} />
                        <Text style={{
                            fontFamily: fonts.FONT_POP_REGULAR,
                            fontSize: FontSizes.MEDIUM_16,
                            color: colors.black
                        }}>{strings.NewJobAddedSuccessfully}</Text>
                        <CustomBlackButton buttonStyle={{ paddingHorizontal: wp(10), marginTop: wp(2) }} onPress={() => { setIsModelVisible(false) }} title={strings.Okay} />
                    </View>
                } />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent disabled title={strings.Fillfromtocreatejob} image={ImagesPath.list_bullet_image_icon} />
                    <View style={{ paddingVertical: wp(5) }}>
                        <CustomTextInput
                            title={strings.JobId}
                            container={{ marginBottom: wp(1) }}
                            value={"#123"}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        <CustomTextInputWithImage
                            title="9 Oxfort street"
                            value='9 Oxfort street'
                            container={{ marginVertical: wp(5), width: wp(67) }} />
                        <CustomTextInput
                            title={strings.Addressinformation}
                            numberOfLines={2}
                            value={"Just behind new yellow house"}
                            // editable={isEdit}
                            onChangeText={(text) => { }}
                        />
                        <Text style={{ marginVertical: wp(1), marginBottom: wp(3), alignSelf: 'flex-end', color: '#B7B7B7', fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10 }}>Additional Address Information</Text>
                        <CustomDetailsComponent
                            title={strings.Description}
                            bottomComponent={
                                <Text numberOfLines={3} style={styles.bottomTxtStyle}>Lorem Ipsum is simply dummy text of the printing and,typesetting industry has been the industry's standard dummy text....</Text>
                            }
                        />
                        <CustomDashedComponent
                            viewStyle={{ paddingVertical: wp(5), marginTop: wp(5) }}
                            image={ImagesPath.add_icon}
                            onPress={() => { }}
                            title={strings.AddPhotosandAttachments}
                        />
                        <CustomSwitchComponent container={{
                            marginVertical: wp(5)
                        }}
                            title={strings.Priority}
                            subTitle="Urgent Job"
                            value={isurgent}
                            onPress={() => setIsUrgent(!isurgent)} />
                        <CustomSwitchComponent
                            title={strings.FinishNotification}
                            subTitle='Finish Notification'
                            value={isnotification}
                            onPress={() => setIsNotification(!isnotification)}
                        />
                        <CustomBlackButton
                            title={strings.CreateJob}
                            onPress={() => {
                                setIsModelVisible(true)

                            }}
                            image={ImagesPath.plus_white_circle_icon}
                        />
                    </View>
                </ScrollView>
            </Container>
        </View >
    )
}

export default CreateNewJobScreen
