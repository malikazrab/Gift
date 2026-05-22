import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Optimize build for production
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'
            } else if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animations'
            } else if (id.includes('react-router')) {
              return 'vendor-router'
            }
            return 'vendor'
          }
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    reportCompressedSize: false,
    cssCodeSplit: true,
  },
  server: {
    hmr: {
      protocol: 'ws',
    },
  },
})
