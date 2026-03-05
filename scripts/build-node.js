import esbuild from 'esbuild';
import { mkdirSync } from 'fs';

mkdirSync('dist-node', { recursive: true });

await esbuild.build({
    entryPoints: ['src/main.ts'],
    outfile: 'dist-node/main.js',
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',

    define: {
        'IS_QJS': 'false',
    },

    external: [
        'koffi',              // native addon，不能打包
        './quickjs-ffi.js',   // qjs 专用，node 不需要
        './quickjs-ffi.so',   // qjs 专用，node 不需要
    ],
});

console.log('✅ Node 构建完成 → dist-node/main.js');