export interface OtherProject {
  slug: string;
  number: string;
  title: string;
  english: string;
  description: string;
  tech: string[];
  detail: string;
  tag?: string;
  process: { label: string; detail: string }[];
  contribution: { title: string; detail: string }[];
}

export interface OtherWork {
  id: string;
  group: "AUTOMATION MODULES" | "ENGINEERING TOOLS" | "PROJECT / DEVELOPMENT" | "EARLY WORK";
  type: string;
  title: string;
  english: string;
  description: string;
  process: string[];
  tech?: string[];
  href?: string;
  linkLabel?: string;
  parent?: string;
  note?: string;
}

export const otherProjects: OtherProject[] = [
  {
    slug: "solidworks-engineering-toolkit",
    number: "A1",
    title: "SolidWorks 工程工具集",
    english: "SolidWorks Engineering Toolkit",
    description: "Hole Wizard 自動化、特徵上色、工程圖公差、規格選擇與工程輔助工具。",
    tech: ["C#", "SolidWorks API", "WinForms"],
    detail: "整合 Hole Wizard 自動化、特徵上色、工程圖公差、規格選擇與工程輔助工具，作為工程設計工作中的支援模組。",
    process: [
      { label: "DESIGN TASK", detail: "Hole Wizard、特徵、工程圖公差與規格選擇" },
      { label: "RULE / FEATURE LOGIC", detail: "將重複工程操作整理為工具邏輯" },
      { label: "SOLIDWORKS AUTOMATION", detail: "C#、SolidWorks API 與 WinForms 工具整合" },
      { label: "MODEL / DRAWING SUPPORT", detail: "工程設計工作的輔助輸出" },
    ],
    contribution: [
      { title: "ENGINEERING TOOL DESIGN", detail: "將重複性的 SolidWorks 工程操作整理成工具需求。" },
      { title: "SOLIDWORKS AUTOMATION", detail: "以既有工具內容呈現 Hole Wizard、特徵處理與工程圖相關自動化功能。" },
      { title: "ENGINEERING WORKFLOW", detail: "將規格選擇、特徵處理與工程輔助流程整合進工具。" },
    ],
  },
  {
    slug: "screw-specification-query",
    number: "A2",
    title: "螺絲規格查詢系統",
    english: "Screw Specification Query System",
    description: "以 WinForms 與 Oracle SQL 查詢螺絲料號、種類、螺紋、牙數、尺寸、公差與等級。",
    tech: ["C#", "WinForms", "Oracle SQL"],
    detail: "以 WinForms 作為查詢介面，搭配 Oracle SQL 整理螺絲料號、種類、螺紋、牙數、尺寸、公差與等級等工程資料。",
    process: [
      { label: "QUERY REQUIREMENT", detail: "依工程需求查找螺絲規格資料" },
      { label: "SPECIFICATION FILTER", detail: "料號、種類、螺紋、牙數與尺寸條件" },
      { label: "DATABASE QUERY", detail: "WinForms 介面搭配 Oracle SQL 查詢" },
      { label: "RESULT", detail: "整理可讀取的工程規格結果" },
    ],
    contribution: [
      { title: "QUERY WORKFLOW", detail: "將工程規格查詢需求整理成可操作的查詢流程。" },
      { title: "WINFORMS INTERFACE", detail: "規劃工程查詢介面與使用流程。" },
      { title: "DATABASE QUERY", detail: "整合規格條件與 Oracle SQL 資料庫查詢流程。" },
    ],
  },
  {
    slug: "design-automation-project-management",
    number: "A3",
    title: "設計自動化開發管理系統",
    english: "Design Automation Project Management",
    description: "使用 RACI、Gantt 與 Excel 管理 3D 模型、公式、軟體開發、驗證與責任分工。",
    tech: ["Excel", "RACI", "Gantt"],
    detail: "以 RACI、Gantt 與 Excel 協助整理 3D 模型、公式、軟體開發、驗證與責任分工，讓設計自動化開發可被追蹤與協作。",
    process: [
      { label: "PROJECT REQUIREMENT", detail: "整理設計自動化開發工作項目" },
      { label: "TASK / RESPONSIBILITY BREAKDOWN", detail: "以 RACI 釐清責任分工" },
      { label: "SCHEDULE & COORDINATION", detail: "以 Gantt 與 Excel 追蹤協作節點" },
      { label: "TRACKING / DELIVERY", detail: "管理模型、公式、開發與驗證進度" },
    ],
    contribution: [
      { title: "WORK BREAKDOWN", detail: "將設計自動化工作拆解為可追蹤任務。" },
      { title: "RESPONSIBILITY PLANNING", detail: "使用 RACI 整理責任與協作關係。" },
      { title: "SCHEDULE MANAGEMENT", detail: "使用 Gantt 與 Excel 追蹤開發時程。" },
      { title: "CROSS-FUNCTION COORDINATION", detail: "協調 3D、公式、軟體與驗證相關工作。" },
    ],
  },
  {
    slug: "automated-shuttlecock-collector",
    number: "A4",
    title: "自動拾羽球車",
    english: "Automated Shuttlecock Collector",
    description: "高中時期的工程實作專案，展示早期機構設計與工程問題解決經驗。",
    tech: ["Early Engineering Project"],
    detail: "高中時期的工程實作專案，作為早期機構設計與工程問題解決經驗的展示。可公開的機構細節與實作紀錄待補。",
    tag: "Early Engineering Project",
    process: [
      { label: "PROBLEM", detail: "自動拾取羽球的早期工程問題" },
      { label: "MECHANISM CONCEPT", detail: "以機構設計探索解決方向" },
      { label: "EARLY ENGINEERING PROJECT", detail: "早期工程實作與問題解決經驗" },
    ],
    contribution: [
      { title: "MECHANISM CONCEPT", detail: "早期機構概念與工程問題拆解。" },
      { title: "ENGINEERING LEARNING", detail: "從早期工程實作中累積機構設計與問題解決經驗。" },
    ],
  },
];

// Homepage-only supporting work index. Entries without href intentionally do not
// imply a public standalone case study or an unverified ownership claim.
export const otherWorks: OtherWork[] = [
  {
    id: "bs-automation", group: "AUTOMATION MODULES", type: "RELATED AUTOMATION MODULE", title: "BS 自動化模組", english: "Burn-in Socket Automation Module",
    description: "Socket Automation 相關的 Burn-in Socket 工程自動化模組，串接模型與 Excel 工程計算流程。",
    process: ["REQUIREMENT", "MODEL / PARAMETER SETUP", "EXCEL CALCULATION", "ENGINEERING OUTPUT"], parent: "Related to Socket Design Automation System", href: "/projects/socket-automation/", linkLabel: "View Socket Project",
  },
  {
    id: "device-automation", group: "AUTOMATION MODULES", type: "RELATED AUTOMATION MODULE", title: "Device 自動化模組", english: "Device Automation Module",
    description: "Socket Automation 相關工程模組，聚焦 QFN / BGA 與尺寸自動控制的公開安全流程。",
    process: ["DEVICE REQUIREMENT", "PARAMETER INPUT", "DESIGN LOGIC", "CAD UPDATE", "VALIDATION"], parent: "Related to Socket Design Automation System", href: "/projects/socket-automation/", linkLabel: "View Socket Project",
  },
  {
    id: "solidworks-addin-epdm", group: "ENGINEERING TOOLS", type: "ENGINEERING TOOL", title: "SolidWorks Add-in / ePDM", english: "SolidWorks Add-in / ePDM Integration",
    description: "以工程任務為起點，連結 Add-in / DLL 與 SolidWorks / ePDM 整合的工具方向。",
    process: ["ENGINEERING TASK", "ADD-IN / DLL", "SOLIDWORKS / ePDM INTEGRATION", "ENGINEERING OUTPUT"], parent: "SolidWorks Engineering Toolkit", href: "/projects/solidworks-engineering-toolkit/", linkLabel: "View Toolkit",
  },
  {
    id: "hole-wizard", group: "ENGINEERING TOOLS", type: "TOOL MODULE", title: "Hole Wizard 自動化工具", english: "Hole Wizard Automation",
    description: "SolidWorks Engineering Toolkit 的子工具，將孔位需求與規則轉為 Hole Wizard 自動化操作。",
    process: ["HOLE REQUIREMENT", "RULE / PARAMETER", "HOLE WIZARD AUTOMATION", "MODEL UPDATE", "CHECK"], parent: "SolidWorks Engineering Toolkit", href: "/projects/solidworks-engineering-toolkit/", linkLabel: "View Toolkit",
  },
  {
    id: "feature-coloring", group: "ENGINEERING TOOLS", type: "TOOL MODULE", title: "特徵自動上色", english: "Automatic Feature Coloring",
    description: "SolidWorks Engineering Toolkit 的子工具，依工程條件辨識特徵並自動套用顏色。",
    process: ["MODEL FEATURE", "FEATURE DETECTION", "CLASSIFICATION / RULE", "COLOR APPLICATION", "VISUAL CHECK"], parent: "SolidWorks Engineering Toolkit", href: "/projects/solidworks-engineering-toolkit/", linkLabel: "View Toolkit",
  },
  {
    id: "screw-query", group: "ENGINEERING TOOLS", type: "ENGINEERING TOOL", title: "螺絲規格查詢系統", english: "Screw Specification Query System",
    description: "以 WinForms 與 Oracle SQL 查詢螺絲料號、種類、螺紋、牙數、尺寸、公差與等級。",
    process: ["QUERY REQUIREMENT", "SPECIFICATION FILTER", "DATABASE QUERY", "RESULT"], tech: ["C#", "WinForms", "Oracle SQL"], href: "/projects/screw-specification-query/", linkLabel: "View Details",
  },
  {
    id: "project-management", group: "PROJECT / DEVELOPMENT", type: "PROJECT MANAGEMENT", title: "設計自動化開發管理", english: "Design Automation Project Management",
    description: "使用 RACI、Gantt 與 Excel 管理設計自動化開發中的任務、責任、時程與跨項目協作。",
    process: ["PROJECT REQUIREMENT", "TASK BREAKDOWN", "RACI / RESPONSIBILITY", "SCHEDULE", "TRACKING", "DELIVERY"], tech: ["Excel", "RACI", "Gantt"], href: "/projects/design-automation-project-management/", linkLabel: "View Details",
  },
  {
    id: "portfolio-website", group: "PROJECT / DEVELOPMENT", type: "PERSONAL PROJECT", title: "工程作品集網站", english: "Engineering Portfolio Website",
    description: "以工程專案為核心，規劃資訊架構、互動呈現與專案 Case Study，並完成網站開發與部署。",
    process: ["ENGINEERING CONTENT", "INFORMATION ARCHITECTURE", "UI / INTERACTION DEVELOPMENT", "TEST", "GIT", "DEPLOYMENT"], tech: ["Next.js", "React", "Three.js", "GSAP", "GitHub", "Vercel"], note: "AI-assisted development · AI 協助程式實作、UI 迭代與除錯；需求、工程內容、資訊架構與最終整合由本人規劃與確認。",
  },
  {
    id: "shuttlecock-collector", group: "EARLY WORK", type: "EARLY ENGINEERING PROJECT", title: "自動拾羽球車", english: "Automated Shuttlecock Collector",
    description: "高中時期工程實作，展示早期機構設計與工程問題解決經驗。",
    process: ["PROBLEM", "MECHANISM CONCEPT", "PROTOTYPE", "TEST", "IMPROVEMENT"], tech: ["Early Engineering Project"], href: "/projects/automated-shuttlecock-collector/", linkLabel: "View Details",
  },
];
