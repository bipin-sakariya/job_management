import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet } from 'react-native';
import { colors } from '../styles/Colors';

const CustomActivityIndicator = (indicatorProps: ActivityIndicatorProps) => {
    return (
        <ActivityIndicator
            {...indicatorProps}
            color={colors.white_color}
            style={styles.indicatorStyle}
        />
    )
}

export default CustomActivityIndicator;

const styles = StyleSheet.create({
    indicatorStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999999999999999,
        backgroundColor: colors.transparent_black,
    }
})