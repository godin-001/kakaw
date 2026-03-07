import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata = {
  title: 'Kakaw — La Historia del Dinero',
  description: 'Del trueque a Bitcoin. Una aventura interactiva sobre cómo el dinero evolucionó hasta llegar a donde estamos hoy.',
  openGraph: {
    title: 'Kakaw — La Historia del Dinero',
    description: 'Del trueque a Bitcoin. Aprende la historia del dinero de forma interactiva.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body className={`min-h-screen bg-[#0E0800] text-amber-50 ${spaceGrotesk.className}`}>
        {children}
      </body>
    </html>
  )
}
