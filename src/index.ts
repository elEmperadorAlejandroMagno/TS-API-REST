import express from 'express'
import productsRouter from './router/products'
import { corsMiddleware } from './services/cors'
import path from 'path'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config()

const app = express()

app.use(corsMiddleware())
app.use(express.json())
app.use('/images', express.static(path.resolve('public/images')))

const storage = multer.diskStorage({
  destination: (_req: express.Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '../public/images/products'))
  },
  filename: (_req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage })

const PORT = (process.env.PORT !== null && process.env.PORT !== undefined) ? process.env.PORT : 1234

app.get('/', (_req, res) => {
  res.redirect('/products')
})
app.post('/upload', upload.array('images', 10), (req, res) => {
  try {
    const files = req.files as Express.Multer.File[]
    if (files == null) {
      throw new Error('No files found')
    }
    const filePaths = files.map(file => `images/products/${file.filename}`)
    res.status(200).json({ message: 'images uploaded', files: filePaths })
  } catch (error) {
    res.status(400).json({ message: 'Error al cargar las imagenes', error })
  }
})

app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server funcionando en el puerto ${PORT}`)
})
