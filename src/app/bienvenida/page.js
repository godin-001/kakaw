'use client'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import PixelBg from '@/components/PixelBg'
import KakawPixel from '@/components/KakawPixel'

export default function BienvenidaPage() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) router.replace('/auth')
  }, [ready, authenticated, router])

  if (!ready || !authenticated) return null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <PixelBg />

      <div className="relative z-10 w-full max-w-[26.5rem] mx-auto px-4 py-10 flex flex-col items-center text-center">

        {/* Logo */}
        <h1
          className="text-2xl tracking-tight mb-1"
          style={{ fontFamily: 'var(--font-pixel)', color: '#F97316' }}
        >
          KAKAW
        </h1>
        <p
          className="uppercase tracking-widest mb-8"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-pixel)', fontSize: '7px' }}
        >
          La Historia del Dinero
        </p>

        {/* Kakaw */}
        <div className="mb-6">
          <KakawPixel mood="happy" scale={2.8} />
        </div>

        {/* Texto bienvenida */}
        <div
          className="w-full rounded-2xl p-6 mb-8"
          style={{ background: 'rgba(10, 20, 40, 0.85)', border: '2px solid rgba(249,115,22,0.3)' }}
        >
          <h2
            className="text-lg font-bold mb-4"
            style={{ color: '#F97316', fontFamily: 'var(--font-pixel)', fontSize: '13px', lineHeight: 1.8 }}
          >
            ¡Bienvenid@ a Kakaw!
          </h2>

          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-space)' }}
          >
            Soy <strong style={{ color: '#F97316' }}>Kakaw</strong>, un grano de cacao que ha vivido miles de años y visto cómo el dinero cambió el mundo.
          </p>
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-space)' }}
          >
            Juntos vamos a recorrer la historia del dinero: desde el trueque hasta Bitcoin, pasando por las monedas de cacao, el oro, los billetes y el dinero digital.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-space)' }}
          >
            Por cada respuesta correcta ganas <strong style={{ color: '#FBBF24' }}>satoshis ⚡</strong> — las unidades más pequeñas de Bitcoin. Al final del recorrido podrás canjearlos.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/')}
          className="w-full py-4 rounded-xl font-bold text-base"
          style={{
            background: 'linear-gradient(135deg, #F97316, #EA580C)',
            color: '#fff',
            fontFamily: 'var(--font-space)',
            fontSize: '16px',
            letterSpacing: '0.02em',
          }}
        >
          ¡Empezar la aventura! →
        </button>
      </div>
    </div>
  )
}
