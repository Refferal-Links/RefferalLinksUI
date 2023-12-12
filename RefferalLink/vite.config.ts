
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

export default ({ mode}:{mode:any}) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    define: {
      'process.env': env,
    },
    plugins: [vue()],
    server: {
      host: true,
      port: 8080,
    },
    resolve: {
      alias: {
        // Assuming the "src" directory is in the root of your project
        '@': '/src',
      },
    },
  });
};