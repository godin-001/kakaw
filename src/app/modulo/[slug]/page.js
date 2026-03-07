'use client'
import { useParams, useRouter } from 'next/navigation'
import { modulos } from '@/data/modulos'
import Kakaw from '@/components/Kakaw'

export default function ModuloPage() {
  const { slug } = useParams()
  const router = useRouter()
  const modulo = modulos.find(m => m.slug === slug)

  if (!modulo) {
    router.push('/')
    return null
  }

  const idx = modulos.findIndex(m => m.slug === slug)
  const total = modulos.length

  return (
    <main className="min-h-screen flex flex-col px-4 py-5 max-w-sm mx-auto">

      {/* Barra de progreso */}
      <div className="mb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push('/')}
            className="text-amber-600 text-sm hover:text-amber-400 transition-colors"
          >
            ← Mapa
          </button>
          <span className="text-amber-500 text-xs font-medium">
            Módulo {idx + 1} de {total}
          </span>
        </div>
        <div className="w-full bg-amber-900 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all duration-700"
            style={{ width: `${((idx) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Título del módulo */}
      <div className="flex items-center gap-3 mb-5 flex-shrink-0">
        <span className="text-4xl">{modulo.emoji}</span>
        <div>
          <p className="text-amber-600 text-[11px] uppercase tracking-widest font-medium">
            Capítulo {idx + 1}
          </p>
          <h1 className="text-xl font-black text-amber-100 leading-tight">
            {modulo.titulo}
          </h1>
        </div>
      </div>

      {/* Speech bubble de Kakaw */}
      <div className="flex items-start gap-3 mb-5 flex-shrink-0">
        <div className="flex-shrink-0">
          <Kakaw mood="neutral" size={72} />
        </div>
        <div className="bg-amber-900/80 border border-amber-700 rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
          <p className="text-amber-200 text-sm leading-relaxed">
            {modulo.kakawDice}
          </p>
        </div>
      </div>

      {/* Tarjeta de puntos clave */}
      <div className="card flex-1 mb-5">
        <p className="text-orange-400 text-[11px] uppercase tracking-widest font-bold mb-3">
          Lo que necesitas saber
        </p>
        <div className="space-y-3">
          {modulo.puntosClave.map((punto, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-orange-500 font-black text-base leading-tight flex-shrink-0 mt-0.5">
                {i + 1}.
              </span>
              <p className="text-amber-200 text-sm leading-relaxed">
                {punto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Botón de quiz */}
      <button
        onClick={() => router.push(`/quiz/${slug}`)}
        className="btn-primary w-full text-base flex-shrink-0"
      >
        ¡Ponme a prueba! ⚡
      </button>

    </main>
  )
}
