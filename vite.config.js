import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'https://api.gr.axra.app/v1/graphql', 
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/graphql/, '') 
      },
    },
  },
})
