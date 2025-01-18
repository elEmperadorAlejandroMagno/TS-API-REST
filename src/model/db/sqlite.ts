import { validateProduct, validatePartialProduct } from '../../utils/validateProduct'
import { Product, ProductType } from '../../types/types'
import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { randomUUID as rID } from 'crypto'
import path from 'path'

let db: Database | undefined

export async function connectDB (): Promise<void> {
  const dbPath = path.resolve(__dirname, '../../../products.db')
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })
}

export async function getDB (): Promise<Database> {
  if (db == null) {
    await connectDB()
  }
  return db as Database
}

export async function getProducts (filter: ProductType | undefined): Promise<any> {
  const db = await getDB()
  let query = `
    SELECT 
      p.id, 
      p.title, 
      p.description, 
      p.price, 
      p.type, 
      (
        SELECT GROUP_CONCAT(pi.image, ',') 
        FROM product_images pi 
        WHERE pi.product_id = p.id
      ) AS images 
    FROM products p 
  `
  if (filter != null) {
    query += 'WHERE p.type = ?'
    const result = await db.all(query, filter)
    return result
  }
  const result = await db.all(query)
  return result
}

export async function getProduct (id: string): Promise<any> {
  const db = await getDB()
  const query = `
  SELECT 
    p.id, 
    p.title, 
    p.description, 
    p.price, 
    p.type, 
    (
      SELECT GROUP_CONCAT(pi.image, ',') 
      FROM product_images pi 
      WHERE pi.product_id = p.id
    ) AS images 
  FROM products p
  WHERE p.id = ? 
`
  const result = await db.all(query, id)
  return result
}

export async function addProduct (product: Product): Promise<Product | boolean> {
  const newProduct = {
    id: rID(),
    title: product.product_info.title,
    description: product.product_info.description,
    price: product.product_info.price,
    type: product.product_info.type
  }
  const validatedProduct = validateProduct(newProduct)
  if (validatedProduct != null) {
    const db = await getDB()
    await db.run('INSERT INTO products (id, title, description, price, type) VALUES (?, ?, ?, ?, ?)', newProduct.id, newProduct.title, newProduct.description, newProduct.price, newProduct.type)
    if (product.images != null) {
      await db.run('INSERT INTO product_images (product_id, image) VALUES (?, ?)', newProduct.id, product.images[0])
    }
    const createdProduct = await getProduct(newProduct.id)
    return createdProduct
  }
  return false
}

export async function updateProduct (id: string, product: Partial<Product>): Promise<Product | boolean> {
  const db = await getDB()
  const updateProduct = validatePartialProduct(product)
  if (updateProduct == null) return false
  const fields = []
  const values = []

  if (product.product_info?.title != null) {
    fields.push('title = ?')
    values.push(product.product_info.title)
  }
  if (product.product_info?.description != null) {
    fields.push('description = ?')
    values.push(product.product_info.description)
  }
  if (product.product_info?.price != null) {
    fields.push('price = ?')
    values.push(product.product_info.price)
  }
  if (product.product_info?.type != null) {
    fields.push('type = ?')
    values.push(product.product_info.type)
  }
  if (product.product_info?.is_available != null) {
    fields.push('is_available = ?')
    values.push(product.product_info.is_available)
  }

  values.push(id)

  if (fields.length > 0) {
    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`
    await db.run(query, ...values)

    if (product.images != null) {
      await db.run('UPDATE product_images SET image = ? WHERE product_id = ?', product.images, id)
    }

    const updatedProduct = await getProduct(id)
    return updatedProduct
  }
  return false
}

export async function deleteProduct (id: string): Promise<boolean> {
  const db = await getDB()
  try {
    await db.run('DELETE FROM products WHERE id = ?', id)
    await db.run('DELETE FROM product_images WHERE product_id = ?', id)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
