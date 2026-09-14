export interface SocketPose {
  x: number; y: number; scale: number; rx: number; ry: number; rz: number;
  cx: number; cy: number; cz: number; tx: number; ty: number; explode: number; light: number;
}
export const socketStart: SocketPose = {
  x: 0, y: -0.04, scale: 0.8, rx: 0, ry: -0.3, rz: 0,
  cx: 0, cy: 3.6, cz: 6.5, tx: 0, ty: 0, explode: 0, light: 1,
};
export const socketStages = [
  { label: "SOCKET ASSEMBLY", title: "Engineering Workflow", body: "自動化 UI · 流程 · 規則 · 模型\n從工程師使用情境出發", placement: "intro",
    pose: socketStart },
  { label: "01 / CASE LOADING", title: "案件載入",
    body: "Database → Case List → Case Number\nBasic Data / POD / Probe", placement: "left",
    pose: { ...socketStart, x: 0.22, scale: 1, ry: 0.22, cy: 3.4 } },
  { label: "02 / ENGINEERING CALCULATION", title: "工程計算",
    body: "F5 · UI_INPUT → Excel\nCalculateFullRebuild\nGP / MP / RT / DEVICE Result → UI", placement: "lower",
    pose: { ...socketStart, x: 0.08, y: 0.14, scale: 1.25, ry: 0.35, cz: 6, tx: 0.08 } },
  { label: "03 / ENGINEERING", title: "工程師確認",
    body: "確認參數，\n保留 Final Value 人工調整。", placement: "left",
    pose: { ...socketStart, x: 0.12, scale: 1.5, ry: 0.4, rx: 0.06, cz: 6, ty: 0.08 } },
  { label: "04 / CAD AUTOMATION", title: "自動建模",
    body: "F6 → SolidWorks API\nDEVICE Dimension · Feature Folder T/F\nGP → MP → RT\nAssembly Refresh → Rebuild → Save", placement: "right",
    pose: { ...socketStart, x: -0.22, y: 0.02, scale: 1.2, ry: 1.05, rz: -0.04, cx: 0.4, cy: 3.3, cz: 6.5, tx: -0.1 } },
  { label: "05 / EXPLODED VIEW", title: "組合展開",
    body: "DEVICE · GP · MP · RT 流程階段\n以現有三個零件示意結構關係", placement: "lower",
    pose: { ...socketStart, scale: 0.95, ry: 1.4, rx: 0.04, explode: 1, cy: 2.8, cz: 7.2 } },
  { label: "06 / VALIDATION", title: "PASS / FAIL",
    body: "PASS · ZIP 封裝\nExcel / DEVICE / GP / MP / RT / Assembly / LOG\nDatabase Status = PASS\n\nFAIL · Error Log\nDatabase Status = FAIL", placement: "left",
    pose: { ...socketStart, x: 0.23, scale: 0.9, ry: 1.65, explode: 1, cy: 2.8, cz: 7.2 } },
  { label: "07 / ENGINEERING OUTPUT", title: "FROM ENGINEERING INPUT\nTO VALIDATED 3D OUTPUT",
    body: "", placement: "exit",
    pose: { ...socketStart, y: -0.08, scale: 0.55, ry: 1.9, explode: 0.45, cy: 3.8, cz: 9, light: 0.62 } },
] as const;
