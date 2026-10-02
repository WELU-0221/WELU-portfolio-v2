export interface SocketPose {
  x: number; y: number; scale: number; rx: number; ry: number; rz: number;
  cx: number; cy: number; cz: number; tx: number; ty: number;
  horizontal: number; vertical: number; light: number;
}

export const socketStart: SocketPose = {
  x: 0.24, y: 0.02, scale: 1.25, rx: 0.05, ry: -0.35, rz: 0,
  cx: 0, cy: 3.6, cz: 7.1, tx: 0, ty: 0, horizontal: 0, vertical: 0, light: 1,
};

export const socketStoryPoses = {
  hero: socketStart,
  cad: { ...socketStart, x: 0, y: 0.02, scale: 1.32, ry: 0.7, cx: 0, cy: 3.5, cz: 6.65 },
  assembled: { ...socketStart, x: 0, y: 0.03, scale: 1.18, ry: 0.9, cx: 0, cy: 3.5, cz: 6.8 },
  horizontal: { ...socketStart, x: 0, y: 0.03, scale: 1.08, ry: 0.9, cx: 0, cy: 3.5, cz: 6.95, horizontal: 1 },
  vertical: { ...socketStart, x: 0, y: 0.02, scale: 1.04, ry: 0.9, cx: 0, cy: 3.5, cz: 7.05, vertical: 1 },
  summary: { ...socketStart, x: 0.26, y: 0.02, scale: 0.82, ry: 1.1, cx: 0, cy: 3.6, cz: 7.45, vertical: 0.35, light: 0.88 },
} satisfies Record<string, SocketPose>;

export const socketPartLabels = ["零件3-1", "零件1-1", "零件2-1"] as const;
