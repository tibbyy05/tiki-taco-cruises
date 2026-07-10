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
    // Inline each page's critical CSS and async-load the rest — removes the
    // render-blocking stylesheet request from first paint.
    beastiesOptions: {
      preload: 'media',
      // Component <style> blocks contain React-escaped quotes that beasties
      // can't parse; only the external stylesheet needs critical-CSS work.
      reduceInlineStyles: false,
    },
    // Skip admin routes (auth-gated, dynamic) and the wildcard 404 from prerender.
    // The SPA fallback in _redirects serves them via client-side rendering.
    includedRoutes: (paths) =>
      paths.filter((p) => {
        const normalized = p.replace(/^\/+/, '');
        return !normalized.startsWith('admin') && !normalized.includes('*');
      }),
  },
});
