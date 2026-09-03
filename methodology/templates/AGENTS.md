<!--
  AGENTS.md 模板（方法论 v0）
  用法：复制到使用方项目根目录，替换 {{占位符}}，删除本注释。
  分工：AGENTS.md 管项目上下文与边界；视觉规则全部在 DESIGN.md，这里只链接不复制。
-->

# AGENTS.md — {{project-name}}

## Project context

- Type: {{portfolio | website | app | AI app}}
- Stack: {{e.g. Next.js 15 (App Router) + TypeScript + Tailwind v4}}
- Design system: **{{design-system-name}}** via shadcn-compatible registry `{{registry-url}}`, theme `{{theme-name}}`
- All visual/UI rules live in [DESIGN.md](./DESIGN.md) — read it before generating any UI code.

## Commands

```bash
{{pnpm dev}}          # dev server
{{pnpm lint && pnpm typecheck}}   # must pass before any commit
{{pnpm test}}         # tests
npx shadcn add {{registry-url}}/<item>   # install a design-system component
```

## Working with the design system

1. **To add UI**: first check installed components (`{{components-dir}}`), then the registry (`npx shadcn view {{registry-url}}`); install rather than hand-write.
2. **Installed components are project code** — you may modify them, but keep changes token-based and note the divergence in the PR description.
3. **Component rules travel with components**: each installed component has a `*.rules.md` beside it; follow it.
4. {{If AI app}} AI interaction patterns (chat, streaming, tool calls) come from the `ai/*` registry items; the generative-UI component whitelist is `{{path/to/vocabulary.json}}` — never render components outside it from model output.

## Escalation — stop and ask before:

- Adding any color/spacing/font value not covered by tokens → propose a token change to the design-system repo `{{design-system-repo-url}}` instead of a local value.
- Creating a new shared component when composition could work.
- Changing theme files, token bindings, or this file / DESIGN.md.
- Anything destructive: deleting components, migrations, force-push.

## Boundaries

- Do not edit files under `{{generated-dirs, e.g. styles/tokens.css}}` — they are compiled from token sources.
- Do not upgrade `{{design-system-related deps}}` without an explicit request.
- Keep diffs minimal; unrelated refactors go to separate PRs.
