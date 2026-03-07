'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import KakawPixel from '@/components/KakawPixel'
import ModuleIcon from '@/components/ModuleIcon'
import PixelBg from '@/components/PixelBg'
import { modulos } from '@/data/modulos'
import { cargarProgreso, resetearProgreso } from '@/lib/progreso'

const AVENTURA_TEMA = {
  accent: '#A855F7',
  nodoBg: '#581C87',
  nodoBorder: '#A855F7',
  sombra: 'rgba(168, 85, 247, 0.4)',
  texto: '#E9D5FF',
}

const ITEMS = [
  ...modulos.map(m => ({ tipo: 'modulo', ...m })),
  { tipo: 'aventura', id: 7, slug: 'aventura', titulo: 'Mueve tu Lana', tema: AVENTURA_TEMA },
]

// Offset lateral desde el centro (px)
const OFFSET_X = [-28, 28, -28, 28, -28, 28, 0]

function BoardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [progreso, setProgreso] = useState(null)
  const [mostrarBienvenida, setMostrarBienvenida] = useState(false)

  useEffect(() => {
    // Reset secreto para testing: /?reset=1
    if (searchParams.get('reset') === '1') {
      resetearProgreso()
      window.location.href = '/'
      return
    }
    const p = cargarProgreso()
    setProgreso(p)
    if (p.modulosCompletados.length === 0 && !p.aventuraCompletada) {
      setMostrarBienvenida(true)
    }
  }, [searchParams])

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
          <div className="sats-badge" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
            <span>⚡</span>
            <span>{progreso.satsGanados}</span>
          </div>
        </div>
        <p className="text-xs text-center uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
          La Historia del Dinero
        </p>

        {/* Banner bienvenida */}
        {mostrarBienvenida && (
          <div
            className="rounded-2xl border p-5 mb-6 text-center space-y-4"
            style={{ background: 'rgba(14,8,0,0.85)', borderColor: 'rgba(249,115,22,0.4)', backdropFilter: 'blur(4px)' }}
          >
            <div className="flex justify-center">
              <KakawPixel mood="happy" size={90} />
            </div>
            <div>
              <p className="font-black text-xl text-white">¡Hola! Soy Kakaw</p>
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
          <div className="relative flex flex-col items-center">

            {/* Línea vertical central */}
            <div
              className="absolute z-0 w-0.5"
              style={{ top: 34, bottom: 34, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.15)' }}
            />

            {ITEMS.map((item, idx) => {
              const estado = getEstado(item, idx)
              const completado = estado === 'completado'
              const actual = estado === 'actual'
              const bloqueado = estado === 'bloqueado'
              const tema = item.tema || {}
              const offsetX = OFFSET_X[idx] ?? 0
              const isLeft = offsetX < 0   // node shifts left → name goes right
              const isRight = offsetX >= 0  // node shifts right or center → name goes left

              const nodoStyle = bloqueado
                ? { background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.1)' }
                : completado
                ? { background: tema.nodoBg, borderColor: tema.nodoBorder, boxShadow: `0 0 16px ${tema.sombra}` }
                : actual
                ? { background: 'rgba(14,8,0,0.7)', borderColor: tema.accent, boxShadow: `0 0 24px ${tema.sombra}` }
                : {}

              return (
                <div key={item.id} className="flex flex-col items-center z-10 mb-1 w-full">

                  {/* Fila: nombre AL LADO del nodo */}
                  <div
                    className="flex items-center w-full"
                    style={{ transform: `translateX(${offsetX}px)`, justifyContent: isLeft ? 'flex-start' : 'flex-end' }}
                  >
                    {/* Nodo a izquierda → nombre a la DERECHA */}
                    {isLeft && (
                      <>
                        {/* Nodo */}
                        <button
                          onClick={() => handleNodeClick(item, idx)}
                          disabled={bloqueado}
                          style={nodoStyle}
                          className={`relative flex items-center justify-center w-16 h-16 rounded-full border-[3px] flex-shrink-0 transition-all duration-300 ${actual ? 'scale-110' : ''} ${!bloqueado ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-30'}`}
                        >
                          {bloqueado
                            ? <span style={{ imageRendering: 'pixelated', fontSize: '20px' }}>🔒</span>
                            : <ModuleIcon slug={item.slug || item.tipo === 'aventura' ? 'aventura' : item.slug} size={32} />
                          }
                          {completado && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: '#22C55E' }}>✓</span>
                          )}
                        </button>

                        {/* Nombre a la derecha */}
                        <div className="ml-3 flex flex-col">
                          <p
                            className="font-semibold leading-tight"
                            style={{
                              fontSize: '17px',
                              color: completado ? tema.accent : actual ? '#FFFEF5' : 'rgba(255,255,255,0.25)',
                            }}
                          >
                            {item.titulo}
                          </p>
                          {completado && item.tipo === 'modulo' && (
                            <p className="text-xs font-bold mt-0.5" style={{ color: tema.accent }}>+71 ⚡</p>
                          )}
                        </div>

                        {/* Kakaw al extremo derecho cuando es actual */}
                        {actual && (
                          <div className="ml-3 flex-shrink-0">
                            <KakawPixel mood="happy" size={52} />
                          </div>
                        )}
                      </>
                    )}

                    {/* Nodo a derecha → nombre a la IZQUIERDA */}
                    {isRight && (
                      <>
                        {/* Kakaw al extremo izquierdo cuando es actual */}
                        {actual && (
                          <div className="mr-3 flex-shrink-0">
                            <KakawPixel mood="happy" size={52} />
                          </div>
                        )}

                        {/* Nombre a la izquierda */}
                        <div className="mr-3 flex flex-col items-end">
                          <p
                            className="font-semibold leading-tight text-right"
                            style={{
                              fontSize: '17px',
                              color: completado ? tema.accent : actual ? '#FFFEF5' : 'rgba(255,255,255,0.25)',
                            }}
                          >
                            {item.titulo}
                          </p>
                          {completado && item.tipo === 'modulo' && (
                            <p className="text-xs font-bold mt-0.5" style={{ color: tema.accent }}>+71 ⚡</p>
                          )}
                        </div>

                        {/* Nodo */}
                        <button
                          onClick={() => handleNodeClick(item, idx)}
                          disabled={bloqueado}
                          style={nodoStyle}
                          className={`relative flex items-center justify-center w-16 h-16 rounded-full border-[3px] flex-shrink-0 transition-all duration-300 ${actual ? 'scale-110' : ''} ${!bloqueado ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-30'}`}
                        >
                          {bloqueado
                            ? <span style={{ imageRendering: 'pixelated', fontSize: '20px' }}>🔒</span>
                            : <ModuleIcon slug={item.tipo === 'aventura' ? 'aventura' : item.slug} size={32} />
                          }
                          {completado && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: '#22C55E' }}>✓</span>
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Conector */}
                  {idx < ITEMS.length - 1 && (
                    <div className="h-6 w-0.5 mt-1" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Todo completo */}
        {todoCompleto && (
          <div className="mt-8 rounded-2xl border p-6 text-center space-y-4" style={{ background: 'rgba(14,8,0,0.85)', borderColor: 'rgba(249,115,22,0.4)', backdropFilter: 'blur(4px)' }}>
            <div className="flex justify-center"><KakawPixel mood="happy" size={90} /></div>
            <div>
              <p className="text-2xl font-black text-orange-400">¡Lo lograste!</p>
              <p className="text-amber-300 text-sm mt-1">Ganaste {progreso.satsGanados} sats ⚡</p>
            </div>
            <button onClick={() => router.push('/resultado')} className="btn-primary w-full">
              Ver mi resultado →
            </button>
          </div>
        )}

        <footer className="mt-10 text-center text-xs pb-6" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-pixel)', fontSize: '7px', lineHeight: '1.8' }}>
          HECHO CON 🍫<br />BITCOIN HACKATHON MÉXICO 2026<br />AUREO + ACEPTA BITCOIN
        </footer>
      </main>
    </>
  )
}

export default function BoardPage() {
  return (
    <Suspense fallback={null}>
      <BoardContent />
    </Suspense>
  )
}
