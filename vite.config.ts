import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // SPA fallback for dev server — serve index.html for all 404s
      historyApiFallback: true,
    },
    plugins: [react()],
    define: {
      // NOTE: API keys should never be exposed in client bundles in production.
      // Use a backend proxy (e.g. Netlify Function) to keep keys server-side.
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Generate source maps only in staging; omit in production to reduce bundle size
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          // Code-split large vendor chunks for better caching
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            'vendor-icons': ['lucide-react'],
          },
        },
      },
    },
  };
});
