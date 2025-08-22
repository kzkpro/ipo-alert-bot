// pages/_app.tsx
import type { AppProps } from 'next/app'
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
