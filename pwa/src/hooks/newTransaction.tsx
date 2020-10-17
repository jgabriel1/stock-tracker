import React, {
  createContext,
  useContext,
  useReducer,
  Reducer,
  useCallback,
} from 'react'

import { api } from '../services/api'

interface TransactionStock {
  ticker: string
  fullName: string
}

type TransactionReducer = Reducer<
  {
    type: 'income' | 'outcome'
    stock: TransactionStock
  },
  | { type: 'SET_TYPE'; payload: 'income' | 'outcome' }
  | { type: 'SET_STOCK'; payload: TransactionStock }
  | { type: 'RESET' }
>

interface CreateTransactionForm {
  quantity: number
  totalValue: number
}

interface NewTransactionContextData {
  setTransactionType(transactionType: 'income' | 'outcome'): void
  setTransactionStock({ ticker, fullName }: TransactionStock): void
  submitCreateTransaction(data: CreateTransactionForm): Promise<void>
}

const NewTransactionContext = createContext<NewTransactionContextData>(
  {} as NewTransactionContextData,
)

export const NewTransactionProvider: React.FC = ({ children }) => {
  const [transaction, setTransaction] = useReducer<TransactionReducer>(
    (state, action) => {
      switch (action.type) {
        case 'SET_TYPE':
          return { ...state, type: action.payload }
        case 'SET_STOCK':
          return { ...state, stock: action.payload }
        case 'RESET':
          return { type: 'income', stock: { ticker: '', fullName: '' } }
        default:
          return state
      }
    },
    { type: 'income', stock: { ticker: '', fullName: '' } },
  )

  const setTransactionType = useCallback(
    (transactionType: 'income' | 'outcome') => {
      setTransaction({
        type: 'SET_TYPE',
        payload: transactionType,
      })
    },
    [],
  )

  const setTransactionStock = useCallback(
    ({ ticker, fullName }: TransactionStock) => {
      setTransaction({
        type: 'SET_STOCK',
        payload: { ticker, fullName },
      })
    },
    [],
  )

  const submitCreateTransaction = useCallback(
    async ({ quantity, totalValue }: CreateTransactionForm) => {
      const multiplier = transaction.type === 'outcome' ? -1 : 1

      await api.post('transactions', {
        ticker: transaction.stock.ticker,
        quantity: multiplier * quantity,
        total_value: multiplier * totalValue,
      })
    },
    [transaction],
  )
  /*
    TODO:
    - in regards to the create transaction form, the function will recieve the
    form data part of the data to be sent:
    createTransaction({
      quantity: 10,
      unitPrice: 100.00,
    })

    - the ticker and income | outcome type information will be saved in this
    component as state;
  */
  return (
    <NewTransactionContext.Provider
      value={{
        setTransactionType,
        setTransactionStock,
        submitCreateTransaction,
      }}
    >
      {children}
    </NewTransactionContext.Provider>
  )
}

export function useNewTransaction(): NewTransactionContextData {
  const context = useContext(NewTransactionContext)

  return context
}