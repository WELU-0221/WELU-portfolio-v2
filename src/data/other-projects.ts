export interface OtherProject {
  number: string;
  title: string;
  english: string;
  description: string;
  tech: string[];
  tag?: string;
}

export const otherProjects: OtherProject[] = [
  {
    number: "A1",
    title: "SolidWorks 工程工具集",
    english: "SolidWorks Engineering Toolkit",
    description: "Hole Wizard 自動化、特徵上色、工程圖公差、規格選擇與工程輔助工具。",
    tech: ["C#", "SolidWorks API", "WinForms"],
  },
  {
    number: "A2",
    title: "螺絲規格查詢系統",
    english: "Screw Specification Query System",
    description: "以 WinForms 與 Oracle SQL 查詢螺絲料號、種類、螺紋、牙數、尺寸、公差與等級。",
    tech: ["C#", "WinForms", "Oracle SQL"],
  },
  {
    number: "A3",
    title: "設計自動化開發管理系統",
    english: "Design Automation Project Management",
    description: "使用 RACI、Gantt 與 Excel 管理 3D 模型、公式、軟體開發、驗證與責任分工。",
    tech: ["Excel", "RACI", "Gantt"],
  },
  {
    number: "A4",
    title: "自動拾羽球車",
    english: "Automated Shuttlecock Collector",
    description: "高中時期的工程實作專案，展示早期機構設計與工程問題解決經驗。",
    tech: ["Early Engineering Project"],
    tag: "Early Engineering Project",
  },
];