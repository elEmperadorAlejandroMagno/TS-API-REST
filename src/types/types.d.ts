type ProductType = 'sauce' | 'merchandising'
type ImagesType = string

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
