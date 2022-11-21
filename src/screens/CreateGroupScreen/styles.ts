import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    addPhotoStyle: {
        height: wp(24),
        width: wp(24),
        resizeMode: 'contain',
        marginVertical: wp(4),
        alignSelf: 'center'
    },
    camreaBtnStyle: {
        alignSelf: 'center',
        position: 'absolute',
        right: wp(-3.5),
        bottom: wp(2.5)
    },
    cameraIconStyle: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain',
    },
})