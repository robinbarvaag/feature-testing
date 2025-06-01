"use client";

import { useEffect, useState } from "react";
import { initialLightTheme, initialTheme } from "../constants";
import { ThemeColors } from "../theme-editor";
import { parseOklch } from "../utils/utils";

export const useThemeState = () => {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("dark");
  const [themeColors, setThemeColors] = useState<{
    light: ThemeColors;
    dark: ThemeColors;
  }>({
    light: initialLightTheme,
    dark: initialTheme,
  });

  useEffect(() => {
    Object.entries(themeColors[activeTheme]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [themeColors, activeTheme]);

  const updateColor = (key: string, value: string) => {
    setThemeColors((prev) => ({
      ...prev,
      [activeTheme]: {
        ...prev[activeTheme],
        [key]: value,
      },
    }));

    if (key === "background") {
      const { l } = parseOklch(value);
      setThemeColors((prev) => ({
        ...prev,
        [activeTheme]: {
          ...prev[activeTheme],
          foreground: l < 0.5 ? "oklch(0.985 0 0)" : "oklch(0.145 0 0)",
          card: value,
          "card-foreground": l < 0.5 ? "oklch(0.985 0 0)" : "oklch(0.145 0 0)",
        },
      }));
    }
  };

  return {
    activeTheme,
    setActiveTheme,
    themeColors,
    setThemeColors,
    updateColor,
  };
};
