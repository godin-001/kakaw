'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Kakaw from '@/components/Kakaw'
import { modulos } from '@/data/modulos'
import { cargarProgreso } from '@/lib/progreso'

// Items del path: 6 módulos + Mueve tu Lana
const ITEMS = [
  ...modulos.map(m => ({ tipo: 'modulo', ...m })),
  {
    tipo: 'aventura',
    id: 7,
    slug: 'aventura',
    titulo: 'Mueve tu Lana',
    emoji: '🎮',
  },
]

// Alterna izquierda/derecha para el efecto sinuoso
const OFFSET = ['justify-start', 'justify-end', 'justify-start', 'justify-end', 'justify-start', 'justify-end', 'justify-center']

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

  // Índice del item actual (primero no completado)
  const currentIdx = (() => {
    for (let i = 0; i < ITEMS.length; i++) {
      const item = ITEMS[i]
      if (item.tipo === 'modulo' && !completados.includes(item.slug)) return i
      if (item.tipo === 'aventura' && completados.length === modulos.length && !aventuraCompletada) return i
    }
    return ITEMS.length // Todo completo
  })()

  const todoCompleto = currentIdx >= ITEMS.length

  function handleNodeClick(item, idx) {
    if (idx > currentIdx) return
    if (item.tipo === 'modulo') router.push(`/modulo/${item.slug}`)
    if (item.tipo === 'aventura') router.push('/aventura')
  }

  function getNodeEstado(item, idx) {
    if (item.tipo === 'modulo') {
      if (completados.includes(item.slug)) return 'completado'
    }
    if (item.tipo === 'aventura') {
      if (aventuraCompletada) return 'completado'
    }
    if (idx === currentIdx) return 'actual'
    if (idx > currentIdx) return 'bloqueado'
    return 'completado'
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-sm mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-black text-orange-400 tracking-tight">KAKAW</h1>
        <div className="flex items-center gap-1.5 bg-orange-950 border border-orange-800 rounded-full px-4 py-2">
          <span className="text-orange-400 text-sm">⚡</span>
          <span className="text-orange-300 font-bold text-sm">{progreso.satsGanados} sats</span>
        </div>
      </div>
      <p className="text-amber-600 text-xs text-center uppercase tracking-widest mb-8">
        La Historia del Dinero · Parte 1
      </p>

      {/* Banner bienvenida (solo primera vez) */}
      {mostrarBienvenida && (
        <div className="card border-orange-500/40 bg-orange-950/40 mb-8 text-center space-y-3">
          <div className="flex justify-center">
            <Kakaw mood="happy" size={90} />
          </div>
          <p className="text-amber-100 font-bold text-lg leading-snug">
            ¡Hola! Soy Kakaw 🍫
          </p>
          <p className="text-amber-300 text-sm leading-relaxed">
            Soy un grano de cacao que ha visto todo — desde el trueque hasta Bitcoin.
            Vamos a recorrer 5,000 años de historia del dinero juntos.
          </p>
          <p className="text-orange-400 text-xs font-semibold">
            Responde bien y gana sats reales ⚡
          </p>
          <button
            onClick={() => setMostrarBienvenida(false)}
            className="btn-primary w-full"
          >
            ¡Empezamos! →
          </button>
        </div>
      )}

      {/* Path */}
      {!mostrarBienvenida && (
        <div className="relative flex flex-col">

          {/* Línea vertical central */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-amber-900 z-0"
            style={{ top: 40, bottom: 40 }}
          />

          {ITEMS.map((item, idx) => {
            const estado = getNodeEstado(item, idx)
            const completado = estado === 'completado'
            const actual = estado === 'actual'
            const bloqueado = estado === 'bloqueado'
            const offset = OFFSET[idx] || 'justify-center'
            const kakawAquiIzq = actual && (offset === 'justify-start')
            const kakawAquiDer = actual && (offset === 'justify-end' || offset === 'justify-center')

            return (
              <div key={item.id} className="flex flex-col items-center z-10 mb-1">

                {/* Fila del nodo */}
                <div className={`flex items-center w-full ${offset} relative`}>

                  {/* Kakaw a la derecha del nodo (cuando el nodo está a la izquierda) */}
                  {kakawAquiIzq && (
                    <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                      <div className="bg-amber-900 border border-orange-700 rounded-2xl rounded-tl-sm px-3 py-1.5 max-w-[120px]">
                        <p className="text-amber-300 text-xs leading-snug">¡Toca para continuar!</p>
                      </div>
                      <Kakaw mood="happy" size={56} />
                    </div>
                  )}

                  {/* Nodo */}
                  <button
                    onClick={() => handleNodeClick(item, idx)}
                    disabled={bloqueado}
                    className={`
                      relative flex flex-col items-center justify-center
                      w-[72px] h-[72px] rounded-full border-4 flex-shrink-0
                      transition-all duration-200
                      ${completado ? 'bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/30 hover:scale-105' : ''}
                      ${actual ? 'bg-amber-950 border-orange-500 shadow-xl shadow-orange-500/40 scale-110 animate-pulse cursor-pointer' : ''}
                      ${bloqueado ? 'bg-amber-950 border-amber-800 opacity-35 cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="text-2xl leading-none">
                      {bloqueado ? '🔒' : item.emoji}
                    </span>
                    {completado && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-black">
                        ✓
                      </span>
                    )}
                  </button>

                  {/* Kakaw a la izquierda del nodo (cuando el nodo está a la derecha) */}
                  {kakawAquiDer && (
                    <div className="flex items-center gap-1 mr-3 flex-shrink-0">
                      <Kakaw mood="happy" size={56} />
                      <div className="bg-amber-900 border border-orange-700 rounded-2xl rounded-tr-sm px-3 py-1.5 max-w-[120px]">
                        <p className="text-amber-300 text-xs leading-snug">¡Toca para continuar!</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Nombre del módulo */}
                <p className={`
                  text-xs font-semibold mt-1.5 text-center px-2
                  ${completado ? 'text-orange-400' : actual ? 'text-amber-200' : 'text-amber-800'}
                `}>
                  {item.titulo}
                </p>

                {/* Sats ganados en este nodo */}
                {completado && item.tipo === 'modulo' && (
                  <p className="text-orange-500 text-[10px] font-bold">+71 ⚡</p>
                )}
                {completado && item.tipo === 'aventura' && (
                  <p className="text-orange-500 text-[10px] font-bold">+{210 + 100} ⚡</p>
                )}

                {/* Conector al siguiente */}
                {idx < ITEMS.length - 1 && (
                  <div className="h-7 w-0.5 bg-amber-900 mt-1" />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Banner de completado total */}
      {todoCompleto && (
        <div className="mt-8 card text-center border-orange-500/40 bg-orange-900/20 space-y-4">
          <div className="flex justify-center">
            <Kakaw mood="happy" size={100} />
          </div>
          <div>
            <p className="text-3xl font-black text-orange-400">¡Lo lograste!</p>
            <p className="text-amber-300 text-sm mt-1">Reclamaste {progreso.satsGanados} sats ⚡</p>
          </div>
          <button
            onClick={() => router.push('/resultado')}
            className="btn-primary w-full text-lg"
          >
            Ver mi resultado →
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 text-center text-amber-800 text-xs pb-4">
        Hecho con 🍫 · Bitcoin Hackathon México 2026<br />
        Aureo + Acepta Bitcoin
      </footer>

    </main>
  )
}
