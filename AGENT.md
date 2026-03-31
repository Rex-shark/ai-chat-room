# AI Chat Room - 專案架構與用途文件

## 專案用途
本專案為一個純前端的「AI 聊天室」應用程式。主要目標是開發與建立一個供使用者操作的聊天視窗介面，用以與現有的 AI 模型進行對話互動。

## 系統架構
* **前端框架**：基於 React 19 + TypeScript 構建，並使用 Vite 8 作為開發與建置工具。
* **樣式工具**：Tailwind CSS v4（透過 `@tailwindcss/vite` 整合）。
* **UI 元件庫**：shadcn/ui（配置為 `base-nova` style，底層由 `@base-ui/react` 驅動）。
* **動畫與字型**：使用 Framer Motion 驅動微互動，搭配字型 Geist Variable（`@fontsource-variable/geist`）。
* **後端服務**：後端 API 已經由其他系統開發完畢，因此本專案只需專注於 API 的串接與資料讀取呈現。
* **核心功能**：僅聚焦於前端的聊天視窗開發，包含訊息列表顯示、使用者輸入區塊、互動狀態呈現等。

## 系統實作特色 (Features & Achievements)
* **主題展示櫃 (Multi-Theme Gallery)**：首頁實作了主題卡片展示平台，提供動態切換功能的導覽頁面。
* **六大神級主題 (CSS Variables Theming)**：
  - 💼 商務經典風：沉穩專注的配色與標準圓角。
  - 🍬 活潑馬卡龍：極致圓潤與明亮背景。
  - 🚀 暗黑科技風：深紫刺眼的矩陣高光邊框。
  - 🍎 Apple MAC：精準實體陰影與高質感 OS 原生配色。
  - 🧊 Glassmorphism：結合背景模糊 (backdrop-filter) 與高光折射。
  - 🕹️ 8-Bit 像素復古：引入 `DotGothic16` 點陣字庫、強制去除圓角與方塊像素陰影。
* **微互動體驗 (UX/Micro-Interactions)**：高度採用 `framer-motion`。所有按鈕（開關、放大全螢幕縮放）皆具備符合 `interaction-design` 的 100~300ms 物理阻尼（Spring）彈跳回饋。
* **後端串接策略**：透過 Nginx / `vite.config.ts` 進行 `/api/*` 服務代理映射至本地 `http://localhost:8080/api/ollama/chat`，解決了開發環境可能的跨網域 (CORS) 以及生成超時中斷問題。

## 開發狀態與下一步
* **目前狀態**：前端核心系統已全數完工，具備了完善的 API 連線與超高水準的 UI 展示能力。
* **後續擴充性**：因為所有的色彩規範皆在 `index.css` 透過 CSS 自訂參數定義，未來如果要擴充全新風格，僅需添加 `.theme-xxx`，而無需更動 `ChatWidget.tsx` 中的邏輯層次。

## 後端 API 串接規格 (API Contract)
前端透過 Vite Nginx Proxy 代理機制，將 `/api/ollama/chat` 轉發至本地伺服器（預設 `http://localhost:8080/api/ollama/chat`），其資料交換格式如下：

### 1. 請求格式 (Request)
* **Method**: `POST`
* **Route**: `/api/ollama/chat`
* **Content-Type**: `application/json`
```json
{
  "prompt": "<使用者輸入的對話文字>"
}
```

### 2. 回應格式 (Response)
* **Status Code**: `200 OK`
* **Content-Type**: `application/json`
```json
{
  "reply": "<後端 AI 生成的對話回覆>"
}
```
> [!NOTE]
> 前端已內建等待動畫（Loading Spinner）與超時處理。若後端因模型推論過久或連線失敗，會自動產生回退系統訊息（"對不起，目前無法連線至 AI 服務伺服器"），避免畫面假死。
