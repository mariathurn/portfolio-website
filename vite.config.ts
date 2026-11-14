import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// One HTML file per page, so /work/schafi/ works on any static host without rewrites.
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        schafi: resolve(import.meta.dirname, 'work/schafi/index.html'),
      },
    },
  },
})
