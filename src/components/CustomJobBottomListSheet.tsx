import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import useCustomNavigation from "../hooks/useCustomNavigation";
import { strings } from "../languages/localizedStrings";
import { JobDetailsData } from "../redux/slices/AdminSlice/jobListSlice";
import { colors } from "../styles/Colors";
import fonts from "../styles/Fonts";
import FontSizes from "../styles/FontSizes";
import { globalStyles } from "../styles/globalStyles";
import { ImagesPath } from "../utils/ImagePaths";
import CustomJobListComponent from "./CustomJobListComponent";

interface ListDataProps {
    title: string,
    description: string,
    km: string,
    date: string,
    button: string
}

interface CustomJobBottomListSheetProps {
    data: JobDetailsData[],
    onClose: () => void
}

const CustomJobBottomListSheet = React.forwardRef((props: CustomJobBottomListSheetProps & RBSheetProps, ref: any) => {
    const navigation = useCustomNavigation('MapScreen');

    const renderItem = ({ item }: { item: JobDetailsData }) => {
        return (
            <CustomJobListComponent item={item} />
        )
    }

    return (
        <RBSheet
            ref={ref}
            onClose={props.onClose}
            closeOnDragDown={true}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={hp("50%")}
            customStyles={{
                container: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25
                },
                wrapper: {
                    backgroundColor: colors.transparent,
                },
                draggableIcon: {
                    backgroundColor: colors.gray_7
                }
            }}>
            <>
                <View style={styles.sheetHeaderView}>
                    <View style={styles.jobIconView}>
                        <Image source={ImagesPath.suitcase_icon} style={styles.jobIcon} />
                        <Text style={[styles.jobsText, globalStyles.rtlStyle]}>{strings.Jobs}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        ref.current.close()
                        navigation.navigate("RouteScreen")
                    }} style={styles.routeBut}>
                        <Image source={ImagesPath.route_icon} style={styles.routeIcon} />
                        <Text style={[styles.routeTxt, globalStyles.rtlStyle]}>{strings.Route}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={props.data}
                    style={{ marginTop: wp(2) }}
                    contentContainerStyle={{ marginHorizontal: wp(0.5) }}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false} />
            </>
        </RBSheet>
    )
})

export default CustomJobBottomListSheet;

const styles = StyleSheet.create({
    sheetHeaderView: {
        height: wp(10),
        marginHorizontal: wp(3),
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row",
    },
    jobIconView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: wp(35),
    },
    jobIcon: {
        height: wp(6),
        width: wp(6),
        resizeMode: "contain"
    },
    jobsText: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue1_color
    },
    routeBut: {
        height: wp(10),
        borderRadius: wp(1),
        backgroundColor: colors.primary_color,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    routeIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain",
        marginLeft: wp(3),
    },
    routeTxt: {
        color: colors.white,
        fontFamily: fonts.FONT_POP_BOLD,
        fontSize: FontSizes.SMALL_14,
        marginHorizontal: wp(3)
    },
})