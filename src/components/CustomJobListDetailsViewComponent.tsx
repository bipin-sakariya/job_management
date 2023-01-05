import React from 'react';
import { I18nManager, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import { strings } from '../languages/localizedStrings';
import { JobDetailsData } from '../redux/slices/AdminSlice/jobListSlice';
import { NotificationObjectType } from '../redux/slices/AdminSlice/notificationSlice';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';

interface CustomeJobListDetailsViewComponentProps {
    item: Partial<JobDetailsData> & Partial<NotificationObjectType>
    isNotification?: boolean
}

const CustomeJobListDetailsViewComponent = (props: CustomeJobListDetailsViewComponentProps & TouchableOpacityProps) => {
    return (
        <TouchableOpacity {...props} style={[styles.jobContainerStyle, styles.dropDownShadowStyle]} >
            {props.isNotification
                ?
                <>
                    {props.item &&
                        <Image source={props.item.jobs?.images.length ? { uri: props.item.jobs?.images[0]?.image } : ImagesPath.placeholder_img} resizeMode={'contain'} style={styles.notificationImageStyle} />
                    }
                </>
                :
                <>
                    {props.item && props.item.images &&
                        <FastImage source={props?.item?.images[0]?.image ? { uri: props?.item?.images[0]?.image } : ImagesPath.placeholder_img} resizeMode={'contain'} style={styles.jobImageStyle} />
                    }
                </>
            }
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle]}>{props.isNotification ? props.item.jobs?.address : props.item.address}</Text>
                    <View style={[globalStyles.rowView, { direction: I18nManager.isRTL ? 'ltr' : 'rtl', }]}>
                        {(props.item.status != strings.jobAddedBy && props.item.status != strings.jobClosedBy && !props.isNotification) &&
                            <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.iconStyle} />
                        }
                        {props.isNotification &&
                            <Text style={styles.durationStyle}>2m</Text>
                        }
                        <Text style={[styles.distanceTxt, globalStyles.rtlStyle]}>{props.isNotification ? '' : '5000 km Away'}</Text>
                    </View>
                </View>
                <Text numberOfLines={2} style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{!props.isNotification && props.item.id}</Text>
                <Text numberOfLines={2} style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{!props.isNotification && props.item.description}</Text>
                {props.isNotification && <Text numberOfLines={2} style={[styles.descriptionTxt, globalStyles.rtlStyle]}>
                    {props.item?.notification_type == 'Close' && strings.job_Closed_by}
                    {props.item?.notification_type == 'Open' && strings.job_Added_by}
                    {props.item?.notification_type == 'Further_Inspection' && strings.need_Further_Inspection}
                    {props.item?.notification_type == 'Transfer' && strings.job_Transfer_by}
                </Text>}
                {props.isNotification && <Text numberOfLines={1} style={[styles.descriptionTxt, globalStyles.rtlStyle, { fontWeight: '500' }]}>{props.isNotification && props.item.senders?.user_name ? props.item.senders?.user_name : props.item.senders?.email?.split('@', 1)}{'@'}</Text>}
            </View>
        </TouchableOpacity >
    )
}

export default CustomeJobListDetailsViewComponent;

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
    },
    notificationImageStyle: {
        height: wp(25),
        width: wp(22),
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
        backgroundColor: colors.white_color,
        shadowColor: colors.black,
        shadowOpacity: 0.10,
        shadowRadius: 6,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5,
        borderTopWidth: 0,
    },
    iconStyle: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain'
    },
    durationStyle: {
        color: colors.dark_blue3_color,
        fontSize: RFValue(12),
        fontFamily: fonts.FONT_POP_MEDIUM,
    }
})