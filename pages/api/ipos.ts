// pages/api/ipos.ts
import { RightDividendModel } from '@/models/RightDividendModel'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'

const getIpos = async () => {
  const { neon } = await import('@netlify/neon') // dynamic import avoids bundling
  const sql = neon()
  const result = await sql('SELECT * FROM ipos ORDER BY closing_date_ad DESC')
  return result
}

const getFpos = async () => {
  const { neon } = await import('@netlify/neon') // dynamic import avoids bundling
  const sql = neon()
  const result = await sql('SELECT * FROM fpos ORDER BY closing_date_ad DESC')
  return result
}

const getDebentures = async () => {
  const { neon } = await import('@netlify/neon') // dynamic import avoids bundling
  const sql = neon()
  const result = await sql(
    'SELECT * FROM bond_debenture  ORDER BY closing_date_ad DESC'
  )

  return result
}

const getRights = async () => {
  const { neon } = await import('@netlify/neon') // dynamic import avoids bundling
  const sql = neon()
  const result = await sql(
    'SELECT * FROM right_dividend ORDER BY book_closure_date_ad DESC'
  )
  result.map((right) => {
    return {
      ...right,
      status: moment(right?.closing_date_ad).isBefore(new Date()),
    }
  })
  return result
}

const getAuctions = async () => {
  const { neon } = await import('@netlify/neon') // dynamic import avoids bundling
  const sql = neon()
  const result = await sql(
    'SELECT * FROM auctions ORDER BY closing_date_ad DESC'
  )
  return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ipoResult = await getIpos()
    const fpoResult = await getFpos()
    const debentureResult = await getDebentures()
    const RightResult = await getRights()
    //const AuctionResult = await getAuctions()

    res
      .status(200)
      .json([...ipoResult, ...fpoResult, ...debentureResult, ...RightResult])
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
