// src/cron/ipoCron.ts
import cron from 'node-cron'
import { fetchAndSaveIpos } from '../lib/fetchIpos'
import { sendPushNotification } from '../lib/notifications'

export async function startIpoCron() {
  cron.schedule('*/5 * * * * *', async () => {
    // every 5s for testing
    console.log('⏰ Checking IPO updates...')
    const data = await fetchAndSaveIpos()
    if (data) await sendPushNotification('New IPO data available!')
  })
}
