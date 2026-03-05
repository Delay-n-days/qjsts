// src/calc.ts
// 业务逻辑层 - 纯粹，不直接依赖 FFI
// 通过参数注入 lib，方便单元测试

export interface CalcLib {
    add(a: number, b: number): number;
    addf(a: number, b: number): number;
}

export function runCalc(lib: CalcLib): void {
    const r1 = lib.add(3, 5);
    console.log(`add(3, 5) = ${r1}`);

    const r2 = lib.addf(1.5, 2.5);
    console.log(`addf(1.5, 2.5) = ${r2}`);

    const r3 = lib.add(r1, 12);
    console.log(`add(${r1}, 12) = ${r3}`);
}
