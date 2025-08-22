// pages/index.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'

interface Ipo {
  // define IPO fields according to API response
  IPOName: string
  IssueDate: string
  [key: string]: string
}

export default function Home() {
  const [ipos, setIpos] = useState<Ipo[]>([])

  useEffect(() => {
    async function loadIpos() {
      const { data } = await axios.get('/api/ipos')
      setIpos(data.items || [])
    }
    loadIpos()
  }, [])

  return (
    <Container className='p-3'>
      <h1>IPO Alerts</h1>
      <Table>
        {ipos.map((ipo, idx) => (
          <tr key={idx}>
            <td>{ipo.IPOName}</td>
            <td>{ipo.IssueDate}</td>
          </tr>
        ))}
      </Table>
    </Container>
  )
}
