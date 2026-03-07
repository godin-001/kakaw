'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Kakaw from '@/components/Kakaw'
import { modulos } from '@/data/modulos'
import { cargarProgreso, resetearProgreso, generarCodigoRedención } from '@/lib/progreso'

const MAX_SATS = 6 * (21 + 50) + 3 * 100 + 210 // 636 + 210 = 636

export default function ResultadoPage() {
  const [progreso, setProgreso] = useState(null)
  const [codigo, setCodigo] = useState('')
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const p = cargarProgreso()
    setProgreso(p)
    setCodigo(generarCodigoRedención(p.satsGanados))
  }, [])

  if (!progreso) return null

  const sats = progreso.satsGanados
  const porcentaje = Math.min(Math.round((sats / MAX_SATS) * 100), 100)

  const nivel = porcentaje >= 90
    ? { label: 'Bitcoiner Maestro', emoji: '🏆', color: 'text-yellow-400', desc: 'Entiendes el dinero mejor que el 99% de la población.' }
    : porcentaje >= 65
    ? { label: 'Bitcoiner Novato', emoji: '₿', color: 'text-orange-400', desc: 'Sólido. Ya tienes la base para tomar decisiones financieras más inteligentes.' }
    : porcentaje >= 40
    ? { label: 'Aprendiz Monetario', emoji: '🌱', color: 'text-green-400', desc: 'Buen comienzo. Vuelve a intentarlo para mejorar tu score.' }
    : { label: 'Curioso del Dinero', emoji: '🔍', color: 'text-blue-400', desc: 'Empezaste el viaje. Cada lectura te enseña algo nuevo.' }

  function copiarCodigo() {
    navigator.clipboard.writeText(codigo).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  function reiniciar() {
    resetearProgreso()
    window.location.href = '/'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-[26.5rem] w-full space-y-5">

        {/* Kakaw + score */}
        <div className="card text-center border-orange-500/40 bg-orange-900/10 space-y-4">
          <div className="flex justify-center">
            <Kakaw mood="happy" size={100} />
          </div>
          <div>
            <p className="text-amber-500 text-xs uppercase tracking-widest mb-1">Nivel alcanzado</p>
            <h1 className={`text-2xl font-black ${nivel.color}`}>{nivel.label} {nivel.emoji}</h1>
            <p className="text-amber-400 text-xs mt-1 leading-snug">{nivel.desc}</p>
          </div>

          {/* Sats */}
          <div className="bg-amber-950 rounded-2xl p-4 border border-amber-800 space-y-2">
            <div className="flex justify-between text-sm text-amber-400">
              <span>Sats ganados</span>
              <span className="font-black text-orange-400">⚡ {sats} sats</span>
            </div>
            <div className="w-full bg-amber-900 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <p className="text-amber-600 text-xs text-center">{porcentaje}% del máximo posible</p>
          </div>
        </div>

        {/* Código de redención */}
        <div className="card border-orange-600/40 bg-orange-950/40 space-y-3">
          <div>
            <p className="text-orange-400 text-xs uppercase tracking-widest font-bold mb-1">
              ⚡ Tu código de sats
            </p>
            <p className="text-amber-400 text-xs leading-relaxed">
              Crea tu cuenta en Aureo e ingresa este código para reclamar tus {sats} sats.
            </p>
          </div>

          {/* El código */}
          <div className="bg-amber-950 border-2 border-orange-600 rounded-xl p-4 text-center">
            <p className="text-orange-300 font-black text-lg tracking-widest font-mono">
              {codigo}
            </p>
          </div>

          <button
            onClick={copiarCodigo}
            className="btn-secondary w-full text-sm"
          >
            {copiado ? '✅ ¡Copiado!' : '📋 Copiar código'}
          </button>

          <a
            href="https://www.aureobitcoin.com/es"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center"
          >
            Crear cuenta en Aureo →
          </a>
          <p className="text-amber-700 text-xs text-center">
            ¿Ya tienes cuenta? Ingresa el código en tu perfil para reclamar tus sats.
          </p>
        </div>

        {/* Módulos completados */}
        <div className="card space-y-3">
          <p className="text-amber-500 text-xs uppercase tracking-widest font-bold">Tu recorrido</p>
          <div className="space-y-2">
            {modulos.map(m => {
              const completado = (progreso.modulosCompletados || []).includes(m.slug)
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="text-lg">{m.emoji}</span>
                  <span className={`text-sm flex-1 ${completado ? 'text-amber-300' : 'text-amber-700'}`}>
                    {m.titulo}
                  </span>
                  {completado
                    ? <span className="text-orange-400 text-xs font-bold">+71 ⚡</span>
                    : <span className="text-amber-800 text-xs">—</span>
                  }
                </div>
              )
            })}
            <div className="flex items-center gap-3">
              <span className="text-lg">🎮</span>
              <span className={`text-sm flex-1 ${progreso.aventuraCompletada ? 'text-amber-300' : 'text-amber-700'}`}>
                Mueve tu Lana
              </span>
              {progreso.aventuraCompletada
                ? <span className="text-orange-400 text-xs font-bold">+{210 + 3*100} ⚡</span>
                : <span className="text-amber-800 text-xs">—</span>
              }
            </div>
          </div>
        </div>

        {/* Compartir + reiniciar */}
        <div className="card text-center space-y-2 border-amber-800/30">
          <p className="text-amber-400 text-sm font-medium">
            ¿Te gustó Kakaw?
          </p>
          <p className="text-amber-500 text-xs">
            Compártelo con alguien que todavía crea que Bitcoin es una estafa 😏
          </p>
        </div>

        <button onClick={reiniciar} className="btn-secondary w-full text-sm">
          🔄 Volver a empezar
        </button>

        <footer className="text-center text-amber-800 text-xs pb-2">
          Hecho con 🍫 · Bitcoin Hackathon México 2026<br />
          Aureo + Acepta Bitcoin
        </footer>

      </div>
    </main>
  )
}
