'use client'
import dynamic from 'next/dynamic'

// Privy requires client-only rendering — no SSR
const PrivyClientProvider = dynamic(
  () => import('./PrivyClientProvider'),
  { ssr: false }
)

export default function AppProviders({ children }) {
  return <PrivyClientProvider>{children}</PrivyClientProvider>
}
