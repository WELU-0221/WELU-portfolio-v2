export const robotContributionGroups = [
  { number: "01", title: "MECHANICAL DESIGN", items: ["SolidWorks 3D 機構與組裝設計", "空間、干涉與組裝性確認"] },
  { number: "02", title: "HARDWARE INTEGRATION", items: ["控制器、感測器、馬達與電源配置考量", "Hardware space planning"] },
  { number: "03", title: "PROJECT COORDINATION", items: ["專題方向規劃與任務協調"] },
  { number: "04", title: "MUSIC FEATURE RESEARCH", items: ["Spectrogram research", "Beat / Tempo / Rhythm exploration", "Music feature → robot motion mapping research"] },
];
export const robotTags = ["Mechanical Design", "Hardware Integration", "Music Analysis", "AI Rhythm Research"];
export const musicExplorationFlow = ["Music Input", "Audio Feature Extraction", "Spectrogram", "Beat / Tempo / Rhythm", "Feature Analysis", "Motion Mapping Exploration", "Robot Motion"];
export const robotSystemGroups = [
  { id: "mechanical", number: "01", title: "Mechanical", annotation: "STRUCTURE ↔ ACTUATION", items: ["SolidWorks", "Robot Structure", "Servo Motors", "Hardware Layout"] },
  { id: "sensing", number: "02", title: "Sensing", annotation: "FEEDBACK → ATTITUDE / COP", items: ["IMU", "FSR-402", "Robot Attitude", "Foot Pressure", "COP / CoM"] },
  { id: "control", number: "03", title: "Control / Simulation", annotation: "CONTROL → SIMULATION", items: ["Raspberry Pi", "ROS", "RViz", "Gazebo"] },
  { id: "ai", number: "04", title: "AI / Research", annotation: "AUDIO → FEATURE → MOTION", items: ["Audio Feature Analysis", "Beat / Tempo / Rhythm", "Motion Mapping Exploration", "AI / Reinforcement Learning Research"] },
];
export const robotOutcomes = [
  { number: "01", title: "Mechanical Prototype", text: "完成多自由度機器人機構與組裝設計，並整合硬體配置與空間考量。" },
  { number: "02", title: "System Integration", text: "將機構、感測、控制與模擬架構整合到同一專題系統中。" },
  { number: "03", title: "AI Exploration", text: "研究 Spectrogram、Beat、Tempo、Rhythm，以及音樂資訊與機器人動作之間的對應關係。" },
];
export const robotLearnings = [
  { number: "01", title: "Cross-disciplinary Integration", text: "理解機械、硬體、感測與控制系統之間的互相影響，不再只從單一機構角度思考問題。" },
  { number: "02", title: "Design for Integration", text: "機構設計除了幾何與外型，還必須同時考慮硬體空間、組裝、感測與控制需求。" },
  { number: "03", title: "AI as Engineering Exploration", text: "從音訊資料、Spectrogram 與 Rhythm 特徵開始，理解 AI 如何逐步連結到實際機器人動作與控制問題。" },
];
export interface RobotPose { x: number; y: number; scale: number; rx: number; yaw: number; rz: number; cx: number; cy: number; cz: number; ty: number; armWave: number }
export const robotStart: RobotPose = { x: .38, y: -.1, scale: 1.12, rx: -.025, yaw: -.18, rz: 0, cx: 3.25, cy: 1.82, cz: 7.25, ty: 0, armWave: 0 };
// Hero-only framing: the persistent Canvas must be useful even before any scroll code runs.
export const robotHero: RobotPose = { ...robotStart, x: .22, y: -.06, scale: 1.04, cx: 3.25, cy: 1.82, cz: 7.45 };
export const robotStages = [
  { id: "overview", label: "02 / OVERVIEW", title: "從結構，到節奏。", text: "本專題以多自由度跳舞機器人為主題，整合機械結構、硬體元件、感測器與控制系統，並探索音樂節奏資訊與機器人舞蹈動作之間的對應方式。", side: "left", pose: { ...robotStart, x: .17, y: 0, scale: .92, rx: 0, yaw: .14, cx: 3.65, cy: 1.82, cz: 8.05, ty: 0 } },
  { id: "mechanical", label: "03 / MECHANICAL DESIGN", title: "先讓結構成立。", text: "以 SolidWorks 建立機構與組裝，讓關節配置、硬體空間與裝配考量進入同一個設計。", items: ["SolidWorks 3D 機構設計", "Robot assembly · Joint arrangement", "Hardware space planning", "Assembly / interference consideration"], side: "left", pose: { ...robotStart, x: .10, y: -.02, scale: 1.42, rx: -.055, yaw: .34, rz: .01, cx: 3.05, cy: 1.72, cz: 6.72, ty: -.04 } },
  { id: "hardware", label: "04 / HARDWARE INTEGRATION", title: "為每個元件，留好位置。", text: "將硬體配置帶入機構空間，考量安裝、配線與彼此干涉。", items: ["Controller / Sensor", "Motor / Power", "Wiring / component placement"], side: "right", pose: { ...robotStart, x: -.16, y: -.01, scale: 1.15, rx: -.03, yaw: -.34, cy: 1.2, cz: 7.35, ty: -.12 } },
  { id: "sensor", label: "05 / SENSOR & BALANCE", title: "讓姿態與重心成為設計資訊。", text: "透過姿態與足底壓力資訊，觀察機器人在動作過程中的姿態與重心變化，作為動態平衡與控制研究的基礎。", items: ["IMU → Robot Attitude", "FSR-402 → Foot Pressure", "Foot Pressure → Center of Pressure (COP)"], side: "left", pose: { ...robotStart, x: .22, y: -.04, scale: .96, rx: -.04, yaw: -.12, cy: 1.1, cz: 8.45, ty: -.3 } },
  { id: "music", label: "06 / MUSIC / AI EXPLORATION", title: "把聲音，轉成可研究的特徵。", text: "研究將音訊轉換成頻譜圖，並探討頻譜特徵作為 AI 輸入的可能性。", items: ["研究音訊轉 Spectrogram", "研究頻譜特徵如何作為 AI 輸入", "探索 Beat / Tempo / Rhythm 辨識", "探索音樂節奏與機器人動作的對應方式"], side: "left", pose: { ...robotStart, x: .38, y: -.08, scale: .56, rx: -.02, yaw: .18, rz: 0, cz: 8.7, armWave: .18 } },
  { id: "system", label: "07 / PROJECT / TEAM SYSTEM", title: "專題系統架構", text: "機械、感測、控制、模擬與 AI 研究共同構成跨領域系統。", side: "both", pose: { ...robotStart, x: 0, y: .04, scale: .48, rx: -.015, yaw: .08, rz: 0, cx: 3.35, cy: 1.7, cz: 10.1, ty: 0 } },
  { id: "result", label: "08 / RESULT / CURRENT STAGE", title: "成果與目前階段", text: "完成多自由度機器人機構設計、實體製作與專題系統架構整合，並建立感測、模擬與控制研究基礎。", side: "both", pose: { ...robotStart, x: .21, y: .01, scale: .72, rx: -.01, yaw: -.1, rz: 0, cx: 3.4, cy: 1.84, cz: 9.15, ty: .03 } },
  { id: "learning", label: "09 / ENGINEERING LEARNING", title: "工程學習", text: "從機構設計延伸到跨領域系統整合。", side: "both", pose: { ...robotStart, x: .2, y: .03, scale: .7, rx: -.01, yaw: .04, rz: 0, cx: 3.4, cy: 1.88, cz: 9.3, ty: .05, armWave: .85 } },
];
