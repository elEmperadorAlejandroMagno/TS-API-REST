import { z } from 'zod'
// import { NewProduct, PartialProduct } from '../types/types'

const productSchema = z.object({
  title: z.string({
    required_error: 'Title is required for creating a new product',
    invalid_type_error: 'The title must be a string/text'
  }),
  price: z.number({
    required_error: 'Price is requiered for creating a new product',
    invalid_type_error: 'Price must be a number'
  }),
  description: z.string({
    invalid_type_error: 'Description must be a text'
  }),
  available: z.boolean(),
  image: z.string(),
  type: z.enum(['sauce', 'merchandising'])
})

export const validateProduct = (input: any): any => {
  return productSchema.parse(input)
}
export const validatePartialProduct = (input: any): any => {
  return productSchema.partial().safeParse(input)
}
