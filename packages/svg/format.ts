import { optimize } from 'svgo'
import { glob } from 'fast-glob'
import { commonPlugins, pureColorPlugins } from './plugins'
import { fileURLToPath } from 'url'
import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const normalFiles = await glob('*.svg', {
  cwd: path.resolve(__dirname, 'normal'),
  absolute: true
})

const colorfulFiles = await glob('*.svg', {
  cwd: path.resolve(__dirname, 'colorful'),
  absolute: true
})

await Promise.all([
  ...normalFiles.map(async file => {
    const svgStr = await readFile(file, 'utf-8')
    const { data } = optimize(svgStr, {
      plugins: [...commonPlugins, ...pureColorPlugins]
    })
    await writeFile(file, data)
  }),
  ...colorfulFiles.map(async file => {
    const svgStr = await readFile(file, 'utf-8')
    const { data } = optimize(svgStr, {
      plugins: [...commonPlugins]
    })
    await writeFile(file, data)
  })
])
