# qjsts

> 用 TypeScript 写逻辑，用 QuickJS 部署，调用任意 C DLL。

---

## 为什么用它

- **开发体验好** — TypeScript 全程类型检查，VSCode 断点调试
- **部署极简单** — 客户端只需几个文件，零安装，直接运行
- **调用 C 无负担** — 只需维护一份函数定义，Node 和 qjs 自动适配
- **代码有保护** — esbuild 压缩混淆，业务逻辑不裸露
- **添加函数只改一行** — `FUNCS` 数组加一条，两端自动同步

---

## 快速开始

```bash
npm install
npm run dev        # 开发调试（Node.js）
npm run build:qjs  # 打包部署（QuickJS）
```

## 部署

把 `qjs_runtime/` 文件夹给客户，运行：

```bash
qjs.exe main.js
```

## 添加新的 DLL 函数

只需改 `src/ffi.ts` 里的一个地方：

```typescript
const FUNCS = [
    { name: 'add',      ret: 'int',    args: ['int',    'int']    },
    { name: 'addf',     ret: 'double', args: ['double', 'double'] },
    { name: 'multiply', ret: 'int',    args: ['int',    'int']    }, // ← 加这一行
] as const;
```

完成。