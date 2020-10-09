import { Router } from 'express'

import { checkAuthentication } from '../middlewares/checkAuthentication'
import { TransactionsController } from '../controllers/TransactionsController'

const transactionsController = new TransactionsController()

const transactionsRouter = Router()

transactionsRouter.use(checkAuthentication)

transactionsRouter.post('/', transactionsController.create)
transactionsRouter.get('/', transactionsController.index)
transactionsRouter.patch('/:id', transactionsController.update)

export { transactionsRouter }
