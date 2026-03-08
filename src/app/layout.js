import { Press_Start_2P, VT323, Space_Grotesk } from 'next/font/google'
import PrivyClientProvider from '@/components/PrivyClientProvider'
import './globals.css'

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pixel',
  display: 'swap',
})

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata = {
  title: 'Kakaw — La Historia del Dinero',
  description: 'Del trueque a Bitcoin. Una aventura interactiva sobre cómo el dinero evolucionó.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${pressStart.variable} ${vt323.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen text-amber-50" style={{ fontFamily: 'var(--font-space), system-ui, sans-serif' }}>
        <PrivyClientProvider>
          {children}
        </PrivyClientProvider>
      </body>
    </html>
  )
}
