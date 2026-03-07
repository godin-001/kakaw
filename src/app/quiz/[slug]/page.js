'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { modulos } from '@/data/modulos'
import Kakaw from '@/components/Kakaw'
import { completarModulo, SATS_QUIZ_CORRECTO, SATS_MODULO_BONUS } from '@/lib/progreso'

export default function QuizPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [opcionElegida, setOpcionElegida] = useState(null)
  const [mostrarFeedback, setMostrarFeedback] = useState(false)

  const modulo = modulos.find(m => m.slug === slug)
  if (!modulo) {
    router.push('/')
    return null
  }

  const idx = modulos.findIndex(m => m.slug === slug)
  const total = modulos.length
  const tema = modulo.tema

  function elegir(i) {
    if (opcionElegida !== null) return
    setOpcionElegida(i)
    setMostrarFeedback(true)
    completarModulo(slug, modulo.opciones[i].correcto)
  }

  const correcto = opcionElegida !== null && modulo.opciones[opcionElegida].correcto
  const kakawMood = !mostrarFeedback ? 'neutral' : correcto ? 'happy' : 'surprised'

  return (
    <main
      className="min-h-screen flex flex-col px-4 py-5 max-w-sm mx-auto"
      style={{ background: tema.gradient }}
    >
      {/* Barra de progreso */}
      <div className="mb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push(`/modulo/${slug}`)}
            className="text-sm transition-colors"
            style={{ color: `${tema.accent}99` }}
          >
            ← Volver
          </button>
          <span className="text-xs font-medium" style={{ color: `${tema.accent}99` }}>
            Quiz {idx + 1} de {total}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((idx + 0.5) / total) * 100}%`,
              background: `linear-gradient(90deg, ${tema.accent}, ${tema.texto})`,
            }}
          />
        </div>
      </div>

      {/* Kakaw + pregunta */}
      <div className="flex items-start gap-3 mb-5 flex-shrink-0">
        <div className="flex-shrink-0">
          <Kakaw mood={kakawMood} size={72} />
        </div>
        <div
          className="rounded-2xl rounded-tl-sm px-4 py-3 flex-1"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: `1px solid ${tema.accent}40`,
          }}
        >
          <p
            className="text-[11px] uppercase tracking-widest font-bold mb-1"
            style={{ color: tema.accent }}
          >
            Pregunta
          </p>
          <p className="text-white font-semibold text-sm leading-snug">
            {modulo.pregunta}
          </p>
        </div>
      </div>

      {/* Opciones */}
      <div className="space-y-3 flex-1 mb-4">
        {modulo.opciones.map((opcion, i) => {
          const esElegida = i === opcionElegida
          const esCorrecta = opcion.correcto
          const mostrar = opcionElegida !== null

          let bg = 'rgba(255,255,255,0.05)'
          let border = 'rgba(255,255,255,0.1)'
          let opacity = 1

          if (mostrar) {
            if (esCorrecta) {
              bg = 'rgba(34,197,94,0.15)'
              border = '#22C55E'
            } else if (esElegida && !esCorrecta) {
              bg = 'rgba(239,68,68,0.15)'
              border = '#EF4444'
            } else {
              opacity = 0.3
            }
          }

          return (
            <button
              key={i}
              onClick={() => elegir(i)}
              disabled={opcionElegida !== null}
              className="w-full text-left py-4 px-5 rounded-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
              style={{
                background: bg,
                border: `1px solid ${border}`,
                opacity,
              }}
            >
              <span className="font-bold mr-2" style={{ color: tema.accent }}>
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="text-sm text-white/90">{opcion.texto}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {mostrarFeedback && opcionElegida !== null && (
        <div
          className="rounded-3xl p-5 flex-shrink-0"
          style={{
            background: correcto ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `2px solid ${correcto ? '#22C55E50' : '#EF444450'}`,
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl flex-shrink-0">{correcto ? '✅' : '❌'}</span>
            <div>
              <p
                className="font-black text-sm mb-1"
                style={{ color: correcto ? '#4ADE80' : '#F87171' }}
              >
                {correcto ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                {modulo.opciones[opcionElegida].feedback}
              </p>
              {correcto && (
                <p className="font-black text-sm mt-2" style={{ color: tema.accent }}>
                  +{SATS_QUIZ_CORRECTO + SATS_MODULO_BONUS} sats ⚡
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${tema.nodoBg}, ${tema.nodoBorder})`,
              boxShadow: `0 6px 24px ${tema.sombra}`,
            }}
          >
            {idx < total - 1 ? 'Volver al mapa →' : '¡A la aventura! →'}
          </button>
        </div>
      )}

    </main>
  )
}
