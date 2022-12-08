import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../styles/Colors';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';

interface CustomOneItemSelectProps {
    item: any,
    data?: any
    onSetData: Dispatch<SetStateAction<any>>
}
interface jobDataProps {
    id: number
    title: string
    selected: boolean
}
const CustomOneItemSelect = (props: CustomOneItemSelectProps & TouchableOpacityProps) => {

    const onSelectJob = (item: jobDataProps) => {
        let emptyJobList: Array<any> = []
        props.data.map((data: jobDataProps) => {
            if (data.id == item.id) {
                emptyJobList.push({
                    ...data,
                    selected: !data.selected
                })
            } else {
                emptyJobList.push({
                    ...data,
                    selected: false
                })
            }
        })
        props.onSetData(emptyJobList)
    }
    return (
        <TouchableOpacity onPress={() => { onSelectJob(props.item) }} style={[globalStyles.rowView, styles.jobListMainView]}>
            <Text style={styles.jobNameTxt}>{props.item.title}</Text>
            <View style={globalStyles.roundView} >
                <View style={[styles.roundFillView, { backgroundColor: props.item.selected ? colors.fillColor : colors.white_5, }]} />
            </View>
        </TouchableOpacity>
    )
}

export default CustomOneItemSelect

const styles = StyleSheet.create({
    jobListMainView: {
        paddingVertical: wp(3),
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),
        borderWidth: wp(0.3),
        borderRadius: wp(3),
        borderColor: colors.text_input_border_color
    },
    jobNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.black
    },
    roundFillView: {
        height: wp(5.5),
        width: wp(5.5),
        borderRadius: wp(5),
        borderColor: colors.white_5,
        borderWidth: wp(0.5),
    },
})