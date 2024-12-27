import express from 'express'
import productsRouter from './router/products'
import { corsMiddleware } from './services/cors'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(corsMiddleware())
app.use(express.json())
app.use('/images', express.static(path.resolve('public/images')))

const PORT = (process.env.PORT !== null && process.env.PORT !== undefined) ? process.env.PORT : 1234

app.get('/', (_req, res) => {
  res.redirect('/products')
})

app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server funcionando en el puerto ${PORT}`)
})
