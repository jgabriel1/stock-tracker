import React from 'react'
import { Platform } from 'react-native'
import { VictoryPie as WebVictoryPie } from 'victory'
import { VictoryPie as NativeVictoryPie } from 'victory-native'

export default class PlatformAwareVictoryPie extends WebVictoryPie {
    render() {
        return Platform.OS === 'web'
            ? <WebVictoryPie {...this.props} />
            : <NativeVictoryPie {...this.props} />
    }
}

