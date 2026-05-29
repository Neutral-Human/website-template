import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:6]'
          : '[name]_[local]_[hash:base64:5]'
        
    }
  },
  build: {
    minify: 'terser',
    // sourcemap: true,
    terserOptions: {
      mangle: true,
      compress: true,
      toplevel: true,
    },
  },
})
