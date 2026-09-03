/**
 * Token 构建管线（方法论 L1）
 * DTCG 源文件 → CSS variables（default / dark 两套主题） + Tailwind v4 @theme 桥接文件
 *
 * 产物：
 *   dist/css/tokens.default.css   :root 下的 --ds-* 变量（primitive + semantic）
 *   dist/css/tokens.dark.css      [data-theme="dark"] 下被覆盖的 semantic 变量
 *   dist/tailwind/theme.css       @theme inline，把语义 token 映射为 Tailwind 工具类
 */
import StyleDictionary from 'style-dictionary';

const PRIMITIVE = 'tokens/primitive/**/*.json';
const SEMANTIC = 'tokens/semantic/**/*.json';

/** 语义色路径 → Tailwind 颜色名（决定工具类名：bg-surface、text-accent 等） */
function tailwindColorName(path) {
  const [, ...p] = path; // drop leading "color"
  const [group, ...rest] = p;
  switch (group) {
    case 'bg':
      return rest[0];
    case 'fg':
      return rest[0] === 'default' ? 'fg' : `fg-${rest.join('-')}`;
    case 'border':
      return rest[0] === 'default' ? 'border' : `border-${rest.join('-')}`;
    case 'accent': {
      const tail = rest.filter((s) => s !== 'default');
      return tail.length ? `accent-${tail.join('-')}` : 'accent';
    }
    case 'status': {
      const [status, part] = rest;
      return part === 'fg' ? status : `${status}-${part}`;
    }
    case 'ai':
      return rest[0] === 'accent' ? 'ai' : `ai-${rest.join('-')}`;
    default:
      return p.join('-');
  }
}

StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  format: ({ dictionary }) => {
    const lines = [];
    for (const token of dictionary.allTokens) {
      const dsVar = `var(--ds-${token.path.join('-')})`;
      if (token.path[0] === 'color' && token.filePath.includes('semantic')) {
        lines.push(`  --color-${tailwindColorName(token.path)}: ${dsVar};`);
      } else if (token.path[0] === 'dimension' && token.path[1] === 'radius') {
        lines.push(`  --radius-${token.path[2]}: ${dsVar};`);
      } else if (token.path[0] === 'font' && token.path[1] === 'family') {
        lines.push(`  --font-${token.path[2]}: ${dsVar};`);
      } else if (token.path[0] === 'shadow' && token.path[1] === 'elevation') {
        lines.push(`  --shadow-elevation-${token.path[2]}: ${dsVar};`);
      }
    }
    return [
      '/* Generated — do not edit. Bridges --ds-* variables into Tailwind v4 utilities. */',
      "/* Import order: tokens.default.css, tokens.dark.css, then this file. */",
      '@theme inline {',
      ...lines,
      '}',
      '',
    ].join('\n');
  },
});

const cssPlatform = (files) => ({
  transformGroup: 'css',
  prefix: 'ds',
  buildPath: 'dist/',
  files,
});

// 主题一：default（primitive + semantic 即默认绑定）
const sdDefault = new StyleDictionary({
  source: [PRIMITIVE, SEMANTIC],
  log: { verbosity: 'silent' },
  platforms: {
    css: cssPlatform([
      {
        destination: 'css/tokens.default.css',
        format: 'css/variables',
        options: { outputReferences: true },
      },
      { destination: 'tailwind/theme.css', format: 'tailwind/theme' },
    ]),
  },
});

// 主题二：dark（只输出 themes/dark.json 覆盖到的 semantic token）
const sdDark = new StyleDictionary({
  include: [PRIMITIVE, SEMANTIC],
  source: ['tokens/themes/dark.json'],
  log: { verbosity: 'silent' },
  platforms: {
    css: cssPlatform([
      {
        destination: 'css/tokens.dark.css',
        format: 'css/variables',
        options: { outputReferences: true, selector: '[data-theme="dark"]' },
        filter: (token) => token.filePath.includes('themes/dark'),
      },
    ]),
  },
});

await sdDefault.buildAllPlatforms();
await sdDark.buildAllPlatforms();
console.log('✔ tokens built → dist/css/tokens.default.css, dist/css/tokens.dark.css, dist/tailwind/theme.css');
