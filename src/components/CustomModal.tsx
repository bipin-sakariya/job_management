import { Modal, ModalProps, Platform, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { BlurView } from '@react-native-community/blur'
import { globalStyles } from '../styles/globalStyles'

interface CustomModalProps {
    // onClose?: () => void
    children?: any
}


const CustomModal = (props: CustomModalProps & ModalProps) => {
    return (
        <Modal {...props} statusBarTranslucent={true} transparent={true} animationType="fade" >
            <BlurView
                blurType={"dark"}
                style={globalStyles.modalView}
            />
            <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
                {props.children}
            </View>
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