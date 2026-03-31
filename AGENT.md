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

## 開發規劃與狀態
* **目前狀態**：專案環境已完成初始化建置，並成功引入專屬的設計系統（如 `frontend-ui`, `ui-ux-pro-max` 等 UI/UX skills）。
* **後續重點**：關於整體的佈局、色彩風格、互動邏輯（Interaction Design）與更多的設計細節，將在後續對話中逐步進行討論與實作。
