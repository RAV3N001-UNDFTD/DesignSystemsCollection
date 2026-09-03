/**
 * Registry 校验（方法论 L2 的 CI 规则）
 *   1. registry.json 每个 item 必须有 name/type/title/description，引用的文件必须存在；
 *   2. 每个组件目录必须有 <name>.rules.md（含四个必备章节）和 <name>.demo.tsx；
 *   3. 组件源码（.tsx）禁止：hex 颜色、primitive 色板类（bg-blue-600 等）、任意值 px、inline style。
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { globSync } from 'node:fs';

const errors = [];
const registry = JSON.parse(readFileSync('registry/registry.json', 'utf8'));

const RULES_SECTIONS = ['何时用', '何时不用', '组合约束', '可访问性'];
const FORBIDDEN = [
  [/#[0-9a-fA-F]{3,8}\b/, 'hex 颜色字面值（必须用语义 token 类）'],
  [
    /\b(?:bg|text|border|ring|fill|stroke|from|to|via)-(?:gray|zinc|slate|stone|neutral|blue|red|green|amber|yellow|violet|purple|indigo|sky|cyan|teal|orange|pink|rose|emerald|lime|fuchsia)-\d+/,
    'primitive 色板类（UI 只允许语义类：bg-surface / text-accent...）',
  ],
  [/\[[-\d.]+px\]/, '任意值 px（用 spacing/size 标尺工具类）'],
  [/style=\{\{/, 'inline style（对主题与审计不可见）'],
];

for (const item of registry.items) {
  const label = `item:${item.name}`;
  for (const key of ['name', 'type', 'title', 'description']) {
    if (!item[key]) errors.push(`[${label}] 缺少 ${key}`);
  }
  const componentFile = item.files?.find((f) => f.path.endsWith('.tsx'));
  if (!componentFile) {
    errors.push(`[${label}] files 中没有组件源文件`);
    continue;
  }
  for (const f of item.files) {
    if (!existsSync(f.path)) errors.push(`[${label}] 文件不存在: ${f.path}`);
    if (f.type === 'registry:file' && !f.target) errors.push(`[${label}] registry:file 必须声明 target: ${f.path}`);
  }

  const dir = dirname(componentFile.path);
  const rulesPath = join(dir, `${item.name}.rules.md`);
  const demoPath = join(dir, `${item.name}.demo.tsx`);
  if (!existsSync(rulesPath)) errors.push(`[${label}] 缺少 ${rulesPath}（每个组件必须带 AI 使用规则）`);
  else {
    const rules = readFileSync(rulesPath, 'utf8');
    for (const section of RULES_SECTIONS) {
      if (!rules.includes(`## ${section}`)) errors.push(`[${label}] ${rulesPath} 缺少章节 "## ${section}"`);
    }
    if (!item.files.some((f) => f.path === rulesPath)) {
      errors.push(`[${label}] rules.md 未列入 files（规则必须随组件一起安装）`);
    }
  }
  if (!existsSync(demoPath)) errors.push(`[${label}] 缺少 ${demoPath}`);
}

// 规则 3：扫描全部组件与 demo 源码
for (const file of globSync('registry/items/**/*.tsx')) {
  const src = readFileSync(file, 'utf8');
  for (const [pattern, why] of FORBIDDEN) {
    const m = src.match(pattern);
    if (m) errors.push(`[source] ${file} 含被禁止的写法 "${m[0]}" — ${why}`);
  }
}

if (errors.length) {
  console.error(`✘ registry 校验失败（${errors.length} 项）:\n`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✔ registry 校验通过：${registry.items.length} 个 item`);
