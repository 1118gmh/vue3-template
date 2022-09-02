import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@components': resolve(__dirname, 'src/components'),
        '@images': resolve(__dirname, 'src/assets/images'),
        '@views': resolve(__dirname, 'src/views'),
        '@store': resolve(__dirname, 'src/store')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/common/common.scss';"
        }
      }
    },
    server: {
      proxy: {
        // '/api1': {
        //   target: 'http://124.222.99.155:8012',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api1/, '')
        // },
        // '/api2': {
        //   // target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
        //   target: 'http://124.222.99.155:8011',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api2/, '')
        // }
      }
    }
  });
};
