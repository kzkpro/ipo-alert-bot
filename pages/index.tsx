// pages/index.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'

interface Ipo {
  ipo_id: number
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

export default function Home() {
  const [ipos, setIpos] = useState<Ipo[]>([])

  useEffect(() => {
    async function loadIpos() {
      try {
        const { data } = await axios.get('/api/ipos')
        setIpos(data || [])
      } catch (err) {
        console.error('Error fetching IPOs:', err)
      }
    }
    loadIpos()
  }, [])

  return (
    <Container className='p-2'>
      <h1 className='text-center my-4'>IPO Data</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Stock Symbol</th>
            <th>Share Type</th>
            <th>Price Per Unit</th>
            <th>Units</th>
            <th>Min Units</th>
            <th>Max Units</th>
            <th>Status</th>
            <th>Opening Date (AD)</th>
            <th>Opening Date (BS)</th>
            <th>Closing Date (AD)</th>
            <th>Closing Date (BS)</th>
            <th>Fiscal Year (AD)</th>
            <th>Fiscal Year (BS)</th>
          </tr>
        </thead>
        <tbody>
          {ipos.map((ipo, idx) => (
            <tr key={idx}>
              <td>{ipo.company_name}</td>
              <td>{ipo.stock_symbol}</td>
              <td>{ipo.share_type}</td>
              <td>{ipo.price_per_unit}</td>
              <td>{ipo.units}</td>
              <td>{ipo.min_units}</td>
              <td>{ipo.max_units}</td>
              <td>{ipo.status}</td>
              <td>{ipo.opening_date_ad}</td>
              <td>{ipo.opening_date_bs}</td>
              <td>{ipo.closing_date_ad}</td>
              <td>{ipo.closing_date_bs}</td>
              <td>{ipo.fiscal_year_ad}</td>
              <td>{ipo.fiscal_year_bs}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
