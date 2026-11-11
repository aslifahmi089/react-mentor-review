import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        lazy: "lazy.html",
        split: "split.html",
        serverstate: "serverstate.html",
        zustand: "zustand.html",
        serverstate: "serverstate.html",
      }
    }
  }
})