import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'src/core'),
      '@element': resolve(__dirname, 'src/element'),
      '@adapters': resolve(__dirname, 'src/adapters'),
      '@themes': resolve(__dirname, 'src/themes'),
    },
  },
  build: {
    lib: {
      entry: {
        'agent-ui-annotation': resolve(__dirname, 'src/index.ts'),
        'adapters/react/AgentUIAnnotation': resolve(__dirname, 'src/adapters/react/AgentUIAnnotation.tsx'),
        'adapters/vanilla/index': resolve(__dirname, 'src/adapters/vanilla/index.ts'),
        'adapters/vue/index': resolve(__dirname, 'src/adapters/vue/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'vue'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          vue: 'Vue',
        },
        // Preserve module structure for proper tree-shaking
        preserveModules: false,
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
  },
});
