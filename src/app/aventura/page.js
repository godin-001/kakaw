'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { escenarios, cierre } from '@/data/escenarios'

const FASES = { INTRO: 'intro', ESCENARIO: 'escenario', RESULTADO: 'resultado', CIERRE: 'cierre' }

export default function AventuraPage() {
  const router = useRouter()
  const [fase, setFase] = useState(FASES.INTRO)
  const [escenarioIdx, setEscenarioIdx] = useState(0)
  const [eleccion, setEleccion] = useState(null) // 'banco' | 'bitcoin'
  const [puntosBase, setPuntosBase] = useState(0)
  const [puntosAventura, setPuntosAventura] = useState(0)

  useEffect(() => {
    const guardado = localStorage.getItem('kakaw_puntos')
    if (guardado) {
      const data = JSON.parse(guardado)
      setPuntosBase(data.puntos || 0)
    }
  }, [])

  const escenario = escenarios[escenarioIdx]
  const totalEscenarios = escenarios.length
  const puntosTotal = puntosBase + puntosAventura

  function elegir(tipo) {
    setEleccion(tipo)
    if (tipo === 'bitcoin') setPuntosAventura(p => p + 50)
    setFase(FASES.RESULTADO)
  }

  function siguiente() {
    if (escenarioIdx < totalEscenarios - 1) {
      setEscenarioIdx(i => i + 1)
      setEleccion(null)
      setFase(FASES.ESCENARIO)
    } else {
      setFase(FASES.CIERRE)
    }
  }

  function irAResultados() {
    const puntosFinales = puntosBase + puntosAventura
    localStorage.setItem('kakaw_final', JSON.stringify({ puntos: puntosFinales }))
    router.push('/resultado')
  }

  // — INTRO —
  if (fase === FASES.INTRO) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full space-y-6">
          <div className="text-center space-y-3">
            <div className="text-6xl">🏦</div>
            <h1 className="text-3xl font-black text-amber-100">El Banco te va a odiar por esto</h1>
            <p className="text-amber-400">Parte 2 de tu aventura</p>
          </div>

          <div className="card space-y-3">
            <p className="text-amber-200 leading-relaxed">
              Ya sabes la historia. Ahora vívela.
            </p>
            <p className="text-amber-300 leading-relaxed text-sm">
              En los siguientes escenarios vas a enfrentarte a situaciones reales que millones de mexicanos viven todos los días. Tú decides: ¿el sistema tradicional o Bitcoin?
            </p>
            <div className="bg-amber-900/40 rounded-xl p-3 border border-amber-700/50">
              <p className="text-amber-500 text-xs uppercase tracking-widest mb-1">Spoiler</p>
              <p className="text-amber-300 text-sm italic">
                "Es broma... pero no es broma 👀"
              </p>
            </div>
          </div>

          <button onClick={() => setFase(FASES.ESCENARIO)} className="btn-primary w-full text-lg">
            Empezar mini-aventura →
          </button>
        </div>
      </main>
    )
  }

  // — ESCENARIO (elección) —
  if (fase === FASES.ESCENARIO) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full space-y-6">

          {/* Progreso */}
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-amber-500">Escenario {escenarioIdx + 1} de {totalEscenarios}</span>
            <span className="text-orange-400 font-bold">{puntosTotal} pts</span>
          </div>
          <div className="w-full bg-amber-900 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(escenarioIdx / totalEscenarios) * 100}%` }}
            />
          </div>

          {/* Escenario */}
          <div className="text-center space-y-2">
            <div className="text-5xl">{escenario.emoji}</div>
            <h2 className="text-xl font-black text-amber-100 leading-snug">
              {escenario.titulo}
            </h2>
            <p className="text-amber-400 text-sm leading-relaxed">{escenario.descripcion}</p>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-2 gap-4">
            {escenario.opciones.map((op) => (
              <button
                key={op.tipo}
                onClick={() => elegir(op.tipo)}
                className={`card text-center py-8 px-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:border-orange-500/70 active:scale-95 ${
                  op.tipo === 'bitcoin' ? 'border-orange-800/50 hover:bg-orange-900/30' : 'border-amber-800/50'
                }`}
              >
                <div className="text-4xl mb-3">{op.emoji}</div>
                <p className="font-bold text-amber-100 text-sm leading-snug">{op.label}</p>
              </button>
            ))}
          </div>

        </div>
      </main>
    )
  }

  // — RESULTADO del escenario —
  if (fase === FASES.RESULTADO && eleccion) {
    const esBanco = eleccion === 'banco'
    const resultado = esBanco ? escenario.resultadoBanco : escenario.resultadoBitcoin

    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full space-y-5">

          {/* Header resultado */}
          <div className={`card text-center border-2 ${esBanco ? 'border-red-500/50 bg-red-950/30' : 'border-green-500/50 bg-green-950/30'}`}>
            <h2 className={`text-4xl font-black mb-2 ${esBanco ? 'text-red-400' : 'text-green-400'}`}>
              {resultado.titulo}
            </h2>
            {!esBanco && <p className="text-green-400 font-bold text-sm">+50 puntos ⚡</p>}
          </div>

          {/* Pasos */}
          <div className="card space-y-2">
            {resultado.pasos.map((paso, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`text-sm font-bold mt-0.5 ${esBanco ? 'text-red-400' : 'text-green-400'}`}>
                  {esBanco ? '😤' : '✅'}
                </span>
                <p className="text-amber-200 text-sm leading-relaxed">{paso}</p>
              </div>
            ))}
          </div>

          {/* Mensaje con humor */}
          <div className={`card text-center border ${esBanco ? 'border-red-800/50 bg-red-900/20' : 'border-orange-500/30 bg-orange-900/20'}`}>
            <p className={`font-bold text-lg ${esBanco ? 'text-red-300' : 'text-orange-300'}`}>
              {resultado.mensaje}
            </p>
            <p className={`text-sm mt-1 ${esBanco ? 'text-red-400' : 'text-amber-400'}`}>
              {resultado.subtexto}
            </p>
          </div>

          <button onClick={siguiente} className="btn-primary w-full text-lg">
            {escenarioIdx < totalEscenarios - 1 ? 'Siguiente escenario →' : 'Ver mi resultado final →'}
          </button>

        </div>
      </main>
    )
  }

  // — CIERRE —
  if (fase === FASES.CIERRE) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full space-y-6">

          <div className="text-center space-y-2">
            <div className="text-5xl">₿</div>
            <h2 className="text-2xl font-black text-amber-100">{cierre.titulo}</h2>
          </div>

          <div className="card space-y-4">
            {cierre.reflexion.split('\n\n').map((p, i) => (
              <p key={i} className="text-amber-300 text-sm leading-relaxed">{p}</p>
            ))}
          </div>

          <div className="card border-orange-500/40 bg-orange-900/10 text-center space-y-3">
            <p className="text-orange-300 font-bold text-lg">{cierre.mensaje}</p>
            <a
              href={cierre.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block"
            >
              {cierre.cta.texto}
            </a>
            <p className="text-amber-600 text-xs">Se abre en una nueva pestaña</p>
          </div>

          <div className="card border-amber-800/30 bg-amber-900/20 text-center">
            <p className="text-amber-600 text-xs uppercase tracking-widest mb-1">Próximamente</p>
            <p className="text-amber-400 text-sm">{cierre.proximamente.texto}</p>
          </div>

          <button onClick={irAResultados} className="btn-secondary w-full">
            Ver mi score y badges →
          </button>

        </div>
      </main>
    )
  }

  return null
}
