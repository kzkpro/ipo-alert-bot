// src/lib/fetchIpos.ts
import axios from 'axios'
import { query } from './db'

const API_URL = process.env.NEXT_PUBLIC_IPO_API!

export async function fetchAndSaveIpos() {
  try {
    const { data } = await axios.get(API_URL)
    const ipos = data.items || []

    for (const ipo of ipos) {
      await query(
        `
        INSERT INTO ipos (
          ipo_id, company_name, stock_symbol, share_registrar, sector_name, file_name,
          share_type, price_per_unit, rating, units, min_units, max_units,
          local_units, general_units, promoter_units, mutual_fund_units, other_units,
          total_amount, opening_date_ad, opening_date_bs, closing_date_ad, closing_date_bs,
          closing_time, extended_date_ad, extended_date_bs, extended_time, status,
          fiscal_year_ad, fiscal_year_bs, culture_code
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29
        )
        ON CONFLICT (ipo_id) DO UPDATE SET
          company_name = EXCLUDED.company_name,
          stock_symbol = EXCLUDED.stock_symbol,
          share_registrar = EXCLUDED.share_registrar,
          sector_name = EXCLUDED.sector_name,
          file_name = EXCLUDED.file_name,
          share_type = EXCLUDED.share_type,
          price_per_unit = EXCLUDED.price_pe_
