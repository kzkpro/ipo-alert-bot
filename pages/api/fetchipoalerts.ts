// pages/api/ipos.ts
import { fetchAndSaveIpos } from '@/lib/fetchIpos'
import { sendPushNotification } from '@/lib/notifications'
import type { NextApiRequest, NextApiResponse } from 'next'

// route for cron job triggered by  cron-job.org
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('⏰ Checking IPO updates...')
    const data = await fetchAndSaveIpos()
    if (data) await sendPushNotification('New IPO data available!')
    res.status(200).json(data)
  } catch (err) {
    console.error('❌ Error in fetchData:', err)
    res.status(500).json({ error: (err as Error).message })
  }
}
