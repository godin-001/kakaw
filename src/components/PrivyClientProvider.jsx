'use client'
import { useState, useEffect } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'

export default function PrivyClientProvider({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render Privy on server — wait for client mount
  if (!mounted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#5BC0E8',
          fontFamily: 'monospace',
          color: '#1a3a5c',
          fontSize: '12px',
          letterSpacing: '0.1em',
        }}
      >
        KAKAW...
      </div>
    )
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'google-oauth'],
        appearance: {
          theme: 'dark',
          accentColor: '#F97316',
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          createOnLogin: 'off',
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
