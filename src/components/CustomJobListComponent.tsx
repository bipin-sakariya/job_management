import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CustomStatusBtn } from "./";
import { colors } from "../styles/Colors";
import fonts from "../styles/Fonts";
import FontSizes from "../styles/FontSizes";
import { globalStyles } from "../styles/globalStyles";
import { ImagesPath } from "../utils/ImagePaths";

interface CustomJobListComponentProps {
    item: any,
    type?: string
    listStyle?: TouchableOpacityProps['style']
    textStyle?: TextProps['style']
}

const CustomJobListComponent = (props: CustomJobListComponentProps & TouchableOpacityProps) => {
    return (
        <TouchableOpacity {...props} style={[props.listStyle, styles.jobContainerStyle, props.type == "carousel" ? styles.jobContainerBoxShadowStyle : null]}>
            <Image source={props.item.image ? props.item.image : ImagesPath.placeholder_img} style={styles.jobImageStyle} />
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <View style={styles.jobStatusViewStyle}>
                        {
                            props.item.status &&
                            <TouchableOpacity onPress={() => { }}>
                                <Image source={ImagesPath.infocircle_icon} style={styles.infoCircleIcon} />
                            </TouchableOpacity>
                        }
                        <Text style={[styles.titleTxt, globalStyles.rtlStyle]}>{props.item.title}</Text>
                    </View>
                    <CustomStatusBtn title={props.item.button} />
                </View>
                <Text style={[styles.descriptionTxt, globalStyles.rtlStyle, { fontSize: FontSizes.EXTRA_SMALL_10, textAlign: "left" }]}>{moment(props.item.date).format('ll')}</Text>
                <View style={styles.descriptionView}>
                    <Text numberOfLines={2} style={[props.textStyle, styles.descriptionTxt, globalStyles.rtlStyle, { textAlign: "left" }]}>{props.item.description}</Text>
                    <View style={[globalStyles.rowView, styles.kmViewStyle, globalStyles.rtlDirection]}>
                        <Image source={ImagesPath.map_pin_icon} style={styles.mapPinIcon} />
                        <Text style={[styles.distanceTxt, globalStyles.rtlStyle]}>{props.item.km}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
        color: colors.dark_blue1_color,
        marginHorizontal: wp(1)
    },
    distanceTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue3_color,
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue2_color,
        width: wp("45%")
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
        justifyContent: "space-between",
    },
    jobContainerBoxShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOpacity: 2,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5
    },
    kmViewStyle: {
        justifyContent: "center", alignSelf: "center", direction: "rtl", maxWidth: wp(25), flex: 1
    }
})