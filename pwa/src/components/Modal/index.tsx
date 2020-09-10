import React from 'react'
import { ViewStyle, StyleProp } from 'react-native'

import {
  Portal,
  Provider as ModalProvider,
  Modal as PaperModal,
} from 'react-native-paper'

import styles from './styles'

interface ModalProps {
  visible: boolean
  onDismiss: () => void
  contentContainerStyle?: StyleProp<ViewStyle>
}

const Modal: React.FC<ModalProps> = ({ children, visible, onDismiss }) => (
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
