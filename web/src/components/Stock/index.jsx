import React from 'react'

const Stock = ({ ticker, nShares, priceBought, currentPrice }) => {
    const totalInvested = priceBought * nShares // For now, this is it;
    const totalVariation = (currentPrice * nShares) - totalInvested
    const relativeVariation = 100 * totalVariation / totalInvested

    return (
        <tr id={ticker} className='stock-container'>
            <td>{ticker}</td>
            <td>{nShares}</td>
            <td>{priceBought}</td>
            <td>{currentPrice}</td>
            <td>{totalInvested}</td>
            <td>{totalVariation}</td>
            <td>{`${relativeVariation.toFixed(2)}%`}</td>
        </tr>
    )
}

export default Stock
