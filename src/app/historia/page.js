'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { modulos } from '@/data/modulos'

const FASES = { HISTORIA: 'historia', QUIZ: 'quiz', FEEDBACK: 'feedback', BADGE: 'badge' }

export default function HistoriaPage() {
  const router = useRouter()
  const [moduloIdx, setModuloIdx] = useState(0)
  const [fase, setFase] = useState(FASES.HISTORIA)
  const [opcionElegida, setOpcionElegida] = useState(null)
  const [puntos, setPuntos] = useState(0)
  const [badges, setBadges] = useState([])

  const modulo = modulos[moduloIdx]
  const totalModulos = modulos.length
  const progreso = Math.round(((moduloIdx + (fase === FASES.HISTORIA ? 0 : 0.5)) / totalModulos) * 100)

  useEffect(() => {
    // Cargar progreso previo si existe
    const guardado = localStorage.getItem('kakaw_historia')
    if (guardado) {
      const data = JSON.parse(guardado)
      // Solo usamos el score acumulado si viene de aventura de vuelta
    }
  }, [])

  function elegirOpcion(idx) {
    if (opcionElegida !== null) return
    setOpcionElegida(idx)
    const correcta = modulo.opciones[idx].correcto
    if (correcta) setPuntos(p => p + 100)
    setFase(FASES.FEEDBACK)
  }

  function siguiente() {
    if (moduloIdx < totalModulos - 1) {
      // Desbloquear badge del módulo actual
      setBadges(prev => [...prev, modulo.badgeNombre])
      setModuloIdx(i => i + 1)
      setFase(FASES.BADGE)
      setOpcionElegida(null)
    } else {
      // Último módulo — ir a aventura
      const badgesFinal = [...badges, modulo.badgeNombre]
      setBadges(badgesFinal)
      localStorage.setItem('kakaw_puntos', JSON.stringify({ puntos: opcionElegida !== null && modulo.opciones[opcionElegida].correcto ? puntos + 100 : puntos, badges: badgesFinal }))
      router.push('/aventura')
    }
  }

  function continuarDesdeQuiz() {
    setFase(FASES.QUIZ)
  }

  function continuarDesdeBadge() {
    setFase(FASES.HISTORIA)
  }

  // — FASE BADGE (entre módulos) —
  if (fase === FASES.BADGE) {
    const badgeAnterior = modulos[moduloIdx - 1]
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl animate-bounce">{badgeAnterior.emoji}</div>
          <div className="card space-y-3 border-orange-500/50">
            <p className="text-orange-400 text-xs uppercase tracking-widest font-bold">Badge desbloqueado</p>
            <h2 className="text-2xl font-black text-amber-100">{badgeAnterior.badgeNombre}</h2>
            <p className="text-amber-400 text-sm">Completaste el módulo <strong>{badgeAnterior.titulo}</strong> 🎉</p>
            <div className="bg-orange-500/10 rounded-xl p-3 border border-orange-500/30">
              <p className="text-orange-300 font-bold text-lg">+100 puntos</p>
            </div>
          </div>
          <button onClick={continuarDesdeBadge} className="btn-primary w-full text-lg">
            Siguiente capítulo →
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-8 max-w-2xl mx-auto">

      {/* Header con progreso */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between text-sm">
          <span className="text-amber-500 font-medium">
            Módulo {moduloIdx + 1} de {totalModulos}
          </span>
          <span className="text-orange-400 font-bold">{puntos} pts</span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-amber-900 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-400 h-3 rounded-full transition-all duration-700"
            style={{ width: `${((moduloIdx) / totalModulos) * 100}%` }}
          />
        </div>

        {/* Módulos como pasos */}
        <div className="flex justify-between">
          {modulos.map((m, i) => (
            <div
              key={m.id}
              className={`text-lg transition-all ${i < moduloIdx ? 'opacity-100' : i === moduloIdx ? 'opacity-100 scale-125' : 'opacity-30'}`}
              title={m.titulo}
            >
              {m.emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Título del módulo */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{modulo.emoji}</span>
          <div>
            <p className="text-amber-500 text-xs uppercase tracking-widest">Capítulo {moduloIdx + 1}</p>
            <h1 className="text-2xl font-black text-amber-100">{modulo.titulo}</h1>
          </div>
        </div>
      </div>

      {/* — FASE HISTORIA — */}
      {fase === FASES.HISTORIA && (
        <div className="space-y-6 flex-1">
          <div className="card">
            <div className="prose prose-invert max-w-none">
              {modulo.historia.split('\n\n').map((parrafo, i) => (
                <p key={i} className="text-amber-200 leading-relaxed mb-4 last:mb-0 text-[15px]">
                  {parrafo}
                </p>
              ))}
            </div>
          </div>
          <button onClick={continuarDesdeQuiz} className="btn-primary w-full text-lg">
            Responder pregunta →
          </button>
        </div>
      )}

      {/* — FASE QUIZ — */}
      {(fase === FASES.QUIZ || fase === FASES.FEEDBACK) && (
        <div className="space-y-5 flex-1">
          <div className="card bg-amber-900/80">
            <p className="text-amber-300 text-xs uppercase tracking-widest mb-2">Pregunta</p>
            <p className="text-amber-100 font-semibold text-lg leading-snug">{modulo.pregunta}</p>
          </div>

          <div className="space-y-3">
            {modulo.opciones.map((opcion, idx) => {
              let estiloExtra = ''
              if (opcionElegida !== null) {
                if (opcion.correcto) estiloExtra = 'opcion-correcta'
                else if (idx === opcionElegida && !opcion.correcto) estiloExtra = 'opcion-incorrecta'
                else estiloExtra = 'opacity-40'
              }
              return (
                <button
                  key={idx}
                  onClick={() => elegirOpcion(idx)}
                  disabled={opcionElegida !== null}
                  className={`opcion-btn ${estiloExtra}`}
                >
                  <span className="text-amber-500 font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {opcion.texto}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {fase === FASES.FEEDBACK && opcionElegida !== null && (
            <div className={`card border ${modulo.opciones[opcionElegida].correcto ? 'border-green-500/50 bg-green-900/20' : 'border-red-500/50 bg-red-900/20'}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{modulo.opciones[opcionElegida].correcto ? '✅' : '❌'}</span>
                <div>
                  <p className={`font-bold mb-1 ${modulo.opciones[opcionElegida].correcto ? 'text-green-400' : 'text-red-400'}`}>
                    {modulo.opciones[opcionElegida].correcto ? '¡Correcto!' : 'Incorrecto'}
                  </p>
                  <p className="text-amber-300 text-sm leading-relaxed">
                    {modulo.opciones[opcionElegida].feedback}
                  </p>
                  {modulo.opciones[opcionElegida].correcto && (
                    <p className="text-orange-400 font-bold text-sm mt-2">+100 puntos ⚡</p>
                  )}
                </div>
              </div>
              <button onClick={siguiente} className="btn-primary w-full mt-4">
                {moduloIdx < totalModulos - 1 ? 'Siguiente módulo →' : 'Ir a la mini-aventura →'}
              </button>
            </div>
          )}
        </div>
      )}

    </main>
  )
}
