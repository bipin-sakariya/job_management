import { NativeModules, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const { StatusBarManager } = NativeModules;

interface headerProps {
    containerStyle?: ViewStyle;
    headerLeftComponent?: any;
    headerCenterComponent?: any;
    headerRightComponent?: any;
    headerRightStyle?: ViewStyle;
    headerCenterStyle?: ViewStyle;
    headerLeftStyle?: ViewStyle;
}

const Header = ({ containerStyle, headerLeftComponent, headerCenterComponent, headerRightComponent, headerRightStyle, headerCenterStyle, headerLeftStyle }: headerProps) => {

    return (
        <View style={[styles.header, containerStyle]}>
            <View style={{ height: StatusBarManager.HEIGHT }} />
            <View style={styles.headerBox}>
                <View style={[styles.headerLeft, headerLeftStyle]}>
                    {headerLeftComponent}
                </View>
                <View style={[styles.headerCenter, headerCenterStyle]}>
                    {headerCenterComponent}
                </View>
                <View style={[styles.headerRight, headerRightStyle]}>
                    {headerRightComponent}
                </View>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        position: "absolute",
        top: 0,
        zIndex: 99999,
        justifyContent: "space-between",
    },
    headerBox: {
        width: wp(100),
        height: 54,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'red'
    },
    headerCenter: {
        width: "50%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLeft: {
        position: 'absolute',
        left: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "20%",
        height: "100%",
        paddingLeft: wp(4),
    },
    headerRight: {
        position: 'absolute',
        right: 0,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "20%",
        height: "100%",
        paddingRight: wp(4),
    }
})