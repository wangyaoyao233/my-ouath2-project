import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // port: 4000,
  server: {
    port: 4000,
  },
  plugins: [react()],
})
