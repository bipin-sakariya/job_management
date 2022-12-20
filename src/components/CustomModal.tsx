import React from 'react';
import { Modal, ModalProps, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CustomModalProps {
    onClose?: () => void
    children?: React.ReactNode
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

export default CustomModal;