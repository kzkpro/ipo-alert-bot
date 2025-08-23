// pages/index.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Tab, Table, Tabs } from 'react-bootstrap'
import IpoTable, { IpoModel } from '@/components/IpoTable'

interface CategorizedIpos {
  [category: string]: IpoModel[]
}

export default function Home() {
  const [ipos, setIpos] = useState<CategorizedIpos>({})
  const [key, setKey] = useState('nearing')

  useEffect(() => {
    async function loadIpos() {
      try {
        const { data } = await axios.get('/api/ipos')
        const groupedData = {
          nearing:
            data.filter(
              (ipo: IpoModel) => ipo.status?.toLowerCase() === 'nearing'
            ) ?? [],
          open:
            data.filter(
              (ipo: IpoModel) => ipo.status?.toLowerCase() === 'open'
            ) ?? [],
          closed:
            data.filter(
              (ipo: IpoModel) => ipo.status?.toLowerCase() === 'closed'
            ) ?? [],
        }
        setIpos(groupedData || {})
      } catch (err) {
        console.error('Error fetching IPOs:', err)
      }
    }
    loadIpos()
  }, [])

  return (
    <Container className='p-2'>
      <h1 className='text-center my-4'>IPO Data</h1>
      <Tabs
        id='ipo-tabs'
        activeKey={key}
        onSelect={(k: string | null) => k && setKey(k)}
        className='mb-3'
        justify
      >
        <Tab eventKey='nearing' title='Nearing'>
          <IpoTable ipos={ipos.nearing} />
        </Tab>
        <Tab eventKey='open' title='Open'>
          <IpoTable ipos={ipos.open} />
        </Tab>
        <Tab eventKey='closed' title='Closed'>
          <IpoTable ipos={ipos.closed} />
        </Tab>
      </Tabs>
    </Container>
  )
}
