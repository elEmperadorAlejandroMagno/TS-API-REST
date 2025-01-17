type ProductType = 'sauce' | 'merchandising'
type ImagesType = string

/* Con base de datos */

export interface Product {
  product_info: ProductInfo
  images: ProductImage[]
}

export interface ProductInfo {
  id: string
  title: string
  price: number
  description: ? string
  is_available: integer
  type: ProductType
}

export interface ProductImage {
  product_id: string
  image: ImagesType
}

export type PartialProduct = Partial<Product>

export type NewProduct = Omit<Product, 'id'>

/* Usando archivo .json */

export interface ProductLocal {
  id: string
  title: string
  price: number
  description: ? string
  is_available: integer
  type: ProductType
  images: string[]
}

export type PartialProductLocal = Partial<ProductLocal>

export type NewProductLocal = Omit<ProductLocal, 'id'>
