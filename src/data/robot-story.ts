export const robotResponsibilities = [
  "使用 SolidWorks 建立機器人 3D 機構與組裝設計",
  "規劃控制板、感測器、馬達、電源與其他硬體的位置",
  "考量機構空間、裝配與硬體干涉",
  "研究音訊轉換為 Spectrogram 頻譜圖",
  "研究以頻譜特徵作為 AI 輸入",
  "探討 Beat / Tempo / Rhythm 音樂節奏辨識",
  "研究節奏辨識結果與機器人動作的整合方式",
];
export const robotTeam = ["ROS", "RViz", "Gazebo", "Raspberry Pi", "IMU", "FSR-402 Pressure Sensor", "COP / Center of Pressure", "AI / Reinforcement Learning", "SolidWorks"];
export const robotTags = ["Mechanical Design", "Hardware Integration", "Music Analysis", "AI Rhythm Research"];
export const mechanicalFlow = ["Requirement", "3D Mechanism", "Hardware Placement", "Assembly Check", "Robot Structure"];
export const musicFlow = ["Music", "Spectrogram", "AI Rhythm Recognition", "Motion Planning", "Robot Motion"];
export interface RobotPose { x: number; y: number; scale: number; yaw: number; cx: number; cy: number; cz: number; ty: number }
export const robotStart: RobotPose = { x: .22, y: 0, scale: .9, yaw: 0, cx: 3.2, cy: 1.8, cz: 7.5, ty: 0 };
export const robotStages = [
  { id: "overview", label: "01 / OVERVIEW", title: "從結構，到節奏。", text: "從機械結構、硬體配置到音樂分析，探索多自由度跳舞機器人的系統整合。", side: "left", pose: robotStart },
  { id: "mechanical", label: "02 / MECHANICAL DESIGN", title: "先讓結構成立。", text: "以 SolidWorks 建立機構與組裝，讓關節配置、硬體空間與裝配考量進入同一個設計。", items: ["SolidWorks 3D 機構設計", "Robot assembly · Joint arrangement", "Hardware space planning", "Assembly / interference consideration"], side: "left", pose: { ...robotStart, x: .20, y: .02, scale: 1.2, yaw: .35, cz: 7.1 } },
  { id: "hardware", label: "03 / HARDWARE INTEGRATION", title: "為每個元件，留好位置。", text: "將硬體配置帶入機構空間，考量安裝、配線與彼此干涉。", items: ["Controller / Sensor", "Motor / Power", "Wiring / component placement"], side: "right", pose: { ...robotStart, x: -.20, y: -.01, scale: 1.35, yaw: -.2, cy: 1.2, cz: 7.2, ty: -.12 } },
  { id: "music", label: "04 / MUSIC ANALYSIS", title: "把聲音，轉成可研究的特徵。", text: "研究將音訊轉換成頻譜圖，並探討頻譜特徵作為 AI 輸入的可能性。", items: ["Music → Audio Feature", "Spectrogram → AI Input"], side: "left", pose: { ...robotStart, x: .25, scale: .95, yaw: .08, cz: 8 } },
  { id: "rhythm", label: "05 / RHYTHM RECOGNITION", title: "Beat. Tempo. Rhythm.", text: "探索節奏辨識結果如何銜接動作規劃；這裡呈現研究方向，不代表已驗證的辨識效能。", items: ["Spectrogram → Rhythm Recognition", "Motion Planning → Robot Motion"], side: "left", pose: { ...robotStart, x: .08, scale: .9, yaw: .15, cz: 8.8 } },
  { id: "workflows", label: "06 / TWO WORKFLOWS", title: "兩條路徑，一個系統。", text: "機構與音樂研究，在機器人系統整合中交會。", side: "both", pose: { ...robotStart, x: 0, scale: .85, yaw: 0, cz: 8.6 } },
  { id: "team", label: "07 / TEAM SYSTEM", title: "Project System / Team Components", text: "以上屬於整體 Project System，不代表所有系統技術皆由我獨立完成。", side: "left", pose: { ...robotStart, x: .25, y: .06, scale: .78, yaw: -.15, cz: 8 } },
  { id: "contribution", label: "08 / MY CONTRIBUTION", title: "設計結構，也探索連結。", text: "從機構設計到音樂特徵研究，我主要參與機械結構與跨領域整合的前期設計與探索。", items: ["Mechanical Design", "Hardware Placement", "Spectrogram Research", "AI Rhythm Research"], side: "left", pose: { ...robotStart, x: .08, scale: 1, yaw: .1 } },
];