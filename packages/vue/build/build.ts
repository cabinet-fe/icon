import path from 'node:path'
import { build } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'
import { emptyDir } from 'fs-extra'
import { pathOutput, pathSrc } from './paths'

export async function bundle() {
  const entry = path.resolve(pathSrc, 'index.ts')
  await emptyDir(pathOutput)

  await build({
    entry: {
      colorful: path.resolve(pathSrc, 'colorful', 'index.ts'),
      normal: path.resolve(pathSrc, 'normal', 'index.ts'),

      index: entry
    },

    platform: 'browser',
    plugins: [
      Vue({
        isProduction: true,
        sourceMap: false
      })
    ],

    external: ['vue'],
    dts: { vue: true },
    minify: true,
    outDir: pathOutput,

    outputOptions: {
      chunkFileNames: '[name].js'
    }
  })
}
