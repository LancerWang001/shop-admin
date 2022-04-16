import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    }),
    vueJsx({
      // 配置选项
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";\n'
      }
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/admin': {
        target: 'https://shop.fed.lagounews.com/api',
        changeOrigin: true
      }
    }
  }
})
