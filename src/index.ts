import express from 'express'
import productsRouter from './router/products'
import { corsMiddleware } from './services/cors'
import path from 'path'

const app = express()

app.use(corsMiddleware())
app.use(express.json())
app.use('/images', express.static(path.resolve('public/images')))

const PORT = 1234

app.get('/', (_req, res) => {
  res.redirect('/products')
})

app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server funcionando en el puerto ${PORT}`)
})
