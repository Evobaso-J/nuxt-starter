import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['app/**/*.{test,spec}.ts', 'shared/**/*.{test,spec}.ts'],
          exclude: ['**/*.nuxt.{test,spec}.ts'],
          environment: 'node',
        },
        resolve: {
          alias: {
            '~~': resolve(__dirname),
            '~': resolve(__dirname, 'app'),
          },
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['app/**/*.nuxt.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
      {
        test: {
          name: 'server',
          include: ['server/**/*.{test,spec}.ts'],
          environment: 'node',
        },
        resolve: {
          alias: {
            '~~': resolve(__dirname),
          },
        },
      },
    ],
  },
})
