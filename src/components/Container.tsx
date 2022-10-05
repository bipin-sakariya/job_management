import { NativeModules, StyleSheet, Text, View, ViewProps } from 'react-native';
import React from 'react';
const { StatusBarManager } = NativeModules;

const Container = ({ style, children }: ViewProps) => {
    return (
        <View style={[styles.containerStyle, style]}>
            {children}
        </View>
    )
}

export default Container

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginTop: StatusBarManager.HEIGHT + 54,
        backgroundColor: 'transparent',
    }
})