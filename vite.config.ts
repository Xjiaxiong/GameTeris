import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   modules: {
  //     scopeBehaviour: 'local',
  //     generateScopedName: '[name]__[local]___[hash:base64:5]',
  //   },
  //   preprocessorOptions: {
  //     less: {
  //       javascriptEnabled: true, // 确保 LESS 解析器支持 JavaScript（需要的话）
  //     },
  //   },
  // },
  base: '/GameTeris/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
})
