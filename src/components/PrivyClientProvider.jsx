'use client'
import { useState, useEffect } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'

// Fallback hardcoded in case the env var isn't injected at build time
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmmh3l0a000c20ckvic2wluvg'

export default function PrivyClientProvider({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'google-oauth'],
        appearance: {
          theme: 'dark',
          accentColor: '#F97316',
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
