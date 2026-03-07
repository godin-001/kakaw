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

  function elegir(i) {
    if (opcionElegida !== null) return
    setOpcionElegida(i)
    setMostrarFeedback(true)
    completarModulo(slug, modulo.opciones[i].correcto)
  }

  function continuar() {
    router.push('/')
  }

  const correcto = opcionElegida !== null && modulo.opciones[opcionElegida].correcto
  const kakawMood = !mostrarFeedback ? 'neutral' : correcto ? 'happy' : 'surprised'

  return (
    <main className="min-h-screen flex flex-col px-4 py-5 max-w-sm mx-auto">

      {/* Barra de progreso */}
      <div className="mb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push(`/modulo/${slug}`)}
            className="text-amber-600 text-sm hover:text-amber-400 transition-colors"
          >
            ← Volver
          </button>
          <span className="text-amber-500 text-xs font-medium">
            Quiz {idx + 1} de {total}
          </span>
        </div>
        <div className="w-full bg-amber-900 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all duration-700"
            style={{ width: `${((idx + 0.5) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Kakaw + pregunta */}
      <div className="flex items-start gap-3 mb-5 flex-shrink-0">
        <div className="flex-shrink-0">
          <Kakaw mood={kakawMood} size={72} />
        </div>
        <div className="bg-amber-900/80 border border-amber-700 rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
          <p className="text-amber-500 text-[11px] uppercase tracking-widest font-bold mb-1">
            Pregunta
          </p>
          <p className="text-amber-100 font-semibold text-sm leading-snug">
            {modulo.pregunta}
          </p>
        </div>
      </div>

      {/* Opciones */}
      <div className="space-y-3 flex-1 mb-4">
        {modulo.opciones.map((opcion, i) => {
          let clases = 'opcion-btn'
          if (opcionElegida !== null) {
            if (opcion.correcto) clases += ' opcion-correcta'
            else if (i === opcionElegida && !opcion.correcto) clases += ' opcion-incorrecta'
            else clases += ' opacity-30'
          }
          return (
            <button
              key={i}
              onClick={() => elegir(i)}
              disabled={opcionElegida !== null}
              className={clases}
            >
              <span className="text-amber-500 font-bold mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="text-sm">{opcion.texto}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback + botón continuar */}
      {mostrarFeedback && opcionElegida !== null && (
        <div className={`card border-2 flex-shrink-0 ${correcto
          ? 'border-green-500/60 bg-green-950/40'
          : 'border-red-500/60 bg-red-950/40'
        }`}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl flex-shrink-0">
              {correcto ? '✅' : '❌'}
            </span>
            <div>
              <p className={`font-black text-sm mb-1 ${correcto ? 'text-green-400' : 'text-red-400'}`}>
                {correcto ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-amber-300 text-xs leading-relaxed">
                {modulo.opciones[opcionElegida].feedback}
              </p>
              {correcto && (
                <p className="text-orange-400 font-black text-sm mt-2">
                  +{SATS_QUIZ_CORRECTO + SATS_MODULO_BONUS} sats ⚡
                </p>
              )}
            </div>
          </div>
          <button onClick={continuar} className="btn-primary w-full">
            {idx < total - 1 ? 'Volver al mapa →' : '¡A la aventura! →'}
          </button>
        </div>
      )}

    </main>
  )
}
