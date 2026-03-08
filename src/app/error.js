'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('KAKAW ERROR:', error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1428',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'monospace',
    }}>
      <p style={{ color: '#F97316', fontSize: '12px', marginBottom: '1rem' }}>KAKAW — ERROR DE CARGA</p>
      <p style={{ color: '#F87171', fontSize: '11px', maxWidth: '360px', textAlign: 'center', wordBreak: 'break-word', marginBottom: '1rem' }}>
        {error?.message || 'Error desconocido'}
      </p>
      <pre style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', maxWidth: '360px', overflow: 'auto', marginBottom: '2rem' }}>
        {error?.stack?.slice(0, 300)}
      </pre>
      <button
        onClick={reset}
        style={{ background: '#F97316', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
      >
        Reintentar
      </button>
    </div>
  )
}
