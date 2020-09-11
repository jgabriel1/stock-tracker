import { Router } from 'express'

const routes = Router()

routes.get('/', (request, response) => {
  return response.send('Hello World1!')
})

export default routes
