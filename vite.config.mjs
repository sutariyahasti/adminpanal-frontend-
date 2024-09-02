import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  // Adjust the base path if necessary
  base: process.env.VERCEL_ENV === 'production' ? '/free/' : '/',
  define: {
    global: 'window'
  },
  resolve: {
    // Custom path aliases if needed, otherwise can be removed
    // alias: {
    //   '@': '/src',
    // }
  },
  // The following server options are for local development and can be omitted for Vercel deployment
  server: {
    open: true,
    port: process.env.PORT,
  },
  preview: {
    open: true,
    port: 3000,
  }
});
