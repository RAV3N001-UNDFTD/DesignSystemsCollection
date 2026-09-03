# page-header — AI 使用规则

## 何时用
- 每个页面/主视图顶部的标准标题区。一个页面只有一个。

## 何时不用
- 卡片或分区的标题 → 用 CardHeader 或 `text-h3/h4` 排版，不要嵌套 PageHeader。
- 营销落地页的 hero → 用 `portfolio-hero` 之类的 block，PageHeader 是应用型页面的克制版式。

## 组合约束
- `actions` 最多 2 个按钮：1 个 primary + 至多 1 个 secondary/ghost；更多操作收进菜单。
- `title` 是页面唯一的 `h1`；页内其余标题从 `h2` 开始。
- 与下方内容的间距用 `space-section` 节奏（外层容器加 `mt-12` 级别间距），不要在 PageHeader 内部加 margin-bottom。

## 可访问性
- `description` 是对页面的补充说明，不要把关键操作说明只放在这里。
