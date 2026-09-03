# DesignSystemsCollection

面向 **AI-Native 项目**的设计系统方法论与可复用设计系统集合。

## 这个仓库解决什么问题

传统设计系统是"给人看的文档 + 给工程师用的组件包"。在 AI-native 时代，设计系统多了一个新的核心消费者：**AI 编码代理（Claude Code、Cursor、Copilot 等）**。一个 AI-native 设计系统需要同时满足三类消费者：

1. **人（设计师/开发者）**——可读的规范与示例；
2. **构建工具**——可编译的 token 与组件源码；
3. **AI 代理**——可被模型直接消费的结构化上下文（规则文件、registry manifest、MCP server）。

本仓库探索并沉淀：如何构建一套可以直接套用到多种 AI-native 项目形态（个人作品集、网站、App 应用、Agent 产品）的设计系统。

## 仓库结构（规划）

```
├── docs/                      # 方法论文档
│   └── 01-feasibility-and-landscape.md   # 可行性评估与社区调研（先读这个）
├── methodology/               # 构建方法论：分层模型、DESIGN.md / AGENTS.md 模板
├── tokens/                    # W3C DTCG 格式的设计 token 源文件
├── registry/                  # shadcn 兼容的组件 registry（可被 CLI / AI 代理直接安装）
└── examples/                  # 套用示例：portfolio / web app / agent chat UI
```

## 当前状态

- [x] 可行性评估与社区成熟做法调研 → [docs/01-feasibility-and-landscape.md](docs/01-feasibility-and-landscape.md)
- [x] 方法论 v0：四层模型细则 + token 命名规范 + DESIGN.md / AGENTS.md 模板 → [methodology/](methodology/)
- [ ] Token 基础层（DTCG JSON + Style Dictionary 管线）
- [ ] 第一套可套用设计系统（shadcn 兼容 registry）
- [ ] 示例项目：个人作品集 / AI chat 应用
