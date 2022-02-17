import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import postcssImport from 'postcss-import'
import postcssUrl from 'postcss-url'
import nested from 'postcss-nested'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [postcssImport, postcssUrl, nested]
    }
  },
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  }
})
