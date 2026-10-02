export interface OtherProject {
  slug: string;
  number: string;
  title: string;
  english: string;
  description: string;
  tech: string[];
  detail: string;
  tag?: string;
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
  },
  {
    slug: "screw-specification-query",
    number: "A2",
    title: "螺絲規格查詢系統",
    english: "Screw Specification Query System",
    description: "以 WinForms 與 Oracle SQL 查詢螺絲料號、種類、螺紋、牙數、尺寸、公差與等級。",
    tech: ["C#", "WinForms", "Oracle SQL"],
    detail: "以 WinForms 作為查詢介面，搭配 Oracle SQL 整理螺絲料號、種類、螺紋、牙數、尺寸、公差與等級等工程資料。",
  },
  {
    slug: "design-automation-project-management",
    number: "A3",
    title: "設計自動化開發管理系統",
    english: "Design Automation Project Management",
    description: "使用 RACI、Gantt 與 Excel 管理 3D 模型、公式、軟體開發、驗證與責任分工。",
    tech: ["Excel", "RACI", "Gantt"],
    detail: "以 RACI、Gantt 與 Excel 協助整理 3D 模型、公式、軟體開發、驗證與責任分工，讓設計自動化開發可被追蹤與協作。",
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
  },
];
