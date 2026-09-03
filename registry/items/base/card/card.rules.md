# card — AI 使用规则

## 何时用
- 把一组相关内容封装为独立单元：列表中的条目、dashboard 模块、设置分区。

## 何时不用
- 页面唯一的主内容区 → 直接排在 canvas 上，不要"为了包一层"而用 Card（卡片套卡片是缺陷）。
- 可点击整卡导航 → 外层用 `<a>` 包裹并加 `hover:shadow-elevation-2 transition-shadow`，不要给 Card 加 onClick。

## 组合约束
- 结构顺序固定：CardHeader（含 CardTitle/CardDescription）→ CardContent → CardFooter；跳过某段可以，乱序不行。
- Card 底色是 `bg-surface`；卡内再分层用 `bg-sunken`，不要叠 `bg-surface`。
- 阴影只允许 `shadow-elevation-1`（静止）/ `shadow-elevation-2`（hover），更高层级留给浮层组件。

## 可访问性
- CardTitle 渲染为 `h3`；若卡片处于不同标题层级的上下文，用语义正确的标题标签替换（保持样式类不变）。
