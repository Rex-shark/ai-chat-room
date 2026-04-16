# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**所有對話請使用繁體中文回覆。**

## 專案概要

多主題切換展示平台 + 浮動式 AI 聊天視窗 (Chat Widget)。純前端 React 專案，後端透過 Vite Proxy 代理至 `localhost:8080`。

技術棧：React 19 + TypeScript + Vite 8 + Tailwind CSS v4（`@tailwindcss/vite` 插件）+ Framer Motion + shadcn/ui (base-nova style)

## 常用指令

```bash
npm run dev       # 啟動 Vite 開發伺服器 (含 /api -> localhost:8080 代理)
npm run build     # TypeScript 型別檢查 + Vite 打包
npm run lint      # ESLint 語法檢查
npm run preview   # 預覽生產環境打包結果
```

目前無測試框架 (無 Jest / Vitest / Cypress)。程式碼正確性依賴 TypeScript 型別與 ESLint。

## 架構與資料流

- 進入點：`src/main.tsx` → `src/App.tsx` → `src/components/ChatWidget.tsx`
- `App` 管理 `activeTheme` 狀態，渲染首頁主題卡片；選中後將 theme ID 傳給 `ChatWidget`
- `ChatWidget` 在 `theme` 為 `null` 時回傳 `null`（不顯示啟動按鈕）；開啟後對 `/api/ollama/chat` 發送 `POST { prompt }` 取得 `{ reply }`
- 主題切換機制：`ChatWidget` 在根容器注入主題 class（如 `.theme-business`），觸發 `src/index.css` 中對應的 CSS 變數覆寫（OKLCH 色彩空間），不需修改 TS 邏輯

六個主題：`theme-business`、`theme-playful`、`theme-cyberpunk`、`theme-mac`、`theme-glass`、`theme-pixel`

## 開發規範

- 模組引入使用 `@/*` 別名（已在 `tsconfig.json` 和 `vite.config.ts` 設定）
- 前端 API 呼叫只用相對路徑 `/api/...`，禁止寫死 `localhost`
- shadcn/ui 元件放置在 `src/components/ui/`，工具函式在 `src/lib/utils.ts`
- 新增主題只需在 `src/index.css` 加入 CSS 變數區塊 + 在 `src/App.tsx` 的 `themes` 陣列新增項目

## 後端 API 合約

```
POST /api/ollama/chat
Content-Type: application/json

Request:  { "prompt": "<使用者輸入>" }
Response: { "reply": "<AI 回覆>" }
```

