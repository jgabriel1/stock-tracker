import React from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { Portal, Provider, Modal as PaperModal } from 'react-native-paper'

interface Props {
    visible: boolean
    onDismiss: () => void
    contentContainerStyle?: StyleProp<ViewStyle>
}


const Modal: React.FC<Props> = ({ children, visible, onDismiss, contentContainerStyle }) => (
    <Portal>
        <PaperModal {...{ visible, onDismiss, contentContainerStyle }}>
            {children}
        </PaperModal>
    </Portal>
)


export default Modal
