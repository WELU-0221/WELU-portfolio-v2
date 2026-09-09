# WELU Engineering Portfolio
Next.js + React + React Spring + GSAP / ScrollTrigger + Lenis，靜態匯出至 GitHub Pages。沒有後端或資料庫。

## 本機預覽
安裝 Node.js 22 LTS 與 Yarn Classic 1.22.22，再執行：
```sh
yarn install --frozen-lockfile
yarn dev
```
開啟 http://localhost:3000 。不要直接雙擊 TSX 或 out/index.html；Next 的 client navigation 需要 HTTP 預覽。

## 驗證與建置
```sh
bash .claude/scripts/verify.sh
yarn lint
yarn build
```
建置輸出為 out/。不使用 next start（靜態匯出沒有 Next 伺服器）。

## GitHub Pages
將此資料夾本身設為獨立 GitHub repository 的根目錄，不要上傳舊 Flask 專案。
Repository → Settings → Pages → Source 選 GitHub Actions。
內附 .github/workflows/pages.yml，推送 main 後會安裝、檢查、靜態建置並發布 out/。
Workflow 根據 Pages 的 base URL 與 base path 設定網站路徑，同時支援 repository site 與 username.github.io。
首次請確認 Pages 已啟用；本次不會代你建立 repository 或公開發布。
官方說明：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 內容維護
- src/data/portfolio.ts：五個作品、流程、個人職責、技術棧與聯絡 email。
- src/views/home.tsx：品牌封面與快速作品目錄。
- src/views/project.tsx：共用案例頁。
- src/components/portfolio/case-motion.tsx：只在案例頁使用 pin、scrub 與流程動畫。
- src/components/portfolio/project-visual.tsx：目前為明確標示的圖片佔位區。取得可公開圖片後在此替換，並補上描述性 alt。
- 首頁的 hover 預覽也支援鍵盤 focus；觸控裝置可直接點選整列。
- Desktop 案例視覺使用 GSAP pin / rotateX / rotateY / scale / translate；窄螢幕不 pin。
- prefers-reduced-motion 關閉 Lenis 與 GSAP 動畫；React Spring 沿用 ReducedMotion。
- Next 路由為 /projects/socket-automation/ 等目錄式網址，重新整理與直接連入皆有對應靜態 HTML。

## 公開內容狀態
未提供的個人分工、技術、成果與圖片保持「待補充」。不得把流程草案當成已驗證成果。
機器人 Team System 明確區分個人負責的機構設計與節奏研究。
聯絡方式目前留白，不提供假 email 或無法送出的表單。
