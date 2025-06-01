import { oklch, rgb } from "culori";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export const oklchToRGB = (oklchColor: string): RGB => {
  // Parse OKLCH string
  const match = oklchColor.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) {
    throw new Error("Invalid OKLCH color format");
  }

  const [_, l, c, h] = match.map(Number);
  const rgbColor = rgb(oklch({ l, c, h, mode: "oklch" }));

  return {
    r: Math.round(rgbColor?.r * 255),
    g: Math.round(rgbColor?.g * 255),
    b: Math.round(rgbColor?.b * 255),
  };
};

export const calculateContrastRatio = (
  color1: string,
  color2: string
): number => {
  const rgb1 = oklchToRGB(color1);
  const rgb2 = oklchToRGB(color2);

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((val) =>
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

export const getWCAGLevel = (
  ratio: number
): { level: "AAA" | "AA" | "Fail"; size: "Normal" | "Large" } => {
  if (ratio >= 7) {
    return { level: "AAA", size: "Normal" };
  } else if (ratio >= 4.5) {
    return { level: "AA", size: "Normal" };
  } else if (ratio >= 3) {
    return { level: "AA", size: "Large" };
  }
  return { level: "Fail", size: "Normal" };
};

export const generateColorPalette = (baseColor: string): string[] => {
  const match = baseColor.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) return [];

  const [_, l, c, h] = match.map(Number);

  return [
    { l: l * 0.2, c, h }, // 100
    { l: l * 0.4, c, h }, // 200
    { l: l * 0.6, c, h }, // 300
    { l: l * 0.8, c, h }, // 400
    { l, c, h }, // 500 (original)
    { l: Math.min(l * 1.2, 1), c, h }, // 600
    { l: Math.min(l * 1.4, 1), c, h }, // 700
    { l: Math.min(l * 1.6, 1), c, h }, // 800
    { l: Math.min(l * 1.8, 1), c, h }, // 900
  ].map(({ l, c, h }) => `oklch(${l} ${c} ${h})`);
};
