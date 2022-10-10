
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    appLogo: {
        height: wp(18),
        width: wp(60),
        resizeMode: 'contain'
    }
})