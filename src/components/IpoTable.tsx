import React from 'react'
import { Table } from 'react-bootstrap'
import ipos from '../../pages/api/ipos'
import { IpoModel } from '@/models/IpoModel'
import moment from 'moment'
import { FpoModel } from '@/models/FpoModel'
import { RightDividendModel } from '@/models/RightDividendModel'
import { BondDebentureModel } from '@/models/BondDebentureModel'

interface Props {
  ipos: (IpoModel | BondDebentureModel | RightDividendModel | FpoModel)[]
  status: 'nearing' | 'open' | 'closed'
}
const IpoTable = ({ ipos, status }: Props) => {
  if (ipos?.length === 0) {
    return <p className='text-center mt-3'>No IPOs available</p>
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Stock Symbol</th>
          <th>Share Type</th>
          <th>Price Per Unit</th>
          <th>Units</th>
          <th>Status</th>
          <th>Opening Date (AD)</th>
          <th>Closing Date (AD)</th>
          {status === 'open' && <th>Days Left</th>}
          {status === 'nearing' && <th>Open in</th>}
          {status === 'closed' && <th>Closed</th>}

          {status === 'open' && <th>Apply</th>}
          {status === 'nearing' && ''}
          {status === 'closed' && <th>Check Results</th>}
        </tr>
      </thead>
      <tbody>
        {ipos?.map((ipo, idx) => (
          <tr key={idx}>
            <td>{ipo.company_name}</td>
            <td>{'stock_symbol' in ipo ? ipo.stock_symbol : 'N/A'}</td>
            <td>{'share_type' in ipo ? ipo.share_type : 'N/A'}</td>
            <td>{'price_per_unit' in ipo ? ipo.price_per_unit : 'N/A'}</td>
            <td>{'units' in ipo ? ipo.units : 'N/A'}</td>
            <td>{ipo.status}</td>
            <td>
              {'opening_date_ad' in ipo
                ? moment(ipo.opening_date_ad).format('YYYY-MM-DD')
                : 'N/A'}
            </td>
            <td>
              {'closing_date_ad' in ipo
                ? moment(ipo.closing_date_ad).format('YYYY-MM-DD')
                : 'N/A'}
            </td>
            <td>
              {'closing_date_ad' in ipo
                ? moment(ipo.closing_date_ad).diff(moment(), 'days')
                : 'N/A'}{' '}
              days &nbsp;
              {status === 'closed' && 'ago'}
            </td>

            {ipo.status?.toLocaleLowerCase() === 'open' && (
              <td>
                <a href={'https://meroshare.cdsc.com.np/'} target='_blank'>
                  Apply
                </a>
              </td>
            )}
            {ipo.status?.toLocaleLowerCase() === 'closed' && (
              <td>
                <a href={'https://iporesult.cdsc.com.np/'} target='_blank'>
                  Check Result
                </a>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default IpoTable
