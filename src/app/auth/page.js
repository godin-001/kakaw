'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePrivy, useLoginWithEmail, useLoginWithOAuth } from '@privy-io/react-auth'
import PixelBg from '@/components/PixelBg'
import KakawPixel from '@/components/KakawPixel'

export default function AuthPage() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  const [modo, setModo] = useState('registro') // 'registro' | 'login'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (ready && authenticated) {
      router.replace('/')
    }
  }, [ready, authenticated, router])

  const { sendCode, loginWithCode, state: emailState } = useLoginWithEmail({
    onComplete: ({ isNewUser }) => {
      if (isNewUser) router.replace('/bienvenida')
      else router.replace('/')
    },
    onError: () => {
      setError('Hubo un error. Verifica el código e intenta de nuevo.')
    },
  })

  const { initOAuth } = useLoginWithOAuth({
    onComplete: ({ isNewUser }) => {
      if (isNewUser) router.replace('/bienvenida')
      else router.replace('/')
    },
    onError: () => {
      setError('No se pudo conectar con Google. Intenta de nuevo.')
    },
  })

  const enviando = emailState.status === 'sending-code'
  const verificando = emailState.status === 'submitting-code'

  async function handleEnviarCodigo(e) {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Ingresa tu correo electrónico.'); return }
    try {
      await sendCode({ email: email.trim() })
      setEnviado(true)
    } catch {
      setError('No pudimos enviar el código. Revisa tu correo e intenta de nuevo.')
    }
  }

  async function handleVerificar(e) {
    e.preventDefault()
    setError('')
    if (!code.trim()) { setError('Ingresa el código que te enviamos.'); return }
    try {
      await loginWithCode({ code: code.trim() })
    } catch {
      setError('Código incorrecto o expirado. Intenta de nuevo.')
    }
  }

  async function handleGoogle() {
    setError('')
    try {
      await initOAuth({ provider: 'google' })
    } catch {
      setError('No se pudo conectar con Google.')
    }
  }

  if (!ready) return null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      <PixelBg />

      <div className="relative z-10 w-full max-w-[26.5rem] mx-auto px-4 py-8 flex flex-col items-center">

        {/* Logo */}
        <h1
          className="text-2xl tracking-tight mb-1 mt-2"
          style={{ fontFamily: 'var(--font-pixel)', color: '#F97316' }}
        >
          KAKAW
        </h1>
        <p
          className="text-center uppercase tracking-widest mb-6"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-pixel)', fontSize: '7px' }}
        >
          La Historia del Dinero
        </p>

        {/* Personaje */}
        <div className="mb-6">
          <KakawPixel mood="happy" scale={2.2} />
        </div>

        {/* Card */}
        <div
          className="w-full rounded-2xl p-6"
          style={{ background: 'rgba(10, 20, 40, 0.85)', border: '2px solid rgba(249,115,22,0.3)' }}
        >
          {/* Toggle */}
          <div className="flex rounded-xl overflow-hidden mb-6 border border-white/10">
            <button
              onClick={() => { setModo('registro'); setEnviado(false); setError(''); setCode('') }}
              className="flex-1 py-2.5 text-sm font-semibold transition-all"
              style={{
                background: modo === 'registro' ? '#F97316' : 'transparent',
                color: modo === 'registro' ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-space)',
              }}
            >
              Regístrate
            </button>
            <button
              onClick={() => { setModo('login'); setEnviado(false); setError(''); setCode('') }}
              className="flex-1 py-2.5 text-sm font-semibold transition-all"
              style={{
                background: modo === 'login' ? '#F97316' : 'transparent',
                color: modo === 'login' ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-space)',
              }}
            >
              Inicia sesión
            </button>
          </div>

          {!enviado ? (
            /* — Paso 1: ingresar correo — */
            <form onSubmit={handleEnviarCodigo} className="flex flex-col gap-4">
              <div>
                <label
                  className="block text-xs mb-2 uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-pixel)', fontSize: '7px' }}
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  autoComplete="email"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(249,115,22,0.4)',
                    color: '#fff',
                    fontFamily: 'var(--font-space)',
                  }}
                />
              </div>

              {error && (
                <p className="text-xs text-center" style={{ color: '#F87171' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="w-full py-3 rounded-xl font-bold text-sm transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #F97316, #EA580C)',
                  color: '#fff',
                  opacity: enviando ? 0.6 : 1,
                  fontFamily: 'var(--font-space)',
                }}
              >
                {enviando ? 'Enviando código...' : 'Continuar →'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>o</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-opacity active:opacity-70"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontFamily: 'var(--font-space)',
                }}
              >
                <GoogleIcon />
                Continuar con Google
              </button>
            </form>
          ) : (
            /* — Paso 2: ingresar código OTP — */
            <form onSubmit={handleVerificar} className="flex flex-col gap-4">
              <div className="text-center mb-2">
                <p className="text-sm font-semibold mb-1" style={{ color: '#F97316' }}>
                  Revisa tu correo
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-space)' }}>
                  Te enviamos un código de 6 dígitos a
                </p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#fff' }}>{email}</p>
              </div>

              <div>
                <label
                  className="block text-xs mb-2 uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-pixel)', fontSize: '7px' }}
                >
                  Código de verificación
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  autoComplete="one-time-code"
                  className="w-full rounded-xl px-4 py-3 text-center text-lg font-bold tracking-[0.4em] outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(249,115,22,0.4)',
                    color: '#F97316',
                    fontFamily: 'var(--font-pixel)',
                  }}
                />
              </div>

              {error && (
                <p className="text-xs text-center" style={{ color: '#F87171' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={verificando || code.length < 6}
                className="w-full py-3 rounded-xl font-bold text-sm transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #F97316, #EA580C)',
                  color: '#fff',
                  opacity: (verificando || code.length < 6) ? 0.5 : 1,
                  fontFamily: 'var(--font-space)',
                }}
              >
                {verificando ? 'Verificando...' : 'Entrar →'}
              </button>

              <button
                type="button"
                onClick={() => { setEnviado(false); setCode(''); setError('') }}
                className="text-xs text-center underline"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-space)' }}
              >
                Cambiar correo
              </button>
            </form>
          )}
        </div>

        {/* Tagline */}
        <p
          className="mt-6 text-center text-xs"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-space)' }}
        >
          Del trueque a Bitcoin — tu aventura comienza aquí
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.9 29.3 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.3-.1-2.6-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34 6.9 29.3 5 24 5 16.3 5 9.7 9.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43c5.2 0 9.9-2 13.4-5.1L31.8 33c-2.1 1.6-4.8 2.5-7.8 2.5-5.2 0-9.6-3.3-11.3-8H6.9C10.2 37 16.6 43 24 43z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l6.6 5.1C43.2 35.8 47 30.4 47 24c0-1.3-.1-2.6-.4-3.9z"/>
    </svg>
  )
}
