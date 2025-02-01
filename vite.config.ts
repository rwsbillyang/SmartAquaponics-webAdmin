import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    pluginPurgeCss({ //https://www.npmjs.com/package/@mojojoejo/vite-plugin-purgecss
      content: ['**/*.js', '**/*.html', '**/*.tsx'],
      css: ['src/index.css'],
      variables: true,
    }),
  ],
})