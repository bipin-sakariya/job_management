import { I18nManager, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import { strings } from '../languages/localizedStrings';
import { JobDetailsData } from '../redux/slices/AdminSlice/jobListSlice';

interface CustomeJobListDetailsViewComponentProps {
    item: JobDetailsData
}

const CustomeJobListDetailsViewComponent = (props: CustomeJobListDetailsViewComponentProps & TouchableOpacityProps) => {
    return (
        <TouchableOpacity {...props} style={[styles.jobContainerStyle, styles.dropDownShadowStyle]} >
            <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle]}>{props.item.address}</Text>
                    <View style={[globalStyles.rowView, { direction: I18nManager.isRTL ? 'ltr' : 'rtl', }]}>
                        {props.item.status != strings.JobAddedby && props.item.status != strings.JobClosedby &&
                            <Image source={ImagesPath.map_pin_dark_line_icon} style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }} />
                        }
                        <Text style={[styles.distanceTxt, globalStyles.rtlStyle]}>5000 km Away</Text>
                    </View>
                </View>
                {/* {props.item.author ?
                    <>
                        <Text style={[styles.descriptionTxt, { writingDirection: "ltr", textAlign: 'left' }]}>{props.item.jobstatus}</Text>
                        <Text style={[styles.descriptionTxt, { writingDirection: "ltr", textAlign: 'left' }]}>{props.item.author}</Text>
                    </> : */}
                <Text numberOfLines={2} style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{props.item.description}</Text>
                {/* } */}
            </View>
        </TouchableOpacity >
    )
}

export default CustomeJobListDetailsViewComponent

const styles = StyleSheet.create({
    jobContainerStyle: {
        ...globalStyles.rowView,
        backgroundColor: colors.white,
        paddingHorizontal: wp(3.5),
        paddingVertical: wp(2.5),
        borderRadius: 8,
        marginBottom: wp(2)
    },
    jobImageStyle: {
        height: wp(20),
        width: wp(18),
        resizeMode: 'contain'
    },
    jobTitleContainer: {
        ...globalStyles.rowView,
        justifyContent: 'space-between',
        paddingLeft: wp(2.5),
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        color: colors.dark_blue1_color,
        flex: 1,
        // height: wp(1),
    },
    distanceTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.dark_blue3_color,
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue2_color,
        flex: 1,
        maxWidth: wp(80),
    },
    dropDownShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOpacity: 5,
        shadowRadius: 6,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5
    }
})