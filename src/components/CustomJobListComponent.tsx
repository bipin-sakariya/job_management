import React from 'react';
import { Image, StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps, View, } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomStatusBtn } from './';
import { colors } from '../styles/Colors';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import { JobDetailsData } from '../redux/slices/AdminSlice/jobListSlice';
import { JobDetailsData as ReturnJobDetialsType } from '../redux/slices/AdminSlice/returnJobListSlice';
import { convertDate } from '../utils/screenUtils';
import FastImage from 'react-native-fast-image';

interface CustomJobListComponentProps {
    item: JobDetailsData & ReturnJobDetialsType;
    type?: string;
    listStyle?: TouchableOpacityProps['style'];
    textStyle?: TextProps['style'];
}

const CustomJobListComponent = (props: CustomJobListComponentProps & TouchableOpacityProps) => {
    return (
        <TouchableOpacity
            {...props}
            style={[
                props.listStyle,
                styles.jobContainerStyle,
                props.type == 'carousel' ? styles.jobContainerBoxShadowStyle : null,
            ]}>
            <FastImage
                source={(props?.item?.images && props?.item?.images[0]?.image) ? { uri: props?.item?.images[0]?.image } : ImagesPath.job_list_image_icon}
                style={styles.jobImageStyle}
            />
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <View style={styles.jobStatusViewStyle}>
                        {props.item.status && (
                            <TouchableOpacity onPress={() => { }}>
                                <Image
                                    source={ImagesPath.infocircle_icon}
                                    style={styles.infoCircleIcon}
                                />
                            </TouchableOpacity>
                        )}
                        <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle]}>
                            {props.item.address}
                        </Text>
                    </View>
                    <CustomStatusBtn title={props.item.status} />
                </View>
                <Text
                    style={[
                        styles.descriptionTxt,
                        globalStyles.rtlStyle,
                        { fontSize: FontSizes.EXTRA_SMALL_10, textAlign: 'left' },
                    ]}>
                    {convertDate(props.item.created_at)}
                </Text>
                <View style={styles.descriptionView}>
                    <Text
                        numberOfLines={2}
                        style={[
                            props.textStyle,
                            styles.descriptionTxt,
                            globalStyles.rtlStyle,
                            { textAlign: 'left' },
                        ]}>
                        {props.item.description}
                    </Text>
                    <View
                        style={[
                            globalStyles.rowView,
                            styles.kmViewStyle,
                            globalStyles.rtlDirection,
                        ]}>
                        <Image source={ImagesPath.map_pin_icon} style={styles.mapPinIcon} />
                        <Text style={[styles.distanceTxt, globalStyles.rtlStyle]}>
                            5 km away
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomJobListComponent;

const styles = StyleSheet.create({
    jobContainerStyle: {
        ...globalStyles.rowView,
        backgroundColor: colors.white,
        paddingHorizontal: wp(3.5),
        paddingVertical: wp(2.5),
        marginVertical: wp(0.5),
        borderRadius: 8,
        marginHorizontal: wp(2),
    },
    jobImageStyle: {
        height: wp(20),
        width: wp(20),
        resizeMode: 'contain',
    },
    jobTitleContainer: {
        ...globalStyles.rowView,
        justifyContent: 'space-between',
        paddingLeft: wp(2.5),
        flex: 1
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.dark_blue1_color,
        marginHorizontal: wp(1),
        flex: 1
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
        width: wp('45%'),
    },
    mapPinIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
    },
    jobStatusViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    infoCircleIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
    },
    descriptionView: {
        flexDirection: 'row',
        // alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    jobContainerBoxShadowStyle: {
        shadowColor: colors.black_opacity_2,
        shadowOpacity: 2,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5,
        paddingHorizontal: wp(2),
        marginHorizontal: wp(0),
    },
    kmViewStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        direction: 'rtl',
        maxWidth: wp(25),
        flex: 1,
    },
});
