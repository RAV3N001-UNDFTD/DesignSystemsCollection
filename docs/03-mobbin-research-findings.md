# Mobbin 设计调研发现（2026-09）

> 按 [02-mobbin-research-protocol.md](02-mobbin-research-protocol.md) 执行。检索范围：作品集/个人网站 sections ×2 组、AI 产品 web screens ×5 组（对话流、agent 活动、reasoning、引用、human-in-the-loop）。每条发现附动作，所有"需要改动"项已在同一批提交中落地。

## A. 作品集版式

### A1. Hero 有两种主流内容策略，版式骨架一致 ✅ 验证通过
- 证据：[GitHub ReadME Project](https://mobbin.com/sites/sections/10928b8e-852d-4424-b248-8028e8ff92d5)（陈述主导："Realizing potential with AI" + eyebrow + 简介 + 元信息链接）、[Freshman](https://mobbin.com/sites/sections/cc46fe95-d2fb-46a6-927a-96c9bc6d5ecc)（姓名主导：超大人名 + 一行 tagline）、[Framer freelancer 页](https://mobbin.com/sites/sections/dfdebaf9-051b-4bf3-bf6e-999dc21ef1d2)（"Hey! I'm Gracjan" + 角色 + 地点 + 社交链接列表）
- 主流做法:文字主导、大标题 + 小注释行 + 少量链接，与 `portfolio-hero` 的骨架（tagline → h1 → intro → links）一致。
- **动作**：`portfolio-hero.rules.md` 补充两种内容策略的选择指引（姓名主导 vs 陈述主导）。

### A2. 项目栅格主流是图片主导，本系统 project-grid 缺缩略图 ✘ 需修改
- 证据：[Pentagram](https://mobbin.com/sites/sections/933958ee-3d23-4692-bcb7-650e850a84ee)（大缩略图 + 标题 + 一行描述）、[Fiasco](https://mobbin.com/sites/sections/4ed7c118-a866-41fa-824c-32a24323c927)（缩略图 + 描述 + 小 tag chips）、[Wild](https://mobbin.com/sites/sections/bd58336d-6de6-4678-aafd-10089a509897)（缩略图 + 标题 + 描述 + 彩色工具 tags）、[MOUTHWASH Studio](https://mobbin.com/sites/sections/5ed7b943-1b00-4ccf-bfe3-50897107642b)
- 主流做法：缩略图是项目卡的第一信息层，文字与 tags 在其下方；纯文字卡片在作品集场景几乎不出现。
- **动作**：`project-grid` 增加可选 `imageUrl`（16:10 封面，无图时退化为现有纯文字卡），rules 与 demo 同步更新。

## B. AI 产品模式（对照方法论 §L3 清单）

### B1. conversation：assistant 消息主流无气泡 ✍ 修正细节
- 证据：[ChatGPT](https://mobbin.com/screens/b045e2cd-4f54-424a-97f6-4c5954f0c1e1)、[Base44](https://mobbin.com/screens/2bc7b827-089b-4245-aea7-bca28d079e44)、[Lindy](https://mobbin.com/screens/111149e0-4dff-4de8-b3c1-0f7d032ff105)、[Sana AI](https://mobbin.com/screens/9098947d-d197-4f05-a54d-de310aa638be)
- 主流做法：assistant 消息全宽纯文本直接排在画布上（不加底色气泡），user 消息右对齐浅灰气泡。这与"assistant 气泡用 `color.ai.surface`"的原设想不同。
- **动作**：L3 清单的 conversation 模式补充此结构细节；`color.ai.surface` 的用途描述改为 reasoning 面板/AI 功能区底色，不再默认用于 assistant 气泡。

### B2. tool-call：折叠状态行是统一惯例 ✅ 验证通过（补充细节）
- 证据：[Zapier Central](https://mobbin.com/screens/cb65c41e-e7b6-4bd9-af40-cd92d768e90d)（"Action Complete: Gmail: Create Draft" 折叠行 + 状态图标 + chevron）、[Lindy](https://mobbin.com/screens/9f4affd5-f387-4149-860e-95c83f9bbba5)（✓ 步骤清单 + 每行可展开）、[Emergent](https://mobbin.com/screens/dff53201-0975-445f-b0e1-75aa0353d9ba)（部署清单：done/current/pending 三态 + 计时）
- 主流做法：一行一个工具调用——状态图标 + 工具名 + 简述 + 展开箭头；进行中带计时/spinner。
- **动作**：L3 tool-call 模式规格固化为"折叠状态行"（icon + name + state + chevron，展开见入参/结果）。

### B3. reasoning："Thought for Ns" 折叠行 ✅ 验证通过（补充细节）
- 证据：[Customer.io](https://mobbin.com/screens/fafcbfb9-fa85-4b4d-b17f-54df962305b5)（"Thought for 2 seconds ▾"/"Thought for 26 seconds ▾"）、[Whop](https://mobbin.com/screens/80401dec-16c8-4471-ab29-a891c6c437b0)（Thinking · 1s，展开显示推理文本）、[Google Gemini](https://mobbin.com/screens/19fa8a36-4f95-4ea2-ad23-533e31965ddb)（Thinking steps 侧栏）
- 主流做法：答案上方一行弱化的折叠开关，标签带时长；展开内容用 muted 前景色。
- **动作**：L3 reasoning 规格补充"时长标签 + muted 展开内容"。

### B4. uncertainty/citations：favicon chip + 来源面板 ✅ 验证通过（补充细节）
- 证据：[ChatGPT](https://mobbin.com/screens/88d5e839-cf2b-447b-887c-a4beeead8040)（正文内 favicon 小 chips + 右侧 Citations 面板）、[Microsoft Copilot](https://mobbin.com/screens/4231bf7c-30e1-4bef-9992-05c7aa2db22b)（答案底部编号 chip 行 + "+8 more"）、[Cohere](https://mobbin.com/screens/4100675f-3440-45a6-8b20-de1a8c765568)（Citations chip 行）、[WRITER](https://mobbin.com/screens/4a222df9-9ae9-40a0-972f-b0be9bfaa12f)（Sources 按钮 + 侧栏卡片列表）
- 主流做法：行内 favicon/编号 chip（可截断 "+N"）+ 可展开的来源列表面板。
- **动作**：L3 uncertainty 规格固化为 citation-chip + sources-panel 两个子件。

### B5. human-in-the-loop：Accept 为 primary、拒绝弱化、必带"重试"第三动作 ✅ 验证通过（补充细节）
- 证据：[Grammarly](https://mobbin.com/screens/82d0d01f-8aa2-4fe4-a658-1498c92fb1ae)（Accept 实心 + Dismiss ghost）、[Databricks](https://mobbin.com/screens/340e5292-4ca8-4482-aea8-18882b2ca58c)（Accept/Reject + 重新生成）、[Confluence](https://mobbin.com/screens/048344a5-3f3c-4740-b41f-c8ca1e34b23f)（Replace primary + Discard ghost + Refine 下拉 + 👍👎 + "Uses AI. Verify results." 声明）、[Remote](https://mobbin.com/screens/44344cb5-9817-4d0e-b696-e8ba936b2f82)（Use this / Try again）、[Asana](https://mobbin.com/screens/a7c7d26a-be3a-4cfa-aef0-8c5688f18034)（覆盖已有内容时弹确认——与 button 规则"破坏性动作必须二次确认"一致）
- **动作**：L3 human-in-the-loop 规格固化为三动作组（accept=primary / dismiss=ghost / retry-refine），覆盖性替换必须确认。

### B6. 三个新模式进入 L3 清单 ➕ 新增
1. **response-actions**：assistant 消息底部的操作行（复制 / 👍👎 / 重新生成 / 分享），全场景出现（ChatGPT、Perplexity、Cohere、Confluence；[Perplexity](https://mobbin.com/screens/4bb8f8e1-be0b-42b4-bc48-f8eab91c0182) 点踩后追问原因，[WRITER](https://mobbin.com/screens/4a222df9-9ae9-40a0-972f-b0be9bfaa12f) 用 "Nailed it / Missed the mark" 文字化）；
2. **ai-empty-state**：问候语 + 大输入框 + 建议 chips/action chips（[WRITER](https://mobbin.com/screens/2f82cb19-5363-456a-98fd-8ce57cac25bd) "Hi Alex, how can I help you today?" + 5 个动作 chips；Base44 输入框下方 Suggestions）；
3. **usage-meter**：额度/配额展示 + 升级入口（[Sana AI](https://mobbin.com/screens/9098947d-d197-4f05-a54d-de310aa638be) "7 meetings and 20 messages left this month"、[Emergent](https://mobbin.com/screens/dff53201-0975-445f-b0e1-75aa0353d9ba) 顶栏 Credits 徽章、n8n 试用计数）。

另：模型/模式选择器主流位置在**输入框内部**（Gemini "Flash ▾"、Copilot "Quick response ▾"、Cohere 侧栏 MODEL 下拉）——记为 composer 模式的组成部分，暂不单列。

## C. AI 标识用色

### C1. 主流不用专属颜色标识 AI 内容 ✍ 修正设计主张的表述
- 证据：上述全部 15+ 个 AI 产品截图中，**没有一家用专属色块标识 AI 生成内容**。标识手段是：sparkle ✨ 图标（Databricks "AI generate"、Confluence）、文字声明（"Uses AI. Verify results."、"Gemini is AI and can make mistakes."、"Agent is AI and can make mistakes."）、以及结构本身（reasoning/citation 组件的存在即标识）。品牌 accent 色偶尔用于 AI 功能入口（Cohere 紫是品牌色而非 AI 语义色）。
- 结论：`color.ai.*`（violet 系）作为**可选的 AI 功能强调色**保留——它服务于本系统"AI 参与可见"的设计主张（多产品聚合场景下有区分价值），但不能宣称是社区惯例，且**颜色永远不是唯一标识手段**（文字/图标必须同时在场）。
- **动作**：`badge.rules.md` 的 ai variant 措辞从"强制约定"调整为"披露 AI 参与时的标准载体，必须文字+图标并用"；`color.ai.*` 的 `$description` 同步微调；L3 清单增加"AI 免责声明文字"惯例记录。

## 执行汇总

| 发现 | 回写位置 |
|---|---|
| A1 | `portfolio-hero.rules.md` |
| A2 | `project-grid.tsx` + rules + demo |
| B1–B6 | `methodology/00-four-layer-model.md` §L3 |
| C1 | `badge.rules.md` + `tokens/semantic/color.json` + §L3 |
