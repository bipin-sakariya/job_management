import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../styles/Colors";
import fonts from "../styles/Fonts";
import FontSizes from "../styles/FontSizes";
import { globalStyles } from "../styles/globalStyles";
import { ImagesPath } from "../utils/ImagePaths";

interface props {
    setSelectedDate?: Dispatch<SetStateAction<{ toDate?: string | undefined, fromDate?: string | undefined }>>;
    setSdate?: (value: string) => void;
    setEdate?: (value: string) => void;
    sdate?: any;
    edate?: any;
}

const CalendarView = (props: props) => {
    const [range, setRange] = useState(0);
    const [markDates, setMarkedDates] = useState({});
    const [blockedDays, setBlockedDays] = useState({});
    const XDate = require("xdate")

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

    useEffect(() => setupMarkedDates(props.sdate, props.edate), [range]);

    const onDayPress = (date: any) => {
        if (props.sdate === props.edate) {
            if (props.sdate > date.dateString) {
                setupMarkedDates(date.dateString, props.sdate);
            } else {
                setupMarkedDates(props.sdate, date.dateString);
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
            markedDates = {
                [toDate]: {
                    color: colors.dark_blue1_color,
                    textColor: colors.white_color,
                    startingDay: true,
                    endingDay: true,
                },
            };
        } else {
            for (let i = 0; i <= range; i++) {
                const tempDate = mFromDate
                    .addDays(i === 0 ? 0 : 1)
                    .toString('yyyy-MM-dd');
                markedDates[tempDate] = {
                    color: i === 0 ? colors.transparent : i === range ? colors.transparent : colors.white_color,
                    textColor: i === 0 || i === range ? colors.white_color : colors.grey_18,
                    startingDay: i === 0,
                    endingDay: i === range,
                }
            }
        }
        if (!isNotValid) {
            props.setSdate && props.setSdate(fromDate);
            props.setEdate && props.setEdate(toDate);
            setMarkedDates(markedDates);
            props.setSelectedDate && props.setSelectedDate({ toDate: toDate, fromDate: fromDate })
        }
    };

    return (
        <View style={{ width: wp(90), alignSelf: 'center' }}>
            <Calendar
                initialDate={date}
                minDate={'1990-05-10'}
                accessibilityLanguage={"hebrew"}
                maxDate={maxDate}
                monthFormat={'MMMM yyyy'}
                style={globalStyles.calendarStyle}
                renderArrow={(direction) => <Image
                    source={direction == "left" ? ImagesPath.right_arrow_cal_icon : ImagesPath.left_arrow_cal_icon}
                    style={[globalStyles.calendarArrowIcon, { marginLeft: direction == "left" ? wp(20) : 0, marginRight: direction == "right" ? wp(20) : 0, tintColor: colors.primary_color }]} />}
                renderHeader={(data) => {
                    return (
                        <Text style={[globalStyles.calenderHeaderStyle, globalStyles.rtlStyle]}>{moment(data[0]).format("MMM YYYY")}</Text>
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
        </View>
    )
}
export default CalendarView;