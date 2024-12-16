import express from 'express'
import productsRouter from './router/products'
import { corsMiddleware } from './services/cors'

const app = express()
app.use(corsMiddleware())

app.use(express.json())

const PORT = 1234

app.get('/', (_req, res) => {
  res.redirect('/products')
})

app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server funcionando en el puerto ${PORT}`)
})
