'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { modulos } from '@/data/modulos'

const MAX_PUNTOS = 500 + 150 // 5 módulos × 100 + 3 escenarios × 50

export default function ResultadoPage() {
  const [puntos, setPuntos] = useState(0)
  const [cargado, setCargado] = useState(false)

  useEffect(() => {
    const guardado = localStorage.getItem('kakaw_final')
    if (guardado) {
      const data = JSON.parse(guardado)
      setPuntos(data.puntos || 0)
    }
    setCargado(true)
  }, [])

  const porcentaje = Math.round((puntos / MAX_PUNTOS) * 100)

  const nivel = porcentaje >= 90
    ? { label: 'Bitcoiner Maestro', emoji: '🏆', color: 'text-yellow-400', desc: 'Entiendes el dinero mejor que el 99% de la población. Satoshi estaría orgulloso.' }
    : porcentaje >= 70
    ? { label: 'Bitcoiner Novato', emoji: '₿', color: 'text-orange-400', desc: 'Sólido. Tienes la base para tomar decisiones financieras más inteligentes.' }
    : porcentaje >= 50
    ? { label: 'Aprendiz Monetario', emoji: '🌱', color: 'text-green-400', desc: 'Buen comienzo. La historia del dinero es compleja y ya vas entendiendo el patrón.' }
    : { label: 'Curioso del Dinero', emoji: '🔍', color: 'text-blue-400', desc: 'Empezaste el viaje. Vuelve a intentarlo — cada lectura te enseña algo nuevo.' }

  const badges = modulos.map(m => ({ nombre: m.badgeNombre, emoji: m.emoji }))
  badges.push({ nombre: 'Bitcoiner Novato', emoji: '₿' })

  if (!cargado) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-amber-400 text-xl animate-pulse">Calculando tu score...</div>
    </main>
  )

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full space-y-6">

        {/* Score principal */}
        <div className="card text-center border-orange-500/40 bg-orange-900/10 space-y-4">
          <div className="text-6xl">{nivel.emoji}</div>
          <div>
            <p className="text-amber-500 text-xs uppercase tracking-widest mb-1">Nivel alcanzado</p>
            <h1 className={`text-3xl font-black ${nivel.color}`}>{nivel.label}</h1>
          </div>

          {/* Puntos */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-amber-400">
              <span>Puntos obtenidos</span>
              <span className="font-bold text-orange-400">{puntos} / {MAX_PUNTOS}</span>
            </div>
            <div className="w-full bg-amber-900 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <p className="text-amber-500 text-xs">{porcentaje}% del puntaje máximo</p>
          </div>

          <p className="text-amber-300 text-sm leading-relaxed italic">{nivel.desc}</p>
        </div>

        {/* Badges */}
        <div className="card space-y-4">
          <p className="text-amber-500 text-xs uppercase tracking-widest font-bold">Badges desbloqueados</p>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="bg-amber-900/60 border border-amber-700/50 rounded-xl p-3 flex items-center gap-3"
              >
                <span className="text-2xl">{badge.emoji}</span>
                <span className="text-amber-200 text-xs font-medium leading-tight">{badge.nombre}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del viaje */}
        <div className="card space-y-3">
          <p className="text-amber-500 text-xs uppercase tracking-widest font-bold">Tu viaje</p>
          <div className="space-y-2">
            {modulos.map(m => (
              <div key={m.id} className="flex items-center gap-3">
                <span className="text-xl">{m.emoji}</span>
                <span className="text-amber-300 text-sm flex-1">{m.titulo}</span>
                <span className="text-green-400 text-xs font-bold">✓ Completado</span>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <span className="text-xl">🏦</span>
              <span className="text-amber-300 text-sm flex-1">Mini-aventura bancaria</span>
              <span className="text-green-400 text-xs font-bold">✓ Completado</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <a
            href="https://www.aureobitcoin.com/es"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center"
          >
            ⚡ Compra tus primeros sats en Aureo →
          </a>
          <Link href="/" className="btn-secondary block text-center">
            🔄 Volver a empezar
          </Link>
        </div>

        {/* Compartir */}
        <div className="card text-center space-y-2 border-amber-800/30">
          <p className="text-amber-500 text-xs uppercase tracking-widest">¿Te gustó Kakaw?</p>
          <p className="text-amber-400 text-sm">Compártelo con alguien que todavía crea que Bitcoin es una estafa 😏</p>
        </div>

        <footer className="text-center text-amber-700 text-xs">
          Hecho con 🍫 · Bitcoin Hackathon México 2026 · Aureo + Acepta Bitcoin
        </footer>

      </div>
    </main>
  )
}
