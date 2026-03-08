'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import KakawPixel from '@/components/KakawPixel'
import ModuleIcon from '@/components/ModuleIcon'
import PixelBg from '@/components/PixelBg'
import { modulos } from '@/data/modulos'
import { cargarProgreso, resetearProgreso } from '@/lib/progreso'

const AVENTURA_TEMA = {
  accent: '#F59E0B',
  nodoBg: '#92400E',
  nodoBorder: '#F59E0B',
  sombra: 'rgba(245,158,11,0.4)',
  texto: '#FEF3C7',
}

const ITEMS = [
  ...modulos.map(m => ({ tipo: 'modulo', ...m })),
  { tipo: 'aventura', id: 7, slug: 'aventura', titulo: 'Mueve tu Lana', tema: AVENTURA_TEMA },
]

// Alternating left/right offsets for the sinuous path
// negative = bar leans left, positive = bar leans right
const SIDE = ['right', 'left', 'right', 'left', 'right', 'left', 'center']

function BoardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ready, authenticated, logout, user } = usePrivy()
  const [progreso, setProgreso] = useState(null)

  // Auth guard
  useEffect(() => {
    if (ready && !authenticated) router.replace('/auth')
  }, [ready, authenticated, router])

  useEffect(() => {
    if (searchParams.get('reset') === '1') {
      resetearProgreso()
      window.location.href = '/'
      return
    }
    const p = cargarProgreso()
    setProgreso(p)
  }, [searchParams])

  if (!ready || !authenticated || !progreso) return null

  const completados = progreso.modulosCompletados || []
  const aventuraCompletada = progreso.aventuraCompletada || false

  const currentIdx = (() => {
    for (let i = 0; i < ITEMS.length; i++) {
      const item = ITEMS[i]
      if (item.tipo === 'modulo' && !completados.includes(item.slug)) return i
      if (item.tipo === 'aventura' && completados.length === modulos.length && !aventuraCompletada) return i
    }
    return ITEMS.length
  })()

  const todoCompleto = currentIdx >= ITEMS.length

  function handleBarClick(item, idx) {
    if (idx > currentIdx) return
    if (item.tipo === 'modulo') router.push(`/modulo/${item.slug}`)
    if (item.tipo === 'aventura') router.push('/aventura')
  }

  function getEstado(item, idx) {
    if (item.tipo === 'modulo' && completados.includes(item.slug)) return 'completado'
    if (item.tipo === 'aventura' && aventuraCompletada) return 'completado'
    if (idx === currentIdx) return 'actual'
    if (idx > currentIdx) return 'bloqueado'
    return 'completado'
  }

  const userEmail = user?.email?.address || user?.google?.email || ''

  return (
    <>
      <PixelBg />

      <main className="relative z-10 min-h-screen px-4 py-6 max-w-[26.5rem] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h1
            className="text-xl tracking-tight"
            style={{ fontFamily: 'var(--font-pixel)', color: '#F97316' }}
          >
            KAKAW
          </h1>
          <div className="flex items-center gap-3">
            <div className="sats-badge" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
              <span>⚡</span>
              <span>{progreso.satsGanados}</span>
            </div>
            <button
              onClick={logout}
              title={userEmail}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)' }}
            >
              <UserIcon />
            </button>
          </div>
        </div>
        <p className="text-center uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
          La Historia del Dinero
        </p>

        {/* ── SINUOUS PATH ── */}
        <div className="relative flex flex-col items-center gap-0">
          {ITEMS.map((item, idx) => {
            const estado = getEstado(item, idx)
            const completado = estado === 'completado'
            const actual = estado === 'actual'
            const bloqueado = estado === 'bloqueado'
            const tema = item.tema || modulos.find(m => m.slug === item.slug)?.tema || {}
            const side = SIDE[idx] ?? 'center'

            // Bar colors
            const barBg = bloqueado
              ? 'rgba(255,255,255,0.08)'
              : actual
              ? 'linear-gradient(90deg, #F59E0B, #F97316)'
              : `linear-gradient(90deg, ${tema.nodoBg || '#1a2a3a'}, ${tema.accent || '#F97316'})`

            const barBorder = bloqueado
              ? 'rgba(255,255,255,0.08)'
              : actual
              ? '#F59E0B'
              : tema.accent || '#F97316'

            const offsetClass = side === 'right'
              ? 'mr-auto ml-4'
              : side === 'left'
              ? 'ml-auto mr-4'
              : 'mx-auto'

            return (
              <div key={item.id} className="w-full flex flex-col items-center">

                {/* Level bar */}
                <button
                  onClick={() => handleBarClick(item, idx)}
                  disabled={bloqueado}
                  className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 w-[88%] transition-all duration-300 ${offsetClass} ${actual ? 'scale-105' : ''} ${bloqueado ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-110 active:scale-95'}`}
                  style={{
                    background: barBg,
                    border: `2px solid ${barBorder}`,
                    boxShadow: actual ? `0 0 20px ${tema.sombra || 'rgba(245,158,11,0.4)'}` : 'none',
                    opacity: bloqueado ? 0.4 : 1,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,0,0,0.25)' }}
                  >
                    <ModuleIcon slug={item.tipo === 'aventura' ? 'aventura' : item.slug} size={24} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <p
                      className="font-bold leading-tight"
                      style={{
                        fontSize: '13px',
                        color: bloqueado ? 'rgba(255,255,255,0.4)' : '#fff',
                        fontFamily: 'var(--font-space)',
                      }}
                    >
                      {item.titulo}
                    </p>
                    {completado && (
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-space)' }}>
                        Completado · +71 ⚡
                      </p>
                    )}
                    {actual && (
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-space)' }}>
                        ¡Tu turno!
                      </p>
                    )}
                    {bloqueado && (
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-space)' }}>
                        Bloqueado
                      </p>
                    )}
                  </div>

                  {/* Kakaw on active bar */}
                  {actual && (
                    <div className="flex-shrink-0">
                      <KakawPixel mood="happy" size={44} />
                    </div>
                  )}

                  {/* Checkmark on completed */}
                  {completado && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm text-white"
                      style={{ background: '#22C55E' }}
                    >
                      ✓
                    </div>
                  )}

                  {/* Lock icon on blocked */}
                  {bloqueado && (
                    <PixelLock />
                  )}
                </button>

                {/* Curved connector between levels */}
                {idx < ITEMS.length - 1 && (
                  <CurveConnector fromSide={SIDE[idx]} toSide={SIDE[idx + 1]} />
                )}
              </div>
            )
          })}
        </div>

        {/* Finish flag */}
        <div className="flex flex-col items-center mt-4 mb-2">
          <FinishFlag done={todoCompleto} />
        </div>

        {/* Todo completo */}
        {todoCompleto && (
          <div className="mt-4 rounded-2xl border p-6 text-center space-y-4" style={{ background: 'rgba(14,8,0,0.85)', borderColor: 'rgba(249,115,22,0.4)' }}>
            <div className="flex justify-center"><KakawPixel mood="happy" size={80} /></div>
            <div>
              <p className="text-xl font-black" style={{ color: '#F97316' }}>¡Lo lograste!</p>
              <p className="text-sm mt-1" style={{ color: '#FCD34D' }}>Ganaste {progreso.satsGanados} sats ⚡</p>
            </div>
            <button
              onClick={() => router.push('/resultado')}
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', color: '#fff', fontFamily: 'var(--font-space)' }}
            >
              Ver mi resultado →
            </button>
          </div>
        )}

        <footer className="mt-10 text-center text-xs pb-6" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-pixel)', fontSize: '7px', lineHeight: '1.8' }}>
          HECHO CON CACAO<br />BITCOIN HACKATHON MÉXICO 2026<br />AUREO + ACEPTA BITCOIN
        </footer>
      </main>
    </>
  )
}

// ── Sub-components ──

function CurveConnector({ fromSide, toSide }) {
  // Shows a curved SVG connector between two bars
  // fromSide/toSide: 'left' | 'right' | 'center'
  const fromX = fromSide === 'right' ? 30 : fromSide === 'left' ? 70 : 50
  const toX = toSide === 'right' ? 30 : toSide === 'left' ? 70 : 50

  return (
    <svg width="100%" height="36" viewBox="0 0 100 36" preserveAspectRatio="none" style={{ opacity: 0.3 }}>
      <path
        d={`M ${fromX} 0 C ${fromX} 18, ${toX} 18, ${toX} 36`}
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
    </svg>
  )
}

function PixelLock() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
      <rect x="4" y="8" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="6" y="4" width="6" height="6" rx="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <rect x="8" y="11" width="2" height="4" rx="1" fill="rgba(255,255,255,0.5)" />
    </svg>
  )
}

function FinishFlag({ done }) {
  return (
    <div className="flex flex-col items-center gap-1 opacity-60">
      <svg width="24" height="28" viewBox="0 0 24 28" style={{ imageRendering: 'pixelated' }}>
        {/* pole */}
        <rect x="4" y="0" width="2" height="28" fill={done ? '#F59E0B' : 'rgba(255,255,255,0.4)'} />
        {/* flag checkerboard 4x3 */}
        {[0,1,2,3].map(col => [0,1,2].map(row => (
          <rect
            key={`${col}-${row}`}
            x={6 + col * 4} y={2 + row * 4} width="4" height="4"
            fill={(col + row) % 2 === 0
              ? (done ? '#F59E0B' : 'rgba(255,255,255,0.7)')
              : 'rgba(0,0,0,0.3)'}
          />
        )))}
      </svg>
      <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: done ? '#F59E0B' : 'rgba(255,255,255,0.4)' }}>
        {done ? 'FIN' : 'META'}
      </p>
    </div>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.6)" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

export default function BoardPage() {
  return (
    <Suspense fallback={null}>
      <BoardContent />
    </Suspense>
  )
}
