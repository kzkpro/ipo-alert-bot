export interface FpoModel {
  fpo_id: number
  company_name: string
  stock_symbol: string
  share_registrar?: string
  sector_name?: string
  file_name?: string
  share_type?: string
  price_per_unit?: string
  rating?: string
  units?: number
  min_units?: number
  max_units?: number
  local_units?: number
  general_units?: number
  promoter_units?: number
  mutual_fund_units?: number
  other_units?: number
  total_amount?: number
  opening_date_ad?: string // or Date if you parse it
  opening_date_bs?: string
  closing_date_ad?: string // or Date
  closing_date_bs?: string
  closing_time?: string
  extended_date_ad?: string // or Date
  extended_date_bs?: string
  extended_time?: string
  status?: string
  fiscal_year_ad?: string
  fiscal_year_bs?: string
  culture_code?: string
}
