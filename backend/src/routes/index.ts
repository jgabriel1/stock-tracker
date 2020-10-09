import { Router } from 'express'

import { authRouter } from './auth.routes'
import { stocksRouter } from './stocks.routes'
import { transactionsRouter } from './transactions.routes'

const routes = Router()

routes.use('/auth', authRouter)
routes.use('/transactions', transactionsRouter)
routes.use('/stocks', stocksRouter)

export default routes
