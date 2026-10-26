// Five distinct, lightweight celebration themes for the Orientation reveal.
// Decorative particles use CSS (no canvas, images, dependencies, or randomness).
export const personaConfettiThemes = Object.freeze({
  conversationalist: { shape: 'bubble', colors: ['#e58d7d', '#f2c9a4', '#5aab9c', '#a0d8ba'] },
  thinker: { shape: 'diamond', colors: ['#7669b3', '#b4a4e9', '#77b4c7', '#d7caf2'] },
  storyteller: { shape: 'star', colors: ['#ebaa50', '#e77982', '#f1d38f', '#b179ac'] },
  explorer: { shape: 'triangle', colors: ['#50aec5', '#f4b354', '#a0dadd', '#d9845d'] },
  collaborator: { shape: 'ribbon', colors: ['#538569', '#b5cb81', '#dfb964', '#71a69a'] },
})
const particleCount = 34

export function getPersonaConfetti(roleId) {
  return personaConfettiThemes[roleId] ?? personaConfettiThemes.conversationalist
}

export function getPersonaConfettiPieces(roleId) {
  const theme = getPersonaConfetti(roleId)
  // Fixed angles make tests deterministic, while distinct seeds make every
  // persona's burst feel different. CSS takes care of motion and fading.
  const seed = Object.keys(personaConfettiThemes).indexOf(roleId) + 1
  return Array.from({ length: particleCount }, (_, i) => {
    const angle = ((i * 137.5 + seed * 18) * Math.PI) / 180
    const distance = 7 + ((i * 11 + seed * 3) % 18)
    return {
      color: theme.colors[(i + seed) % theme.colors.length],
      drift: (Math.cos(angle) * distance).toFixed(2) + 'vw',
      rise: '-' + (34 + ((i * 5 + seed) % 40)) + 'px',
      fall: (135 + ((i * 29 + seed * 17) % 230)) + 'px',
      delay: ((i * 17) % 120) + 'ms',
      duration: (1300 + ((i * 73) % 480)) + 'ms',
      spin: ((i % 2 ? -1 : 1) * (220 + i * 19)) + 'deg',
      size: 6 + (i % 4) * 2 + 'px',
    }
  })
}
