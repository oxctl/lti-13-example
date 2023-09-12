import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'


// https://vitejs.dev/config/
export default defineConfig({
    // This is needed for deploying to GitHub pages where we might
    // not be deployed at the root
    base: './',
    server: {
        https: true,
        port: 3000
    },
    plugins: [
        react(),
        mkcert()
    ],
})
