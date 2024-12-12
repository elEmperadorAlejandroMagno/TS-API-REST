import { Product, NewProduct, PartialProduct } from "../types/types"
import PRODUCTS from '../db/products.json'
import { validateProduct } from "../utils/validateProduct"

const products: Product[] = PRODUCTS as Product[]

export const getProducts = (type: any): Product[] => {
  if (type) {
    const filteredProducts = products.filter( e => e.type === type)
    if (!filteredProducts) {
      throw new Error("El filtro de producto no existe");   
    }
    return filteredProducts
  }
  return products
}

export const createProduct = (input: Product): Product => {
  const newProduct = validateProduct(input)
  return newProduct
}