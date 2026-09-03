# input — AI 使用规则

## 何时用
- 单行文本/数字/邮箱等输入。多行用 textarea（待收录），选择用 select/combobox（待收录）。

## 何时不用
- 搜索触发整页跳转 → 用表单包裹并提供提交按钮，不要只靠 onChange。
- 展示只读值 → 用文本排版，不要用 disabled input 冒充。

## 组合约束
- 必须与 `<label>` 成对出现（显式 `htmlFor`），占位符不能替代 label。
- 校验错误：设置 `aria-invalid={true}`（错误态样式已内置），错误文案用 `text-body-sm text-danger` 放在输入框下方并用 `aria-describedby` 关联。
- 不要通过 `className` 改高度做"大号输入框"；需要尺寸变体时提议给组件加 size prop。

## 可访问性
- `aria-invalid` + `aria-describedby` 是错误态的强制要求。
- 禁用态要说明原因（tooltip 或帮助文案），不要静默禁用。
