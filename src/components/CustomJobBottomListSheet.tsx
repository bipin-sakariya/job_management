import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../styles/Colors";
import fonts from "../styles/Fonts";
import FontSizes from "../styles/FontSizes";
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
    data: ListDataProps[],
}

const CustomJobBottomListSheet = React.forwardRef((props: CustomJobBottomListSheetProps & RBSheetProps, ref: any) => {

    const navigation: NavigationProp<any, any> = useNavigation()
    const renderItem = ({ item, index }: any) => {
        return (
            <CustomJobListComponent item={item} />
        )
    }

    return (
        <RBSheet
            ref={ref}
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
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: "#9E9E9E"
                }
            }}>
            <>
                <View style={styles.sheetHeaderView}>
                    <View style={styles.jobIconView}>
                        <Image source={ImagesPath.suitcase_icon} style={styles.jobIcon} />
                        <Text style={styles.jobsText}>Jobs</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        ref.current.close()
                        navigation.navigate("RouteScreen")
                    }} style={styles.routeBut}>
                        <Image source={ImagesPath.route_icon} style={styles.routeIcon} />
                        <Text style={styles.routeTxt}>Route</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={props.data}
                    style={{ marginTop: wp(2) }}
                    contentContainerStyle={{ marginHorizontal: wp(0.5) }}
                    renderItem={renderItem} />
            </>
        </RBSheet>
    )
})

export default CustomJobBottomListSheet

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
        width: wp(20),
    },
    jobIcon: {
        height: wp(6),
        width: wp(6),
        resizeMode: "contain"
    },
    jobsText: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: "#666666"
    },
    routeBut: {
        height: wp(10),
        borderRadius: wp(1),
        backgroundColor: colors.black,
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