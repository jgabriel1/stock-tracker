import { Router } from 'express'
import { authRouter } from './auth.routes'
import { transactionsRouter } from './transactions.routes'

const routes = Router()

routes.use('/auth', authRouter)
routes.use('/transactions', transactionsRouter)

export default routes
