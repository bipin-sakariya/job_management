import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'

interface CustomeJobListDetailsViewComponentProps {
    item: any
}

const CustomeJobListDetailsViewComponent = (props: CustomeJobListDetailsViewComponentProps & TouchableOpacityProps) => {
    return (
        <TouchableOpacity {...props} style={[styles.jobContainerStyle, { backgroundColor: props.item.author ? "#F0F0F0" : "#D9D9D9" }]}>
            <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <Text style={[styles.titleTxt, globalStyles.rtlStyle]}>{props.item.title}</Text>
                    <Text style={[styles.distanceTxt]}>{props.item.km}</Text>
                </View>
                {
                    props.item.author ?
                        <>
                            <Text style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{props.item.jobstatus}</Text>
                            <Text style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{props.item.author}</Text>
                        </> :

                        <Text style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{props.item.description}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

export default CustomeJobListDetailsViewComponent

const styles = StyleSheet.create({
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