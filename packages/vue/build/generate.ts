import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { emptyDir, ensureDir, readdir } from 'fs-extra'
import camelcase from 'camelcase'
import glob from 'fast-glob'
import { format } from 'prettier'
import { pathSrc, pathSvg } from './paths'
import type { BuiltInParserName } from 'prettier'

const getName = (file: string) => {
  const filename = path.basename(file).replace(/\.[a-z]+$/, '')
  const componentName = camelcase(filename, { pascalCase: true })

  return {
    filename,
    componentName
  }
}

const formatCode = (code: string, parser: BuiltInParserName = 'typescript') =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true
  })

const transformToVueComponent = async (file: string) => {
  const content = await readFile(file, 'utf-8')
  const { filename, componentName } = getName(file)

  const vue = await formatCode(
    `
<template>
${content}
</template>
<script setup lang="ts">
defineOptions({
  name: "${componentName}"
})
</script>`,
    'vue'
  )

  const typeName = path.basename(path.dirname(file))

  const typeDir = path.resolve(pathSrc, typeName)

  await ensureDir(typeDir)

  await writeFile(path.resolve(typeDir, `${filename}.vue`), vue, 'utf-8')
}

const generateEntry = async (dirs: string[]) => {
  await Promise.all(
    dirs.map(async dir => {
      const files = await glob('*.vue', { cwd: dir, absolute: true })

      const code = await formatCode(
        files
          .map(file => {
            const { filename, componentName } = getName(file)

            return `export { default as ${componentName} } from './${filename}.vue'`
          })
          .join('\n')
      )
      await writeFile(path.resolve(dir, 'index.ts'), code, 'utf-8')
    })
  )

  const entries = dirs.map(dir => {
    return `export * from './${path.basename(dir)}'`
  })

  await writeFile(
    path.resolve(pathSrc, 'index.ts'),
    entries.join('\n'),
    'utf-8'
  )
}

async function genComponents(dir: string) {
  const files = await glob('*.svg', { cwd: dir, absolute: true })

  await Promise.all(files.map(file => transformToVueComponent(file)))
}

export async function generate() {
  await ensureDir(pathSrc)
  await emptyDir(pathSrc)

  const dirs = await glob('**', {
    cwd: pathSvg,
    onlyDirectories: true
  })

  await Promise.all(
    dirs.map(dir => path.resolve(pathSvg, dir)).map(dir => genComponents(dir))
  )

  await generateEntry(dirs.map(dir => path.resolve(pathSrc, dir)))
}
