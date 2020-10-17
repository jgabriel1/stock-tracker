import React, { useEffect, useState, useMemo } from 'react'
import { api } from '../../../../services/api'
import formatDate from '../../../../utils/formatDate'
import formatToReal from '../../../../utils/formatToReal'

import { Container, Title, Item, ItemValue, ColoredText } from './styles'

/*
  TODO: For now it will be rendered as a regular map. In the future it may need
  to become a FlatList. The only reason it isn't is because the parent container
  will be a ScrollView already.
*/

interface TransactionListProps {
  ticker: string
}

interface TransactionResponse {
  ticker: string
  timestamp: number
  quantity: number
  total_value: number
}

export interface Transaction extends TransactionResponse {
  isEntry: boolean
  formattedPrice: string
  type: string
  date: string
}

const TransactionList: React.FC<TransactionListProps> = ({ ticker }) => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([])

  const parsedTransactions = useMemo(() => {
    return transactions.map(transaction => {
      const isEntry = transaction.total_value > 0

      const formattedPrice = `${isEntry ? '+' : '-'} ${formatToReal(
        transaction.total_value,
      )}`

      return {
        ...transaction,
        isEntry,
        formattedPrice,
        type: isEntry ? 'Entrada' : 'Saída',
        date: formatDate(transaction.timestamp * 1000),
      }
    })
  }, [transactions])

  useEffect(() => {
    const params = {
      ticker,
    }

    api.get('transactions', { params }).then(response => {
      setTransactions(response.data.transactions)
    })
  }, [ticker])

  return (
    <Container>
      <Title>Histórico</Title>

      {parsedTransactions.map(transaction => (
        <Item key={transaction.timestamp}>
          <ItemValue>{transaction.type}</ItemValue>
          <ItemValue>
            <ColoredText isPositive={transaction.isEntry}>
              {transaction.formattedPrice}
            </ColoredText>
          </ItemValue>
          <ItemValue>{transaction.date}</ItemValue>
        </Item>
      ))}
    </Container>
  )
}

export default TransactionList
