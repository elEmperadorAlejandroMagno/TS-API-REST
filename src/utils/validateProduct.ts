import { z } from 'zod'
import { Product } from '../types/types'

const mySchema = z.string()

mySchema.parse("tuna")
mySchema.parse(12)

export const validateProduct = (input: any): Product=> {
  const validatedProduct = input
  return validatedProduct
}