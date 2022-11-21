import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
    headerMenu: {
        height: wp(8.5),
        width: wp(4),
        resizeMode: 'cover',
    },
    addPhotoStyle: {
        height: wp(24),
        width: wp(24),
        resizeMode: 'contain',
        marginVertical: wp(4),
        alignSelf: 'center'
    },
    cameraIconStyle: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain',
    },
    camreaBtnStyle: {
        alignSelf: 'center',
        position: 'absolute',
        right: wp(-3.5),
        bottom: wp(2.5)
    }
})