import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../model/db/sqlite'
import { Product } from '../types/types'

export async function getProductsList (filter: any): Promise<Product[]> {
  return await getProducts(filter)
}

export async function getProductById (id: string): Promise<Product> {
  return await getProduct(id)
}

export async function createProduct (product: Product): Promise<boolean | Product> {
  return await addProduct(product)
}

export async function updateProductById (id: string, product: Product): Promise<Product | boolean> {
  return await updateProduct(id, product)
}

export async function deleteProductById (id: string): Promise<boolean> {
  return await deleteProduct(id)
}
