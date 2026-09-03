# button — AI 使用规则

## 何时用
- 触发一个动作（提交、打开、执行）。每个视图最多一个 `primary`；并列动作用 `secondary`；低优先级/工具栏动作用 `ghost`；不可逆的破坏性动作用 `destructive`。

## 何时不用
- 导航到另一个页面 → 用 `<a>`/`<Link>` 加链接样式（`text-accent hover:text-accent-emphasis`），不要用 Button 包链接语义。
- 状态展示 → 用 `badge`。

## 组合约束
- 图标放在 children 里（左图标在前），组件已提供 `gap-2`，不要再手动加 margin。
- 禁止通过 `className` 覆盖 variant 的颜色（如再加 `bg-*`）；需要新外观时提议新增 variant。
- `destructive` 动作必须配二次确认（dialog 或 undo），不允许单击即执行。

## 可访问性
- 仅图标按钮必须提供 `aria-label`。
- 加载中状态要 `disabled` 并保留原文字（或加 spinner），不要让按钮消失。
- focus ring 由组件内置（`focus-visible:ring-accent`），禁止移除。
