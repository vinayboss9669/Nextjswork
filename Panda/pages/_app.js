import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
})

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </main>
  )
}
