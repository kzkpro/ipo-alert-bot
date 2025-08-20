// pages/index.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div>
      <h1>IPO Alerts</h1>
      <ul>
        {ipos.map((ipo, idx) => (
          <li key={idx}>
            {ipo.IPOName} - {ipo.IssueDate}
          </li>
        ))}
      </ul>
    </div>
  )
}
