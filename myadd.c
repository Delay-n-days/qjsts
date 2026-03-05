// myadd.c - 示例 C 库
// 编译命令：gcc -shared -o myadd.dll myadd.c

#include <windows.h>

__declspec(dllexport) int add(int a, int b) {
    return a + b;
}

__declspec(dllexport) double addf(double a, double b) {
    return a + b;
}