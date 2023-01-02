import React from 'react';
import { NativeModules, StyleSheet, View, ViewProps } from 'react-native';
import { colors } from '../styles/Colors';
const { StatusBarManager } = NativeModules;

const Container = ({ style, children }: ViewProps) => {
    return (
        <View style={[styles.containerStyle, style]}>
            {children}
        </View>
    )
}

export default Container;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginTop: StatusBarManager.HEIGHT + 54,
        backgroundColor: colors.transparent,
    }
})