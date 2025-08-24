// pages/index.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Tab, Table, Tabs } from 'react-bootstrap'
import IpoTable from '@/components/IpoTable'
import { IpoModel } from '@/models/IpoModel'
import { BondDebentureModel } from '@/models/BondDebentureModel'
import { RightDividendModel } from '@/models/RightDividendModel'
import { FpoModel } from '@/models/FpoModel'

interface CategorizedIpos {
  [category: string]: (
    | IpoModel
    | BondDebentureModel
    | RightDividendModel
    | FpoModel
  )[]
}

export default function Home() {
  const [ipos, setIpos] = useState<CategorizedIpos>({})
  const [key, setKey] = useState('open')

  const filteredIposByStatus = (
    items: (IpoModel | BondDebentureModel | RightDividendModel | FpoModel)[],
    key: string
  ): (IpoModel | BondDebentureModel | RightDividendModel | FpoModel)[] => {
    console.log(items)
    return items?.filter((item) => item.status?.toLowerCase() === key)
  }

  useEffect(() => {
    async function loadIpos() {
      try {
        const { data } = (await axios.get('/api/ipos')) ?? []
        const groupedData = {
          nearing: filteredIposByStatus(data, 'nearing') ?? [],
          open: filteredIposByStatus(data, 'open') ?? [],
          closed: filteredIposByStatus(data, 'closed') ?? [],
        }
        setIpos(groupedData)
      } catch (error) {
        console.error('Error fetching IPOs:', error)
      }
    }
    loadIpos()
  }, [])

  return (
    <Container className='p-2'>
      <h1 className='text-center my-4'>Nepse Alert</h1>
      <Tabs
        id='ipo-tabs'
        activeKey={key}
        onSelect={(k: string | null) => k && setKey(k)}
        className='mb-3'
        justify
      >
        <Tab eventKey='open' title='Open'>
          <IpoTable ipos={ipos.open} status='open' />
        </Tab>
        <Tab eventKey='nearing' title='Nearing'>
          <IpoTable ipos={ipos.nearing} status='nearing' />
        </Tab>
        <Tab eventKey='closed' title='Closed'>
          <IpoTable ipos={ipos.closed} status='closed' />
        </Tab>
      </Tabs>
    </Container>
  )
}
