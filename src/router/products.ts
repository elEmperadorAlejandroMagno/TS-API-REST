import express from 'express'
import { getProductsList, getProductById, createProduct, updateProductById, deleteProductById } from '../services/products'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { type } = req.query
    const listProduct = await getProductsList(type)
    res.send(listProduct)
  } catch (err) {
    res.status(500).send({ error: 'Error fetching products' })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const product = await getProductById(id)
    if (product == null) res.status(404).send('Product not found')
    res.send(product)
  } catch (err) {
    res.status(500).send({ error: 'Error fetching product' })
  }
})
router.post('/', async (req, res) => {
  try {
    const input = req.body
    const createdProduct = await createProduct(input)
    res.send({ createdProduct })
  } catch (err) {
    res.status(500).send({ error: 'Error creating product' })
  }
})
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const input = req.body
    const updatedProduct = await updateProductById(id, input)
    res.send({ updatedProduct })
  } catch (err) {
    res.status(500).send({ error: 'Error updating product' })
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await deleteProductById(id)
    res.send({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).send({ error: 'Error deleting product' })
  }
})

export default router
