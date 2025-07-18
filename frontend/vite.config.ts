import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),         // 👈 Add this
    tailwindcss(),   // ✅ keep this if needed (though this is not the standard Tailwind plugin)
  ],
})
