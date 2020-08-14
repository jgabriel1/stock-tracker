import React from 'react'
import { Text, View, ViewStyle } from 'react-native'

interface Props {
    average_bought_price: number
    currently_owned_shares: number
    regularMarketPrice: number
    viewStyle: ViewStyle
}

const DependentView = ({ regularMarketPrice, average_bought_price, currently_owned_shares, viewStyle }: Props) => {
    const potentialProfit = (regularMarketPrice - average_bought_price) * currently_owned_shares
    const profitColor = potentialProfit > 0 ? '#0a0' : '#d00'

    return (
        <>
            <View style={viewStyle}>
                <Text>{regularMarketPrice.toFixed(2)}</Text>
            </View>
            <View style={viewStyle}>
                <Text style={{ color: profitColor }}>{potentialProfit.toFixed(2)}</Text>
            </View>
        </>
    )
}

export default DependentView
