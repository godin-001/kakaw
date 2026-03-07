import './globals.css'

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
    <html lang="es">
      <body className="min-h-screen bg-amber-950 text-amber-50">
        {children}
      </body>
    </html>
  )
}
