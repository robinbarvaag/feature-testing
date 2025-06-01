"use client";

import { useEffect, useState } from "react";
import { TabWarnings, ThemeColors } from "../theme-editor";
import { calculateContrastRatio } from "../utils/utils";

export const useThemeValidation = (
  themeColors: { light: ThemeColors; dark: ThemeColors },
  activeTheme: "light" | "dark"
) => {
  const [tabWarnings, setTabWarnings] = useState<TabWarnings>({
    sidebar: [],
    cards: [],
    components: [],
  });

  const validateContrast = (
    color1: string,
    color2: string,
    label: string
  ): string | null => {
    const contrast = calculateContrastRatio(color1, color2);
    if (contrast < 4.5) {
      return `${label} har lav kontrast (${contrast.toFixed(2)}:1, bør være minst 4.5:1)`;
    }
    return null;
  };

  useEffect(() => {
    const sidebarWarnings: string[] = [];
    const cardsWarnings: string[] = [];
    const componentsWarnings: string[] = [];

    // Validate sidebar
    const sidebarContrast = validateContrast(
      themeColors[activeTheme]["sidebar-foreground"],
      themeColors[activeTheme].sidebar,
      "Sidebar tekst"
    );
    if (sidebarContrast) sidebarWarnings.push(sidebarContrast);

    // Validate cards and text
    const cardContrast = validateContrast(
      themeColors[activeTheme]["card-foreground"],
      themeColors[activeTheme].card,
      "Kort tekst"
    );
    if (cardContrast) cardsWarnings.push(cardContrast);

    const textContrast = validateContrast(
      themeColors[activeTheme].foreground,
      themeColors[activeTheme].background,
      "Normal tekst"
    );
    if (textContrast) cardsWarnings.push(textContrast);

    const mutedContrast = validateContrast(
      themeColors[activeTheme]["muted-foreground"],
      themeColors[activeTheme].muted,
      "Dempet tekst"
    );
    if (mutedContrast) cardsWarnings.push(mutedContrast);

    setTabWarnings({
      sidebar: sidebarWarnings,
      cards: cardsWarnings,
      components: componentsWarnings,
    });
  }, [themeColors, activeTheme]);

  return {
    tabWarnings,
    validateContrast,
  };
};
