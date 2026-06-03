# 前世今生 · 中国历史身份抽签

基于中国历史人口数据的身份抽签网页应用。

## 功能
- 🎴 从中国4000年历史中随机抽签，获得你的前世身份
- 🏯 覆盖先秦到新中国的10个历史时期
- ✨ 4种稀有度：普通/稀有/史诗/传说
- 📖 AI (智谱 GLM) 动态生成命运故事
- 📤 生成分享图片
- 📱 响应式设计，手机电脑都好用

## 技术栈
- 纯前端：HTML + CSS + JavaScript
- Cloudflare Worker：智谱 API 代理
- AI：智谱 GLM-4-Flash

## 本地开发
直接用任意 HTTP 服务器打开 `index.html` 即可：
```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 部署
- 前端：GitHub Pages (`xiaoqi898.github.io/chinese-history-lottery/`)
- Worker：Cloudflare Workers（需设置环境变量 `ZHIPU_API_KEY`）
