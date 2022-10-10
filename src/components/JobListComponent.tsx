import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';
import { colors } from '../styles/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const JobListComponent = ({ item, index }: any) => {
    const navigation: NavigationProp<any, any> = useNavigation()
    return (
        <View style={styles.itemContainer}>
            <View style={styles.dateTxtContainer}>
                <Image source={ImagesPath.calender_icon} style={styles.calenderIconStyle} />
                <Text style={[styles.dateTxtStyle]}>{item.data}</Text>
            </View>
            {item.jobs.map((i: any) => (
                <TouchableOpacity onPress={() => { navigation.navigate("JobDetailsScreen") }} style={[styles.jobContainerStyle, { backgroundColor: i.author ? "#F0F0F0" : "#D9D9D9" }]}>
                    <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
                    <View style={{ flex: 1 }}>
                        <View style={styles.jobTitleContainer}>
                            <Text style={[styles.titleTxt, globalStyles.rtlStyle]}>{i.title}</Text>
                            <Text style={[styles.distanceTxt]}>{i.km}</Text>
                        </View>
                        {
                            i.author ?
                                <>
                                    <Text style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{i.jobstatus}</Text>
                                    <Text style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{i.author}</Text>
                                </> :

                                <Text style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{i.description}</Text>
                        }
                    </View>
                </TouchableOpacity>
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
        paddingHorizontal: wp(2),
        color: colors.light_brown,
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
        fontSize: FontSizes.SEMI_LARGE_20,
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