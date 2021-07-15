import path from 'path'
import buildins from 'builtin-modules'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'

export default {
  input: path.resolve(__dirname, 'tjs/index.js'),
  output: {
    entryFileNames: 'index.js',
    preferConst: true,
    sourcemap: true,
    exports: 'named'
  },
  external: [
    ...buildins
  ],
  plugins: [
    commonjs({
      include: /node_modules/
    }),
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
      babelHelpers: 'runtime'
    }),
    json()
  ]
}
