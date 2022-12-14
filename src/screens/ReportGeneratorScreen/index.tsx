import { Alert, FlatList, Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonTab, Container, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { colors } from '../../styles/Colors'
import FontSizes from '../../styles/FontSizes'
import fonts from '../../styles/Fonts'
import CustomReportDetailsView from '../../components/CustomReportDetailsView'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import TableHeaderView from '../../components/TableHeaderView'
import TableDetailsComponent from '../../components/TableDetailsComponent'
import { strings } from '../../languages/localizedStrings'
import { convertDate } from '../../utils/screenUtils'
import RNFetchBlob from 'rn-fetch-blob'

const ReportGeneratorScreen = () => {
    const navigation = useCustomNavigation('ReportGeneratorScreen');

    const [btn, setBtn] = useState({
        open: true,
        close: false
    })
    const [range, setRange] = useState(0);
    const [dateArray, setDateArray] = useState<any>([]);
    const [markDates, setMarkedDates] = useState({});
    const [blockedDays, setBlockedDays] = useState({});
    const [sdate, setSdate] = useState('');
    const [edate, setEdate] = useState(' ');
    const XDate = require("xdate")
    const [page, setPage] = useState(1)

    useEffect(() => setupMarkedDates(sdate, edate), [range]);

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

    const data = [
        {
            title: '9 Oxford st.',
            date: '2 May 2022',
            description: 'Lorem Ipsum is simply dummy text of the typesetting in.......',
            author: 'Robert Kramer',
            activity: [
                {
                    title: 'Asphalt Paint',
                    size: '2.5',
                    parameter: 'Meter'
                },
                {
                    title: 'New Pole',
                    size: '677',
                    parameter: 'Unite'
                },
                {
                    title: 'Asphalt Paint',
                    size: '2.5',
                    parameter: 'KG'
                },
            ]
        },
        {
            title: '9 Oxford st.',
            date: '2 May 2022',
            description: 'Lorem Ipsum is simply dummy text of the typesetting in.......',
            author: 'Robert Kramer',
            activity: [
                {
                    title: 'Asphalt Paint',
                    size: '2.5',
                    parameter: 'Meter'
                },
                {
                    title: 'New Pole',
                    size: '677',
                    parameter: 'Unite'
                },
                {
                    title: 'Asphalt Paint',
                    size: '2.5',
                    parameter: 'KG'
                },
            ]
        }
    ]

    const SammedData = [
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "15",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },

        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "Meter",
            parameter: "Meter",
            imageUrl: ''
        },
    ]

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

    const downloadFile = () => {
        const { dirs } = RNFetchBlob.fs;
        console.log("DOWN---", { dirs })
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `report.doc`,
                path: `${dirs.DownloadDir}/report.doc`,
            },
            path: `${dirs.DocumentDir}/report.doc`,
        }).fetch('GET', 'https://www.sample-videos.com/doc/Sample-doc-file-100kb.doc')
            // http://www.africau.edu/images/default/sample.pdf           **
            // https://filesamples.com/samples/document/txt/sample3.txt   **
            // https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx **
            // https://filesamples.com/samples/document/xlsx/sample3.xlsx **
            // https://www.sample-videos.com/doc/Sample-doc-file-100kb.doc **
            .then((res) => {
                RNFetchBlob.ios.openDocument(res.data)
            }).catch((e) => {
                console.log("DOWN--- Catch", { e })
            })
    }


    // report generating functionality
    const checkPermissionForDownloadFile = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                console.log({ granted })
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    downloadFile()
                } else {
                    Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            downloadFile()
        }
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <>
                {
                    btn.open ?
                        <View style={styles.mainListView}>
                            <View style={[globalStyles.rowView, { justifyContent: "space-between", alignItems: 'center' }]}>
                                <Text style={[styles.titleTxt, globalStyles.rtlStyle]}>{item.title}</Text>
                                <Text style={[styles.commonTxt, globalStyles.rtlStyle]}>{moment(item.date).format('ll')}</Text>
                            </View>
                            <Text numberOfLines={1} style={[styles.commonTxt, globalStyles.rtlStyle, { marginVertical: wp(1) }]}>{item.description}</Text>
                            <View style={[styles.sepratorLine]} />
                            <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginVertical: wp(0.5) }]}>
                                <Text style={[styles.commonTxt, globalStyles.rtlStyle, { color: colors.dark_blue1_color }]}>{strings.Doneby}</Text>
                                <Text style={[styles.authorTxt, globalStyles.rtlStyle]}>{item.author}</Text>
                            </View>
                            <View style={styles.sepratorLine} />
                            {
                                item.activity.map((data: any) => {
                                    return (
                                        <CustomReportDetailsView data={data} />
                                    )
                                })
                            }
                        </View> :
                        <TableDetailsComponent type='report' item={item} index={index} />
                }
            </>
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(55), }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.ReportGenerator}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[globalStyles.rowView]}>
                        <Image source={ImagesPath.note_icon} style={styles.noteIconStyle} />
                        <Text style={[styles.reportTxt, globalStyles.rtlStyle]}>{strings.GenerateReport}</Text>
                    </View>
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
                        renders
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

                    {/* start date - end date  */}
                    <View style={[globalStyles.rowView, { justifyContent: 'center' }]}>
                        <View style={styles.vwDate}>
                            <Text style={[globalStyles.rtlStyle, styles.txtDate, { color: sdate ? colors.dark_blue1_color : colors.light_gray, }]}>{sdate ? convertDate(sdate) : strings.start_date}</Text>
                        </View>
                        <View style={{ marginBottom: hp(2), padding: wp(2.5), }}>
                            <Text style={styles.txtDate}>-</Text>
                        </View>
                        <View style={styles.vwDate}>
                            <Text style={[globalStyles.rtlStyle, styles.txtDate, { color: edate != ' ' ? colors.dark_blue1_color : colors.light_gray, }]}>{edate != ' ' ? convertDate(edate) : strings.end_date}</Text>
                        </View>
                    </View>

                    {/* details & summed up tabs */}
                    <ButtonTab btnOneTitle={strings.Detailed} btnTwoTitle={strings.Sammedup} setBtn={setBtn} btnValue={btn} onReset={setPage} />
                    {
                        btn.open ?
                            <>
                                <View style={[globalStyles.rowView, { justifyContent: "space-between", marginVertical: wp(2), marginTop: hp(2) }]}>
                                    <View style={[globalStyles.rowView]}>
                                        <Image source={ImagesPath.suitcase_icon} style={[styles.iconStyle, { tintColor: colors.dark_blue1_color }]} />
                                        <Text style={[styles.JobsTxt, globalStyles.rtlStyle]}>{strings.Jobs}</Text>
                                    </View>
                                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { checkPermissionForDownloadFile() }}>
                                        <Image source={ImagesPath.download_simple_icon} style={[styles.iconStyle, { tintColor: colors.dark_blue1_color }]} />
                                        <Text style={[styles.genrateTxt, globalStyles.rtlStyle]}>{strings.GenerateReport}</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList scrollEnabled={true} data={data} renderItem={renderItem} ItemSeparatorComponent={() => <View style={styles.lineSeprator} />} />
                            </>
                            :
                            <View style={[styles.sammedView, { flexShrink: 1 }]}>
                                <FlatList
                                    data={SammedData}
                                    renderItem={renderItem}
                                    nestedScrollEnabled
                                    scrollEnabled={true}
                                    ListHeaderComponent={() => {
                                        return (
                                            <TableHeaderView type='report' />
                                        )
                                    }}
                                    ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                    }
                </ScrollView>
            </Container>
        </View >
    )
}

export default ReportGeneratorScreen
