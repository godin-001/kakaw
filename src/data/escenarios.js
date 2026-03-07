export const escenarios = [
  {
    id: 1,
    titulo: "Quieres enviar $500 USD a tu prima en Texas",
    emoji: "💸",
    descripcion: "Tu prima necesita dinero urgente. La quieres ayudar. Tienes el dinero. Solo necesitas enviarlo. ¿Qué tan difícil puede ser?",
    opciones: [
      {
        tipo: "banco",
        label: "Ir al banco / Western Union",
        emoji: "🏦",
      },
      {
        tipo: "bitcoin",
        label: "Usar Bitcoin",
        emoji: "⚡",
      },
    ],
    resultadoBanco: {
      titulo: "FAIL 💀",
      pasos: [
        "Busca una sucursal abierta (spoiler: es miércoles a las 4pm, hay fila)",
        "Llena 3 formularios diferentes",
        "Paga comisión de envío: ~$15-25 USD",
        "El tipo de cambio que te dan: el peor del mercado",
        "Tiempo de llegada: 3 a 5 días hábiles",
        "Tu prima recibe ~$460 de los $500 que enviaste",
        "Rezo colectivo para que no haya 'error técnico'",
      ],
      mensaje: "Es broma... pero no es broma 👀",
      subtexto: "El sistema financiero lleva 50 años cobrándote por mover tu propio dinero.",
    },
    resultadoBitcoin: {
      titulo: "WIN ⚡",
      pasos: [
        "Abres tu wallet de Bitcoin",
        "Escaneas el código QR de tu prima",
        "Confirmas el monto",
        "Listo.",
        "Tiempo: menos de 10 minutos",
        "Comisión: centavos (con Lightning Network)",
        "Tu prima recibe casi el 100% de lo que enviaste",
        "Sin formularios, sin fila, sin permiso de nadie",
      ],
      mensaje: "Tu dinero, donde tú decides. Sin intermediarios. 🌮",
      subtexto: "¿Quién dijo que enviar dinero al extranjero tenía que ser complicado?",
    },
  },
  {
    id: 2,
    titulo: "Es domingo y necesitas pagar algo urgente",
    emoji: "📅",
    descripcion: "Son las 8pm de un domingo. Tienes que hacer un pago importante. Urge. Abres tu app del banco y...",
    opciones: [
      {
        tipo: "banco",
        label: "Intentar con el banco",
        emoji: "🏦",
      },
      {
        tipo: "bitcoin",
        label: "Usar Bitcoin",
        emoji: "⚡",
      },
    ],
    resultadoBanco: {
      titulo: "FAIL 💀",
      pasos: [
        "App del banco: 'Servicio no disponible en este momento'",
        "Llamas al banco: 'Nuestro horario de atención es lunes a viernes'",
        "SPEI: límite de transferencias alcanzado para el día",
        "Cajero más cercano: sin billetes (clásico)",
        "Alternativa: esperar al lunes",
        "Tu urgencia: 0 le importa al sistema",
      ],
      mensaje: "Tu dinero tiene horario de oficina. Tú no. 🙃",
      subtexto: "El banco no cierra porque sea malo. Cierra porque así fue diseñado — para su conveniencia, no la tuya.",
    },
    resultadoBitcoin: {
      titulo: "WIN ⚡",
      pasos: [
        "Bitcoin: 24/7/365",
        "Sin días festivos",
        "Sin límites de horario",
        "Sin 'intentelo más tarde'",
        "Sin permiso de nadie",
        "La red nunca ha estado caída desde 2009",
        "Domingo 3am o Año Nuevo a medianoche — igual funciona",
      ],
      mensaje: "El dinero que no duerme, no toma vacaciones y no necesita tu permiso. 🌙",
      subtexto: "Porque ¿de quién es el dinero, exactamente?",
    },
  },
  {
    id: 3,
    titulo: "Quieres sacar TU dinero en efectivo",
    emoji: "💰",
    descripcion: "Tienes dinero en el banco. Es tuyo. Lo ganaste. Lo depositaste. Solo quieres sacarlo. Parece simple.",
    opciones: [
      {
        tipo: "banco",
        label: "Ir al cajero / sucursal",
        emoji: "🏦",
      },
      {
        tipo: "bitcoin",
        label: "Usar Bitcoin",
        emoji: "⚡",
      },
    ],
    resultadoBanco: {
      titulo: "FAIL 💀",
      pasos: [
        "Cajero automático: límite diario de $5,000 pesos",
        "Cajero automático #2: 'Sin billetes disponibles'",
        "Cajero automático #3: fuera de servicio",
        "Sucursal bancaria: fila de 40 minutos",
        "Ventanilla: 'Para montos mayores necesita cita previa'",
        "Para sacar más de $10,000: explicar de dónde viene el dinero",
        "El banco pide permiso para darte TU dinero",
      ],
      mensaje: "¿De quién es el dinero? Buena pregunta. 🤔",
      subtexto: "Técnicamente, cuando depositas en el banco, el dinero ya no es tuyo. Es una deuda que el banco tiene contigo.",
    },
    resultadoBitcoin: {
      titulo: "WIN ⚡",
      pasos: [
        "Tu Bitcoin está en tu wallet",
        "Solo tú tienes las llaves privadas",
        "Puedes moverlo cuando quieras",
        "A donde quieras",
        "En la cantidad que quieras",
        "Sin pedir permiso",
        "Sin explicar nada a nadie",
        "Eso es lo que significa ser dueño de tu dinero",
      ],
      mensaje: "Not your keys, not your coins. Your keys — your rules. 🔑",
      subtexto: "Por primera vez en la historia, existe un dinero que nadie puede confiscarte si lo guardas bien.",
    },
  },
];

export const cierre = {
  titulo: "Esto no es el fin. Es el principio.",
  reflexion: `No es que los bancos sean el enemigo. El sistema financiero moderno resolvió muchos problemas reales y permitió el crecimiento económico de los últimos 200 años.

Pero fue diseñado en una época diferente, para un mundo diferente. Un mundo sin internet. Sin criptografía. Sin la posibilidad de que cualquier persona en cualquier país pudiera enviar valor a cualquier parte del mundo en minutos, sin intermediarios.

Kakaw — el cacao — fue el dinero perfecto para su tiempo.
El oro fue el dinero perfecto para su tiempo.
El papel fue el dinero perfecto para su tiempo.

Bitcoin no es perfecto. Pero es el primer dinero en la historia que combina escasez matemática, resistencia a la censura, acceso universal y reglas que nadie puede cambiar.

El siguiente paso de la historia del dinero ya empezó. Y tú acabas de aprenderlo todo.`,
  mensaje: "¿Listo para tu primer satoshi?",
  cta: {
    texto: "Compra tus primeros sats en Aureo →",
    url: "https://www.aureobitcoin.com/es",
  },
  proximamente: {
    texto: "Capítulo 2: Cómo comprar tu primer Bitcoin (guía paso a paso)",
    disponible: false,
  },
};
