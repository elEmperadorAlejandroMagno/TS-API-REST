// import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../model/local/local'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../model/db/sqlite'
import { PartialProduct, Product } from '../types/types'

/* Al usar con local .json cambiar types a Local */

export async function getProductsList (filter: any): Promise<any> {
  return await getProducts(filter)
}

export async function getProductById (id: string): Promise<any> {
  return await getProduct(id)
}

export async function createProduct (product: Product): Promise<any> {
  return await addProduct(product)
}

export async function updateProductById (id: string, product: PartialProduct): Promise<any> {
  return await updateProduct(id, product)
}

export async function deleteProductById (id: string): Promise<boolean> {
  return await deleteProduct(id)
}
