type ProductType = 'sauce' | 'merchandising'

export interface Product {
  id: string
  title: string
  price: number
  description: ? string
  available: boolean
  image: string
  type: ProductType
}

export type PartialProduct = Partial<Product>

export type NewProduct = Omit<Product, 'id'>
