"use client"

const P = 4 // px per pixel in SVG units

// Color palette per icon
const C = {
  '_': null,
  'K': '#1A0A00', // black
  'W': '#FFFEF5', // white
  'Y': '#D4AC0D', // gold/yellow
  'G': '#1D7A3E', // dark green
  'g': '#4CAF50', // light green (grass)
  'B': '#7B4F2E', // brown
  'D': '#3D1F0A', // dark brown
  'T': '#0D8CAF', // teal
  'O': '#E67E22', // orange
  'R': '#C0392B', // red
  'E': '#1A9651', // emerald (bill)
  'e': '#2ECC71', // light emerald
  'S': '#8E8E8E', // silver
  'b': '#0A1628', // dark blue (phone screen)
  'C': '#06B6D4', // cyan
}

// 8×8 icon grids
const ICONS = {
  trueque: [ // Exchange / hands
    ['_','K','_','_','_','_','K','_'],
    ['_','K','K','_','_','K','K','_'],
    ['Y','_','K','K','K','K','_','Y'],
    ['Y','Y','_','K','K','_','Y','Y'],
    ['Y','Y','_','K','K','_','Y','Y'],
    ['Y','_','K','K','K','K','_','Y'],
    ['_','K','K','_','_','K','K','_'],
    ['_','K','_','_','_','_','K','_'],
  ],
  mercancia: [ // Cacao bean
    ['_','_','B','B','B','_','_','_'],
    ['_','B','B','D','B','B','_','_'],
    ['B','B','D','B','D','B','B','_'],
    ['B','B','B','D','B','B','B','_'],
    ['B','B','D','B','D','B','B','_'],
    ['B','B','B','D','B','B','B','_'],
    ['_','B','B','B','B','B','_','_'],
    ['_','_','B','B','B','_','_','_'],
  ],
  metales: [ // Gold coin
    ['_','_','Y','Y','Y','Y','_','_'],
    ['_','Y','Y','Y','Y','Y','Y','_'],
    ['Y','Y','_','Y','_','_','Y','Y'],
    ['Y','Y','_','Y','Y','_','Y','Y'],
    ['Y','Y','_','Y','_','_','Y','Y'],
    ['Y','Y','Y','_','_','Y','Y','Y'],
    ['_','Y','Y','Y','Y','Y','Y','_'],
    ['_','_','Y','Y','Y','Y','_','_'],
  ],
  papel: [ // Banknote
    ['E','E','E','E','E','E','E','E'],
    ['E','W','_','_','_','_','W','E'],
    ['E','_','e','e','e','_','_','E'],
    ['E','_','e','_','e','_','_','E'],
    ['E','_','e','e','e','_','_','E'],
    ['E','W','_','_','_','_','W','E'],
    ['E','E','E','E','E','E','E','E'],
    ['_','_','_','_','_','_','_','_'],
  ],
  digital: [ // Phone
    ['_','D','D','D','D','D','_','_'],
    ['D','D','C','C','C','D','D','_'],
    ['D','D','C','C','C','D','D','_'],
    ['D','D','C','b','C','D','D','_'],
    ['D','D','C','C','C','D','D','_'],
    ['D','D','C','C','C','D','D','_'],
    ['D','D','D','W','D','D','D','_'],
    ['_','D','D','D','D','D','_','_'],
  ],
  bitcoin: [ // ₿ symbol
    ['_','O','O','O','O','_','_','_'],
    ['O','O','W','W','O','O','_','_'],
    ['O','W','W','O','W','W','_','_'],
    ['O','W','W','W','W','O','_','_'],
    ['O','W','W','W','W','O','_','_'],
    ['O','W','W','O','W','W','_','_'],
    ['O','O','W','W','O','O','_','_'],
    ['_','O','O','O','O','_','_','_'],
  ],
  aventura: [ // Game controller
    ['_','K','K','K','K','K','K','_'],
    ['K','K','W','K','K','W','K','K'],
    ['K','W','W','W','W','W','W','K'],
    ['K','W','K','W','K','K','W','K'],
    ['K','W','K','W','K','K','W','K'],
    ['K','W','W','W','W','W','W','K'],
    ['_','K','K','K','K','K','K','_'],
    ['_','_','_','_','_','_','_','_'],
  ],
}

function renderIcon(grid) {
  const rects = []
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      const color = C[cell]
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

export default function ModuleIcon({ slug, size = 40 }) {
  const grid = ICONS[slug] || ICONS.trueque
  const dim = 8 * P
  const scale = size / dim

  return (
    <svg
      width={dim * scale}
      height={dim * scale}
      viewBox={`0 0 ${dim} ${dim}`}
      style={{ imageRendering: 'pixelated' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderIcon(grid)}
    </svg>
  )
}
