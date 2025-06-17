import { bundle } from './build'
import { generate } from './generate'

await generate()
await bundle()
