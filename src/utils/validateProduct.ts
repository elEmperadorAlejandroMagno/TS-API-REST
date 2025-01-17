import { z } from 'zod'

const productSchema = z.object({
  title: z.string({
    required_error: 'Title is required for creating a new product',
    invalid_type_error: 'The title must be a string/text'
  }),
  price: z.number({
    required_error: 'Price is required for creating a new product',
    invalid_type_error: 'Price must be a number'
  }),
  description: z.string({
    invalid_type_error: 'Description must be a text'
  }),
  is_available: z.number().optional(),
  type: z.enum(['sauce', 'merchandising'])
})

export const validateProduct = (input: any): any => {
  return productSchema.parse(input)
}

export const validatePartialProduct = (input: any): any => {
  const result = productSchema.partial().safeParse(input)
  if (result.success) {
    return result.data
  } else {
    console.error(result.error)
    return null
  }
}
