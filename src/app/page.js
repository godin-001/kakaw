'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Hero */}
      <div className="max-w-2xl w-full text-center space-y-8">

        {/* Logo / Mascota */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-8xl animate-bounce">🍫</div>
          <h1 className="text-5xl font-black text-orange-400 tracking-tight">
            KAKAW
          </h1>
          <p className="text-amber-300 text-lg font-medium tracking-widest uppercase">
            La Historia del Dinero
          </p>
        </div>

        {/* Tagline */}
        <div className="card space-y-3">
          <p className="text-amber-100 text-xl font-semibold leading-relaxed">
            Del trueque al cacao. Del oro al bitcoin.
          </p>
          <p className="text-amber-400 text-base leading-relaxed">
            Una aventura interactiva por 5,000 años de historia monetaria —
            para entender por qué Bitcoin no cayó del cielo, sino que era el siguiente paso inevitable.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card text-center py-4">
            <div className="text-2xl font-black text-orange-400">5</div>
            <div className="text-amber-400 text-xs mt-1">módulos</div>
          </div>
          <div className="card text-center py-4">
            <div className="text-2xl font-black text-orange-400">3</div>
            <div className="text-amber-400 text-xs mt-1">escenarios</div>
          </div>
          <div className="card text-center py-4">
            <div className="text-2xl font-black text-orange-400">~10</div>
            <div className="text-amber-400 text-xs mt-1">minutos</div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link href="/historia" className="btn-primary block text-center text-lg">
            Empezar la aventura →
          </Link>
          <p className="text-amber-600 text-sm">
            Sin cuenta. Sin registro. Solo aprende.
          </p>
        </div>

        {/* Badge preview */}
        <div className="space-y-2">
          <p className="text-amber-500 text-xs uppercase tracking-widest">Badges que puedes ganar</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['🌽 Experto en Trueque', '🍫 Conocedor del Kakaw', '🪙 Guardián de la Casa de Moneda', '💵 Analista del Sistema', '📱 Nativo Digital', '₿ Bitcoiner Novato'].map((b) => (
              <span key={b} className="bg-amber-900/40 border border-amber-800 text-amber-400 text-xs px-3 py-1 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-16 text-amber-700 text-xs text-center">
        Hecho con 🍫 para el Bitcoin Hackathon México 2026 · Organizado por Aureo + Acepta Bitcoin
      </footer>
    </main>
  )
}
