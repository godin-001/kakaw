'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { escenarios, cierre } from '@/data/escenarios'
import Kakaw from '@/components/Kakaw'
import {
  cargarProgreso,
  completarEscenario,
  completarAventura,
  SATS_ESCENARIO_CORRECTO,
  SATS_COMPLETAR_TODO,
} from '@/lib/progreso'

const FASES = { INTRO: 'intro', ESCENARIO: 'escenario', RESULTADO: 'resultado', CIERRE: 'cierre' }

export default function AventuraPage() {
  const router = useRouter()
  const [fase, setFase] = useState(FASES.INTRO)
  const [escenarioIdx, setEscenarioIdx] = useState(0)
  const [eleccion, setEleccion] = useState(null)
  const [satsBase, setSatsBase] = useState(0)
  const [satsEscenarios, setSatsEscenarios] = useState(0)

  useEffect(() => {
    const p = cargarProgreso()
    setSatsBase(p.satsGanados)
  }, [])

  const escenario = escenarios[escenarioIdx]
  const totalEscenarios = escenarios.length
  const satsTotal = satsBase + satsEscenarios

  function elegir(tipo) {
    const correcto = tipo === 'bitcoin'
    const p = completarEscenario(correcto)
    if (correcto) setSatsEscenarios(s => s + SATS_ESCENARIO_CORRECTO)
    setEleccion(tipo)
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
    completarAventura()
    router.push('/resultado')
  }

  // — INTRO —
  if (fase === FASES.INTRO) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-[26.5rem] w-full space-y-6">
          <div className="flex justify-center">
            <Kakaw mood="sarcastic" size={110} />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-amber-100 leading-snug">
              El Banco te va a odiar<br />por esto
            </h1>
            <p className="text-amber-400 text-sm">Parte 2 · Mini-aventura bancaria</p>
          </div>
          <div className="card space-y-3">
            <p className="text-amber-200 text-sm leading-relaxed">
              Ya sabes la historia. Ahora vívela.
            </p>
            <p className="text-amber-300 text-sm leading-relaxed">
              3 situaciones reales que millones de mexicanos viven todos los días.
              Elige: ¿sistema tradicional o Bitcoin?
            </p>
            <div className="bg-amber-900/40 rounded-xl p-3 border border-amber-700/50">
              <p className="text-amber-500 text-xs uppercase tracking-widest mb-1">Spoiler</p>
              <p className="text-amber-300 text-sm italic">"Es broma... pero no es broma 👀"</p>
            </div>
            <p className="text-orange-400 text-xs font-bold text-center">
              Elige Bitcoin = +{SATS_ESCENARIO_CORRECTO} sats ⚡ por escenario
            </p>
          </div>
          <button onClick={() => setFase(FASES.ESCENARIO)} className="btn-primary w-full text-lg">
            Empezar la aventura →
          </button>
        </div>
      </main>
    )
  }

  // — ESCENARIO —
  if (fase === FASES.ESCENARIO) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-[26.5rem] w-full space-y-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-amber-500">Escenario {escenarioIdx + 1} de {totalEscenarios}</span>
            <span className="text-orange-400 font-bold">⚡ {satsTotal} sats</span>
          </div>
          <div className="w-full bg-amber-900 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(escenarioIdx / totalEscenarios) * 100}%` }}
            />
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl">{escenario.emoji}</div>
            <h2 className="text-lg font-black text-amber-100 leading-snug">{escenario.titulo}</h2>
            <p className="text-amber-400 text-sm leading-relaxed">{escenario.descripcion}</p>
          </div>
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
                {op.tipo === 'bitcoin' && (
                  <p className="text-orange-400 text-xs mt-2 font-bold">+{SATS_ESCENARIO_CORRECTO} ⚡</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // — RESULTADO —
  if (fase === FASES.RESULTADO && eleccion) {
    const esBanco = eleccion === 'banco'
    const resultado = esBanco ? escenario.resultadoBanco : escenario.resultadoBitcoin

    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-[26.5rem] w-full space-y-4">
          <div className="flex justify-center">
            <Kakaw mood={esBanco ? 'sarcastic' : 'happy'} size={90} />
          </div>
          <div className={`card text-center border-2 ${esBanco
            ? 'border-red-500/50 bg-red-950/30'
            : 'border-green-500/50 bg-green-950/30'
          }`}>
            <h2 className={`text-3xl font-black mb-1 ${esBanco ? 'text-red-400' : 'text-green-400'}`}>
              {resultado.titulo}
            </h2>
            {!esBanco && (
              <p className="text-orange-400 font-bold text-sm">+{SATS_ESCENARIO_CORRECTO} sats ⚡</p>
            )}
          </div>
          <div className="card space-y-2">
            {resultado.pasos.map((paso, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-sm flex-shrink-0">{esBanco ? '😤' : '✅'}</span>
                <p className="text-amber-200 text-sm leading-relaxed">{paso}</p>
              </div>
            ))}
          </div>
          <div className={`card text-center border ${esBanco
            ? 'border-red-800/50 bg-red-900/20'
            : 'border-orange-500/30 bg-orange-900/20'
          }`}>
            <p className={`font-bold ${esBanco ? 'text-red-300' : 'text-orange-300'}`}>
              {resultado.mensaje}
            </p>
            <p className={`text-xs mt-1 ${esBanco ? 'text-red-400' : 'text-amber-400'}`}>
              {resultado.subtexto}
            </p>
          </div>
          <button onClick={siguiente} className="btn-primary w-full text-lg">
            {escenarioIdx < totalEscenarios - 1 ? 'Siguiente escenario →' : 'Ver mi resultado →'}
          </button>
        </div>
      </main>
    )
  }

  // — CIERRE —
  if (fase === FASES.CIERRE) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-[26.5rem] w-full space-y-6">
          <div className="flex justify-center">
            <Kakaw mood="happy" size={110} />
          </div>
          <div className="text-center space-y-2">
            <span className="text-5xl">₿</span>
            <h2 className="text-2xl font-black text-amber-100">{cierre.titulo}</h2>
          </div>
          <div className="card space-y-3">
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
          </div>
          <div className="card border-amber-800/30 bg-amber-900/20 text-center">
            <p className="text-amber-600 text-xs uppercase tracking-widest mb-1">Próximamente</p>
            <p className="text-amber-400 text-sm">{cierre.proximamente.texto}</p>
          </div>
          <button onClick={irAResultados} className="btn-primary w-full">
            Ver mi score y reclamar sats →
          </button>
        </div>
      </main>
    )
  }

  return null
}
