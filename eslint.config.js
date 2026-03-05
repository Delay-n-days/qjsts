// eslint.config.js
import pluginN from 'eslint-plugin-n';
import tsParser from '@typescript-eslint/parser';  // ← 加这行
export default [
  // ── 构建脚本不受 qjs 限制 ──────────────────
  {
    files: ['scripts/**/*.js', 'script/**/*.js'],
    rules: {
      'no-restricted-imports': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
    }
  },

  // ── src 才受 qjs 限制 ──────────────────────
  {
    files: ['src/**/*.ts'],
    parser: tsParser,
    plugins: { n: pluginN },
    rules: {
 // 禁止 Node.js 专有模块
      'no-restricted-imports': ['error', {
        paths: [
          { name: 'fs',       message: 'qjs 不支持，请用 std/os 替代' },
          { name: 'path',     message: 'qjs 不支持，请用 std/os 替代' },
          { name: 'os',       message: 'qjs 不支持，请用 std/os 替代' },
          { name: 'crypto',   message: 'qjs 不支持' },
          { name: 'http',     message: 'qjs 不支持' },
          { name: 'net',      message: 'qjs 不支持' },
          { name: 'child_process', message: 'qjs 不支持' },
        ]
      }],

      // 禁止 qjs 不支持的全局 API
      'no-restricted-globals': ['error',
        { name: 'setTimeout',   message: 'qjs 请用 os.setTimeout' },
        { name: 'setInterval',  message: 'qjs 请用 os.setTimeout 循环替代' },
        { name: 'clearTimeout', message: 'qjs 请用 os.clearTimeout' },
        { name: '__dirname',    message: 'qjs 不支持，请用 import.meta.url' },
        { name: '__filename',   message: 'qjs 不支持，请用 import.meta.url' },
        { name: 'require',      message: '请使用 ESM import' },
        { name: 'Buffer',       message: 'qjs 不支持 Buffer' },
      ],

      // 禁止 process 对象（qjs 没有）
      'no-restricted-syntax': ['error', {
        selector: "MemberExpression[object.name='process']",
        message: 'qjs 不支持 process，请用环境判断封装'
      }]
    }
  }
];
