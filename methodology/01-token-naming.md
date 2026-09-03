# 方法论 v0 · Token 命名规范

> Token 命名即 API：L2/L3 组件、主题文件、L4 上下文都通过名字引用 token，改名是破坏性变更。本规范定义三层 token 的命名语法、词表和 DTCG 写法。

## 1. 命名语法

统一语法（点号分层，对应 DTCG JSON 的嵌套路径）：

```
<tier 由文件位置表达，不写进名字>
primitive:  {category}.{concept}.{scale}
semantic:   {category}.{role}.{prominence?}.{state?}
component:  {component}.{part?}.{property}.{variant?}.{state?}
```

- 全小写，多词用 `-` 连接（如 `on-accent`）；
- 编译到 CSS variables 时点号变连字符并加前缀：`color.bg.surface` → `--ds-color-bg-surface`；
- 可选段（`?`）省略时表示默认态/默认层级。

## 2. Primitive 层（原始值）

与品牌用途无关的"物理事实"。**UI 代码与主题文件之外的任何地方都不得直接引用。**

| category | concept 示例 | scale 规则 |
|---|---|---|
| `color` | `blue` `gray` `red`... | 色阶 `50–950`（对齐 Tailwind 习惯） |
| `font` | `size` `weight` `family` `line-height` | size/line-height 用百位数阶梯 `100,200,...`；weight 用语义词 `regular/medium/bold` |
| `dimension` | `space` `radius` `border-width` | space 用 4px 基数的数字阶梯 `1=4px, 2=8px...`；radius 用 `sm/md/lg/xl/full` |
| `shadow` | `elevation` | `1–5` |
| `motion` | `duration` `easing` | duration 用 `fast/base/slow/slower`；easing 用 `standard/enter/exit` |

示例：`color.blue.600`、`font.size.300`、`dimension.space.4`、`motion.duration.fast`。

## 3. Semantic 层（语义）——主题化发生的地方

把 primitive 绑定到**用途**。role 词表是封闭的（新增 role 需走方法论变更），这保证了任何主题都能完整覆盖语义层。

### color 的 role 词表

| role | 含义 | prominence 取值 |
|---|---|---|
| `bg` | 背景 | `canvas`（页面底）/ `surface`（卡片层）/ `raised`（浮层）/ `sunken`（内嵌） |
| `fg` | 前景文字/图标 | `default` / `muted` / `subtle` / `on-accent` |
| `border` | 描边分隔 | `default` / `muted` / `strong` |
| `accent` | 品牌强调 | `default` / `emphasis` / `muted` |
| `status` | 状态色 | `success` / `warning` / `danger` / `info`（各带 `bg/fg/border` 子段） |
| `ai` | AI 专属语义（L3 使用）：标识 AI 生成内容、streaming 光标、reasoning 面板底色 | `accent` / `surface` / `fg` |

state 段（仅交互性 token 需要）：`hover` / `active` / `disabled` / `focus`。

示例：

```
color.bg.surface            → {color.gray.50}
color.fg.on-accent          → {color.gray.50}
color.accent.default        → {color.blue.600}
color.accent.default.hover  → {color.blue.700}
color.status.danger.fg      → {color.red.600}
color.ai.surface            → {color.violet.50}
```

### 非颜色的 semantic

排版和间距同样语义化：`font.heading.1..4`、`font.body.default/small`、`font.code`；`dimension.space.inline/stack/section`（行内元素间距/垂直堆叠间距/区块间距）。

### 主题文件规则

`themes/<name>.json` **只允许出现 semantic 层路径**，且必须覆盖 color 全部 role（CI 校验完整性）。暗色模式是一个 theme，而不是组件里的条件逻辑。

## 4. Component 层（组件级）

**默认不建。** 只有当一个组件确需偏离语义层默认绑定时才创建，且值只能引用 semantic 层。

```
button.primary.bg          → {color.accent.default}
button.primary.bg.hover    → {color.accent.default.hover}
chat-bubble.assistant.bg   → {color.ai.surface}
```

判断标准：如果一个 component token 只是原样转发 semantic token（如 `card.bg → color.bg.surface`），删掉它，组件直接用 semantic。

## 5. DTCG 写法约定

```jsonc
// tokens/semantic/color.json
{
  "color": {
    "accent": {
      "default": {
        "$type": "color",
        "$value": "{color.blue.600}",
        "$description": "品牌主强调色。用于主按钮、链接、选中态。大面积铺底请改用 accent.muted。"
      }
    }
  }
}
```

- `$type` 在组的最外层能声明就不逐个重复；
- 引用一律花括号路径 `{color.blue.600}`，禁止复制字面值（断链由 CI 捕获）；
- `$description` 写"什么时候用/什么时候不用"，而不是重复名字——它会被生成进 DESIGN.md 供 AI 消费。

## 6. 禁止事项

1. 名字里出现原始值：~~`color.primary-blue`~~、~~`space.8px`~~（理由：换主题即失真）；
2. 名字里出现使用位置：~~`color.homepage-hero-bg`~~（理由：语义层描述用途类别，不描述具体页面；页面级差异用 blocks 或 component token 解决）；
3. UI 代码引用 primitive：~~`text-blue-600`~~ → 应为 `text-accent`（理由：主题化会失效）；
4. 同义词并存：`muted/subtle/faint` 只保留词表中的两个层级，新概念先修订本词表再使用。
