import { I18nManager, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from './Colors'
import fonts from './Fonts'
import FontSizes from './FontSizes'

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white_color
    },
    headerIcon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain',
        tintColor: colors.dark_blue1_color
    },
    headerTitle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.dark_blue1_color,
        marginHorizontal: wp(2),
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrowStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: "contain",
        marginRight: wp(1)
    },
    rtlStyle: {
        writingDirection: I18nManager.getConstants().isRTL ? "rtl" : "ltr",
        textAlign: "left",
    },
    rtlDirection: {
        direction: I18nManager.getConstants().isRTL ? "rtl" : "ltr"
    },
    spaceAroundView: {
        justifyContent: "space-around",
        alignItems: "center"
    },
    threeDotMenuIcon: {
        height: wp(8.5),
        width: wp(4),
        resizeMode: 'cover',
    },
    modalView: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    modalImageStyle: {
        height: wp(12),
        width: wp(12),
        resizeMode: 'contain',
        marginTop: wp(2)
    }
})

export const customMapStyle = [
    //place geometry location
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                color: colors.white
            }
        ]
    },
    //place geometry name
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: colors.black,
            },
        ],
    },
    //park geometry
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: colors.white,
            },
        ],
    },
    //sub road geometry
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: colors.light_dark_blue,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: colors.light_purple,
            },
        ],
    },
    //highway geometry
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: colors.light_dark_blue,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: colors.white,
            },
        ],
    },
    //water geometry
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: colors.light_blue,
            },
        ],
    },
    //icons
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    //transpotaion
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: colors.light_blue
            },
        ]
    },
];