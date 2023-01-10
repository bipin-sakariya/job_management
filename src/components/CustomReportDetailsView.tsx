import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import { billData } from '../redux/slices/AdminSlice/billListSlice';

const CustomReportDetailsView = ({ billDetail }: { billDetail: billData }) => {
    return (
        <View style={[globalStyles.rowView, { justifyContent: 'space-between', flex: 1 }]}>
            <Text style={[styles.commonTxt, globalStyles.rtlStyle]}>{billDetail?.name}</Text>
            <View style={[globalStyles.rowView, { width: wp(30), justifyContent: "space-between" }]}>
                <Text style={[styles.commonTxt, globalStyles.rtlStyle]}>{billDetail?.type == 'Sign' ? billDetail?.measurement : billDetail?.type == 'Material' && billDetail?.jumping_ration}</Text>
                <Text style={[styles.commonTxt, globalStyles.rtlStyle]}>{billDetail?.type_counting}</Text>
            </View>
        </View>
    )
}

export default CustomReportDetailsView;

const styles = StyleSheet.create({
    commonTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue3_color
    },
})