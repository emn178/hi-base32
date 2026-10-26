import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/base32.mjs',
    output: {
      file: 'build/base32.mjs',
      format: 'es'
    },
    plugins: [commonjs({
      strictRequires: false
    })]
  },
  {
    input: 'build/base32.mjs',
    output: {
      file: 'build/base32.min.mjs',
      format: 'es'
    },
    plugins: [terser()]
  }
];
