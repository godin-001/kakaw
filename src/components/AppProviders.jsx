'use client'
import PrivyClientProvider from './PrivyClientProvider'

export default function AppProviders({ children }) {
  return <PrivyClientProvider>{children}</PrivyClientProvider>
}
