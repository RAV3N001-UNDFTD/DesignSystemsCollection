# registry/ — L2 组件层（shadcn 兼容 registry）

组件以 open code 形式分发：安装后成为使用方项目自己的代码，AI 代理可直接阅读与修改。规范见 [methodology/00-four-layer-model.md](../methodology/00-four-layer-model.md) §L2。

## 当前组件（v0）

| 分类 | 组件 | 说明 |
|---|---|---|
| base | `button` `card` `input` `badge` | token 化的基础组件；badge 含 AI 内容标识专用的 `ai` variant |
| composed | `page-header` | 应用页面标准标题区 |
| blocks | `portfolio-hero` `project-grid` | 作品集整块版面，数据驱动 |

每个组件目录固定三件套：`<name>.tsx`（源码）、`<name>.rules.md`（AI 使用规则，**随组件一起安装**到使用方项目）、`<name>.demo.tsx`（最小示例，仅本仓库用）。

## 使用方安装

前置：Tailwind v4 项目，已完成 `npx shadcn init`，并按 [tokens/README.md](../tokens/README.md) 引入三个 token CSS 文件。

```bash
# 单个组件（rules.md 会一起装进 components/ui/）
npx shadcn add https://raw.githubusercontent.com/RAV3N001-UNDFTD/DesignSystemsCollection/main/dist/registry/button.json

# blocks（自动带上依赖的 card/badge）
npx shadcn add https://raw.githubusercontent.com/RAV3N001-UNDFTD/DesignSystemsCollection/main/dist/registry/project-grid.json
```

> 分支尚未合并到 `main` 时，把 URL 中的 `main` 换成当前分支名。

## 本仓库的构建与校验

```bash
npm run registry:validate  # item 元数据完整、rules.md 四章节齐全、源码无 hex/primitive 色板类/任意 px/inline style
npm run typecheck          # tsc --noEmit（@/ 别名由 registry/_typecheck/ 替身解析）
npm run registry:build     # → dist/registry/<name>.json（shadcn registry-item 格式，内嵌源码）
```

`registry/_typecheck/` 只是类型检查替身（真实项目中 `cn` 来自 shadcn init），不参与分发。

## 新增组件清单

1. 在 `items/<base|composed|blocks>/<name>/` 建三件套；
2. 源码只用语义工具类（`bg-surface`、`text-accent`、`text-body-sm`、`shadow-elevation-*`...），校验器会拒绝 primitive 色板类与硬编码值；
3. `registry.json` 注册 item（description 供 CLI 搜索与未来 MCP 消费，必填）；
4. 在 `_typecheck/components/` 加对应 re-export 替身；
5. `npm run build` 全绿后提交（CI 会验证 dist 与源码同步）。
