export interface AuctionModel {
  id: number
  sn: number
  auction_id: number
  company_id: number
  company_name: string
  stock_symbol: string
  issue_manager: string
  sector_name: string
  file_name: string
  share_type: string
  units: string
  opening_date_ad: string
  opening_date_bs: string
  closing_date_ad: string
  closing_date_bs: string
  extended_date_ad: string
  extended_date_bs: string
  bid_opening_date_ad: string
  bid_opening_date_bs: string
  cut_off_price: string
  closing_price: string
  fiscal_year_ad: string // or Date
  fiscal_year_bs: string // or Date
  is_active: boolean
  status: string
}
