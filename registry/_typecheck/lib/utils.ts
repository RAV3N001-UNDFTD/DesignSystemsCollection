// 类型检查替身：真实项目中 cn 来自 shadcn init 生成的 lib/utils（clsx + tailwind-merge）。
// 仅用于本仓库对 registry 源码做 tsc --noEmit，不随组件分发。
export type ClassValue = string | number | boolean | null | undefined;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}
