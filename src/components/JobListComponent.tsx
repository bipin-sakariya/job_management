import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';

const JobListComponent = ({ item, index }: any) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.dateTxtContainer}>
                <Image source={ImagesPath.calender_icon} style={styles.calenderIconStyle} />
                <Text style={styles.dateTxtStyle}>{item.data}</Text>
            </View>
            {item.jobs.map((i: any) => (
                <View style={styles.jobContainerStyle}>
                    <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
                    <View style={{ flex: 1 }}>
                        <View style={styles.jobTitleContainer}>
                            <Text style={styles.titleTxt}>{i.title}</Text>
                            <Text style={styles.distanceTxt}>{i.km}</Text>
                        </View>
                        <Text style={styles.descriptionTxt}>{i.description}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default JobListComponent

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: wp(4)
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
        paddingHorizontal: wp(2)
    },
    jobContainerStyle: {
        ...globalStyles.rowView,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: wp(3.5),
        paddingVertical: wp(2.5),
        borderRadius: 8,
        marginBottom: wp(4)
    },
    jobImageStyle: {
        height: wp(18),
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
        fontSize: FontSizes.LARGE_22,
        color: '#404040'
    },
    distanceTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: '#7F7F7F'
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        paddingLeft: wp(2.5),
        color: '#000000'
    }
})