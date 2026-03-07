// Gestión del progreso del usuario en localStorage

const KEY = 'kakaw_progreso'

export const SATS_QUIZ_CORRECTO = 21
export const SATS_MODULO_BONUS = 50
export const SATS_ESCENARIO_CORRECTO = 100
export const SATS_COMPLETAR_TODO = 210

export function cargarProgreso() {
  if (typeof window === 'undefined') return progresoInicial()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return progresoInicial()
    return { ...progresoInicial(), ...JSON.parse(raw) }
  } catch {
    return progresoInicial()
  }
}

export function guardarProgreso(progreso) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(progreso))
}

export function resetearProgreso() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}

export function completarModulo(slug, correcto) {
  const p = cargarProgreso()
  if (!p.modulosCompletados.includes(slug)) {
    p.modulosCompletados.push(slug)
    if (correcto) p.satsGanados += SATS_QUIZ_CORRECTO + SATS_MODULO_BONUS
  }
  guardarProgreso(p)
  return p
}

export function completarEscenario(correcto) {
  const p = cargarProgreso()
  if (correcto) p.satsGanados += SATS_ESCENARIO_CORRECTO
  guardarProgreso(p)
  return p
}

export function completarAventura() {
  const p = cargarProgreso()
  if (!p.aventuraCompletada) {
    p.aventuraCompletada = true
    p.satsGanados += SATS_COMPLETAR_TODO
  }
  guardarProgreso(p)
  return p
}

export function generarCodigoRedención(sats) {
  const encoded = sats.toString(36).toUpperCase().padStart(4, '0')
  const ts = Date.now().toString(36).slice(-4).toUpperCase()
  const check = ((sats * 7 + 13) % 36).toString(36).toUpperCase()
  return `KAKAW-${encoded}${ts}-${check}`
}

function progresoInicial() {
  return {
    modulosCompletados: [],
    satsGanados: 0,
    aventuraCompletada: false,
  }
}
