import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';
import { colors } from '../styles/Colors';
import CustomeJobListDetailsViewComponent from './CustomJobListDetailsViewComponent';
import useCustomNavigation from '../hooks/useCustomNavigation';
import { JobDetailsData } from '../redux/slices/AdminSlice/jobListSlice';
import { convertDate } from '../utils/screenUtils';
import { NotificationObjectType } from '../redux/slices/AdminSlice/notificationSlice';

const JobListComponent = ({ item, isDateVisible, isNotification = false }: { item: Partial<JobDetailsData> & Partial<NotificationObjectType>, isDateVisible?: boolean, isNotification?: boolean }) => {
    const navigation = useCustomNavigation('JobsScreen')

    return (
        <View style={styles.itemContainer}>
            <View style={styles.dateTxtContainer}>
                {isDateVisible && <View style={[globalStyles.rowView, { paddingVertical: hp(0.2) }]}>
                    <Image source={ImagesPath.calender_icon} style={styles.calenderIconStyle} />
                    <Text style={[styles.dateTxtStyle, globalStyles.rtlStyle]}>{convertDate(item?.created_at ? item?.created_at : '')}</Text>
                </View>}
            </View>
            <CustomeJobListDetailsViewComponent
                onPress={() => {
                    !isNotification && navigation.navigate("JobDetailsScreen", { params: item, type: item?.status })
                }}
                item={item}
                isNotification={isNotification}
            />
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
        marginVertical: wp(2),
        justifyContent: 'space-between'
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