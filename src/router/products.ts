import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../services/products'
const router = express.Router()

router.get('/', (req, res) => {
  const { type, available, limit } = req.query
  const listProduct = getProducts(type, available, limit)
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const deletedProduct = deleteProduct(id)
  res.send(deletedProduct)
})

export default router
