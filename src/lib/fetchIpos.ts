// src/lib/fetchIpos.ts
import axios from 'axios'
import { query } from './db'

const API_URL = process.env.NEXT_PUBLIC_IPO_API!

export async function fetchAndSaveIpos() {
  try {
    const { data } = await axios.get(API_URL)
    const { result } = data
    const ipos = result.data || []

    for (const ipo of ipos) {
      await query(
        `
        INSERT INTO ipos (
          ipo_id, 
          company_name, 
          stock_symbol, 
          share_registrar, 
          sector_name, 
          file_name,
          share_type, 
          price_per_unit, 
          rating, 
          units, 
          min_units, 
          max_units,
          local_units, 
          general_units, 
          promoter_units, 
          mutual_fund_units, 
          other_units,
          total_amount, 
          opening_date_ad, 
          opening_date_bs, 
          closing_date_ad, 
          closing_date_bs,
          closing_time, 
          extended_date_ad, 
          extended_date_bs, 
          extended_time, 
          status,
          fiscal_year_ad, 
          fiscal_year_bs, 
          culture_code
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30
        )
        ON CONFLICT (ipo_id) DO UPDATE SET
          company_name = EXCLUDED.company_name,
          stock_symbol = EXCLUDED.stock_symbol,
          share_registrar = EXCLUDED.share_registrar,
          sector_name = EXCLUDED.sector_name,
          file_name = EXCLUDED.file_name,
          share_type = EXCLUDED.share_type,
          price_per_unit = EXCLUDED.price_per_unit,
          rating = EXCLUDED.rating,
          units = EXCLUDED.units,
          min_units = EXCLUDED.min_units,
          max_units = EXCLUDED.max_units,
          local_units = EXCLUDED.local_units,
          general_units = EXCLUDED.general_units,
          promoter_units = EXCLUDED.promoter_units,
          mutual_fund_units = EXCLUDED.mutual_fund_units,
          other_units = EXCLUDED.other_units,
          total_amount = EXCLUDED.total_amount,
          opening_date_ad = EXCLUDED.opening_date_ad,
          opening_date_bs = EXCLUDED.opening_date_bs,
          closing_date_ad = EXCLUDED.closing_date_ad,
          closing_date_bs = EXCLUDED.closing_date_bs,
          closing_time = EXCLUDED.closing_time,
          extended_date_ad = EXCLUDED.extended_date_ad,
          extended_date_bs = EXCLUDED.extended_date_bs,
          extended_time = EXCLUDED.extended_time,
          status = EXCLUDED.status,
          fiscal_year_ad = EXCLUDED.fiscal_year_ad,
          fiscal_year_bs = EXCLUDED.fiscal_year_bs,
          culture_code = EXCLUDED.culture_code,
          fetched_at = NOW()
        `,
        [
          Number(ipo.ipoId),
          ipo.companyName ?? '',
          ipo.stockSymbol ?? '',
          ipo.shareRegistrar ?? null,
          ipo.sectorName ?? null,
          ipo.fileName ?? null,
          ipo.shareType ?? null,
          ipo.pricePerUnit ?? null,
          ipo.rating ?? null,
          Number(ipo.units) || 0,
          Number(ipo.minUnits) || 0,
          Number(ipo.maxUnits) || 0,
          Number(ipo.localUnits) || 0,
          Number(ipo.generalUnits) || 0,
          Number(ipo.promoterUnits) || 0,
          Number(ipo.mutualFundUnits) || 0,
          Number(ipo.otherUnits) || 0,
          Number(ipo.totalAmount) || 0,
          ipo.openingDateAD ? new Date(ipo.openingDateAD) : null,
          ipo.openingDateBS ?? null,
          ipo.closingDateAD ? new Date(ipo.closingDateAD) : null,
          ipo.closingDateBS ?? null,
          ipo.closingTime ?? null,
          ipo.extendedDateAD ? new Date(ipo.extendedDateAD) : null,
          ipo.extendedDateBS ?? null,
          ipo.extendedTime ?? null,
          ipo.status ?? null,
          ipo.fiscalYearAD ?? null,
          ipo.fiscalYearBS ?? null,
          ipo.cultureCode ?? null,
        ]
      )
    }

    console.log('✅ IPO data saved to DB:', new Date().toISOString())
    return ipos
  } catch (err) {
    console.error('❌ Error fetching IPO data:', (err as Error).message)
    return null
  }
}
