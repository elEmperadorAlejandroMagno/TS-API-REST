type ProductType = 'sauce' | 'merchandising'
type ImagesType = string[]

export interface Product {
  id: string
  title: string
  price: number
  description: ? string
  available: boolean
  images: ImagesType
  type: ProductType
}

export type PartialProduct = Partial<Product>

export type NewProduct = Omit<Product, 'id'>
