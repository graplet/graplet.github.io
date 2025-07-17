import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/graplet-v3',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        editor: resolve(__dirname, 'editor/index.html'),
        home: resolve(__dirname, 'home/index.html'),
      },
    },
    chunkSizeWarningLimit: 2500
  },
})
