import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../styles/Colors";
import fonts from "../styles/Fonts";
import FontSizes from "../styles/FontSizes";
import { globalStyles } from "../styles/globalStyles";
import { ImagesPath } from "../utils/ImagePaths";

const CustomJobListComponent = ({ item }: any) => {
    return (
        <View style={[styles.jobContainerStyle]}>
            <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <View style={styles.jobStatusViewStyle}>
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={ImagesPath.infocircle_icon} style={styles.infoCircleIcon} />
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>{item.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { }} style={styles.openButton}>
                        <Text style={styles.smallBut}>{item.button}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.descriptionTxt, { fontSize: FontSizes.SMALL_7 }]}>{item.date}</Text>
                <View style={styles.descriptionView}>
                    <Text numberOfLines={2} style={[styles.descriptionTxt]}>{item.description}</Text>
                    <View style={[globalStyles.rowView, { justifyContent: "center", alignSelf: "center" }]}>
                        <Image source={ImagesPath.map_pin_icon} style={styles.mapPinIcon} />
                        <Text style={styles.distanceTxt}>{item.km}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CustomJobListComponent

const styles = StyleSheet.create({
    jobContainerStyle: {
        ...globalStyles.rowView,
        backgroundColor: colors.white,
        paddingHorizontal: wp(3.5),
        paddingVertical: wp(2.5),
        marginVertical: wp(0.5),
        borderRadius: 8,
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
        fontSize: FontSizes.SEMI_LARGE_20,
        color: '#404040',
        marginHorizontal: wp(1)
    },
    distanceTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: '#7F7F7F'
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        paddingLeft: wp(2.5),
        color: '#797979',
        width: wp("35%")
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
        height: wp(5),
        width: wp(5),
        resizeMode: "contain",
    },
    jobStatusViewStyle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    infoCircleIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain"
    },
    descriptionView: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
})