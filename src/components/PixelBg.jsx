"use client"

// Pixel art background inspired by RPG games:
// Bright sky blue, pixel clouds, indigo tree silhouettes,
// bright green grass strip, reddish-brown earth below

export default function PixelBg() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 320 640"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Sky gradient (bright cerulean blue) */}
        <rect x="0" y="0" width="320" height="480" fill="#5BC0E8" />
        {/* Sky — lighter top band */}
        <rect x="0" y="0" width="320" height="80" fill="#7DD4F0" />

        {/* Pixel clouds — left cluster */}
        <rect x="8"  y="16" width="32" height="8"  fill="#DDEEFF" />
        <rect x="4"  y="20" width="40" height="12" fill="#EEF6FF" />
        <rect x="8"  y="28" width="32" height="8"  fill="#DDEEFF" />

        {/* Pixel cloud — top right */}
        <rect x="220" y="8"  width="48" height="8"  fill="#DDEEFF" />
        <rect x="216" y="12" width="56" height="12" fill="#EEF6FF" />
        <rect x="220" y="20" width="48" height="8"  fill="#DDEEFF" />

        {/* Pixel cloud — mid right */}
        <rect x="240" y="100" width="40" height="8"  fill="#DDEEFF" />
        <rect x="236" y="104" width="48" height="12" fill="#EEF6FF" />
        <rect x="240" y="112" width="40" height="8"  fill="#DDEEFF" />

        {/* Pixel cloud — mid left */}
        <rect x="20" y="140" width="36" height="8"  fill="#DDEEFF" />
        <rect x="16" y="144" width="44" height="12" fill="#EEF6FF" />
        <rect x="20" y="152" width="36" height="8"  fill="#DDEEFF" />

        {/* Tree silhouettes — back layer (indigo/dark blue-violet) */}
        {/* Left tree */}
        <rect x="0"   y="360" width="8"  height="120" fill="#2E3A6E" />
        <rect x="0"   y="320" width="24" height="60"  fill="#2E3A6E" />
        <rect x="0"   y="300" width="16" height="28"  fill="#2E3A6E" />
        {/* Left tree 2 */}
        <rect x="20"  y="380" width="8"  height="100" fill="#2E3A6E" />
        <rect x="12"  y="344" width="24" height="48"  fill="#2E3A6E" />
        <rect x="16"  y="328" width="16" height="24"  fill="#2E3A6E" />
        {/* Center-left tree */}
        <rect x="60"  y="370" width="8"  height="110" fill="#3A4880" />
        <rect x="52"  y="334" width="24" height="48"  fill="#3A4880" />
        <rect x="56"  y="318" width="16" height="24"  fill="#3A4880" />
        {/* Right tree */}
        <rect x="272" y="360" width="8"  height="120" fill="#2E3A6E" />
        <rect x="264" y="320" width="24" height="60"  fill="#2E3A6E" />
        <rect x="268" y="300" width="16" height="28"  fill="#2E3A6E" />
        {/* Right tree 2 */}
        <rect x="294" y="380" width="8"  height="100" fill="#2E3A6E" />
        <rect x="288" y="344" width="24" height="48"  fill="#2E3A6E" />
        <rect x="292" y="328" width="16" height="24"  fill="#2E3A6E" />

        {/* Grass top edge — pixel jagged */}
        <rect x="0"   y="460" width="320" height="4"  fill="#3DA832" />
        <rect x="8"   y="456" width="8"   height="4"  fill="#3DA832" />
        <rect x="24"  y="456" width="12"  height="4"  fill="#3DA832" />
        <rect x="52"  y="456" width="8"   height="4"  fill="#3DA832" />
        <rect x="80"  y="452" width="16"  height="8"  fill="#3DA832" />
        <rect x="116" y="456" width="8"   height="4"  fill="#3DA832" />
        <rect x="144" y="452" width="12"  height="8"  fill="#3DA832" />
        <rect x="176" y="456" width="8"   height="4"  fill="#3DA832" />
        <rect x="200" y="452" width="16"  height="8"  fill="#3DA832" />
        <rect x="240" y="456" width="8"   height="4"  fill="#3DA832" />
        <rect x="268" y="452" width="12"  height="8"  fill="#3DA832" />
        <rect x="300" y="456" width="8"   height="4"  fill="#3DA832" />

        {/* Grass strip — bright green */}
        <rect x="0" y="460" width="320" height="24" fill="#4FC141" />

        {/* Grass pixel details (darker spots) */}
        <rect x="16"  y="464" width="8" height="4" fill="#3DA832" />
        <rect x="64"  y="468" width="8" height="4" fill="#3DA832" />
        <rect x="120" y="464" width="8" height="4" fill="#3DA832" />
        <rect x="180" y="468" width="8" height="4" fill="#3DA832" />
        <rect x="240" y="464" width="8" height="4" fill="#3DA832" />
        <rect x="288" y="468" width="8" height="4" fill="#3DA832" />

        {/* Earth — main reddish-brown layer */}
        <rect x="0" y="484" width="320" height="156" fill="#8B4513" />

        {/* Earth texture — dark horizontal pixel lines */}
        <rect x="0"   y="492" width="320" height="4" fill="#7A3B10" />
        <rect x="0"   y="508" width="320" height="4" fill="#6B3410" />
        <rect x="0"   y="524" width="320" height="4" fill="#7A3B10" />
        <rect x="0"   y="540" width="320" height="4" fill="#6B3410" />
        <rect x="0"   y="556" width="320" height="4" fill="#5C2D0E" />
        <rect x="0"   y="572" width="320" height="4" fill="#6B3410" />
        <rect x="0"   y="588" width="320" height="4" fill="#5C2D0E" />
        <rect x="0"   y="604" width="320" height="4" fill="#4A2409" />
        <rect x="0"   y="620" width="320" height="4" fill="#3D1F08" />

        {/* Earth texture — random pixel spots for depth */}
        <rect x="12"  y="496" width="4" height="4" fill="#6B3410" />
        <rect x="48"  y="500" width="4" height="4" fill="#9C5019" />
        <rect x="80"  y="516" width="4" height="4" fill="#6B3410" />
        <rect x="132" y="496" width="4" height="4" fill="#9C5019" />
        <rect x="164" y="512" width="4" height="4" fill="#6B3410" />
        <rect x="200" y="500" width="4" height="4" fill="#9C5019" />
        <rect x="248" y="520" width="4" height="4" fill="#6B3410" />
        <rect x="280" y="496" width="4" height="4" fill="#9C5019" />
        <rect x="36"  y="532" width="4" height="4" fill="#6B3410" />
        <rect x="100" y="548" width="4" height="4" fill="#9C5019" />
        <rect x="180" y="536" width="4" height="4" fill="#6B3410" />
        <rect x="220" y="552" width="4" height="4" fill="#9C5019" />
        <rect x="300" y="544" width="4" height="4" fill="#6B3410" />
      </svg>
    </div>
  )
}
