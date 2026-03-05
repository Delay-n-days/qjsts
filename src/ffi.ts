// src/ffi.ts
declare const IS_QJS: boolean;
declare const CFunction: any;

export interface MyLib {
    add(a: number, b: number): number;
    addf(a: number, b: number): number;
}

// ── 只需维护这一份函数定义 ──────────────────────────
const DLL = './myadd.dll';
const FUNCS = [
    { name: 'add',  ret: 'int',    args: ['int',    'int']    },
    { name: 'addf', ret: 'double', args: ['double', 'double'] },
] as const;
// ────────────────────────────────────────────────────

async function loadQjs(): Promise<MyLib> {
    const lib: any = {};
    for (const f of FUNCS) {
        const fn = new CFunction(DLL, f.name, null, f.ret, ...f.args);
        lib[f.name] = (...args: number[]) => fn.invoke(...args);
    }
    return lib;
}

async function loadNode(): Promise<MyLib> {
    const koffi = (await import('koffi')).default;
    const dll = koffi.load(DLL);
    const lib: any = {};
    for (const f of FUNCS) {
        const sig = `${f.ret} ${f.name}(${f.args.join(', ')})`;
        const fn = dll.func(sig);
        lib[f.name] = (...args: number[]) => fn(...args);
    }
    return lib;
}

export async function loadLib(): Promise<MyLib> {
    if (typeof IS_QJS !== 'undefined' && IS_QJS) {
        return loadQjs();
    }
    return loadNode();
}