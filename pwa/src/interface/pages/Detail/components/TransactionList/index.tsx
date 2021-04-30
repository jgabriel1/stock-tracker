import React, { useEffect, useState, useMemo } from 'react'

import useAPI from '../../../../services/api'

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
  value: number
  quantity: number
  type: 'income' | 'outcome'
  createdAt: string
  extraCosts?: number
}

export interface Transaction extends TransactionResponse {
  isEntry: boolean
  formattedPrice: string
  date: string
}

const TransactionList: React.FC<TransactionListProps> = ({ ticker }) => {
  const { getTransactions } = useAPI()

  const [transactions, setTransactions] = useState<TransactionResponse[]>([])

  const parsedTransactions = useMemo(() => {
    return transactions.map(transaction => {
      const isEntry = transaction.type === 'income'

      const formattedPrice = `${formatToReal(transaction.value)}`

      const date = formatDate(new Date(transaction.createdAt))

      return {
        ...transaction,
        isEntry,
        formattedPrice,
        date,
        type: isEntry ? 'Entrada' : 'Saída',
      }
    })
  }, [transactions])

  useEffect(() => {
    getTransactions(ticker).then(setTransactions)
  }, [getTransactions, ticker])

  return (
    <Container>
      <Title>Histórico</Title>

      {parsedTransactions.map(transaction => (
        <Item key={transaction.createdAt}>
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
