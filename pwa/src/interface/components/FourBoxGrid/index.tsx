import React, { ReactNode } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

import styles from './styles'

interface FourBoxGridProps {
  nodes: [ReactNode, ReactNode, ReactNode, ReactNode]
  outterStyle?: StyleProp<ViewStyle>
  innerStyle?: StyleProp<ViewStyle>
}

const FourBoxGrid: React.FC<FourBoxGridProps> = ({
  nodes,
  outterStyle,
  innerStyle,
}) => {
  return (
    <View style={[styles.outterContainer, outterStyle]}>
      <View style={[styles.innerContainer, styles.topLeft, innerStyle]}>
        {nodes[0]}
      </View>

      <View style={[styles.innerContainer, styles.topRight, innerStyle]}>
        {nodes[1]}
      </View>

      <View style={[styles.innerContainer, styles.bottomLeft, innerStyle]}>
        {nodes[2]}
      </View>

      <View style={[styles.innerContainer, styles.bottomRight, innerStyle]}>
        {nodes[3]}
      </View>
    </View>
  )
}

export default FourBoxGrid
