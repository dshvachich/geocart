import { defineConfig } from 'orval'

export default defineConfig({
  geocart: {
    input: {
      target: './openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      target: './src/data/openapi/endpoints/geocart.ts',
      schemas: './src/data/openapi/models',
      client: 'axios-functions',
      indexFiles: true,
      prettier: true,
      clean: true,
      override: {
        mutator: {
          path: './src/network/orval-client.ts',
          name: 'orvalClient',
        },
      },
    },
  },
})
