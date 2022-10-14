import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../styles/Colors";
import fonts from "../styles/Fonts";
import FontSizes from "../styles/FontSizes";
import { globalStyles } from "../styles/globalStyles";
import { ImagesPath } from "../utils/ImagePaths";

interface CustomJobListComponentProps {
    item: any,
    type?: string
}
const CustomJobListComponent = ({ item, type }: CustomJobListComponentProps) => {
    return (
        <View style={[styles.jobContainerStyle, type == "carousel" ? styles.jobContainerBoxShadowStyle : null,]}>
            <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <View style={styles.jobStatusViewStyle}>
                        {
                            item.status &&
                            <TouchableOpacity onPress={() => { }}>
                                <Image source={ImagesPath.infocircle_icon} style={styles.infoCircleIcon} />
                            </TouchableOpacity>
                        }
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
        color: colors.drak_light_brown,
        marginHorizontal: wp(1)
    },
    distanceTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.bottom_tab_btn,
        marginRight: wp(2)
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        paddingLeft: wp(2.5),
        color: colors.gray_12,
        width: wp("32%")
    },
    openButton: {
        height: wp(5),
        backgroundColor: colors.status_btn,
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: wp(1.5),
    },
    smallBut: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.white_5
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
    jobContainerBoxShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 2,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5
    },
})