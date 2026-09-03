# 方法论 v0 · 四层模型细则

> 本文是本仓库设计系统构建方法论的核心：定义四层架构中每一层的职责、产物、规则，以及"套用到一个新项目"的标准流程。配套文档：[01-token-naming.md](01-token-naming.md)（命名规范）、[templates/](templates/)（DESIGN.md / AGENTS.md 模板）。

## 总览

```
L4  AI 上下文层   DESIGN.md · AGENTS.md · llms.txt · registry manifest · (MCP)
L3  AI Patterns 层  chat 流 · streaming · tool call · reasoning · 生成式 UI 词汇表
L2  组件层        shadcn 兼容 registry（open code 分发）
L1  Token 层      W3C DTCG JSON（primitive → semantic → component）
```

**依赖方向自下而上**：L2 只引用 L1 的 semantic/component token；L3 由 L2 组合而成；L4 是 L1–L3 的"AI 可读投影"，**永远不手写独立事实**——L4 中的每条规则都必须能追溯到下面三层的源文件。

**每一层各自回答一个问题**：

| 层 | 回答的问题 | 消费者 |
|---|---|---|
| L1 | 我们的设计决策是什么值？ | 构建工具、L2 |
| L2 | 这些决策如何变成可用的界面零件？ | 开发者、AI 代理 |
| L3 | AI 产品特有的交互如何表达？ | AI 应用项目 |
| L4 | AI 代理如何正确使用以上一切？ | AI 编码代理 |

---

## L1 · Token 层

### 职责

以 W3C DTCG 格式（2025.10 稳定版）沉淀所有视觉设计决策。这是整个系统唯一的"值的来源"——L2/L3 的任何组件都不允许出现硬编码的颜色、字号、间距、圆角、阴影、动效时长。

### 产物

```
tokens/
├── primitive/          # 原始值：调色板、字号阶梯、间距标尺（与品牌无关的物理事实）
│   ├── color.json
│   ├── typography.json
│   ├── dimension.json
│   └── motion.json
├── semantic/           # 语义层：把原始值绑定到用途（主题化发生在这里）
│   ├── color.json      #   bg / fg / border / accent / status...
│   └── ...
├── component/          # 组件级 token（仅当组件确需偏离语义层时才建）
└── themes/             # 主题 = 一组 semantic 层的覆盖文件
    ├── default.json
    └── <theme-name>.json
```

### 规则

1. **三层结构不可跳层引用**：component token 只能引用 semantic，semantic 只能引用 primitive。UI 代码只消费 semantic / component 两层，永远不直接消费 primitive。
2. **主题化 = 覆盖 semantic 层**。一个新项目换皮肤时，只提供一份 `themes/<name>.json` 覆盖 semantic 绑定，primitive 和 component 结构不动。做不到这一点说明语义层设计有漏洞，应回来修语义层而不是在项目里打补丁。
3. **编译统一走 Style Dictionary**：源文件只写 DTCG JSON，输出目标（CSS variables、Tailwind theme、iOS/Android 资源）由构建配置决定。禁止任何项目直接手改编译产物。
4. **命名遵循** [01-token-naming.md](01-token-naming.md) 的语法，命名即 API，改名视为破坏性变更。
5. 每个 token 尽量填写 `$description`——它同时服务于人和 L4（AI 上下文由源文件生成，`$description` 会成为 AI 理解"什么时候用这个 token"的依据）。

### 验收标准（v1 完成的定义）

- 一份 DTCG 源 + Style Dictionary 配置，能同时输出 CSS variables 与 Tailwind 主题；
- 提供至少 2 套 theme 文件，切换主题不改任何组件代码；
- CI 校验：JSON 符合 DTCG schema、无断链引用、无跳层引用。

---

## L2 · 组件层

### 职责

以 shadcn 兼容 registry 的形式分发组件源码。组件进入项目后是**项目自己的代码**（open code），AI 代理可以直接阅读、修改、扩展。

### 产物

```
registry/
├── registry.json           # registry 索引（shadcn CLI / MCP 的入口）
└── items/
    └── <component>/
        ├── <component>.tsx
        ├── <component>.rules.md   # 本组件的 AI 使用规则（见下）
        └── demo.tsx               # 最小可运行示例
```

### 规则

1. **基于 shadcn/ui 扩展，不重造 primitives**。自有组件分三类，registry 中用命名区分：
   - `base/`：直接采用或轻度定制的 shadcn 组件；
   - `composed/`：由 base 组合出的业务无关组件（如 page-header、stat-card）；
   - `blocks/`：整块可套用的版面（如 portfolio-hero、project-grid）——"直接套用到作品集/网站"主要靠这一类。
2. **样式只允许消费 L1 的 CSS variables / Tailwind 语义类**。组件代码中出现 `#hex`、裸 `px` 视为缺陷。
3. **每个组件必须带 `*.rules.md`**，固定四段：何时用 / 何时不用（写明替代品）/ 组合约束 / 可访问性要求。这个文件是 L4 的原材料。
4. **组合优先于配置**：能用 children/slot 组合解决的不加 prop；prop 超过 ~8 个时应拆分组件。
5. 变体（variant）必须映射到 semantic token 的语义（`primary/secondary/destructive/ghost`），禁止出现 `blueButton` 这类绑定具体值的变体名。

### 验收标准

- `npx shadcn add <registry-url>/<item>` 能在一个全新 Next.js 项目中一次安装成功；
- 每个 item 的 demo 在两套 theme 下渲染均正常；
- registry.json 中每项都有 description（供 CLI 搜索与 MCP 消费）。

---

## L3 · AI Patterns 层

### 职责

沉淀 AI 产品特有的交互模式。只有 AI 应用形态的项目需要装这一层；它在 registry 中就是一组前缀为 `ai/` 的 items，机制与 L2 完全相同。

### 模式清单（v0 范围）

| 模式 | 说明 | 首选基础 |
|---|---|---|
| conversation | 消息流、气泡、多轮上下文展示 | AI Elements / assistant-ui |
| streaming | 流式文本、打字指示、骨架与占位策略 | AI Elements |
| tool-call | 工具调用的进行中/成功/失败/需授权四态展示 | AI Elements |
| reasoning | 可折叠的思考过程面板 | AI Elements |
| generative-ui | 生成式 UI 的**组件词汇表**：声明允许 LLM 通过 tool call 渲染的组件集合及其 props schema | 自建约定 |
| uncertainty | 置信度、来源引用、"AI 可能出错"的表达 | 自建 |
| human-in-the-loop | 确认/编辑/拒绝 AI 建议的标准控件 | 自建 |

### 规则

1. **AI 状态必须完备**：凡涉及模型调用的组件，必须显式处理 idle / streaming / done / error / cancelled 五态，缺态视为缺陷（这是 AI 产品与普通产品在设计系统层面最大的差异）。
2. **generative-ui 词汇表是白名单**：LLM 只能渲染词汇表内声明的组件；词汇表以带 JSON schema 的清单文件维护，同时供运行时校验和 L4 消费。
3. 优先包装 AI Elements（它本身基于 shadcn/ui，与 L2 同构），锁定版本；自建组件仅限上表中"自建"标注的空缺。

---

## L4 · AI 上下文层

### 职责

把 L1–L3 投影成 AI 编码代理可直接消费的上下文，使"在任何项目里让 AI 按本系统生成 UI"成为默认行为。

### 产物与分工

| 文件 | 作用域 | 内容 |
|---|---|---|
| `DESIGN.md` | 每个使用方项目 | 视觉语言：token 用法、组件选型规则、动效、禁止事项（模板见 [templates/DESIGN.md](templates/DESIGN.md)） |
| `AGENTS.md` | 每个使用方项目 | 项目上下文与边界：技术栈、如何安装组件、什么改动需要升级到设计系统仓库（模板见 [templates/AGENTS.md](templates/AGENTS.md)） |
| `registry.json` descriptions + `*.rules.md` | 本仓库 | 组件级规则，随组件一起被安装进项目 |
| `llms.txt` | 本仓库（有文档站后） | 站点级索引 |
| MCP server | 进阶 | 让代理搜索/安装本 registry |

### 规则（防腐化，最重要的一层纪律）

1. **生成优先于手写**：DESIGN.md 中的 token 表、组件清单等章节由脚本从 L1/L2 源文件生成，手写部分仅限"原则与理由"；
2. **同步是发布流程的一部分**：改动 token 或组件的 PR，必须同时更新（或重新生成）受影响的 L4 文件，CI 校验漂移；
3. **规则要写"为什么"**：AI 对带理由的规则遵循度显著更高——每条禁止事项都附一句 rationale。

---

## 套用流程（Application Playbook）

一个新项目接入本设计系统的标准步骤：

1. **选形态**：portfolio / website / app / AI app —— 决定是否需要 L3；
2. **装主题**：选择或新建 `themes/<name>.json`（只覆盖 semantic 层），接入构建产物；
3. **装组件**：`npx shadcn add` 安装所需 base/composed/blocks（AI app 加装 `ai/*`）；
4. **放置上下文**：从模板生成项目的 `DESIGN.md` + `AGENTS.md`，填入主题名与已装组件清单；
5. **验证**：让 AI 代理在只读 DESIGN.md/AGENTS.md 的条件下新建一个页面，检查产出是否零硬编码值、组件选型是否符合 rules——这是设计系统"AI 可用性"的验收测试。

## v0 边界（刻意不做）

- 不做 Figma 双向同步（先代码侧闭环，设计工具集成放 v1+）；
- 不做多框架支持（先 React/Next.js + Tailwind，DTCG 源天然保留了未来多端的可能）;
- MCP server 延后到 registry 稳定之后。
