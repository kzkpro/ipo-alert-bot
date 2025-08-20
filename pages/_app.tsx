// pages/_app.tsx
import type { AppProps } from 'next/app'
import '../styles/globals.css'

// Import the cron starter
import { startIpoCron } from '../src/cron/ipoCron'

// Only start the cron on the server side
if (typeof window === 'undefined') {
  startIpoCron()
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
