import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from the root of mohammed-rayan07.github.io, so base stays '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
