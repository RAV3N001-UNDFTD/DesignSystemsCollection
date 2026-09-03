/**
 * Token 结构校验（方法论 L1 的 CI 规则）
 *   1. primitive 层不得包含引用；
 *   2. semantic 层每个 token 的 $value 必须是指向 primitive 层的引用（禁止字面值、禁止跳层/同层引用）；
 *   3. theme 文件只能覆盖 semantic 层已存在的路径，值必须引用 primitive；
 *   4. 每个 theme 必须完整覆盖 semantic 层全部 color.* 叶子（保证主题切换不漏色）；
 *   5. 所有引用必须可解析。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];

function loadDir(dir) {
  const tokens = new Map(); // path -> { value, file }
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    walk(JSON.parse(readFileSync(join(dir, f), 'utf8')), [], tokens, join(dir, f));
  }
  return tokens;
}

function walk(node, path, out, file) {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return;
  if ('$value' in node) out.set(path.join('.'), { value: node.$value, file });
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    walk(child, [...path, key], out, file);
  }
}

const refOf = (value) => {
  if (typeof value !== 'string') return null;
  const m = value.match(/^\{([^}]+)\}$/);
  return m ? m[1] : null;
};
const containsRef = (value) => JSON.stringify(value).includes('{');

// 规则 0：DTCG 不允许 token 内嵌套 token（会被构建工具静默丢弃）
function checkNesting(tokens, label) {
  const paths = [...tokens.keys()];
  for (const p of paths) {
    for (const q of paths) {
      if (q !== p && q.startsWith(p + '.')) errors.push(`[${label}] ${q} 嵌套在 token ${p} 内部（DTCG 禁止；状态变体应与 .default 同级）`);
    }
  }
}

const primitive = loadDir('tokens/primitive');
const semantic = loadDir('tokens/semantic');
const themesDir = 'tokens/themes';

checkNesting(primitive, 'primitive');
checkNesting(semantic, 'semantic');

// 规则 1
for (const [path, t] of primitive) {
  if (containsRef(t.value)) errors.push(`[primitive] ${path} (${t.file}) 不得包含引用`);
}

// 规则 2 + 5
for (const [path, t] of semantic) {
  const ref = refOf(t.value);
  if (!ref) errors.push(`[semantic] ${path} (${t.file}) 的 $value 必须是引用，得到: ${JSON.stringify(t.value)}`);
  else if (!primitive.has(ref)) {
    errors.push(
      semantic.has(ref)
        ? `[semantic] ${path} 引用了同层 token {${ref}}（semantic 只能引用 primitive）`
        : `[semantic] ${path} 引用不存在的 primitive {${ref}}`,
    );
  }
}

// 规则 3 + 4 + 5
const semanticColorLeaves = [...semantic.keys()].filter((p) => p.startsWith('color.'));
for (const f of readdirSync(themesDir).filter((f) => f.endsWith('.json'))) {
  const theme = new Map();
  walk(JSON.parse(readFileSync(join(themesDir, f), 'utf8')), [], theme, join(themesDir, f));
  for (const [path, t] of theme) {
    if (!semantic.has(path)) errors.push(`[theme:${f}] ${path} 不是已定义的 semantic token，主题只能覆盖 semantic 层`);
    const ref = refOf(t.value);
    if (!ref) errors.push(`[theme:${f}] ${path} 的 $value 必须是引用`);
    else if (!primitive.has(ref)) errors.push(`[theme:${f}] ${path} 引用不存在或非 primitive 的 {${ref}}`);
  }
  const missing = semanticColorLeaves.filter((p) => !theme.has(p));
  if (missing.length) errors.push(`[theme:${f}] 未覆盖以下 color token（主题必须完整覆盖颜色语义层）:\n    ${missing.join('\n    ')}`);
}

if (errors.length) {
  console.error(`✘ token 校验失败（${errors.length} 项）:\n`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✔ token 校验通过：primitive ${primitive.size} · semantic ${semantic.size} · themes ${readdirSync(themesDir).filter((f) => f.endsWith('.json')).length}`);
