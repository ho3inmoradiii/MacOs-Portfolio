import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const rootDir = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@components": resolve(rootDir, "src/components"),
      "@store": resolve(rootDir, "src/store"),
      "@constants": resolve(rootDir, "src/constants"),
      "@hoc": resolve(rootDir, "src/hoc"),
      "@windows": resolve(rootDir, "src/windows"),
    }
  }
})
