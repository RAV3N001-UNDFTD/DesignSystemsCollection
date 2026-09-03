/**
 * Registry 构建（方法论 L2）
 * registry/registry.json + 组件源码 → dist/registry/*.json（shadcn registry-item 格式）
 * 产物可直接通过 raw.githubusercontent.com URL 供 `npx shadcn add <url>` 安装。
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const OUT = 'dist/registry';
const registry = JSON.parse(readFileSync('registry/registry.json', 'utf8'));

mkdirSync(OUT, { recursive: true });

for (const item of registry.items) {
  const out = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    ...(item.dependencies ? { dependencies: item.dependencies } : {}),
    ...(item.registryDependencies ? { registryDependencies: item.registryDependencies } : {}),
    files: item.files.map((f) => ({
      path: f.path,
      type: f.type,
      ...(f.target ? { target: f.target } : {}),
      content: readFileSync(f.path, 'utf8'),
    })),
  };
  writeFileSync(`${OUT}/${item.name}.json`, JSON.stringify(out, null, 2) + '\n');
}

// registry 索引（不含文件内容），供发现与 MCP 消费
writeFileSync(
  `${OUT}/registry.json`,
  JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      name: registry.name,
      homepage: registry.homepage,
      items: registry.items.map(({ files, ...meta }) => ({
        ...meta,
        files: files.map(({ path, type, target }) => ({ path, type, ...(target ? { target } : {}) })),
      })),
    },
    null,
    2,
  ) + '\n',
);

console.log(`✔ registry built → ${OUT}/ (${registry.items.length} items + index)`);
