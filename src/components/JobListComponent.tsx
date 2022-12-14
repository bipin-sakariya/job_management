import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';
import { colors } from '../styles/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomeJobListDetailsViewComponent from './CustomJobListDetailsViewComponent';
import useCustomNavigation from '../hooks/useCustomNavigation';
import { useAppSelector } from '../redux/Store';
import { strings } from '../languages/localizedStrings';
import moment from 'moment';

const JobListComponent = ({ item, index }: any) => {
    const navigation = useCustomNavigation('JobsScreen')
    const { userData } = useAppSelector(state => state.userDetails)
    return (
        <View style={styles.itemContainer}>
            <View style={styles.dateTxtContainer}>
                <Image source={ImagesPath.calender_icon} style={styles.calenderIconStyle} />
                <Text style={[styles.dateTxtStyle, globalStyles.rtlStyle]}>{moment(item.data).format('ll')}</Text>
            </View>
            {item.jobs.map((i: any) => (
                <CustomeJobListDetailsViewComponent onPress={() => {
                    navigation.navigate("JobDetailsScreen", { params: i })
                }} item={i} />
            ))}
        </View>
    )
}

export default JobListComponent

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: wp(4),
    },
    dateTxtContainer: {
        ...globalStyles.rowView,
        marginVertical: wp(2.5)
    },
    calenderIconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    dateTxtStyle: {
        fontSize: FontSizes.MEDIUM_16,
        fontFamily: fonts.FONT_POP_REGULAR,
        paddingHorizontal: wp(2),
        color: colors.dark_blue2_color,
    },
})