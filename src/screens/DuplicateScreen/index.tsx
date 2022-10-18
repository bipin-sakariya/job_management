import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomDetailsComponent, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { strings } from '../../languages/localizedStrings'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomCarouselImageAndVideo from '../../components/CustomCarouselImageAndVideo'
import { colors } from '../../styles/Colors'
import CustomTextInputWithImage from '../../components/CustomTextInputWithImage'

const DuplicateScreen = () => {
    const navigation = useCustomNavigation('DuplicateScreen')
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
                        <Text style={globalStyles.headerTitle}>{strings.Duplicate}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView>
                    <CustomSubTitleWithImageComponent disabled title={strings.DuplicateJob} image={ImagesPath.files_icon} />
                    <View style={styles.duplicateFirstView}>
                        <CustomTextInput
                            title={strings.JobId}
                            container={{ marginBottom: wp(4) }}
                            value={'123'}
                        />
                        <CustomTextInputWithImage title='9 Oxfort street' value='9 Oxfort street'
                            mainContainerStyle={{ flex: 1, }}
                            container={{ width: wp(61) }}
                            mapStyle={{
                                paddingHorizontal: wp(3)
                            }} />
                        <CustomCarouselImageAndVideo result={result} viewStyle={{ width: '81%', }} />
                    </View>
                    <View style={[styles.duplicateFirstView, { marginTop: wp(5) }]}>
                        <CustomTextInput
                            title={strings.JobId}
                            container={{ marginBottom: wp(4) }}
                            value={'123'}
                        />
                        <CustomTextInputWithImage title='9 Oxfort street' value='9 Oxfort street'
                            mainContainerStyle={{ flex: 1, }}
                            container={{ width: wp(61) }}
                            mapStyle={{
                                paddingHorizontal: wp(3)
                            }} />
                        <CustomCarouselImageAndVideo result={result} viewStyle={{ width: '81%', }} />
                    </View>
                    <CustomBlackButton buttonStyle={{
                        marginVertical: wp(10)
                    }} image={ImagesPath.arrow_counter_clockwise_white_icon} title={strings.ReturntoInspector} />
                </ScrollView>
            </Container >
        </View >
    )
}

export default DuplicateScreen