# Mobbin 设计调研协议（待执行）

> 状态：**等待 Mobbin 连接器接入**。Mobbin 官方 MCP（`api.mobbin.com/mcp`）已在 claude.ai 连接器目录中，提供 `search_flows` / `search_screens` / `search_sections` 三个工具，但需要用户在 claude.ai 完成 OAuth 授权（且 Mobbin 的 MCP 功能通常要求付费计划）。连接完成后按本协议执行一轮调研，产出写入 `docs/03-mobbin-research-findings.md`。

## 调研目标

用真实产品的 UI 截图/流程佐证或修正本设计系统的三类决策：

1. **L2 blocks 的版式假设**——作品集/个人网站的主流版式模式；
2. **L3 AI patterns 的清单完整性**——头部 AI 产品实际出现的交互模式，对照方法论 §L3 的 7 项清单查缺补漏；
3. **语义 token 词表的覆盖度**——真实产品的状态/层级/AI 标识用色是否能映射进现有 role 词表。

## 检索计划

### A. 作品集 / 个人网站（验证 blocks）
| 查询 | 看什么 |
|---|---|
| portfolio hero / personal website landing | hero 的信息结构（身份陈述 vs 姓名主导）、链接区惯例 |
| project showcase grid / case study list | 卡片信息密度、tag 用法、整卡可点的处理 |

### B. AI 产品核心界面（验证/扩充 L3 清单）
| 查询 | 对照的 L3 模式 |
|---|---|
| AI chat interface (ChatGPT, Claude, Perplexity, Gemini) | conversation / streaming |
| AI agent tool use, agent activity log | tool-call 四态展示 |
| AI reasoning, thinking process UI | reasoning 折叠面板 |
| AI citations, sources | uncertainty（来源引用） |
| AI suggestion accept/reject, inline edit (Copilot, Notion AI, Cursor) | human-in-the-loop |
| AI onboarding, prompt suggestions, empty states | **候选新模式**：AI 空状态/引导 |
| AI usage limits, credits, model picker | **候选新模式**：模型/额度选择器 |

### C. AI 标识用色（验证 `color.ai.*`）
- 检索各产品如何在视觉上区分 AI 生成内容（专属色？渐变？图标？无区分？），统计主流做法，评估"violet 系 AI 语义色"假设是否成立。

## 每条发现的记录格式

```
- 模式：<名称>
- 证据：<产品 + 屏幕/流程，Mobbin 链接>
- 主流做法：<1–2 句>
- 对本系统的动作：无需改动 / 修改 <token|组件|规则文件> / 新增 L3 模式 <名称>
```

## 产出与回写

1. `docs/03-mobbin-research-findings.md`：按上表组织的发现清单；
2. 每条"需要动作"的发现转化为对应层的改动（token 词表 / 组件 rules.md / 方法论 L3 清单），与发现文档同一批提交——调研不落地到系统即视为未完成。

## 连接步骤（用户操作）

1. claude.ai → **Settings → Connectors**（[直达链接](https://claude.ai/settings/connectors)）→ 搜索 **Mobbin** → Connect，用 Mobbin 账号完成 OAuth；
2. 回到 Claude Code 会话，在会话的连接器设置中启用 Mobbin（新开的会话会自动带上）；
3. 告知 Claude "Mobbin 已连接"，即按本协议执行。

> 备注：本仓库所在的远程容器出站网络受代理白名单限制（`api.mobbin.com` 被拒），因此无法通过 `.mcp.json` 在容器内直连——必须走 claude.ai 连接器通道。若最终不接 Mobbin，可退化为 WebSearch + 产品官网截图的人工调研，按同一协议记录。
