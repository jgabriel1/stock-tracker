import React, { useCallback, useEffect, useState } from 'react'

import Input from '../../../../components/Input'
import { useNewTransaction } from '../../../../hooks/newTransaction'
import {
  getSearchQuery,
  YahooSearchAnswer,
} from '../../../../services/yahooFinance/stockSearch'

import useDebounce from '../../../../utils/hooks/useDebounce'

import {
  ChosenStockFullName,
  ChosenStockInfoContainer,
  ChosenStockTicker,
  Container,
  ItemContainer,
  ItemFullName,
  ItemInfoContainer,
  ItemInfoLabel,
  ItemInfoValue,
  ItemNameContainer,
  ItemTicker,
} from './styles'

interface TransactionStockInfo {
  ticker: string
  fullName: string
}

const ChooseStock: React.FC = () => {
  const { transactionStock, setTransactionStock } = useNewTransaction()

  const [answerList, setAnswerList] = useState<YahooSearchAnswer[]>([])
  const [chosenStock, setChosenStock] = useState<TransactionStockInfo | null>(
    () => {
      if (transactionStock.ticker) {
        return transactionStock
      }

      return null
    },
  )

  const debouncedQuery = useDebounce(
    async (text: string) => {
      if (text.length > 1) {
        const answers = await getSearchQuery(text)
        setAnswerList(answers)
      } else {
        setAnswerList([])
      }
    },
    [],
    500,
  )

  const handleSelectStock = useCallback((stock: TransactionStockInfo) => {
    setChosenStock(stock)
  }, [])

  useEffect(() => {
    if (chosenStock) {
      setTransactionStock(chosenStock)
      setAnswerList([])
    }
  }, [chosenStock, setTransactionStock])

  if (chosenStock) {
    return (
      <ChosenStockInfoContainer>
        <ChosenStockTicker>{chosenStock.ticker}</ChosenStockTicker>
        <ChosenStockFullName>{chosenStock.fullName}</ChosenStockFullName>
      </ChosenStockInfoContainer>
    )
  }

  return (
    <Container>
      <Input
        autoCapitalize="none"
        placeholder="Buscar ação..."
        onChangeText={debouncedQuery}
      />

      {answerList.map(answer => (
        <ItemContainer
          key={answer.symbol}
          onPress={() =>
            handleSelectStock({
              ticker: answer.symbol,
              fullName: answer.longname || answer.symbol,
            })
          }
        >
          <ItemNameContainer>
            <ItemFullName>{answer.longname || answer.symbol}</ItemFullName>
            <ItemTicker>{answer.symbol}</ItemTicker>
          </ItemNameContainer>

          <ItemInfoContainer>
            <ItemInfoLabel>Bolsa:</ItemInfoLabel>
            <ItemInfoValue>{answer.exchange}</ItemInfoValue>
          </ItemInfoContainer>

          <ItemInfoContainer>
            <ItemInfoLabel>Disponibilidade:</ItemInfoLabel>
            <ItemInfoValue>{answer.typeDisp}</ItemInfoValue>
          </ItemInfoContainer>
        </ItemContainer>
      ))}
    </Container>
  )
}

export default ChooseStock
