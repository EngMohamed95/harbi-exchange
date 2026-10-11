import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// The upstream rates feed sends no CORS headers, so the browser must read it through our own origin.
// In production public/rates-proxy.php does this; in dev/preview Vite proxies the same path.
const RATES_FEED_URL = new URL('https://rates.clearviewsys.com/alharbiexchange/uploads/ma/xml/rateswithcss.xml');
const ratesProxy = {
  '/rates-proxy.php': {
    target: RATES_FEED_URL.origin,
    changeOrigin: true,
    rewrite: () => RATES_FEED_URL.pathname,
  },
};

export default defineConfig(() => {
  return {
    // Relative asset paths so the build works from the domain root or a subfolder.
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: ratesProxy,
    },
    preview: {
      proxy: ratesProxy,
    },
  };
});
