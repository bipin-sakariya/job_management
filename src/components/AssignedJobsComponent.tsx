import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { ImagesPath } from '../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'

const AssignedJobsComponent = () => {
    return (
        <View style={[globalStyles.rowView, styles.mainView]}>
            <Image source={ImagesPath.empty_image_white_border_icon} style={styles.imageStyle} />
            <View style={styles.detailsView}>
                <View style={[globalStyles.rowView, { justifyContent: "space-between", flex: 1 }]}>
                    <View style={globalStyles.rowView}>
                        <Image source={ImagesPath.infocircle_icon} style={styles.infoImageStyle} />
                        <Text numberOfLines={1} style={styles.titleTxt}>Job Title</Text>
                    </View>
                    <TouchableOpacity style={styles.BtnStyle}>
                        <Text numberOfLines={1} style={styles.BtnTxtStyle}>Open</Text>
                    </TouchableOpacity>
                </View>
                <Text numberOfLines={1} style={styles.dateTxtStyle}>Assigned on 16 may</Text>
            </View>
        </View>
    )
}

export default AssignedJobsComponent

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#F5F5F5",
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        borderRadius: wp(2)
    },
    imageStyle: {
        height: wp(15),
        width: wp(15),
        resizeMode: "contain"
    },
    detailsView: {
        flex: 1,
        paddingHorizontal: wp(2),
        justifyContent: 'space-around',
    },
    infoImageStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: "contain"
    },
    titleTxt: {
        marginLeft: wp(1),
        maxWidth: wp(40),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: '#404040'
    },
    BtnStyle: {
        backgroundColor: '#8D8D8D',
        paddingHorizontal: wp(2),
        paddingVertical: wp(0.7),
        borderRadius: wp(1.5)
    },
    BtnTxtStyle: {
        maxWidth: wp(15),
        color: colors.white_5,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12
    },
    dateTxtStyle: {
        maxWidth: wp(60),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: '#737373'
    }
})