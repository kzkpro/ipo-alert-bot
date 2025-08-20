// pages/api/ipos.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../src/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await query(
      'SELECT * FROM ipos ORDER BY fetched_at DESC LIMIT 10'
    )
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Database error' })
  }
}
