# AGENTS.md

## 專案概要 (Project Snapshot)
- **技術棧 (Stack)**: React 19 + TypeScript + Vite 8 (`package.json`, `vite.config.ts`), Tailwind CSS v4（透過 `@tailwindcss/vite` 整合）。
- **應用目標**: 多主題切換展示平台 + 浮動式 AI 聊天視窗 (Chat Widget)；目前為純前端專案，後端會透過 Vite Proxy 代理處理。
- **程式進入點**: `src/main.tsx` -> `src/App.tsx` -> `src/components/ChatWidget.tsx`。

## 架構與資料流 (Architecture and Data Flow)
- `App` 負責管理當前的 `activeTheme` 狀態並渲染首頁的各個主題卡片；當使用者點擊卡片後，選中的佈景主題 ID 會透過 `theme` 屬性向下傳遞給 `ChatWidget`。
- `ChatWidget` 在 `theme` 為空值時會回傳 `null`，因此聊天啟動按鈕的初始顯示與否是交由導覽頁面（首頁）控制的。
- **對話發送流程** (`src/components/ChatWidget.tsx` 的 `handleSubmit` 函式)：
  1. 送出時將 `isLoading` 改為 `true`，藉此鎖定輸入框與按鈕（防連點機制）。
  2. 將使用者的文字訊息加入前端的對話列表。
  3. 對 `/api/ollama/chat` 發起 `POST` 請求，帶上的本體驗文為 `{ "prompt": string }`。
  4. 從成功伺服器的回應中取出 `data.reply` 作為機器人的回覆內容。
  5. 攔截網路或超時錯誤，並呈現備用文案（Fallback）：`對不起，目前無法連線至 AI 服務伺服器。`。
- 會依照 `[messages, isOpen, isLoading]` 等狀態自動觸發 `endOfMessagesRef` 往下流暢滾動（Auto-scroll）。

## 系統實作特色 (Features & Achievements)
* **主題展示櫃 (Multi-Theme Gallery)**：首頁實作了主題卡片展示平台，用來預覽每種樣式。
* **六大 CSS Variables Theming 神級主題體系**：
  - 💼 商務經典風：沉穩專注的配色與標準圓角。
  - 🍬 活潑馬卡龍：極致圓潤與明亮背景。
  - 🚀 暗黑科技風：深紫刺眼的矩陣高光邊框。
  - 🍎 Apple MAC：精準擬真實體陰影與高質感 OS 原生配色。
  - 🧊 Glassmorphism：結合背景模糊 (`backdrop-filter: blur()`) 與邊界高光折射。
  - 🕹️ 8-Bit 像素復古：全局覆蓋 `DotGothic16` 點陣字體、拔除全部圓角並轉為無毛邊方塊像素陰影 (`.theme-pixel *` 硬性覆寫)。
* **微互動體驗 (UX/Micro-Interactions)**：全站採用 `framer-motion`。所有按鈕皆具被符合 `interaction-design` 的動態物理阻尼（Spring）點擊手感。此外，彈跳視窗的開關以及最新加入的「無縫全螢幕擴充功能 (Layout Animation)」都確保了視覺追蹤毫不生硬。
* **樣式切換邏輯**：系統由 `src/index.css` 的 CSS 動態變數（OKLCH）驅動。`ChatWidget` 會在根容器注入選定的主題 Class（如 `.theme-business` / `.theme-pixel`），這會瞬間切換共用的設計 Tokens（如 `--primary`、`--radius` 等等），這讓我們未來新增主題時完全不用修改 TS 邏輯層次。

## 開發工作流 (Dev Workflows)
- 基礎指令:
  - `npm install` (安裝專案依賴)
  - `npm run dev` (啟動本地 Vite 開發伺服器)
  - `npm run build` (同時執行 TypeScript 型別檢查與編譯打包)
  - `npm run lint` (執行語法檢查)
  - `npm run preview` (預覽生產環境的打包結果)
- `package.json` 裡面目前沒有配置 Jest 或 Cypress 的自動化腳本；系統安全與除錯首要依賴 TS 型別與 ESLint 定義。
- `@/*` 代表通用模組絕對路徑的引用別名，目前已經在 `tsconfig.json` 以及 `vite.config.ts` 註冊設定完畢。請盡量用這個規範引入模組。

## 後端 API 串接規格 (Backend Integration Guardrails)
- **開發代理機制 (Proxy)**：寫在 `vite.config.ts` 內，攔截遇到 `/api` 的請求並把它丟給本地真正的 Spring Boot (?) 或者本機應用伺服器 `http://localhost:8080`。此外為防止 LLM 思考太久，這個環境已經調高了 `timeout` 極限值。
- **相對路徑原則**：前端程式碼中只能對 `/api/ollama/chat` 進行呼叫，請勿把 `localhost` 這段寫死在前端裡面，這會導致未來的 Production 發布直接失敗。

### 📌 API Contract (詳細交換通訊協定):
- **服務動詞與路徑**: `POST /api/ollama/chat`
- **Headers**: `Content-Type: application/json`
- **請求格式 (Request Body)**: 
  ```json
  {
    "prompt": "<使用者輸入的對話文字>"
  }
  ```
- **回應格式 (Response Body)** (Status Code `200`): 
  ```json
  {
    "reply": "<後端 AI 生成的對話文案回應>"
  }
  ```

## 原始碼優先檢閱順序 (Files to Inspect First)
本專案開發期間最需要被關注與檢查的 4 支核心檔案：
1. `src/App.tsx` (整體的多重選擇狀態、Theme 狀態更新的起點)
2. `src/components/ChatWidget.tsx` (發火線以及主要狀態機，裡面包含動畫、API與視窗呈現的所有邏輯)
3. `src/index.css` (全局層級的樣式注入層、各個主題獨立色彩變數的儲存地)
4. `vite.config.ts` (建置系統：包含了 Tailwinds 設定、@別名與 Proxy 代理)
