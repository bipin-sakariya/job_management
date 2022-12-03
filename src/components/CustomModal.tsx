import { Modal, ModalProps, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { BlurView } from '@react-native-community/blur'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

interface CustomModalProps {
    onClose?: () => void
    children?: any
}


const CustomModal = (props: CustomModalProps & ModalProps) => {
    return (
        <Modal {...props} statusBarTranslucent={true} transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={props.onClose} style={{}}>
                <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1, width: wp(100) }}>
                    <BlurView
                        blurType={"dark"}
                        style={globalStyles.modalView}
                    />
                    <View style={{}}>
                        {props.children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({
    blureView: {
        flex: 1,
        alignSelf: Platform.OS == "ios" ? 'auto' : 'stretch',
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    mainView: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1

    }

})