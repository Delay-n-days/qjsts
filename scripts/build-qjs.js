// scripts/build-qjs.js
import esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';

await esbuild.build({
    entryPoints: ['src/main.ts'],
    outfile: 'qjs_runtime/main.js',
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    target: 'es2020',
    minify: true,
    define: { 'IS_QJS': 'true' },
    external: ['./quickjs-ffi.js', 'koffi'],
});

// 在输出文件头部插入静态 import
const content = readFileSync('qjs_runtime/main.js', 'utf-8');
writeFileSync('qjs_runtime/main.js',
    `import { CFunction } from "./quickjs-ffi.js";\n` + content
);

console.log('✅ qjs 构建完成 → qjs_runtime/main.js');