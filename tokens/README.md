# tokens/ — L1 Token 层

W3C DTCG 格式的设计 token 源文件。规范见 [methodology/01-token-naming.md](../methodology/01-token-naming.md)。

## 结构

```
primitive/   原始值（调色板、字号阶梯、间距标尺）——UI 代码禁止直接引用
semantic/    语义层（bg/fg/border/accent/status/ai...）——UI 代码消费这一层
themes/      主题 = semantic 层的完整颜色覆盖（dark.json；default 主题即 semantic 层本身的绑定）
```

## 构建与校验

```bash
npm run tokens:validate   # 结构校验：分层引用规则、主题完整性、无嵌套 token、无断链
npm run tokens:build      # Style Dictionary → dist/
npm run build             # 两者
```

产物（提交进仓库，供使用方直接引用）：

| 文件 | 内容 |
|---|---|
| `dist/css/tokens.default.css` | `:root` 下全部 `--ds-*` 变量（默认/亮色主题） |
| `dist/css/tokens.dark.css` | `[data-theme="dark"]` 下被覆盖的语义变量 |
| `dist/tailwind/theme.css` | Tailwind v4 `@theme inline` 桥接：生成 `bg-surface`、`text-accent`、`text-fg-muted`、`rounded-md`、`shadow-elevation-2` 等工具类 |

## 使用方接入（Tailwind v4 项目）

```css
/* app/globals.css */
@import "tailwindcss";
@import "<path-or-package>/dist/css/tokens.default.css";
@import "<path-or-package>/dist/css/tokens.dark.css";
@import "<path-or-package>/dist/tailwind/theme.css";
```

切换暗色主题：在 `<html>` 上设置 `data-theme="dark"`。

## 新增主题

1. 复制 `themes/dark.json` 为 `themes/<name>.json`，改写全部颜色绑定（只允许引用 primitive）；
2. 在 `scripts/build-tokens.mjs` 中为该主题追加一个构建实例（selector 用 `[data-theme="<name>"]`）；
3. `npm run build` 通过校验即完成——组件代码零改动。

## 已知的规范偏差（有意为之）

- `dimension` / `duration` / `cubicBezier` / `shadow` 的 `$value` 使用 CSS 字符串而非 DTCG 2025.10 的结构化对象形式——换取 Style Dictionary 管线的简单可靠；源文件结构不变，未来如需严格对象形式只需一次机械迁移。
