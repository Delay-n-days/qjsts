// types/quickjs-ffi.d.ts
// quickjs-ffi 的 TypeScript 类型定义

declare module './quickjs-ffi.js' {
    /**
     * 封装一个 C 函数调用
     * @param lib      DLL 路径，如 './myadd.dll'
     * @param fn       函数名，如 'add'
     * @param nfixed   可变参数时固定参数个数，普通函数填 null
     * @param ret      返回值类型
     * @param args     参数类型列表
     *
     * 类型字符串：'void' | 'int' | 'uint' | 'long' | 'ulong' |
     *             'float' | 'double' | 'string' | 'pointer' |
     *             'int8' | 'uint8' | 'int16' | 'uint16' |
     *             'int32' | 'uint32' | 'int64' | 'uint64'
     */
    export class CFunction {
        constructor(
            lib: string,
            fn: string,
            nfixed: number | null,
            ret: string,
            ...args: string[]
        );
        invoke(...args: unknown[]): unknown;
        free(): void;
        cifcacheindex: number;
    }

    export function freeCif(index: number): void;
}
