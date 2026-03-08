'use client'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { modulos } from '@/data/modulos'
import KakawPixel from '@/components/KakawPixel'

export default function ModuloPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) router.replace('/auth')
  }, [ready, authenticated, router])

  const modulo = modulos.find(m => m.slug === slug)

  if (!ready || !authenticated) return null

  if (!modulo) {
    router.push('/')
    return null
  }

  const idx = modulos.findIndex(m => m.slug === slug)
  const total = modulos.length
  const tema = modulo.tema

  return (
    <main
      className="min-h-screen flex flex-col px-4 py-5 max-w-[26.5rem] mx-auto"
      style={{ background: tema.gradient }}
    >
      {/* Barra de progreso */}
      <div className="mb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push('/')}
            className="text-sm transition-colors"
            style={{ color: `${tema.accent}99` }}
          >
            ← Mapa
          </button>
          <span className="text-xs font-medium" style={{ color: `${tema.accent}99` }}>
            Módulo {idx + 1} de {total}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(idx / total) * 100}%`,
              background: `linear-gradient(90deg, ${tema.accent}, ${tema.texto})`,
            }}
          />
        </div>
      </div>

      {/* Título del módulo */}
      <div className="flex items-center gap-3 mb-5 flex-shrink-0">
        <span className="text-4xl">{modulo.emoji}</span>
        <div>
          <p
            className="text-[11px] uppercase tracking-widest font-semibold"
            style={{ color: `${tema.accent}99` }}
          >
            Capítulo {idx + 1}
          </p>
          <h1 className="text-xl font-black leading-tight text-white">
            {modulo.titulo}
          </h1>
        </div>
      </div>

      {/* Speech bubble de Kakaw */}
      <div className="flex items-start gap-3 mb-5 flex-shrink-0">
        <div className="flex-shrink-0">
          <KakawPixel mood="neutral" size={72} />
        </div>
        <div
          className="rounded-2xl rounded-tl-sm px-4 py-3 flex-1"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: `1px solid ${tema.accent}40`,
          }}
        >
          {modulo.kakawDice.split('\n\n').map((parrafo, i) => (
            <p key={i} className={`text-sm leading-relaxed ${i > 0 ? 'mt-2' : ''}`} style={{ color: tema.texto }}>
              {parrafo}
            </p>
          ))}
        </div>
      </div>

      {/* Puntos clave */}
      <div
        className="rounded-3xl p-5 flex-1 mb-5"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${tema.accent}25`,
        }}
      >
        <p
          className="text-[11px] uppercase tracking-widest font-bold mb-4"
          style={{ color: tema.accent }}
        >
          Lo que necesitas saber
        </p>
        <div className="space-y-4">
          {modulo.puntosClave.map((punto, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="font-black text-base leading-tight flex-shrink-0 mt-0.5"
                style={{ color: tema.accent }}
              >
                {i + 1}.
              </span>
              <p className="text-sm leading-relaxed text-white/80">
                {punto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Botón quiz */}
      <button
        onClick={() => router.push(`/quiz/${slug}`)}
        className="w-full py-4 rounded-2xl font-bold text-base text-white flex-shrink-0 transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(135deg, ${tema.nodoBg}, ${tema.nodoBorder})`,
          boxShadow: `0 6px 24px ${tema.sombra}`,
        }}
      >
        ¡Ponme a prueba! ⚡
      </button>

    </main>
  )
}
