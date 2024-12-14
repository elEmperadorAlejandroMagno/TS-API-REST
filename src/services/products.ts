import { Product, NewProduct, PartialProduct } from '../types/types'
import PRODUCTS from '../db/products.json'
import { validatePartialProduct, validateProduct } from '../utils/validateProduct'
import { randomUUID } from 'crypto'

const products: Product[] = PRODUCTS as Product[]

export const getProducts = (type: any, available: any, limit: any): Product[] => {
  let filteredProducts = products

  if (type !== undefined) {
    filteredProducts = products.filter(e => e.type === type)
  }

  if (available !== undefined) {
    filteredProducts = filteredProducts.filter(e => e.available === available)
  }

  return filteredProducts.slice(0, limit)
}

export const getProductById = (id: string): Product => {
  const product = products.find(e => e.id === id)
  if (product === undefined) {
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
  products.push(newProduct)
  return newProduct
}

export const updateProduct = (input: PartialProduct, id: string): PartialProduct => {
  const validatedProduct = validatePartialProduct(input)
  const productIndex = products.findIndex(e => e.id === id)
  if (productIndex === -1) {
    throw new Error('Producto no encontrado')
  }
  products[productIndex] = {
    ...products[productIndex],
    ...validatedProduct
  }
  return products[productIndex]
}

export const deleteProduct = (id: string): boolean => {
  const productToDelete = products.findIndex(e => e.id === id)
  if (productToDelete === -1) return false
  products.splice(productToDelete, 1)
  return true
}
