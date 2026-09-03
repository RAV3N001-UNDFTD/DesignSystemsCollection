# AI-Native 设计系统：可行性评估与社区调研

> 调研日期：2026-09。本文回答两个问题：(1) "构建一套可直接套用到多种 AI-native 项目的设计系统" 是否可行；(2) 社区目前有哪些成熟做法可以借鉴。

## 一、结论：可行，且时机很好

这个方向不仅可行，而且 2025–2026 年社区恰好完成了几块关键基础设施的收敛，使"一套设计系统 → 多种项目形态直接套用"从愿景变成了工程上的常规操作：

1. **Token 标准化落地**：W3C Design Tokens Community Group（DTCG）在 2025 年 10 月发布了首个稳定规范（2025.10），Adobe、Figma、Google、Microsoft 等 40+ 组织参与，Style Dictionary v4、Figma Variables、Penpot 等工具已支持。设计决策（颜色/字体/间距/动效）第一次有了跨工具、跨平台的标准 JSON 交换格式。
2. **组件分发模式收敛**：shadcn/ui 的 "open code + registry + CLI" 模式成为事实标准——组件不是 npm 黑盒依赖，而是复制进项目的源码，任何团队都可以架设自己的 shadcn 兼容 registry，用 `npx shadcn add` 把自己的设计系统装进任意项目。这正是"可直接套用"的技术载体。
3. **AI 消费通道成熟**：设计系统可以通过 llms.txt、AGENTS.md / DESIGN.md 规则文件、以及 MCP server 三种方式喂给 AI 编码代理，让 Claude Code / Cursor 等工具生成的 UI 天然符合你的系统，而不是每次"凭感觉"。
4. **AI 特有 UI 模式有了组件库**：对话流、streaming、tool call 展示、reasoning 面板等 AI-native 交互，已有 Vercel AI Elements（基于 shadcn/ui）、assistant-ui、CopilotKit 等成熟开源实现可参考或直接组合。

换句话说：你想做的事，社区已经把"地基"（token 标准）、"运输"（registry 分发）、"接口"（AI 上下文文件/MCP）三个层都铺好了，本仓库的价值在于把它们组装成一套**方法论 + 可直接用的系统**。

## 二、"AI-Native 设计系统"的两层含义

调研中发现社区对这个词有两种用法，本仓库应同时覆盖：

| 含义 | 说明 | 对应产出 |
|---|---|---|
| **A. 为 AI 消费而设计的系统**（AI-consumable） | 设计系统本身被刻意组织成模型无需猜测就能消费的形态：结构化 token、带 manifest 的组件、显式的决策理由与质量示例 | 方法论 + registry + 规则文件模板 |
| **B. 为 AI 产品而设计的系统**（AI-product patterns） | 覆盖 AI 产品特有的 UI 模式：流式输出、不确定性表达、tool call 可视化、生成式 UI、人机协作状态 | AI patterns 组件层 |

个人作品集、普通网站主要用到 A；AI 应用/Agent 产品两者都要。

## 三、社区成熟做法详解

### 3.1 Token 层：W3C DTCG + Style Dictionary

- DTCG 规范定义了 token 的标准形状：每个 token 有 `$value` 和 `$type`，token 可以按路径引用其他 token——这使 **语义 token**（如 `button-primary-bg` → `color-blue-600`）可以在工具间移植。
- Style Dictionary v4 原生支持 DTCG 格式，一份 token 源文件可编译输出 CSS variables、Tailwind 配置、iOS/Android 资源等多端产物。
- 实践共识：token 分三层——**primitive（原始值）→ semantic（语义）→ component（组件级）**。"一套系统套用到多种项目"主要靠替换 semantic 层实现主题化。

### 3.2 组件分发层：shadcn 模式与自建 registry

- shadcn/ui 的五个核心原则：Open Code、Composition、Distribution、Beautiful Defaults、**AI-Ready**。组件以源码形式进入项目，AI 代理可以直接阅读和修改，这比黑盒 npm 包对 AI 友好得多。
- **Registry 不是 shadcn 专属**：官方 CLI 支持任意 URL 的兼容 registry，可分发组件、hooks、页面、主题、甚至 AI 规则文件。本仓库的设计系统若做成 shadcn 兼容 registry，就能一条命令装进任何 React 项目。
- 2026 年社区共识：做 AI 一致性最好的团队都是**从 shadcn/ui 这类现有系统扩展**，而不是从零发明 token 体系。

### 3.3 AI 消费层：把设计系统变成模型上下文

三种互补机制，成熟度从低到高：

1. **llms.txt**：站点级的 LLM 可读索引（shadcn/ui 官方就提供 `ui.shadcn.com/llms.txt`），让模型能检索到组件文档。
2. **规则文件**：社区正在收敛出三层指令结构——`AGENTS.md`（项目整体上下文与边界）、`SKILL.md`（特定任务的可执行单元）、`DESIGN.md`（品牌视觉语言：颜色、字体、间距、组件规则、动效，以 AI 可读格式写成）。DESIGN.md 已出现专门的社区目录（designmd.app 收录了 560+ 个）。
3. **MCP server**：shadcn 官方 MCP server 让 AI 助手用自然语言浏览/搜索/安装 registry 组件，消除"复制-粘贴-改造"摩擦；Figma MCP 则打通设计稿→token→代码。这是目前 AI 与设计系统集成的最强形态。

### 3.4 AI 产品 UI 模式层

- **Vercel AI Elements**：基于 shadcn/ui 的开源组件库，提供消息流、输入框、reasoning 面板、response actions 等原语，并且**理解 AI 特有状态**（message parts、streaming、tool calls）。与本仓库"shadcn 兼容"的路线天然契合。
- **assistant-ui**：React 生态中最成熟的可组合方案，适合大多数 AI chat 场景。
- **CopilotKit**：重量级，覆盖 agent 框架 + 生成式 UI + 状态同步，适合深度嵌入应用的 copilot 场景。
- **生成式 UI（Generative UI）** 的本质是一个类型化协议：LLM 通过 tool call 表达意图 → 应用执行受信代码 → SDK 把生命周期流式输出为类型化的 UI message parts → React 映射到你设计的组件。设计系统在这里的角色是**为 tool result 提供组件词汇表**。

### 3.5 治理与流程变化

- 设计系统文档正从"给人看的内部文档"转变为"AI 工具的操作输入"（operational inputs）。
- Agentic 工作流下出现的新实践：对 AI 生成 UI 的**风格漂移（drift）做持续自动化监控**。
- 设计师角色从生产转向评估：框定问题、选方向、守质量。方法论文档应覆盖这一流程面，而不只是组件规范。

## 四、推荐架构：四层模型

```
┌─────────────────────────────────────────────┐
│  L4  AI 上下文层                              │
│      DESIGN.md / AGENTS.md 模板 · llms.txt   │
│      · registry manifest · (可选) MCP server │
├─────────────────────────────────────────────┤
│  L3  AI Patterns 层（AI 产品才需要）           │
│      chat 流 · streaming · tool call 展示    │
│      · reasoning · 生成式 UI 词汇表           │
├─────────────────────────────────────────────┤
│  L2  组件层（shadcn 兼容 registry）            │
│      primitives + 组合组件，open code 分发    │
├─────────────────────────────────────────────┤
│  L1  Token 层（W3C DTCG JSON）                │
│      primitive → semantic → component        │
│      Style Dictionary 编译到多端              │
└─────────────────────────────────────────────┘
```

**"套用到多种项目形态"的机制**：

- 个人作品集 / 网站：L1 换主题（semantic token 覆盖）+ L2 安装所需组件 + L4 的 DESIGN.md 让 AI 按系统继续生成页面；
- App 应用：同上，L1 通过 Style Dictionary 输出到对应平台；
- AI 应用 / Agent 产品：再加 L3。

每种形态在 `examples/` 里各放一个可运行示例作为"套用验证"。

## 五、建议路线图

1. **方法论 v0**（`methodology/`）：写清四层模型、token 三层命名规范、DESIGN.md 与 AGENTS.md 模板；
2. **Token 基础层**（`tokens/`）：DTCG 格式源文件 + Style Dictionary 管线，先输出 CSS variables + Tailwind 主题；
3. **第一套设计系统**（`registry/`）：基于 shadcn/ui 扩展，做成兼容 registry，附带每个组件的使用规则（供 AI 读取）；
4. **AI patterns**：优先复用 Vercel AI Elements 的模式，按需定制；
5. **示例验证**（`examples/`）：portfolio 站 + 一个最小 AI chat 应用，各自只靠 registry + DESIGN.md 完成套用；
6. **（进阶）MCP server**：把 registry 暴露为 MCP 工具，让任何 AI 代理可搜索、安装本系统组件。

## 六、风险与注意点

- **不要从零发明 token/组件体系**：社区反复验证的教训——扩展 shadcn/ui 这类现有系统的产出一致性远高于自造轮子；
- **DTCG 规范仍在演进**（2025.10 是首个稳定版），token 工具链应通过 Style Dictionary 抽象，避免直接绑定某工具的私有格式；
- **规则文件会腐化**：DESIGN.md / AGENTS.md 需要与 registry 同步更新的机制（否则 AI 读到过期规范比没有规范更糟）；
- **AI patterns 层生态迭代快**（AI Elements / assistant-ui 均在快速演进），示例应锁定版本并定期回顾。

## 参考来源

- [Reinventing Design Systems AI: The 2026 Strategy — figr.design](https://figr.design/blog/reinventing-design-systems-ai)
- [AI-Native Design Systems: Generate Consistent UI at Scale — buildmvpfast.com](https://www.buildmvpfast.com/blog/ai-design-system-ui-generation-consistent-components-2026)
- [shadcn/ui Registry 文档](https://ui.shadcn.com/docs/registry) · [shadcn MCP Server](https://ui.shadcn.com/docs/mcp) · [llms.txt](https://ui.shadcn.com/llms.txt)
- [W3C Design Tokens Community Group（官方仓库）](https://github.com/design-tokens/community-group)
- [Style Dictionary × DTCG](https://styledictionary.com/info/dtcg/)
- [Design Tokens Just Became a Real W3C Standard — Medium](https://mohitphogat.medium.com/design-tokens-just-became-a-real-w3c-standard-heres-what-changes-952fa9eb31fb)
- [Design Tokens in 2026: The W3C Format — CODERCOPS](https://blog.codercops.com/blog/design-tokens-2026-w3c-format-guide)
- [Introducing AI Elements — Vercel](https://vercel.com/changelog/introducing-ai-elements)
- [AI SDK Generative UI — Vercel Academy](https://vercel.com/academy/ai-sdk/multi-step-and-generative-ui)
- [I Evaluated Every AI Chat UI Library in 2026 — DEV Community](https://dev.to/alexander_lukashov/i-evaluated-every-ai-chat-ui-library-in-2026-heres-what-i-found-and-what-i-built-4p10)
- [AGENTS.md, SKILL.md, DESIGN.md: How AI Instructions Split into Three Layers — DEV Community](https://dev.to/aws-builders/agentsmd-skillmd-designmd-how-ai-instructions-split-into-three-layers-d0g)
- [What Is DESIGN.md — Design Systems Collective](https://www.designsystemscollective.com/what-is-design-md-and-why-your-ai-coding-agent-needs-it-879a54d668f5)
- [DESIGN.md 社区目录](https://designmd.app/)
- [Improve your AI code output with AGENTS.md — builder.io](https://www.builder.io/blog/agents-md)
