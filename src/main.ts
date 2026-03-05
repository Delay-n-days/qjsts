// src/main.ts
import { loadLib } from './ffi.js';

// ── 1. 泛型 ──────────────────────────────────────────
function identity<T>(val: T): T {
  return val;
}

// ── 2. 接口 + 类 ──────────────────────────────────────
interface Shape {
  area(): number;
  name: string;
}

class Circle implements Shape {
  name = 'Circle';
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle implements Shape {
  name = 'Rectangle';
  constructor(private w: number, private h: number) {}
  area(): number {
    return this.w * this.h;
  }
}

// ── 3. 枚举 ───────────────────────────────────────────
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

// ── 4. 可选链 + 空值合并 ──────────────────────────────
interface User {
  name: string;
  address?: {
    city?: string;
  };
}

function getCity(user: User): string {
  return user.address?.city ?? '未知城市';
}

// ── 5. 类型守卫 ───────────────────────────────────────
function isCircle(shape: Shape): shape is Circle {
  return shape.name === 'Circle';
}

// ── 6. Promise + async/await ──────────────────────────
async function delay(ms: number): Promise<string> {
  return new Promise(resolve => {
    // qjs 没有 setTimeout，用同步模拟
    resolve(`等待了 ${ms}ms`);
  });
}

// ── 7. 解构 + 扩展运算符 ──────────────────────────────
function mergeObjects<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// ── 8. Map / Set ──────────────────────────────────────
function testCollections(): void {
  const map = new Map<string, number>();
  map.set('a', 1);
  map.set('b', 2);
  map.forEach((v, k) => console.log(`  map: ${k} = ${v}`));

  const set = new Set([1, 2, 3, 2, 1]);
  console.log(`  set size: ${set.size}`);  // 3
}

// ── 9. 高阶函数 ───────────────────────────────────────
function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduce((v, f) => f(v), x);
}

// ── 主流程 ────────────────────────────────────────────
(async () => {
  console.log('=== 1. 泛型 ===');
  console.log(identity<string>('hello qjs'));
  console.log(identity<number>(42));

  console.log('\n=== 2. 类 + 接口 ===');
  const shapes: Shape[] = [new Circle(5), new Rectangle(3, 4)];
  shapes.forEach(s => {
    console.log(`  ${s.name} area = ${s.area().toFixed(2)}`);
    if (isCircle(s)) console.log('  → 这是圆形');
  });

  console.log('\n=== 3. 枚举 ===');
  const dir = Direction.Up;
  console.log(`  方向: ${dir}`);

  console.log('\n=== 4. 可选链 ===');
  const u1: User = { name: 'Alice', address: { city: 'Beijing' } };
  const u2: User = { name: 'Bob' };
  console.log(`  ${u1.name}: ${getCity(u1)}`);
  console.log(`  ${u2.name}: ${getCity(u2)}`);

  console.log('\n=== 5. async/await ===');
  const msg = await delay(100);
  console.log(`  ${msg}`);

  console.log('\n=== 6. 解构 + 扩展 ===');
  const merged = mergeObjects({ x: 1 }, { y: 2, z: 3 });
  console.log(`  merged: ${JSON.stringify(merged)}`);

  console.log('\n=== 7. Map / Set ===');
  testCollections();

  console.log('\n=== 8. 高阶函数 pipe ===');
  const transform = pipe<number>(
    x => x * 2,
    x => x + 10,
    x => x ** 2,
  );
  console.log(`  pipe(3) = ${transform(3)}`);  // ((3*2)+10)^2 = 256

  console.log('\n=== 9. FFI 调用 ===');
  const lib = await loadLib();
  console.log(`  add(3, 5) = ${lib.add(3, 5)}`);
  console.log(`  addf(1.5, 2.5) = ${lib.addf(1.5, 2.5)}`);

  console.log('\n✅ 全部完成');
})();