// src/lib/fetchIpos.ts
import axios from 'axios'
import { query } from './db'

const API_URL = process.env.NEPALIPAISA_API_URL!

const fetchIpos = async () => {
  const { data } = await axios.get(
    `${API_URL}/GetIpos?stockSymbol=&pageNo=1&itemsPerPage=10&pagePerDisplay=1`
  )
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
        ON CONFLICT (ipo_id) DO UPDATE
        SET 
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
        WHERE 
        ipos.company_name     IS DISTINCT FROM EXCLUDED.company_name OR
        ipos.stock_symbol     IS DISTINCT FROM EXCLUDED.stock_symbol OR
        ipos.share_registrar  IS DISTINCT FROM EXCLUDED.share_registrar OR
        ipos.sector_name      IS DISTINCT FROM EXCLUDED.sector_name OR
        ipos.file_name        IS DISTINCT FROM EXCLUDED.file_name OR
        ipos.share_type       IS DISTINCT FROM EXCLUDED.share_type OR
        ipos.price_per_unit   IS DISTINCT FROM EXCLUDED.price_per_unit OR
        ipos.rating           IS DISTINCT FROM EXCLUDED.rating OR
        ipos.units            IS DISTINCT FROM EXCLUDED.units OR
        ipos.min_units        IS DISTINCT FROM EXCLUDED.min_units OR
        ipos.max_units        IS DISTINCT FROM EXCLUDED.max_units OR
        ipos.local_units      IS DISTINCT FROM EXCLUDED.local_units OR
        ipos.general_units    IS DISTINCT FROM EXCLUDED.general_units OR
        ipos.promoter_units   IS DISTINCT FROM EXCLUDED.promoter_units OR
        ipos.mutual_fund_units IS DISTINCT FROM EXCLUDED.mutual_fund_units OR
        ipos.other_units      IS DISTINCT FROM EXCLUDED.other_units OR
        ipos.total_amount     IS DISTINCT FROM EXCLUDED.total_amount OR
        ipos.opening_date_ad  IS DISTINCT FROM EXCLUDED.opening_date_ad OR
        ipos.opening_date_bs  IS DISTINCT FROM EXCLUDED.opening_date_bs OR
        ipos.closing_date_ad  IS DISTINCT FROM EXCLUDED.closing_date_ad OR
        ipos.closing_date_bs  IS DISTINCT FROM EXCLUDED.closing_date_bs OR
        ipos.closing_time     IS DISTINCT FROM EXCLUDED.closing_time OR
        ipos.extended_date_ad IS DISTINCT FROM EXCLUDED.extended_date_ad OR
        ipos.extended_date_bs IS DISTINCT FROM EXCLUDED.extended_date_bs OR
        ipos.extended_time    IS DISTINCT FROM EXCLUDED.extended_time OR
        ipos.status           IS DISTINCT FROM EXCLUDED.status OR
        ipos.fiscal_year_ad   IS DISTINCT FROM EXCLUDED.fiscal_year_ad OR
        ipos.fiscal_year_bs   IS DISTINCT FROM EXCLUDED.fiscal_year_bs OR
        ipos.culture_code     IS DISTINCT FROM EXCLUDED.culture_code
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

  //console.log('✅ IPO data saved to DB:', new Date().toISOString())
  return ipos
}

const fetchFpos = async () => {
  const { data } = await axios.get(
    `${API_URL}/GetFpos?stockSymbol=&pageNo=1&itemsPerPage=10&pagePerDisplay=1`
  )
  const { result } = data
  const fpos = result.data || []

  for (const fpo of fpos) {
    await query(
      `
        INSERT INTO fpos (
            fpo_id, company_name, stock_symbol, share_registrar, sector_name, file_name,
            share_type, price_per_unit, rating, units, min_units, max_units,
            local_units, general_units, promoter_units, mutual_fund_units, other_units,
            total_amount, opening_date_ad, opening_date_bs, closing_date_ad, closing_date_bs,
            closing_time, extended_date_ad, extended_date_bs, extended_time,
            status, fiscal_year_ad, fiscal_year_bs, culture_code
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30
        )
        ON CONFLICT (fpo_id) DO UPDATE SET
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
        Number(fpo.fpoId),
        fpo.companyName,
        fpo.stockSymbol,
        fpo.shareRegistrar ?? null,
        fpo.sectorName ?? null,
        fpo.fileName ?? null,
        fpo.shareType ?? null,
        fpo.pricePerUnit ?? null,
        fpo.rating ?? null,
        Number(fpo.units) || 0,
        Number(fpo.minUnits) || 0,
        Number(fpo.maxUnits) || 0,
        Number(fpo.localUnits) || 0,
        Number(fpo.generalUnits) || 0,
        Number(fpo.promoterUnits) || 0,
        Number(fpo.mutualFundUnits) || 0,
        Number(fpo.otherUnits) || 0,
        Number(fpo.totalAmount) || 0,
        fpo.openingDateAD ? new Date(fpo.openingDateAD) : null,
        fpo.openingDateBS ?? null,
        fpo.closingDateAD ? new Date(fpo.closingDateAD) : null,
        fpo.closingDateBS ?? null,
        fpo.closingTime ?? null,
        fpo.extendedDateAD ? new Date(fpo.extendedDateAD) : null,
        fpo.extendedDateBS ?? null,
        fpo.extendedTime ?? null,
        fpo.status ?? null,
        fpo.fiscalYearAD ?? null,
        fpo.fiscalYearBS ?? null,
        fpo.cultureCode ?? null,
      ]
    )
  }

  return fpos
}

const fetchRights = async () => {
  const { data } = await axios.get(
    `${API_URL}/GetDividendRights?stockSymbol=&pageNo=1&itemsPerPage=10&pagePerDisplay=1`
  )
  const { result } = data
  const rights = result.data || []

  for (const right of rights) {
    await query(
      `
        INSERT INTO right_dividend (
            sn, company_name, stock_symbol, bonus, cash, total_dividend,
            book_closure_date_ad, book_closure_date_bs, fiscal_year_ad,
            fiscal_year_bs, right_share, right_book_close_date_ad, right_book_close_date_bs
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,
            $7,$8,$9,
            $10,$11,$12,$13
        )
        ON CONFLICT (sn) DO UPDATE SET
            company_name              = EXCLUDED.company_name,
            stock_symbol              = EXCLUDED.stock_symbol,
            bonus                     = EXCLUDED.bonus,
            cash                      = EXCLUDED.cash,
            total_dividend            = EXCLUDED.total_dividend,
            book_closure_date_ad      = EXCLUDED.book_closure_date_ad,
            book_closure_date_bs      = EXCLUDED.book_closure_date_bs,
            fiscal_year_ad            = EXCLUDED.fiscal_year_ad,
            fiscal_year_bs            = EXCLUDED.fiscal_year_bs,
            right_share               = EXCLUDED.right_share,
            right_book_close_date_ad  = EXCLUDED.right_book_close_date_ad,
            right_book_close_date_bs  = EXCLUDED.right_book_close_date_bs,
            fetched_at                = NOW()
        WHERE
            right_dividend.company_name             IS DISTINCT FROM EXCLUDED.company_name OR
            right_dividend.stock_symbol             IS DISTINCT FROM EXCLUDED.stock_symbol OR
            right_dividend.bonus                    IS DISTINCT FROM EXCLUDED.bonus OR
            right_dividend.cash                     IS DISTINCT FROM EXCLUDED.cash OR
            right_dividend.total_dividend           IS DISTINCT FROM EXCLUDED.total_dividend OR
            right_dividend.book_closure_date_ad     IS DISTINCT FROM EXCLUDED.book_closure_date_ad OR
            right_dividend.book_closure_date_bs     IS DISTINCT FROM EXCLUDED.book_closure_date_bs OR
            right_dividend.fiscal_year_ad           IS DISTINCT FROM EXCLUDED.fiscal_year_ad OR
            right_dividend.fiscal_year_bs           IS DISTINCT FROM EXCLUDED.fiscal_year_bs OR
            right_dividend.right_share              IS DISTINCT FROM EXCLUDED.right_share OR
            right_dividend.right_book_close_date_ad IS DISTINCT FROM EXCLUDED.right_book_close_date_ad OR
            right_dividend.right_book_close_date_bs IS DISTINCT FROM EXCLUDED.right_book_close_date_bs;
        `,
      [
        Number(right.sn),
        right.companyName,
        right.stockSymbol,
        right.bonus,
        right.cash,
        right.totalDividend,
        right.bookClosureDateAD ? new Date(right.bookClosureDateAD) : null,
        right.bookClosureDateBS ?? null,
        right.fiscalYearAD ?? null,
        right.fiscalYearBS ?? null,
        right.rightShare,
        right.rightBookClosureDateAD
          ? new Date(right.rightBookClosureDateAD)
          : null,
        right.rightBookClosureDateBS ?? null,
      ]
    )
  }

  return rights
}

const fetchDebentures = async () => {
  const { data } = await axios.get(
    `${API_URL}/GetBonds?stockSymbol=&pageNo=1&itemsPerPage=10&pagePerDisplay=1`
  )
  const { result } = data
  const debentures = result.data || []

  for (const debenture of debentures) {
    if (!!!debenture.companyName) console.log('Missing bond_id', debenture)

    await query(
      `INSERT INTO bond_debenture (
            bond_id, company_name, sector_name, issue_manager, file_name,
            bond_name, bond_symbol, coupon_rate, price_per_unit, units,
            total_amount, maturity_date_ad, maturity_date_bs, opening_date_ad,
            opening_date_bs, closing_date_ad, closing_date_bs, extended_date_ad,
            extended_date_bs, culture_code, is_active, status, fiscal_year_ad,
            fiscal_year_bs
        )
        VALUES (
            $1,$2,$3,$4,$5,
            $6,$7,$8,$9,$10,
            $11,$12,$13,$14,
            $15,$16,$17,$18,
            $19,$20,$21,$22,$23,$24
        )
        ON CONFLICT (bond_id) DO UPDATE SET
            company_name      = EXCLUDED.company_name,
            sector_name       = EXCLUDED.sector_name,
            issue_manager     = EXCLUDED.issue_manager,
            file_name         = EXCLUDED.file_name,
            bond_name         = EXCLUDED.bond_name,
            bond_symbol       = EXCLUDED.bond_symbol,
            coupon_rate       = EXCLUDED.coupon_rate,
            price_per_unit    = EXCLUDED.price_per_unit,
            units             = EXCLUDED.units,
            total_amount      = EXCLUDED.total_amount,
            maturity_date_ad  = EXCLUDED.maturity_date_ad,
            maturity_date_bs  = EXCLUDED.maturity_date_bs,
            opening_date_ad   = EXCLUDED.opening_date_ad,
            opening_date_bs   = EXCLUDED.opening_date_bs,
            closing_date_ad   = EXCLUDED.closing_date_ad,
            closing_date_bs   = EXCLUDED.closing_date_bs,
            extended_date_ad  = EXCLUDED.extended_date_ad,
            extended_date_bs  = EXCLUDED.extended_date_bs,
            culture_code      = EXCLUDED.culture_code,
            is_active         = EXCLUDED.is_active,
            status            = EXCLUDED.status,
            fiscal_year_ad    = EXCLUDED.fiscal_year_ad,
            fiscal_year_bs    = EXCLUDED.fiscal_year_bs,
            fetched_at        = NOW()
        WHERE
            bond_debenture.company_name      IS DISTINCT FROM EXCLUDED.company_name OR
            bond_debenture.sector_name       IS DISTINCT FROM EXCLUDED.sector_name OR
            bond_debenture.issue_manager     IS DISTINCT FROM EXCLUDED.issue_manager OR
            bond_debenture.file_name         IS DISTINCT FROM EXCLUDED.file_name OR
            bond_debenture.bond_name         IS DISTINCT FROM EXCLUDED.bond_name OR
            bond_debenture.bond_symbol       IS DISTINCT FROM EXCLUDED.bond_symbol OR
            bond_debenture.coupon_rate       IS DISTINCT FROM EXCLUDED.coupon_rate OR
            bond_debenture.price_per_unit    IS DISTINCT FROM EXCLUDED.price_per_unit OR
            bond_debenture.units             IS DISTINCT FROM EXCLUDED.units OR
            bond_debenture.total_amount      IS DISTINCT FROM EXCLUDED.total_amount OR
            bond_debenture.maturity_date_ad  IS DISTINCT FROM EXCLUDED.maturity_date_ad OR
            bond_debenture.maturity_date_bs  IS DISTINCT FROM EXCLUDED.maturity_date_bs OR
            bond_debenture.opening_date_ad   IS DISTINCT FROM EXCLUDED.opening_date_ad OR
            bond_debenture.opening_date_bs   IS DISTINCT FROM EXCLUDED.opening_date_bs OR
            bond_debenture.closing_date_ad   IS DISTINCT FROM EXCLUDED.closing_date_ad OR
            bond_debenture.closing_date_bs   IS DISTINCT FROM EXCLUDED.closing_date_bs OR
            bond_debenture.extended_date_ad  IS DISTINCT FROM EXCLUDED.extended_date_ad OR
            bond_debenture.extended_date_bs  IS DISTINCT FROM EXCLUDED.extended_date_bs OR
            bond_debenture.culture_code      IS DISTINCT FROM EXCLUDED.culture_code OR
            bond_debenture.is_active         IS DISTINCT FROM EXCLUDED.is_active OR
            bond_debenture.status            IS DISTINCT FROM EXCLUDED.status OR
            bond_debenture.fiscal_year_ad    IS DISTINCT FROM EXCLUDED.fiscal_year_ad OR
            bond_debenture.fiscal_year_bs    IS DISTINCT FROM EXCLUDED.fiscal_year_bs;
        `,
      [
        Number(debenture.bondId),
        debenture.companyName ?? null,
        debenture.sectorName ?? null,
        debenture.issueManager ?? null,
        debenture.fileName ?? null,
        debenture.bondName ?? null,
        debenture.bondSymbol ?? null,
        Number(debenture.couponRate) || null,
        Number(debenture.pricePerUnit) || null,
        Number(debenture.units) || null,
        Number(debenture.totalAmount) || null,
        debenture.maturityDateAD ? new Date(debenture.maturityDateAD) : null,
        debenture.maturityDateBS ?? null,
        debenture.openingDateAD ? new Date(debenture.openingDateAD) : null,
        debenture.openingDateBS ?? null,
        debenture.closingDateAD ? new Date(debenture.closingDateAD) : null,
        debenture.closingDateBS ?? null,
        debenture.extendedDateAD ? new Date(debenture.extendedDateAD) : null,
        debenture.extendedDateBS ?? null,
        debenture.cultureCode ?? null,
        debenture.isActive ?? true,
        debenture.status ?? null,
        debenture.fiscalYearAD ?? null,
        debenture.fiscalYearBS ?? null,
      ]
    )
  }

  return debentures
}

const fetchAuction = async () => {
  const { data } = await axios.get(
    `${API_URL}/GetAuctions?stockSymbol=&pageNo=1&itemsPerPage=10&pagePerDisplay=1`
  )
  const { result } = data
  const auctions = result.data || []

  for (const auction of auctions) {
    await query(
      `
        INSERT INTO auctions (
            auction_id, sn, company_id, company_name, stock_symbol, issue_manager,
            sector_name, file_name, share_type, units, opening_date_ad, opening_date_bs,
            closing_date_ad, closing_date_bs, extended_date_ad, extended_date_bs,
            bid_opening_date_ad, bid_opening_date_bs, cut_off_price, closing_price,
            fiscal_year_ad, fiscal_year_bs, is_active, status
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24
        )
        ON CONFLICT (auction_id) DO UPDATE SET
            sn = EXCLUDED.sn,
            company_id = EXCLUDED.company_id,
            company_name = EXCLUDED.company_name,
            stock_symbol = EXCLUDED.stock_symbol,
            issue_manager = EXCLUDED.issue_manager,
            sector_name = EXCLUDED.sector_name,
            file_name = EXCLUDED.file_name,
            share_type = EXCLUDED.share_type,
            units = EXCLUDED.units,
            opening_date_ad = EXCLUDED.opening_date_ad,
            opening_date_bs = EXCLUDED.opening_date_bs,
            closing_date_ad = EXCLUDED.closing_date_ad,
            closing_date_bs = EXCLUDED.closing_date_bs,
            extended_date_ad = EXCLUDED.extended_date_ad,
            extended_date_bs = EXCLUDED.extended_date_bs,
            bid_opening_date_ad = EXCLUDED.bid_opening_date_ad,
            bid_opening_date_bs = EXCLUDED.bid_opening_date_bs,
            cut_off_price = EXCLUDED.cut_off_price,
            closing_price = EXCLUDED.closing_price,
            fiscal_year_ad = EXCLUDED.fiscal_year_ad,
            fiscal_year_bs = EXCLUDED.fiscal_year_bs,
            is_active = EXCLUDED.is_active,
            status = EXCLUDED.status,
            fetched_at = NOW();
        `,
      [
        Number(auction.auctionId), // auction_id
        auction.sn, // sn
        auction.companyId, // company_id
        auction.companyName ?? null, // company_name
        auction.stockSymbol ?? null, // stock_symbol
        auction.issueManager ?? null, // issue_manager
        auction.sectorName ?? null, // sector_name
        auction.fileName ?? null, // file_name
        auction.shareType ?? null, // share_type
        Math.floor(Number(auction.units)) || 0, // units as int
        auction.openingDateAD ? new Date(auction.openingDateAD) : null, // opening_date_ad
        auction.openingDateBS ?? null, // opening_date_bs
        auction.closingDateAD ? new Date(auction.closingDateAD) : null, // closing_date_ad
        auction.closingDateBS ?? null, // closing_date_bs
        auction.extendedDateAD ? new Date(auction.extendedDateAD) : null, // extended_date_ad
        auction.extendedDateBS ?? null, // extended_date_bs
        auction.bidOpeningDateAD ? new Date(auction.bidOpeningDateAD) : null, // bid_opening_date_ad
        auction.bidOpeningDateBS ?? null, // bid_opening_date_bs
        auction.cutOffPrice ? Number(auction.cutOffPrice) : null, // cut_off_price
        auction.closingPrice ? Number(auction.closingPrice) : null, // closing_price
        auction.fiscalYearAD ?? null, // fiscal_year_ad
        auction.fiscalYearBS ?? null, // fiscal_year_bs
        auction.isActive ?? true, // is_active
        auction.status ?? null, // status
      ]
    )
  }

  return auctions
}

export async function fetchAndSave() {
  try {
    console.log('⏰ Fetching IPO data...')
    const ipos = await fetchIpos()
    console.log('✅ IPO data fetched successfully!')

    console.log('⏰ Fetching FPO data...')
    const fpos = await fetchFpos()
    console.log('✅ FPO data fetched successfully!')

    console.log('⏰ Fetching debentures data...')
    const debentures = await fetchDebentures()
    console.log('✅ Debentures data fetched successfully!')

    console.log('⏰ Fetching auctions data...')
    const auctions = await fetchAuction()
    console.log('✅ Auctions data fetched successfully!')

    console.log('⏰ Fetching rights data...')
    const rights = await fetchRights()
    console.log('✅ Rights data fetched successfully!')

    return {
      ipos,
      fpos,
      debentures,
      auctions,
      rights,
    }
  } catch (err) {
    console.error('❌ Error:', (err as Error).message)
    return null
  }
}
