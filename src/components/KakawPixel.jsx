"use client"

const P = 5 // px per pixel in SVG units

const COLORS = {
  '_': null,
  'D': '#3D1F0A',
  'B': '#7B4F2E',
  'L': '#A06535',
  'W': '#FFFEF5',
  'K': '#1A0A00',
  'R': '#C0392B',
  'G': '#1D7A3E',
  'T': '#0D8CAF',
  'Y': '#C8960C',
  'O': '#E67E22',
  'P': '#BF7070',
  'A': '#5D3217',
}

// 12 cols × 20 rows — each cell is a color key
const BASE = [
  ['_','_','_','T','T','R','R','Y','_','_','_','_'], // 0  feathers
  ['_','_','G','T','R','R','R','Y','Y','_','_','_'], // 1
  ['_','G','G','R','R','T','T','R','Y','Y','_','_'], // 2
  ['_','D','D','D','D','D','D','D','D','D','_','_'], // 3  crown band
  ['_','D','O','D','_','D','D','_','D','O','_','_'], // 4  crown gems
  ['_','_','B','B','B','B','B','B','B','B','_','_'], // 5  head top
  ['_','B','B','B','B','B','B','B','B','B','B','_'], // 6
  null, // 7  eyes — replaced by mood
  null, // 8  pupils — replaced by mood
  ['_','B','B','L','L','B','B','L','L','B','B','_'], // 9  under eye
  ['P','B','B','B','B','B','B','B','B','B','B','P'], // 10 blush
  null, // 11 brows/expression — replaced by mood
  null, // 12 mouth — replaced by mood
  ['_','B','B','B','B','B','B','B','B','B','B','_'], // 13
  ['A','_','B','B','B','B','B','B','B','B','_','A'], // 14 arms
  ['A','_','B','B','B','B','B','B','B','B','_','A'], // 15
  ['_','_','B','B','B','B','B','B','B','B','_','_'], // 16
  ['_','_','B','B','B','B','B','B','B','B','_','_'], // 17
  ['_','_','_','B','B','_','_','B','B','_','_','_'], // 18 feet
  ['_','_','_','D','D','_','_','D','D','_','_','_'], // 19
]

const MOODS = {
  neutral: {
    7:  ['_','B','B','W','W','B','B','W','W','B','B','_'],
    8:  ['_','B','B','W','K','B','B','W','K','B','B','_'],
    11: ['_','B','B','B','K','B','B','K','B','B','B','_'],
    12: ['_','B','B','B','B','K','K','B','B','B','B','_'],
  },
  happy: {
    7:  ['_','B','B','B','B','B','B','B','B','B','B','_'],
    8:  ['_','B','B','K','K','B','B','K','K','B','B','_'],
    11: ['_','B','B','B','B','B','B','B','B','B','B','_'],
    12: ['_','B','K','B','B','B','B','B','B','K','B','_'],
    13: ['_','B','B','K','K','K','K','K','K','B','B','_'],
  },
  surprised: {
    7:  ['_','B','K','W','W','B','B','W','W','K','B','_'],
    8:  ['_','B','B','W','K','B','B','W','K','B','B','_'],
    11: ['_','B','B','B','B','B','B','B','B','B','B','_'],
    12: ['_','B','B','K','K','K','K','K','B','B','B','_'],
    13: ['_','B','B','K','B','B','B','K','B','B','B','_'],
  },
  sarcastic: {
    7:  ['_','B','B','W','W','B','B','W','W','B','B','_'],
    8:  ['_','B','B','W','K','B','B','W','K','B','B','_'],
    11: ['_','B','K','B','B','B','B','B','B','B','B','_'],
    12: ['_','B','B','B','B','B','K','B','B','B','B','_'],
    13: ['_','B','B','B','B','B','B','K','B','B','B','_'],
  },
}

function buildGrid(mood) {
  const overrides = MOODS[mood] || MOODS.neutral
  return BASE.map((row, i) => {
    if (row === null) {
      return overrides[i] || ['_','_','_','_','_','_','_','_','_','_','_','_']
    }
    return overrides[i] || row
  })
}

function renderGrid(grid) {
  const rects = []
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      const color = COLORS[cell]
      if (!color) return
      rects.push(
        <rect
          key={`${rowIdx}-${colIdx}`}
          x={colIdx * P}
          y={rowIdx * P}
          width={P}
          height={P}
          fill={color}
        />
      )
    })
  })
  return rects
}

export default function KakawPixel({ mood = 'neutral', size = 120 }) {
  const COLS = 12
  const ROWS = 20
  const viewW = COLS * P
  const viewH = ROWS * P
  const grid = buildGrid(mood)
  const scale = size / viewW

  return (
    <svg
      width={viewW * scale}
      height={viewH * scale}
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ imageRendering: 'pixelated' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderGrid(grid)}
    </svg>
  )
}
