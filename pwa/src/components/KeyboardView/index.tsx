import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const KeyboardView: React.FC = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {children}
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
)


export default KeyboardView

