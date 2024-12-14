import { z } from 'zod'
import { PartialProduct } from '../types/types'

const productSchema = z.object({
  id: z.string(),
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
  image: z.string().url({
    message: 'Image must be an url valid'
  }),
  type: z.enum(['sauce', 'merchandising'])
})

const newProductSchema = productSchema.omit({ id: true })

const partialProductSchema = productSchema.partial()

export const validateProduct = (input: any): void => {
  let validatedProduct = input
  try {
    validatedProduct = newProductSchema.parse(input)
    return validatedProduct
  } catch (e: any) {
    console.error('Erorr de validacion', e.errors)
  }
}
export const validatePartialProduct = (input: any): PartialProduct => {
  const validatedPartialProduct = partialProductSchema.parse(input)
  return validatedPartialProduct
}
