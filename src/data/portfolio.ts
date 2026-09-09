export interface Workflow { name: string; steps: string[] }
export interface Project {
  slug: string; number: string; title: string; english: string; category: string;
  description: string; tech: string[]; overview: string; role: string[];
  challenge: string; approach: string; workflows: Workflow[]; system: string[]; learning: string;
}
export const projects: Project[] = [
  {
    "slug": "socket-automation",
    "number": "01",
    "title": "Socket 設計自動化系統",
    "english": "Socket Design Automation System",
    "category": "DESIGN AUTOMATION",
    "description": "從需求、設計規則到 3D 模型，串起 Socket 設計自動化流程。",
    "tech": [
      "C#",
      "SolidWorks API",
      "Formula Mapping"
    ],
    "overview": "以 Socket 設計自動化為主題，呈現需求、設計規則、公式對應與模型驗證之間的關係。",
    "role": [
      "個人負責的模組與工作範圍待補充。"
    ],
    "challenge": "如何將需求轉換成明確的設計規則，並讓公式、參數與模型之間保持一致，是本案例的工程討論主軸。實際遇到的問題與限制待補充。",
    "approach": "依指定流程呈現 Requirement、Design Rules、Formula Mapping、C#、SolidWorks API、3D Model 與 Validation；各步驟的實作細節與分工待補充。",
    "workflows": [
      {
        "name": "Design automation",
        "steps": [
          "Requirement",
          "Design Rules",
          "Formula Mapping",
          "C#",
          "SolidWorks API",
          "3D Model",
          "Validation"
        ]
      }
    ],
    "system": [],
    "learning": "成果、驗證方式與實作心得待補充。此頁不列出未經確認的效率提升或量化數據。"
  },
  {
    "slug": "design-platform",
    "number": "02",
    "title": "3D 自動設計平台",
    "english": "3D Automated Design Platform",
    "category": "DESIGN PLATFORM",
    "description": "以平台視角整理 3D 自動設計中的需求、規則與模型流程。",
    "tech": [
      "技術棧待補充"
    ],
    "overview": "此案例聚焦 3D 自動設計平台。平台的使用情境、功能邊界與專案目標待補充。",
    "role": [
      "個人負責的功能、介面與協作範圍待補充。"
    ],
    "challenge": "平台如何接收設計需求、組織規則與呈現模型結果，將作為案例的說明方向；實際工程限制待補充。",
    "approach": "待補充實際平台架構、設計輸入與輸出，以及採用各項方案的原因。",
    "workflows": [
      {
        "name": "Workflow · 待補充實際流程",
        "steps": [
          "設計需求",
          "平台流程",
          "3D 設計輸出"
        ]
      }
    ],
    "system": [],
    "learning": "成果與學習待補充。"
  },
  {
    "slug": "ai-dancing-robot",
    "number": "03",
    "title": "AI 跳舞機器人",
    "english": "AI Dancing Robot",
    "category": "MECHANICS × MUSIC",
    "description": "從機構配置到音樂節奏研究，探索聲音與機器人動作的連結。",
    "tech": [
      "SolidWorks",
      "Spectrogram",
      "AI Rhythm Recognition"
    ],
    "overview": "將機器人機構設計與音樂節奏研究放在同一個系統脈絡中，呈現從機構、硬體配置到節奏辨識與動作規劃的關係。",
    "role": [
      "SolidWorks 3D 機構設計",
      "機器人組裝設計",
      "控制板／感測器／馬達／電源硬體配置",
      "裝配與干涉考量",
      "Spectrogram 頻譜研究",
      "AI Rhythm Recognition 研究",
      "Beat／Tempo／Rhythm 分析"
    ],
    "challenge": "機構端需考量硬體配置、裝配與干涉；音樂研究端關注頻譜、節拍、速度與節奏的分析。具體測試問題與研究結論待補充。",
    "approach": "分別整理 Mechanical 與 AI／Music 兩條流程，再於 Robot System 匯合。個人職責以機構設計、硬體配置及節奏相關研究為主；動作規劃與整體系統不視為個人獨立完成。",
    "workflows": [
      {
        "name": "Mechanical",
        "steps": [
          "Requirement",
          "3D Mechanism",
          "Hardware Placement",
          "Assembly Check",
          "Robot Structure"
        ]
      },
      {
        "name": "AI / Music",
        "steps": [
          "Music",
          "Spectrogram",
          "AI Rhythm Recognition",
          "Motion Planning",
          "Robot Motion"
        ]
      }
    ],
    "system": [
      "ROS",
      "RViz",
      "Gazebo",
      "Raspberry Pi",
      "IMU",
      "FSR-402",
      "COP",
      "AI / Reinforcement Learning"
    ],
    "learning": "裝配驗證、節奏辨識研究結果與心得待補充。不將研究項目直接描述為已完成的辨識效能或控制成果。"
  },
  {
    "slug": "device-automation",
    "number": "04",
    "title": "Device 設計自動化系統",
    "english": "Device Design Automation System",
    "category": "DESIGN AUTOMATION",
    "description": "梳理 Device 設計需求與自動化流程之間的關係。",
    "tech": [
      "技術棧待補充"
    ],
    "overview": "此案例聚焦 Device 設計自動化。裝置用途、輸入條件與可公開的系統範圍待補充。",
    "role": [
      "個人負責的設計與自動化模組待補充。"
    ],
    "challenge": "不同設計條件如何對應到一致的模型輸出，是此頁預留的討論方向；實際限制與案例待補充。",
    "approach": "待補充設計規則的整理方式、參數處理、模型生成與驗證方法。",
    "workflows": [
      {
        "name": "Workflow · 待補充實際流程",
        "steps": [
          "Device 需求",
          "自動化設計流程",
          "設計驗證"
        ]
      }
    ],
    "system": [],
    "learning": "可公開的成果與實作心得待補充。"
  },
  {
    "slug": "solidworks-parametric",
    "number": "05",
    "title": "SolidWorks 參數化模型自動建置系統",
    "english": "Parametric SolidWorks Model Automation",
    "category": "PARAMETRIC MODELING",
    "description": "以參數化模型為核心，整理 SolidWorks 自動建置的設計脈絡。",
    "tech": [
      "SolidWorks",
      "參數化模型"
    ],
    "overview": "此案例聚焦 SolidWorks 參數化模型自動建置。模型類型、使用情境與實際建置範圍待補充。",
    "role": [
      "個人負責的模型、參數定義及程式工作待補充。"
    ],
    "challenge": "參數變更與模型建置之間的關係，是此案例的說明主軸；具體相依條件與重建問題待補充。",
    "approach": "待補充參數定義、模型關係與自動建置流程。未確認的程式語言與 API 不列為已使用技術。",
    "workflows": [
      {
        "name": "Workflow · 待補充實際流程",
        "steps": [
          "參數定義",
          "模型建置",
          "模型檢查"
        ]
      }
    ],
    "system": [],
    "learning": "建置成果、適用範圍與模型維護心得待補充。"
  }
];
export const brand = {
  name: "WELU",
  positioning: "Engineering Project × Mechanical Design × Automation",
  statement: ["把工程需求，", "轉化成可管理、可自動化、", "可落地的設計流程。"],
  about: "以工程需求為起點，關注機構設計、參數化模型與自動化流程。透過作品，整理設計判斷、系統關係與實作過程。",
  contact: "從一個工程問題，開始對話。",
  email: "",
  labels: { projects: "Selected Projects", about: "About", contact: "Contact", view: "View Project", back: "Back to Projects", previous: "Previous Project", next: "Next Project" },
};
