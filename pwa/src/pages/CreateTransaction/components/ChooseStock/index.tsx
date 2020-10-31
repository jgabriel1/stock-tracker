import React, { useCallback, useEffect, useState } from 'react'

import { useNewTransaction } from '../../../../hooks/newTransaction'
import useResponseListAnimation from './useResponseListAnimation'
import useDebounce from '../../../../utils/hooks/useDebounce'
import useExternalData from '../../../../services/externalData'

import Input from '../../../../components/Input'

import {
  ChosenStockFullName,
  ChosenStockInfoContainer,
  ChosenStockTicker,
  Container,
  InputContainer,
  ResponseItemListContainer,
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

interface StockSearchAnswer {
  exchange: string
  symbol: string
  longname?: string
  typeDisp?: string
}

const ChooseStock: React.FC = () => {
  const { getSearch } = useExternalData()

  const { transactionStock, setTransactionStock } = useNewTransaction()

  const [answerList, setAnswerList] = useState<StockSearchAnswer[]>([])
  const [chosenStock, setChosenStock] = useState<TransactionStockInfo | null>(
    () => {
      if (transactionStock.ticker) {
        return transactionStock
      }

      return null
    },
  )

  const {
    fireResponseListDropAnimation,
    responseListMarginAnimationStyle,
  } = useResponseListAnimation()

  const debouncedQuery = useDebounce(
    async (text: string) => {
      if (text.length > 1) {
        const answers = await getSearch(text)
        setAnswerList(answers)
        fireResponseListDropAnimation('OPEN')
      } else {
        fireResponseListDropAnimation('CLOSE')
        setAnswerList([])
      }
    },
    [fireResponseListDropAnimation],
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
      <InputContainer>
        <Input
          autoCapitalize="none"
          placeholder="Buscar ação..."
          onChangeText={debouncedQuery}
          style={{ marginBottom: 16, backgroundColor: '#ededed' }}
        />
      </InputContainer>

      <ResponseItemListContainer style={responseListMarginAnimationStyle}>
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
      </ResponseItemListContainer>
    </Container>
  )
}

export default ChooseStock
