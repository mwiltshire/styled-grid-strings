import del from 'del';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import typescript from 'rollup-plugin-typescript2';

export default async () => {
  await del('dist');
  return [
    {
      input: './src/index.ts',
      output: { file: './dist/index.js', format: 'esm' },
      plugins: [typescript({ tsconfig: 'tsconfig.build.json' }), sizeSnapshot()]
    },
    {
      input: './src/index.ts',
      output: { file: './dist/index.cjs.js', format: 'cjs' },
      plugins: [typescript({ tsconfig: 'tsconfig.build.json' }), sizeSnapshot()]
    }
  ];
};
