export interface BondDebentureModel {
  bond_id: number
  company_name: string
  sector_name: string
  issue_manager: string
  file_name: string
  bond_name: string
  bond_symbol: string
  coupon_rate: string
  price_per_unit: string
  units: number
  total_amount: number
  maturity_date_ad: string
  maturity_date_bs: string
  opening_date_ad: string
  opening_date_bs: string
  closing_date_ad: string
  closing_date_bs: string
  extended_date_ad: string
  extended_date_bs: string
  culture_code: string
  is_active: boolean
  status: string
  fiscal_year_bs: string
  fiscal_year_ad: string
}
