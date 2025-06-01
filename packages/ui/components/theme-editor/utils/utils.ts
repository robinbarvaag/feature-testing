const calculateContrastRatio = (color1: string, color2: string): number => {
  // Extract L value from OKLCH
  const getLuminance = (oklch: string): number => {
    const match = oklch.match(/oklch\(([0-9.]+)/);
    if (!match) return 0.5;
    return parseFloat(match[1]);
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  // Calculate contrast ratio
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Convert OKLCH to RGB for preview
const oklchToRgb = (oklch: string): string => {
  try {
    const match = oklch.match(/oklch\(([0-9.]+) ([0-9.]+) ([0-9.]+)\)/);
    if (!match) return "#000000";

    const l = parseFloat(match[1]);
    const c = parseFloat(match[2]);
    const h = parseFloat(match[3]);

    // For preview purposes, we'll use a simpler RGB mapping
    let r = Math.round(255 * l);
    let g = Math.round(255 * l);
    let b = Math.round(255 * l);

    if (c > 0) {
      // Add color based on hue
      const hueSection = Math.floor(h / 60);
      const hueFactor = (h % 60) / 60;
      const chromaAdjust = Math.round(255 * c);

      switch (hueSection) {
        case 0: // Red to Yellow
          r = Math.min(255, r + chromaAdjust);
          g = Math.min(255, g + Math.round(chromaAdjust * hueFactor));
          break;
        case 1: // Yellow to Green
          r = Math.min(255, r + Math.round(chromaAdjust * (1 - hueFactor)));
          g = Math.min(255, g + chromaAdjust);
          break;
        case 2: // Green to Cyan
          g = Math.min(255, g + chromaAdjust);
          b = Math.min(255, b + Math.round(chromaAdjust * hueFactor));
          break;
        case 3: // Cyan to Blue
          g = Math.min(255, g + Math.round(chromaAdjust * (1 - hueFactor)));
          b = Math.min(255, b + chromaAdjust);
          break;
        case 4: // Blue to Magenta
          b = Math.min(255, b + chromaAdjust);
          r = Math.min(255, r + Math.round(chromaAdjust * hueFactor));
          break;
        case 5: // Magenta to Red
          b = Math.min(255, b + Math.round(chromaAdjust * (1 - hueFactor)));
          r = Math.min(255, r + chromaAdjust);
          break;
      }
    }

    const toHex = (v: number) =>
      Math.max(0, Math.min(255, Math.round(v)))
        .toString(16)
        .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch (e) {
    console.error("Error converting OKLCH to RGB:", e);
    return "#000000";
  }
};

// Parse OKLCH string to components
const parseOklch = (oklch: string): { l: number; c: number; h: number } => {
  try {
    const match = oklch.match(/oklch\(([0-9.]+) ([0-9.]+) ([0-9.]+)\)/);
    if (!match) return { l: 0.5, c: 0.1, h: 0 };

    return {
      l: parseFloat(match[1]),
      c: parseFloat(match[2]),
      h: parseFloat(match[3]),
    };
  } catch (e) {
    return { l: 0.5, c: 0.1, h: 0 };
  }
};

export { calculateContrastRatio, oklchToRgb, parseOklch };
