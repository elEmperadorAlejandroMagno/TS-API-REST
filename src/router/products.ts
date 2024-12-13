import express from 'express'
import { createProduct, getProductById, getProducts, updateProduct } from '../services/products'
const router = express.Router()

router.get('/', (req, res) => {
  const { type } = req.query
  const listProduct = getProducts(type)
  res.send(listProduct)
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  const product = getProductById(id)
  res.send(product)
})
router.post('/', (req, res) => {
  const input = req.body
  const productCreated = createProduct(input)
  res.send(productCreated)
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const input = req.body
  const updatedProduct = updateProduct(input, id)
  res.send(updatedProduct)
})
router.delete('/:id')

export default router
