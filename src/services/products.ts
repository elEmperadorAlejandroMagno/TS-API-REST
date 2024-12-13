import { Product, NewProduct, PartialProduct } from '../types/types'
import PRODUCTS from '../db/products.json'
import { validateProduct } from '../utils/validateProduct'
import { randomUUID } from 'crypto'

const products: Product[] = PRODUCTS as Product[]

export const getProducts = (type: any): Product[] => {
  if (type !== undefined) {
    const filteredProducts = products.filter(e => e.type === type)
    return filteredProducts
  }
  return products
}

export const getProductById = (id: string): Product => {
  const product = products.find(e => e.id === id)
  if (product == null) {
    throw new Error(`Producto con id ${id} no encontrado`)
  }
  return product
}

export const createProduct = (input: NewProduct): Product => {
  const validatedProduct = validateProduct(input)
  const newProduct = {
    id: randomUUID(),
    ...validatedProduct
  }
  return newProduct
}

export const updateProduct = (input: PartialProduct, id: string): PartialProduct => {
  const validatedProduct = validateProduct(input)
  const product = products.find(e => e.id === id)
  if (product == null) {
    throw new Error('El producto no fue encontrado')
  }
  const updatedProduct = {
    ...product,
    ...validatedProduct
  }
  products.push(updatedProduct)
  return updatedProduct
}

export const deleteProduct = (id: string): boolean => {
  const productToDelete = products.find(e => e.id === id)
  if (productToDelete == null) {
    return false
  }
  return true
}
