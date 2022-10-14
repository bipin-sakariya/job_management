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
        <Modal {...props} transparent animationType="fade" >
            <BlurView
                blurType={"dark"}
                style={{
                    flex: 1,
                    alignSelf: Platform.OS == "ios" ? 'auto' : 'stretch',
                    backgroundColor: 'transparent',
                }}
            >
                <View style={globalStyles.modalView}>
                    {props.children}
                </View>
            </BlurView>
        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({})