import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';

const DrawerScreen = ({ navigation, descriptors, state }: DrawerContentComponentProps) => {
    return (
        <View style={globalStyles.container}>
            <View style={styles.topView} >
                <Image source={ImagesPath.user_placeholder_img} style={styles.userPlaceholderStyle}/>
            </View>
            <Text style={styles.userNameTxt}>fjkdhfdhf</Text>
        </View>
    )
}

export default DrawerScreen;
