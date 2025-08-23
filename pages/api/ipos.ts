// pages/api/ipos.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { neon } = await import('@netlify/neon') // dynamic import avoids bundling
    const sql = neon()
    const result = await sql('SELECT * FROM ipos ORDER BY opening_date_ad DESC')
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
