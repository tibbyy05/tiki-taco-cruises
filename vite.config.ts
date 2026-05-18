import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type {} from 'vite-react-ssg';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssgOptions: {
    entry: 'src/main.tsx',
    dirStyle: 'nested',
    // Skip admin routes (auth-gated, dynamic) and the wildcard 404 from prerender.
    // The SPA fallback in _redirects serves them via client-side rendering.
    includedRoutes: (paths) =>
      paths.filter((p) => {
        const normalized = p.replace(/^\/+/, '');
        return !normalized.startsWith('admin') && !normalized.includes('*');
      }),
  },
});
