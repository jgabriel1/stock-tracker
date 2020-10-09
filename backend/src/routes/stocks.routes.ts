import { Router } from 'express'

import { checkAuthentication } from '../middlewares/checkAuthentication'
import { StocksController } from '../controllers/StocksController'

const stocksController = new StocksController()

const stocksRouter = Router()

stocksRouter.use(checkAuthentication)

stocksRouter.get('/', stocksController.index)

export { stocksRouter }
