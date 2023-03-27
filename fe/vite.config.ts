import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/

export default defineConfig({
    resolve: {
        alias: {
            '/components': path.resolve(__dirname, 'src/components'),
            '/features': path.resolve(__dirname, 'src/pages'),
            '/hooks': path.resolve(__dirname, 'src/hooks'),
        },
    },
    plugins: [react()],
    server: {
        proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true, secure: false } },
        host: true,
        port: 8000,
    },
    preview: {
        port: 8000,
    },
});
