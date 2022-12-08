import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
interface CustomChatLinkViewProps {
    props?: any
    keyBoardVisible?: boolean
    textComponent?: any
    viewStyle?: ViewStyle
}

const CustomChatLinkView = (props: CustomChatLinkViewProps & TouchableOpacityProps) => {
    const [isVisible, setIsVisible] = useState(true)
    return (
        <>
            {
                isVisible ?

                    <View style={[styles.jobTypeMainView, props.viewStyle, {
                        borderRadius: props.keyBoardVisible ? wp(3) : 0,
                        borderBottomLeftRadius: wp(3),
                        borderBottomRightRadius: props.keyBoardVisible ? wp(3) : props?.props.position == 'right' ? 0 : wp(3),
                        borderTopLeftRadius: props.keyBoardVisible ? wp(3) : props?.props.position == 'right' ? wp(3) : 0,
                        borderTopRightRadius: wp(3),
                    }]}>
                        <View style={[globalStyles.rowView, styles.jobDetailView]}>
                            <View style={[globalStyles.centerView, styles.jobTypeImageView]}>
                                <Image source={ImagesPath.image_white_border} style={styles.imageStyle} />
                            </View>
                            {
                                props.keyBoardVisible ?
                                    <TouchableOpacity onPress={() => { setIsVisible(false) }} {...props} style={styles.closeButtonView}>
                                        <Image source={ImagesPath.close_icon} style={styles.closeBtnStyle} />
                                    </TouchableOpacity> : null
                            }
                            <View style={styles.jobDetailsMainView}>
                                <View style={[globalStyles.rowView, styles.jobDetailHeaderView]}>
                                    <Text numberOfLines={1} style={styles.jobTitleTxt}>Job Title</Text>
                                    <View style={[globalStyles.rowView, styles.pinImageViewStyle]}>
                                        <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.pinImageStyle} />
                                        <Text numberOfLines={1} style={styles.jobDistanceTxt}>5 km away</Text>
                                    </View>
                                </View>
                                <Text style={styles.jobDetailsTxt} numberOfLines={2}>Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing</Text>
                            </View>
                        </View>
                        {props.textComponent}
                    </View> : null
            }
        </>

    )
}

export default CustomChatLinkView

const styles = StyleSheet.create({
    jobTypeMainView: {
        width: "83%",
        backgroundColor: colors.light_blue_color,
        padding: wp(2),
        borderRadius: wp(2)
    },
    jobTypeImageView: {
        width: wp(17),
        height: wp(17),
        backgroundColor: '#9E9E9E',
        borderRadius: wp(2)
    },
    imageStyle: {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain'
    },
    closeButtonView: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: wp(1)
    },
    closeBtnStyle: {
        width: wp(3.5),
        height: wp(3.5),
        resizeMode: "contain"
    },
    jobDetailsMainView: {
        flex: 1,
        marginHorizontal: wp(2)
    },
    jobDetailHeaderView: {
        justifyContent: "space-between",
        marginVertical: wp(1),
        flex: 1
    },
    jobDetailView: {
        backgroundColor: "#FAFDFF",
        padding: wp(2),
        borderRadius: wp(2)
    },
    pinImageViewStyle: {
        width: "50%",
        justifyContent: 'flex-end'
    },
    pinImageStyle: {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain'
    },
    jobTitleTxt: {
        maxWidth: '50%',
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: '#404040'
    },
    jobDistanceTxt: {
        marginHorizontal: wp(0.5),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#7F7F7F'
    },
    jobDetailsTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: '#808080'
    }
})