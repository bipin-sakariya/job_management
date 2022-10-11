import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, Header } from '../../components'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { colors } from '../../styles/Colors'
import FontSizes from '../../styles/FontSizes'
import fonts from '../../styles/Fonts'

const ReportGeneratorScreen = () => {
    const navigation: NavigationProp<any, any> = useNavigation()
    const [range, setRange] = useState()
    const [dateArray, setDateArray] = useState()
    const XDate = require("xdate")
    LocaleConfig.locales['en'] = {
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'May', 'Jun', 'Jul.', 'Aug', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        today: 'Today\'now'
    };
    let date: string = moment().format("YYYY-MM-DD").toString()
    let maxDate = moment().add(10, "year").format("YYYY-MM-DD").toString()

    // const setupMarkedDates = (fromDate: string, toDate: string) => {
    //     let markedDates = {};
    //     let isNotValid = false;
    //     const mFromDate = XDate(fromDate);
    //     const mToDate = XDate(toDate);
    //     setRange(mFromDate.diffDays(mToDate));
    //     if (fromDate === toDate) {
    //         setDateArray([toDate]);
    //         markedDates = {
    //             [toDate]: {
    //                 color: AppColors.black,
    //                 textColor: AppColors.white,
    //                 startingDay: true,
    //                 endingDay: true,
    //             },
    //         };
    //     } else {
    //         setDateArray([]);
    //         for (let i = 0; i <= range; i++) {
    //             const tempDate = mFromDate
    //                 .addDays(i === 0 ? 0 : 1)
    //                 .toString('yyyy-MM-dd');
    //             setDateArray(s => [...s, tempDate]);
    //             markedDates[tempDate] = {
    //                 color: AppColors.black,
    //                 textColor: AppColors.white,
    //                 startingDay: i === 0,
    //                 endingDay: i === range,
    //             };
    //         }
    //     }
    //     if (!isNotValid) {
    //         setSdate(fromDate);
    //         setEdate(toDate);
    //         setMarkedDates(markedDates);
    //     }
    // };

    // const onDayPress = (date: any) => {
    //     if (sdate === edate) {
    //         if (sdate > date.dateString) {
    //             setupMarkedDates(date.dateString, sdate);
    //         } else {
    //             setupMarkedDates(sdate, date.dateString);
    //         }
    //     } else {
    //         setupMarkedDates(date.dateString, date.dateString);
    //     }
    // }

    return (
        <View style={globalStyles.container}>
            <Header headerLeftComponent={
                <TouchableOpacity style={[globalStyles.rowView, { width: wp(55) }]} onPress={() => { navigation.goBack() }}>
                    <Image source={ImagesPath.left_arrow_icon} style={styles.leftArrowIcon} />
                    <Text style={styles.ReportTxt}>Report Generator</Text>
                </TouchableOpacity>
            }
            />
            <Container style={{ flex: 1, paddingHorizontal: wp(5) }}>
                <View style={[globalStyles.rowView]}>
                    <Image source={ImagesPath.note_icon} style={styles.noteIconStyle} />
                    <Text style={styles.reportTxt}>Generate Report</Text>
                </View>
                <Calendar
                    initialDate={date}
                    minDate={'1990-05-10'}
                    maxDate={maxDate}
                    monthFormat={'MMM yyyy'}
                    style={styles.calenderStyle}
                    renderArrow={(direction) => <Image
                        source={direction == "left" ? ImagesPath.left_arrow_cal_icon : ImagesPath.right_arrow_cal_icon}
                        style={[styles.calendarArrowIcon, { marginLeft: direction == "left" ? wp(20) : 0, marginRight: direction == "right" ? wp(20) : 0 }]} />}
                    renderHeader={(data) => {
                        return (
                            <Text style={styles.calenderHeaderStyle}>{moment(data[0]).format("MMM YYYY")}</Text>
                        )
                    }}
                    markingType={'period'}
                    // onDayPress={onDayPress}
                    theme={{
                        dayTextColor: colors.gray_1,
                        textDisabledColor: colors.gray_2,
                        textDayFontWeight: '500',
                        textDayHeaderFontWeight: '500',
                        textDayFontSize: FontSizes.SMALL_14,
                        textDayHeaderFontSize: FontSizes.EXTRA_SMALL_12,
                        textDayFontFamily: fonts.FONT_POP_REGULAR,
                    }}
                />
            </Container>
        </View>
    )
}

export default ReportGeneratorScreen
