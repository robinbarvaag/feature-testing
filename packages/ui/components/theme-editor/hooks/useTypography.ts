"use client";

import { useState, useCallback } from "react";

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const useTypography = () => {
  const [fontSizes, setFontSizes] = useState({
    xs: 0.75,
    sm: 0.875,
    base: 1,
    lg: 1.125,
    xl: 1.25,
    "2xl": 1.5,
    "3xl": 1.875,
    "4xl": 2.25,
  });

  const updateFontSize = useCallback((name: string, value: number) => {
    setFontSizes((prev) => ({ ...prev, [name]: value }));
    document.documentElement.style.setProperty(`--text-${name}`, `${value}rem`);
  }, []);

  const debouncedUpdateFontSize = useCallback(
    debounce((name: string, value: number) => {
      updateFontSize(name, value);
    }, 100),
    []
  );

  return {
    fontSizes,
    setFontSizes,
    updateFontSize,
    debouncedUpdateFontSize,
  };
};
