// src/lib/db.ts
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Neon uses SSL, but no need for custom CA
  },
})

export async function query(
  text: string,
  params?: (string | number | boolean | typeof query)[]
) {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    console.log('Query result:', res.rows)
    return res
  } finally {
    client.release()
  }
}
