<!--
  DESIGN.md 模板（方法论 v0）
  用法：复制到使用方项目根目录，替换所有 {{占位符}}，删除本注释。
  标注 [GENERATED] 的章节应由脚本从设计系统源文件生成，不要手工维护。
  语言约定：正文用英文（AI 代理规则文件的通用惯例），保证任何代理都能稳定消费。
-->

# DESIGN.md — Visual Language for {{project-name}}

This project uses the **{{design-system-name}}** design system (theme: `{{theme-name}}`).
AI agents MUST follow this file when generating or modifying any UI code.

## 1. Non-negotiable rules

1. **Never hard-code visual values.** No hex colors, no raw `px` for spacing/radius, no ad-hoc font sizes. Always use the design tokens (CSS variables prefixed `--ds-*` / Tailwind semantic classes). *Rationale: hard-coded values break theme switching and dark mode.*
2. **Never import primitive tokens in UI code** (e.g. `text-blue-600`). Use semantic tokens (`text-accent`, `bg-surface`). *Rationale: primitives are theme implementation details.*
3. **Prefer installing an existing component over writing a new one.** Check §3 first; if nothing fits, compose from existing parts; only then propose a new component (see AGENTS.md escalation rules). *Rationale: every bespoke component increases drift.*
4. **Every interactive element needs visible focus, disabled and hover states**, using the `.hover/.active/.disabled/.focus` token variants. *Rationale: accessibility is part of the system, not a follow-up.*
5. For AI-driven UI, **handle all five states**: idle / streaming / done / error / cancelled. *Rationale: missing states are the most common defect in AI product UI.*

## 2. Design principles

<!-- 手写区：3–5 条本项目的视觉性格描述，给 AI 做灰区裁决用 -->
- {{e.g. "Calm, editorial, generous whitespace; the content is the hero."}}
- {{e.g. "Motion is functional only: 150–250ms, standard easing, no decorative animation."}}
- {{e.g. "AI-generated content is always visually attributed (color.ai.* tokens)."}}

## 3. Component inventory [GENERATED]

<!-- 由 registry 安装清单生成：组件名 · 何时用 · 何时不用/替代品 -->

| Component | Use when | Do NOT use when |
|---|---|---|
| {{button}} | {{...}} | {{...}} |

## 4. Token quick reference [GENERATED]

<!-- 由 tokens 源文件的 $description 生成 -->

### Color roles
| Token | Usage |
|---|---|
| `color.bg.canvas` / `.surface` / `.raised` | page ground / cards / overlays |
| `color.fg.default` / `.muted` / `.subtle` | body text / secondary / tertiary |
| `color.accent.default` / `.hover` / `.active` | primary actions, links, selection |
| `color.status.{success,warning,danger,info}.*` | feedback only — never decorative |
| `color.ai.*` | AI-generated content attribution only |

### Typography & spacing
| Token | Usage |
|---|---|
| `font.heading.1..4` | page / section / card / minor headings |
| `font.body.default` / `.small` | body / captions |
| `dimension.space.inline` / `.stack` / `.section` | within-line / vertical rhythm / between sections |

## 5. Layout

- Grid: {{e.g. "12-col, max-width 1200px, gutter dimension.space.6"}}
- Breakpoints: {{sm / md / lg values}}
- Density: {{e.g. "comfortable; compact tables only in dashboards"}}

## 6. Forbidden

- Inline `style={{...}}` for anything token-covered. *Rationale: invisible to theming and audits.*
- New color/spacing values outside the token set — request a token instead (AGENTS.md §escalation).
- `blueButton`-style variant names bound to concrete values; variants are semantic (`primary/secondary/destructive/ghost`).
