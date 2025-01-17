import { ProductLocal, PartialProductLocal, NewProductLocal } from '../../types/types'
import PRODUCTS from '../local/products.json'
import { validatePartialProduct, validateProduct } from '../../utils/validateProduct'
import { randomUUID } from 'crypto'

const products: ProductLocal[] = PRODUCTS as ProductLocal[]

export const getProducts = async (filter: any): Promise<ProductLocal[]> => {
  let filteredProducts = products

  if (filter !== undefined) {
    filteredProducts = products.filter(e => e.type === filter)
  }

  return await new Promise((resolve, _reject) => {
    resolve(filteredProducts)
  })
}

export const getProduct = async (id: string): Promise<ProductLocal> => {
  const product = products.find(e => e.id === id)
  if (product === undefined) {
    throw new Error(`Producto con id ${id} no encontrado`)
  }
  return await new Promise((resolve, _reject) => {
    resolve(product)
  })
}

export const addProduct = async (input: NewProductLocal): Promise<ProductLocal> => {
  const validatedProduct = validateProduct(input)
  const newProduct = {
    id: randomUUID(),
    ...validatedProduct
  }
  products.push(newProduct)
  return await new Promise((resolve, _reject) => {
    resolve(newProduct)
  })
}

export const updateProduct = async (id: string, input: PartialProductLocal): Promise<ProductLocal> => {
  const validatedProduct = validatePartialProduct(input)
  const productIndex = products.findIndex(e => e.id === id)
  if (productIndex === -1) {
    throw new Error('Producto no encontrado')
  }
  products[productIndex] = {
    ...products[productIndex],
    ...validatedProduct
  }
  return await new Promise((resolve, _reject) => {
    resolve(products[productIndex])
  })
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  const productToDelete = products.findIndex(e => e.id === id)
  if (productToDelete === -1) {
    return await new Promise((resolve, _reject) => {
      resolve(false)
    })
  }
  products.splice(productToDelete, 1)
  return await new Promise((resolve, _reject) => {
    resolve(true)
  })
}
