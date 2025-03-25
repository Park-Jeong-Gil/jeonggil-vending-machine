import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const projectName = 'vending-machine';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@images': resolve(__dirname, 'public', 'resources', 'images'),
    },
  },
  base: '',
  build: {
    cssMinify: false,
    minify: false,
    outDir: './build',

    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
      output: {
        inlineDynamicImports: false,
        assetFileNames: (assetInfo) => {
          // Ensure assetInfo.name is defined
          if (!assetInfo.name) {
            return `resources/other/[name][extname]`; // Default fallback
          }

          let extType = assetInfo.name.match(/\.([a-z0-9]+)$/i)?.[1];
          if (/(css)/i.test(extType || '')) {
            return `resources/${extType}/${projectName}-[hash][extname]`;
          } else if (/(png|jpe?g|svg|gif|tiff|bmp|ico)/i.test(extType || '')) {
            extType = 'images';
          } else if (/(woff2|woff|otf|ttf)/i.test(extType || '')) {
            extType = 'fonts';
          }
          return `resources/${extType || 'other'}/[name][extname]`; // Default fallback
        },
        chunkFileNames: `resources/js/${projectName}-[hash].js`,
        entryFileNames: `resources/js/${projectName}-[hash].js`,
      },
    },
  },

  plugins: [react()],
});
