import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';
import { colors } from '../styles/Colors';
import CustomeJobListDetailsViewComponent from './CustomJobListDetailsViewComponent';
import useCustomNavigation from '../hooks/useCustomNavigation';
import moment from 'moment';
import { useAppSelector } from '../hooks/reduxHooks';
import CustomModal from './CustomModal';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { strings } from '../languages/localizedStrings';
import { JobDetailsData } from '../redux/slices/AdminSlice/jobListSlice';
import { convertDate } from '../utils/screenUtils';
import CustomBlackButton from './CustomBlackButton';

const JobListComponent = ({ item, index, isDateVisible }: { item: JobDetailsData, index: number, isDateVisible: boolean }) => {
    const navigation = useCustomNavigation('JobsScreen')

    const [isModelVisible, setIsModelVisible] = useState(false)

    LocaleConfig.locales['hebrew'] = {
        monthNames: ['יָנוּאָר', 'פברואר', 'מרץ', 'אַפּרִיל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'סֶפּטֶמבֶּר', 'אוֹקְטוֹבֶּר', 'נוֹבֶמבֶּר', 'דֵצֶמבֶּר'],
        monthNamesShort: ['ינואר', 'פברואר', 'לְקַלְקֵל', 'אפריל', 'מאי', 'מאי', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        dayNames: ['יוֹם רִאשׁוֹן', 'יוֹם שֵׁנִי', 'יוֹם שְׁלִישִׁי', 'יום רביעי', 'יוֹם חֲמִישִׁי', 'יוֹם שִׁישִׁי', 'יום שבת'],
        dayNamesShort: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
        today: 'היום עכשיו'
    };

    let date: string = moment().format("YYYY-MM-DD").toString()
    let maxDate = moment().add(10, "year").format("YYYY-MM-DD").toString()
    LocaleConfig.defaultLocale = 'hebrew';

    const [range, setRange] = useState(0);
    const [dateArray, setDateArray] = useState<any>([]);
    const [markDates, setMarkedDates] = useState({});
    const [blockedDays, setBlockedDays] = useState({});
    const [sdate, setSdate] = useState('');
    const [edate, setEdate] = useState(' ');
    const XDate = require("xdate")
    const [page, setPage] = useState(1)
    useEffect(() => setupMarkedDates(sdate, edate), [range]);

    const onDayPress = (date: any) => {
        if (sdate === edate) {
            if (sdate > date.dateString) {
                setupMarkedDates(date.dateString, sdate);
            } else {
                setupMarkedDates(sdate, date.dateString);
            }
        } else {
            setupMarkedDates(date.dateString, date.dateString);
        }
    }

    const setupMarkedDates = (fromDate: string, toDate: string) => {
        let markedDates: any = {};
        let isNotValid = false;
        const mFromDate = XDate(fromDate);
        const mToDate = XDate(toDate);
        setRange(mFromDate.diffDays(mToDate));
        if (fromDate === toDate) {
            setDateArray([toDate]);
            markedDates = {
                [toDate]: {
                    color: colors.dark_blue1_color,
                    textColor: colors.white_color,
                    startingDay: true,
                    endingDay: true,
                },
            };
        } else {
            setDateArray([]);
            for (let i = 0; i <= range; i++) {
                const tempDate = mFromDate
                    .addDays(i === 0 ? 0 : 1)
                    .toString('yyyy-MM-dd');
                setDateArray((s: any) => [...s, tempDate]);
                markedDates[tempDate] = {
                    color: i === 0 ? "transparent" : i === range ? "transparent" : colors.white_color,
                    textColor: i === 0 || i === range ? colors.white_color : '#545454',
                    startingDay: i === 0,
                    endingDay: i === range,
                }
            }
        }
        if (!isNotValid) {
            setSdate(fromDate);
            setEdate(toDate);
            setMarkedDates(markedDates);
        }
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.dateTxtContainer}>
                {isDateVisible && <View style={globalStyles.rowView}>
                    <Image source={ImagesPath.calender_icon} style={styles.calenderIconStyle} />
                    <Text style={[styles.dateTxtStyle, globalStyles.rtlStyle]}>{convertDate(item.created_at)}</Text>
                </View>}
                {
                    index == 0 &&
                    <TouchableOpacity
                        onPress={() => {
                            setIsModelVisible(true)
                        }} style={{ padding: wp(1.5) }}>
                        <Text style={[styles.dateTxtStyle, globalStyles.rtlStyle, { fontFamily: fonts.FONT_POP_SEMI_BOLD, paddingHorizontal: 0 }]}>{strings.date}</Text>
                    </TouchableOpacity>
                }
            </View >
            <CustomeJobListDetailsViewComponent
                onPress={() => {
                    navigation.navigate("JobDetailsScreen", { params: item, type: item?.status })
                }}
                item={item}
            />

            <CustomModal
                visible={isModelVisible}
                onRequestClose={() => { setIsModelVisible(false) }}
                onClose={() => { setIsModelVisible(false) }}
                children={
                    <View style={{ width: wp(90), alignSelf: 'center' }}>
                        <Calendar
                            initialDate={date}
                            minDate={'1990-05-10'}
                            accessibilityLanguage={"hebrew"}
                            maxDate={maxDate}
                            monthFormat={'MMMM yyyy'}
                            style={styles.calendarStyle}
                            renderArrow={(direction) => <Image
                                source={direction == "left" ? ImagesPath.right_arrow_cal_icon : ImagesPath.left_arrow_cal_icon}
                                style={[styles.calendarArrowIcon, { marginLeft: direction == "left" ? wp(20) : 0, marginRight: direction == "right" ? wp(20) : 0, tintColor: colors.primary_color }]} />}
                            renderHeader={(data) => {
                                return (
                                    <Text style={[styles.calenderHeaderStyle, globalStyles.rtlStyle]}>{moment(data[0]).format("MMM YYYY")}</Text>
                                )
                            }}
                            markingType={'period'}
                            onDayPress={(date) => onDayPress(date)}
                            markedDates={{ ...markDates, ...blockedDays }}
                            theme={{
                                dayTextColor: colors.gray_1,
                                textDisabledColor: colors.gray_2,
                                textDayFontWeight: '500',
                                textDayHeaderFontWeight: '500',
                                textDayFontSize: FontSizes.SMALL_14,
                                textDayHeaderFontSize: FontSizes.EXTRA_SMALL_12,
                                textDayFontFamily: fonts.FONT_POP_REGULAR,
                                calendarBackground: colors.calendar_Bg,
                            }}
                        />
                        <CustomBlackButton
                            title={strings.apply}
                        />
                    </View>
                }
            />
        </View >
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
    calendarStyle: {
        backgroundColor: colors.calendar_Bg,
        borderRadius: wp(2),
        marginVertical: wp(5),
    },
    calenderHeaderStyle: {
        marginVertical: wp(2),
        textAlign: "center",
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.gray_6
    },
    calendarArrowIcon: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
    },
})