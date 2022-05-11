'use strict';

import Path from 'path'
import { fileURLToPath } from 'url'
import createDidDocument from './createDidDocument.js'

const packageJson = JSON.parse(fs.readFileSync(Path.join(fileURLToPath(import.meta.url), '../package.json'), 'utf8'))
const verson = packageJson.version

export { verson, createDidDocument }
