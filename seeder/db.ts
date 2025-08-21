// src/lib/db.ts
import { neon } from '@netlify/neon'

export const sql = neon() // automatically uses NETLIFY_DATABASE_URL
async function createIpoTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS ipos (
      ipo_id INT PRIMARY KEY,
      company_name TEXT NOT NULL,
      stock_symbol TEXT NOT NULL,
      share_registrar TEXT,
      sector_name TEXT,
      file_name TEXT,
      share_type TEXT,
      price_per_unit TEXT,
      rating TEXT,
      units BIGINT,
      min_units INT,
      max_units INT,
      local_units BIGINT,
      general_units BIGINT,
      promoter_units BIGINT,
      mutual_fund_units BIGINT,
      other_units BIGINT,
      total_amount BIGINT,
      opening_date_ad DATE,
      opening_date_bs TEXT,
      closing_date_ad DATE,
      closing_date_bs TEXT,
      closing_time TEXT,
      extended_date_ad DATE,
      extended_date_bs TEXT,
      extended_time TEXT,
      status TEXT,
      fiscal_year_ad TEXT,
      fiscal_year_bs TEXT,
      culture_code TEXT,
      fetched_at TIMESTAMP DEFAULT NOW()
    );
  `
  console.log('✅ IPO table ready')
}

createIpoTable()
