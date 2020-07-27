import React from 'react'
import { StyleSheet } from 'react-native'
import { ViewStyle, StyleProp } from 'react-native'
import { Portal, Provider as ModalProvider, Modal as PaperModal } from 'react-native-paper'

interface Props {
    visible: boolean
    onDismiss: () => void
    contentContainerStyle?: StyleProp<ViewStyle>
}


const Modal: React.FC<Props> = ({ children, visible, onDismiss }) => (
    <Portal>
        <PaperModal
            visible={visible}
            onDismiss={onDismiss}
            contentContainerStyle={styles.modalContainer}
        >
            {children}
        </PaperModal>
    </Portal>
)

export { ModalProvider }
export default Modal

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

