# badge — AI 使用规则

## 何时用
- 展示状态、类别或元信息：发布状态、技术栈 tag、计数。
- `ai` variant 是**披露 AI 参与时的标准载体**（对应 `color.ai.*` 语义）：需要标识某内容由 AI 生成/AI 驱动时一律用它，且必须**文字（如 "AI generated"）+ 颜色并用**——调研显示主流产品靠 sparkle 图标与文字声明标识 AI，颜色不是也不能是唯一标识手段。

## 何时不用
- 可点击的过滤/选择 → 用 toggle/chip 类交互组件（待收录），badge 是纯展示。
- 表达操作结果的即时反馈 → 用 toast/alert，badge 是持续状态。

## 组合约束
- status 四色（success/warning/danger/info）只用于真实状态语义，禁止当装饰色挑颜色用。
- `ai` variant 不得用于非 AI 内容（会稀释 AI 标识的可信度）。
- 一个条目上的 badge 不超过 3 个，多了改为 "+N" 折叠。

## 可访问性
- badge 的含义不能只靠颜色传达——文字本身必须可独立理解（"Failed" 而不是只有红点）。
