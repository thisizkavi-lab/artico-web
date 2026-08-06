import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this project under /artico-web/; keep local dev at /.
  base: process.env.NODE_ENV === 'production' ? '/artico-web/' : '/',
  plugins: [react()],
})
