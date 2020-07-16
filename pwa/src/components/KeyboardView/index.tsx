import React from 'react'
import { Keyboard, TouchableWithoutFeedback, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
    style?: ViewStyle
}


const KeyboardView: React.FC<Props> = ({ children, style }) => (
    <SafeAreaView style={{ flex: 1, ...style }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAwareScrollView
                alwaysBounceVertical={false}
                contentContainerStyle={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </KeyboardAwareScrollView>

        </TouchableWithoutFeedback>
    </SafeAreaView>
)


export default KeyboardView

