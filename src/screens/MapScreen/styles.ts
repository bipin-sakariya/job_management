import { StyleSheet } from 'react-native'
import React from 'react'
import FontSizes from '../../styles/FontSizes'
import fonts from '../../styles/Fonts'
import { colors } from '../../styles/Colors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { globalStyles } from '../../styles/globalStyles'


export const styles = StyleSheet.create({
    jobTypeTxt: {
        fontSize: FontSizes.MEDIUM_16,
        fontFamily: fonts.FONT_POP_MEDIUM,
        paddingHorizontal: wp(1),
        color: colors.black
    },
    downIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    carouselStyle: {
        position: "absolute",
        alignSelf: "center",
        bottom: wp(35),
        width: wp("100%"),
        justifyContent: "center",
        paddingVertical: wp(1),
    },
    jobContainerStyle: {
        ...globalStyles.rowView,
        backgroundColor: colors.white,
        paddingHorizontal: wp(3.5),
        paddingVertical: wp(2.5),
        marginVertical: wp(0.5),
        borderRadius: 8,
    },
    jobContainerBoxShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOpacity: 2,
        shadowOffset: { height: 0, width: 0 }
    },
    jobImageStyle: {
        height: wp(20),
        width: wp(20),
        resizeMode: 'contain'
    },
    jobTitleContainer: {
        ...globalStyles.rowView,
        justifyContent: 'space-between',
        paddingLeft: wp(2.5),
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: '#404040'
    },
    distanceTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#7F7F7F'
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        paddingLeft: wp(2.5),
        color: '#797979'
    },
    openButton: {
        height: wp(5),
        backgroundColor: "#8D8D8D",
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: wp(1.5),
    },
    smallBut: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#FFFFFF'
    },
    mapPinIcon: {
        height: wp(4),
        width: wp(4),
        resizeMode: "contain",
    },
    routeBut: {
        height: wp(15),
        width: wp(15),
        backgroundColor: '#262626',
        borderRadius: wp(18),
        marginVertical: wp(2.5),
        marginHorizontal: wp(3),
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: 'center',
    },
    routeButShadow: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOpacity: 3,
        shadowOffset: { height: 0, width: 0 }
    },
    pathIconStyle: {
        height: wp(7),
        width: wp(7),
        resizeMode: 'contain'
    },
})