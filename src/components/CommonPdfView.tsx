import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../styles/Colors';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';
import RNFetchBlob from 'rn-fetch-blob';

interface CommonPdfViewProps {
    item: itemDetails
    mainView?: ViewStyle
    imageViewStyle?: ViewStyle
    detailsViewStyle?: ViewStyle
    docTxtStyle?: TextStyle
    titleTxtstyle?: TextStyle
    mbTxtstyle?: TextStyle,
    onPress?: () => void
    disabled?: boolean
}

interface itemDetails {
    attachment: string | undefined,
    bytes?: number | null
}

const CommonPdfView = (props: CommonPdfViewProps) => {
    const title = props.item?.attachment?.split('/').pop()
    const type = title && title.split('.')[1]
    const [size, setSize] = useState<number>(props.item.bytes ? props.item.bytes : 0)

    useEffect(() => { if (props?.item?.attachment) { actualDownload(props?.item?.attachment) } }, [])

    const actualDownload = (url: string) => {
        const { dirs } = RNFetchBlob.fs;

        const checkHttpString = url.includes("http://")
        checkHttpString && RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `test.pdf`,
                path: `${dirs.DownloadDir}/test.pdf`,
            },
        })
            .fetch('GET', url, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
                getSizefromPath(res.path())

            })
            .catch((e) => {
                console.log({ e })
            });
    }

    const getSizefromPath = (url: string) => {
        RNFetchBlob.fs.stat(url)
            .then((stats) => {
                setSize(stats.size)
            })
            .catch((err) => { console.log(err) })
    }


    const formatBytes = (bytes: number, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    return (
        <TouchableOpacity disabled={props.disabled ? props.disabled : false}
            onPress={props.onPress}
            style={[globalStyles.rowView, styles.mainDocView, props.mainView]} >
            <View style={[globalStyles.centerView, styles.docPdfViewStyle, props.imageViewStyle]}>
                <Text style={[styles.docTypeTxt, props.docTxtStyle, {}]}>{type && type?.charAt(0).toUpperCase() + type?.slice(1)}</Text>
            </View>
            <View style={[props.detailsViewStyle, { marginHorizontal: wp(1), width: wp("27%") }]}>
                <Text numberOfLines={1} style={[styles.docFileNameTxt, globalStyles.rtlStyle, props.titleTxtstyle,]}>{title}</Text>
                <Text numberOfLines={1} style={[styles.docFileSizeTxt, globalStyles.rtlStyle, props.mbTxtstyle]}>{formatBytes(size ? size : 0, 0)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CommonPdfView;

const styles = StyleSheet.create({
    mainDocView: {
        backgroundColor: colors.gray_light_color,
        marginHorizontal: wp(1),
        padding: wp(1),
        marginVertical: wp(2),
        borderRadius: wp(2),
        paddingVertical: wp(2)
    },
    docPdfViewStyle: {
        width: wp(10),
        height: wp(10),
        backgroundColor: colors.dark_blue1_color,
        borderRadius: wp(2),
        marginLeft: wp(1)
    },
    docTypeTxt: {
        fontFamily: fonts.FONT_POP_BOLD,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.white_color
    },
    docFileNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue1_color
    },
    docFileSizeTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.dark_blue2_color
    },
})