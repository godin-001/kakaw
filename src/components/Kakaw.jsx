"use client"

export default function Kakaw({ mood = "neutral", size = 160 }) {
  const scale = size / 200

  const moods = {
    neutral: {
      leftBrow: "M 58 100 Q 72 93 86 100",
      rightBrow: "M 114 100 Q 128 93 142 100",
      leftEyeOpen: true,
      rightEyeOpen: true,
      leftPupilDy: 0,
      rightPupilDy: 0,
      mouth: "M 82 150 Q 100 162 118 150",
    },
    happy: {
      leftBrow: "M 58 95 Q 72 85 86 95",
      rightBrow: "M 114 95 Q 128 85 142 95",
      leftEyeOpen: false,
      rightEyeOpen: false,
      leftPupilDy: 0,
      rightPupilDy: 0,
      mouth: "M 74 145 Q 100 170 126 145",
    },
    surprised: {
      leftBrow: "M 58 88 Q 72 78 86 88",
      rightBrow: "M 114 88 Q 128 78 142 88",
      leftEyeOpen: true,
      rightEyeOpen: true,
      leftPupilDy: -5,
      rightPupilDy: -5,
      mouth: "circle",
    },
    sarcastic: {
      leftBrow: "M 58 100 Q 72 95 86 104",
      rightBrow: "M 114 92 Q 128 85 142 96",
      leftEyeOpen: true,
      rightEyeOpen: true,
      leftPupilDy: 3,
      rightPupilDy: 0,
      mouth: "M 82 152 Q 90 144 100 148 Q 110 153 120 146",
    },
  }

  const m = moods[mood] || moods.neutral

  return (
    <svg
      width={200 * scale}
      height={260 * scale}
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === PLUMAS AZTECAS === */}
      <ellipse cx="55" cy="38" rx="7" ry="20" fill="#2DC653" transform="rotate(-30 55 38)" />
      <ellipse cx="75" cy="26" rx="8" ry="24" fill="#E63946" transform="rotate(-15 75 26)" />
      <ellipse cx="100" cy="20" rx="9" ry="28" fill="#00B4D8" />
      <ellipse cx="125" cy="26" rx="8" ry="24" fill="#FFB703" transform="rotate(15 125 26)" />
      <ellipse cx="145" cy="38" rx="7" ry="20" fill="#E63946" transform="rotate(30 145 38)" />

      {/* Banda de corona */}
      <rect x="55" y="50" width="90" height="16" rx="8" fill="#8B5E3C" />
      <circle cx="76" cy="58" r="5" fill="#FFB703" />
      <circle cx="100" cy="58" r="5" fill="#00B4D8" />
      <circle cx="124" cy="58" r="5" fill="#E63946" />

      {/* === BRAZOS === */}
      <path
        d="M 42 155 Q 16 148 14 168 Q 12 184 36 182"
        stroke="#5C3317" strokeWidth="13" strokeLinecap="round" fill="none"
      />
      <circle cx="14" cy="170" r="11" fill="#6B3F1F" />

      <path
        d="M 158 155 Q 184 148 186 168 Q 188 184 164 182"
        stroke="#5C3317" strokeWidth="13" strokeLinecap="round" fill="none"
      />
      <circle cx="186" cy="170" r="11" fill="#6B3F1F" />

      {/* === CUERPO (grano de cacao) === */}
      <ellipse cx="100" cy="162" rx="68" ry="88" fill="#6B3F1F" />
      {/* Brillo */}
      <ellipse cx="78" cy="115" rx="20" ry="28" fill="#7D4F28" opacity="0.45" />
      {/* Textura de cacao */}
      <path d="M 82 78 Q 80 162 82 242" stroke="#5C3317" strokeWidth="2.5" opacity="0.55" />
      <path d="M 100 72 Q 98 162 100 248" stroke="#5C3317" strokeWidth="2.5" opacity="0.55" />
      <path d="M 118 78 Q 120 162 118 242" stroke="#5C3317" strokeWidth="2.5" opacity="0.55" />
      <path d="M 64 98 Q 62 162 64 222" stroke="#5C3317" strokeWidth="2" opacity="0.35" />
      <path d="M 136 98 Q 138 162 136 222" stroke="#5C3317" strokeWidth="2" opacity="0.35" />

      {/* === OJO IZQUIERDO === */}
      <ellipse cx="76" cy="126" rx="17" ry="19" fill="white" />
      {m.leftEyeOpen ? (
        <>
          <circle cx="76" cy={126 + m.leftPupilDy} r="10" fill="#1a1a1a" />
          <circle cx="79" cy={121 + m.leftPupilDy} r="3.5" fill="white" />
        </>
      ) : (
        <path d="M 62 126 Q 76 114 90 126" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round" />
      )}

      {/* === OJO DERECHO === */}
      <ellipse cx="124" cy="126" rx="17" ry="19" fill="white" />
      {m.rightEyeOpen ? (
        <>
          <circle cx="124" cy={126 + m.rightPupilDy} r="10" fill="#1a1a1a" />
          <circle cx="127" cy={121 + m.rightPupilDy} r="3.5" fill="white" />
        </>
      ) : (
        <path d="M 110 126 Q 124 114 138 126" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round" />
      )}

      {/* === CEJAS === */}
      <path d={m.leftBrow} stroke="#3D1F0A" strokeWidth="4.5" strokeLinecap="round" />
      <path d={m.rightBrow} stroke="#3D1F0A" strokeWidth="4.5" strokeLinecap="round" />

      {/* === BOCA === */}
      {m.mouth === "circle" ? (
        <ellipse cx="100" cy="158" rx="13" ry="15" fill="#3D1F0A" />
      ) : (
        <path d={m.mouth} stroke="#3D1F0A" strokeWidth="4" strokeLinecap="round" fill="none" />
      )}

      {/* Colorete */}
      <ellipse cx="55" cy="142" rx="11" ry="8" fill="#E07B54" opacity="0.38" />
      <ellipse cx="145" cy="142" rx="11" ry="8" fill="#E07B54" opacity="0.38" />

      {/* === PIES === */}
      <ellipse cx="84" cy="248" rx="22" ry="9" fill="#5C3317" />
      <ellipse cx="116" cy="248" rx="22" ry="9" fill="#5C3317" />
    </svg>
  )
}
