import express from 'express'
import { getProducts } from '../services/products'
const router = express.Router()

router.get('/', (req, res) => {
  const { type } = req.query
  const listProduct = getProducts(type)
  res.send(listProduct)
})
router.get('/:id')
router.post('/')
router.put('/:id')
router.delete('/:id')

export default router