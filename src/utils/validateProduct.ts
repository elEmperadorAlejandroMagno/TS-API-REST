import { z } from 'zod'
import { NewProduct, PartialProduct } from '../types/types'

const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  available: z.boolean(),
  image: z.string().url(),
  type: z.enum(['sauce', 'merchandising'])
})

const newProductSchema = productSchema.omit({ id: true })

const partialProductSchema = productSchema.partial()

export const validateProduct = (input: any): NewProduct => {
  const validatedProduct = newProductSchema.parse(input)
  return validatedProduct
}
export const validatePartialProduct = (input: any): PartialProduct => {
  const validatedPartialProduct = partialProductSchema.parse(input)
  return validatedPartialProduct
}
