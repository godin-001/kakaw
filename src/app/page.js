'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Kakaw from '@/components/Kakaw'
import { modulos } from '@/data/modulos'
import { cargarProgreso } from '@/lib/progreso'

const AVENTURA_TEMA = {
  accent: '#A855F7',
  nodoBg: '#581C87',
  nodoBorder: '#A855F7',
  sombra: 'rgba(168, 85, 247, 0.4)',
  texto: '#E9D5FF',
}

const ITEMS = [
  ...modulos.map(m => ({ tipo: 'modulo', ...m })),
  {
    tipo: 'aventura',
    id: 7,
    slug: 'aventura',
    titulo: 'Mueve tu Lana',
    emoji: '🎮',
    tema: AVENTURA_TEMA,
  },
]

// Path sinuoso: alterna izquierda / derecha
const OFFSET = [
  'justify-start',
  'justify-end',
  'justify-start',
  'justify-end',
  'justify-start',
  'justify-end',
  'justify-center',
]

export default function BoardPage() {
  const router = useRouter()
  const [progreso, setProgreso] = useState(null)
  const [mostrarBienvenida, setMostrarBienvenida] = useState(false)

  useEffect(() => {
    const p = cargarProgreso()
    setProgreso(p)
    if (p.modulosCompletados.length === 0 && !p.aventuraCompletada) {
      setMostrarBienvenida(true)
    }
  }, [])

  if (!progreso) return null

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

  function handleNodeClick(item, idx) {
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

  return (
    <main className="min-h-screen px-4 py-6 max-w-[26.5rem] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black tracking-tight" style={{ color: '#F97316' }}>
          KAKAW
        </h1>
        <div className="sats-badge">
          <span>⚡</span>
          <span>{progreso.satsGanados} sats</span>
        </div>
      </div>
      <p className="text-xs text-center uppercase tracking-widest mb-8" style={{ color: '#78350F' }}>
        La Historia del Dinero · Parte 1
      </p>

      {/* Banner bienvenida */}
      {mostrarBienvenida && (
        <div
          className="rounded-3xl border p-5 mb-8 text-center space-y-4"
          style={{
            background: 'linear-gradient(160deg, #1A0800 0%, #2D1A06 100%)',
            borderColor: 'rgba(249,115,22,0.3)',
          }}
        >
          <div className="flex justify-center">
            <Kakaw mood="happy" size={100} />
          </div>
          <div>
            <p className="text-amber-100 font-black text-xl">¡Hola! Soy Kakaw 🍫</p>
            <p className="text-amber-300 text-sm leading-relaxed mt-2">
              Soy un grano de cacao que ha visto todo — desde el trueque hasta Bitcoin.
              Vamos a recorrer 5,000 años de historia del dinero juntos.
            </p>
            <p className="text-orange-400 text-xs font-bold mt-2">
              Responde bien y gana sats reales ⚡
            </p>
          </div>
          <button onClick={() => setMostrarBienvenida(false)} className="btn-primary w-full">
            ¡Empezamos! →
          </button>
        </div>
      )}

      {/* Path */}
      {!mostrarBienvenida && (
        <div className="relative flex flex-col">

          {/* Línea vertical de fondo */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-0 w-0.5"
            style={{
              top: 36,
              bottom: 36,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.06) 100%)',
            }}
          />

          {ITEMS.map((item, idx) => {
            const estado = getEstado(item, idx)
            const completado = estado === 'completado'
            const actual = estado === 'actual'
            const bloqueado = estado === 'bloqueado'
            const offset = OFFSET[idx] || 'justify-center'
            const tema = item.tema || {}

            const kakawIzq = actual && offset === 'justify-start'
            const kakawDer = actual && (offset === 'justify-end' || offset === 'justify-center')

            // Estilos del nodo según estado
            const nodoStyle = bloqueado
              ? { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }
              : completado
              ? { background: tema.nodoBg, borderColor: tema.nodoBorder, boxShadow: `0 0 20px ${tema.sombra}` }
              : actual
              ? { background: 'transparent', borderColor: tema.accent, boxShadow: `0 0 30px ${tema.sombra}` }
              : {}

            return (
              <div key={item.id} className="flex flex-col items-center z-10 mb-1">

                <div className={`flex items-center w-full ${offset} relative`}>

                  {/* Kakaw derecha del nodo (nodo a izq) */}
                  {kakawIzq && (
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <div
                        className="rounded-2xl rounded-tl-sm px-3 py-2"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: `1px solid ${tema.accent}50`,
                        }}
                      >
                        <p className="text-xs leading-snug" style={{ color: tema.texto }}>
                          ¡Toca para continuar!
                        </p>
                      </div>
                      <Kakaw mood="happy" size={52} />
                    </div>
                  )}

                  {/* Nodo */}
                  <button
                    onClick={() => handleNodeClick(item, idx)}
                    disabled={bloqueado}
                    style={nodoStyle}
                    className={`
                      relative flex flex-col items-center justify-center
                      w-[72px] h-[72px] rounded-full border-[3px] flex-shrink-0
                      transition-all duration-300
                      ${actual ? 'scale-110 animate-pulse' : ''}
                      ${!bloqueado && !actual ? 'hover:scale-105' : ''}
                      ${bloqueado ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}
                    `}
                  >
                    <span className="text-2xl leading-none">
                      {bloqueado ? '🔒' : item.emoji}
                    </span>
                    {completado && (
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                        style={{ background: '#22C55E' }}
                      >
                        ✓
                      </span>
                    )}
                  </button>

                  {/* Kakaw izquierda del nodo (nodo a der) */}
                  {kakawDer && (
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <Kakaw mood="happy" size={52} />
                      <div
                        className="rounded-2xl rounded-tr-sm px-3 py-2"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: `1px solid ${tema.accent}50`,
                        }}
                      >
                        <p className="text-xs leading-snug" style={{ color: tema.texto }}>
                          ¡Toca para continuar!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Nombre */}
                <p
                  className="text-xs font-semibold mt-1.5 text-center"
                  style={{
                    color: completado ? tema.accent : actual ? '#FEF3C7' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {item.titulo}
                </p>

                {/* Sats ganados */}
                {completado && item.tipo === 'modulo' && (
                  <p className="text-[10px] font-bold mt-0.5" style={{ color: tema.accent }}>
                    +71 ⚡
                  </p>
                )}

                {/* Conector */}
                {idx < ITEMS.length - 1 && (
                  <div className="h-6 w-0.5 mt-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Banner todo completo */}
      {todoCompleto && (
        <div
          className="mt-8 rounded-3xl border p-6 text-center space-y-4"
          style={{
            background: 'linear-gradient(160deg, #1A0800 0%, #2D1200 100%)',
            borderColor: 'rgba(249,115,22,0.4)',
          }}
        >
          <div className="flex justify-center">
            <Kakaw mood="happy" size={100} />
          </div>
          <div>
            <p className="text-3xl font-black text-orange-400">¡Lo lograste!</p>
            <p className="text-amber-300 text-sm mt-1">Ganaste {progreso.satsGanados} sats ⚡</p>
          </div>
          <button onClick={() => router.push('/resultado')} className="btn-primary w-full text-lg">
            Ver mi resultado →
          </button>
        </div>
      )}

      <footer className="mt-10 text-center text-xs pb-4" style={{ color: 'rgba(255,255,255,0.15)' }}>
        Hecho con 🍫 · Bitcoin Hackathon México 2026<br />
        Aureo + Acepta Bitcoin
      </footer>

    </main>
  )
}
