# portfolio-hero — AI 使用规则

## 何时用
- 个人作品集/个人网站首屏。两种主流内容策略（Mobbin 调研验证），选其一：
  - **姓名主导**：`name` 放人名（视觉记忆点是名字），`tagline` 放角色/领域短语；
  - **陈述主导**：`name` 放一句身份/价值陈述（如 "I design systems that models can build with"），`tagline` 放姓名+角色。
- 判断标准：个人品牌已有知名度用姓名主导；靠观点/定位打动访客用陈述主导。

## 何时不用
- 应用内页面顶部 → 用 `page-header`。
- 产品营销页 hero（需要配图/截图/CTA 组）→ 另建营销 hero block，本组件是文字主导的克制版式。

## 组合约束
- `links` 用 Button（secondary/ghost）或带 `text-accent` 的链接，最多 4 个；第一个可以是 primary Button（如 "Get in touch"）。
- 上下留白已内置（`py-16/24`），外层不要再包一层带大 padding 的容器。
- 不要在 hero 里塞第二个标题层级；下一个区块从 `h2` 开始。

## 可访问性
- `name` 渲染为页面唯一 `h1`。
- `tagline` 是装饰性 uppercase 文本，若含关键信息（如"可接受远程工作"），同时在正文 intro 中出现。
