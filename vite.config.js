import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
    cssCodeSplit: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
        charset: false
      }
    },
    devSourcemap: true,
    postcss: {
      plugins: []
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  publicDir: 'public'
})