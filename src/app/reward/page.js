'use client'
import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import PixelBg from '@/components/PixelBg'
import KakawPixel from '@/components/KakawPixel'
import { cargarProgreso } from '@/lib/progreso'
import { modulos } from '@/data/modulos'

function RewardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) router.replace('/auth')
  }, [ready, authenticated, router])

  if (!ready || !authenticated) return null

  const slug = searchParams.get('slug') || ''
  const satsGanados = parseInt(searchParams.get('sats') || '0', 10)
  const esFinal = searchParams.get('final') === '1'

  const progreso = cargarProgreso()
  const totalSats = progreso.satsGanados
  const completados = progreso.modulosCompletados?.length || 0
  const totalModulos = modulos.length
  const modulo = modulos.find(m => m.slug === slug)
  const tema = modulo?.tema || {}

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <PixelBg />

      <div className="relative z-10 w-full max-w-[26.5rem] mx-auto px-4 py-8 flex flex-col items-center text-center">

        {/* Logo */}
        <h1
          className="text-xl tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-pixel)', color: '#F97316' }}
        >
          KAKAW
        </h1>

        {/* Kakaw */}
        <div className="mb-4">
          <KakawPixel mood="happy" scale={2.8} />
        </div>

        {/* Headline */}
        <h2
          className="font-bold mb-1"
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: esFinal ? '16px' : '14px',
            color: '#F97316',
            lineHeight: 1.8,
          }}
        >
          {esFinal ? '¡MISIÓN COMPLETA!' : '¡CORRECTO!'}
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-space)' }}
        >
          {esFinal
            ? 'Completaste todo el recorrido. Eres una leyenda del dinero.'
            : modulo
            ? `Completaste "${modulo.titulo}"`
            : 'Completaste el desafío'}
        </p>

        {/* Sats ganados en este quiz */}
        <div
          className="w-full rounded-2xl p-5 mb-4"
          style={{ background: 'rgba(10,20,40,0.85)', border: '2px solid rgba(245,158,11,0.4)' }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-pixel)', fontSize: '7px' }}
          >
            Ganaste en este nivel
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <SatIcon size={36} />
            <span
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '28px',
                color: '#FBBF24',
                lineHeight: 1,
              }}
            >
              +{satsGanados}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '11px',
                color: '#FBBF24',
              }}
            >
              sats
            </span>
          </div>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* Balance total */}
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-space)' }}>
              Balance total
            </p>
            <p
              className="font-bold"
              style={{ fontFamily: 'var(--font-pixel)', fontSize: '13px', color: '#F97316' }}
            >
              ⚡ {totalSats} sats
            </p>
          </div>
        </div>

        {/* Progreso */}
        <div
          className="w-full rounded-2xl p-4 mb-6"
          style={{ background: 'rgba(10,20,40,0.6)', border: '1.5px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-space)' }}>
              Progreso del recorrido
            </p>
            <p
              className="text-xs font-bold"
              style={{ color: '#F97316', fontFamily: 'var(--font-space)' }}
            >
              {completados} / {totalModulos}
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(completados / totalModulos) * 100}%`,
                background: 'linear-gradient(90deg, #F59E0B, #F97316)',
              }}
            />
          </div>
        </div>

        {/* CTA buttons */}
        {esFinal ? (
          <button
            onClick={() => router.push('/resultado')}
            className="w-full py-4 rounded-xl font-bold text-base mb-3"
            style={{
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              color: '#fff',
              fontFamily: 'var(--font-space)',
            }}
          >
            Ver mi código de canje →
          </button>
        ) : (
          <button
            onClick={() => { window.location.href = '/' }}
            className="w-full py-4 rounded-xl font-bold text-base mb-3"
            style={{
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              color: '#fff',
              fontFamily: 'var(--font-space)',
            }}
          >
            Seguir el recorrido →
          </button>
        )}

        <button
          onClick={() => router.push(`/modulo/${slug}`)}
          className="text-xs underline"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-space)' }}
        >
          Releer el módulo
        </button>
      </div>
    </div>
  )
}

// Pixel art sat/BTC coin icon
function SatIcon({ size = 24 }) {
  const s = size / 16 // scale factor
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 16 16"
      style={{ imageRendering: 'pixelated', flexShrink: 0 }}
    >
      {/* Coin circle */}
      <rect x="3" y="1" width="10" height="14" rx="5" fill="#F59E0B" />
      <rect x="2" y="3" width="12" height="10" rx="5" fill="#FBBF24" />
      {/* B symbol */}
      <rect x="6" y="4" width="1" height="8" fill="#92400E" />
      <rect x="7" y="4" width="3" height="1" fill="#92400E" />
      <rect x="7" y="7" width="3" height="1" fill="#92400E" />
      <rect x="7" y="11" width="3" height="1" fill="#92400E" />
      <rect x="10" y="5" width="1" height="2" fill="#92400E" />
      <rect x="10" y="8" width="1" height="3" fill="#92400E" />
      {/* shine */}
      <rect x="4" y="3" width="2" height="1" fill="#FDE68A" opacity="0.7" />
    </svg>
  )
}

export default function RewardPage() {
  return (
    <Suspense fallback={null}>
      <RewardContent />
    </Suspense>
  )
}
