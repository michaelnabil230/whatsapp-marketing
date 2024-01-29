import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  const envFile = dotenv.config({ path: mode === 'production' ? '.env.production' : '.env' }).parsed;

  return {
    plugins: [vue()],
    server: { proxy: { '/api': envFile.SOCKET_SERVER } },
    define: {
      'process.env': JSON.stringify(envFile),
    },
  };
});