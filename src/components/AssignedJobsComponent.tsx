import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import CustomStatusBtn from './CustomStatusBtn';
import { strings } from '../languages/localizedStrings';
import { convertDate } from '../utils/screenUtils';

export interface AssignJobTypeProps {
    id: number
    added_by: {}
    address: string
    closed_by: {}
    images: []
    attachments: []
    forms: []
    bills: []
    group_forms: []
    created_at: string,
    updated_at: string,
    address_information: string,
    description: string,
    latitude: null,
    longitude: null,
    priority: boolean,
    further_inspection: boolean,
    note: null,
    status: string,
    comment: null,
    form: [],
    bill: []
}

const AssignedJobsComponent = ({ item, index }: { item: AssignJobTypeProps, index: number }) => {
    return (
        <View style={[globalStyles.rowView, styles.mainView]}>
            <Image source={ImagesPath.empty_image_white_border_icon} style={styles.imageStyle} />
            <View style={styles.detailsView}>
                <View style={[globalStyles.rowView, { justifyContent: "space-between", flex: 1 }]}>
                    <View style={globalStyles.rowView}>
                        <Image source={ImagesPath.infocircle_icon} style={styles.infoImageStyle} />
                        <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle]}>{item.address}</Text>
                    </View>
                    <CustomStatusBtn title={item.status} style={{ backgroundColor: colors.dark_blue3_color }} txtStyle={{ color: colors.white_color }} />
                </View>
                <Text numberOfLines={1} style={[styles.dateTxtStyle, globalStyles.rtlStyle]}>{strings.Assignedon} {convertDate(item.created_at)}</Text>
            </View>
        </View>
    )
}

export default AssignedJobsComponent

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: colors.gray_light_color,
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
        color: colors.dark_blue1_color
    },
    BtnStyle: {
        backgroundColor: colors.status_btn,
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
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.dark_blue2_color
    }
})