type ProductState = 'enable' | 'disable'
type ProductType = 'sauce' | 'merchant'

export interface Product {
  id: string
  title: string
  price: number
  description:? string
  state: ProductState
  image: string
  type: ProductType
}

export type PartialProduct = Partial<Product>

export type NewProduct = Omit<Product, 'id'>

