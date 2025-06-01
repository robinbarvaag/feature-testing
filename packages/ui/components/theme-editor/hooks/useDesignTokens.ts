"use client";

import { useCallback, useEffect, useState } from "react";
import { DesignTokens } from "../theme-editor";

export const useDesignTokens = () => {
  const [radius, setRadius] = useState<number>(10);
  const [designTokens, setDesignTokens] = useState<DesignTokens>({
    radius: 10,
    shadows: {
      sm: { y: 1, blur: 2, spread: 0 },
      md: { y: 2, blur: 4, spread: 0 },
      lg: { y: 4, blur: 8, spread: 0 },
    },
    spacing: {
      base: 0.25,
      scale: [1, 2, 3, 4, 5, 6],
    },
    transitions: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
  });

  const updateRadius = useCallback((value: number) => {
    setRadius(value);
    const remValue = `${value / 16}rem`;
    document.documentElement.style.setProperty("--radius", remValue);
  }, []);

  const updateShadow = useCallback(
    (size: string, property: "y" | "blur" | "spread", value: number) => {
      setDesignTokens((prev) => ({
        ...prev,
        shadows: {
          ...prev.shadows,
          [size]: {
            ...prev.shadows[size],
            [property]: value,
          },
        },
      }));
    },
    []
  );

  const updateSpacing = useCallback(
    (index: number, value: number) => {
      const newScale = [...designTokens.spacing.scale];
      newScale[index] = value;
      setDesignTokens((prev) => ({
        ...prev,
        spacing: {
          ...prev.spacing,
          scale: newScale,
        },
      }));
    },
    [designTokens.spacing.scale]
  );

  const updateTransition = useCallback(
    (type: "fast" | "normal" | "slow", value: number) => {
      setDesignTokens((prev) => ({
        ...prev,
        transitions: {
          ...prev.transitions,
          [type]: value,
        },
      }));
    },
    []
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--radius",
      `${designTokens.radius / 16}rem`
    );
    document.documentElement.style.setProperty(
      "--radius-sm",
      `${(designTokens.radius - 4) / 16}rem`
    );
    document.documentElement.style.setProperty(
      "--radius-md",
      `${(designTokens.radius - 2) / 16}rem`
    );
    document.documentElement.style.setProperty(
      "--radius-lg",
      `${designTokens.radius / 16}rem`
    );
    document.documentElement.style.setProperty(
      "--radius-xl",
      `${(designTokens.radius + 4) / 16}rem`
    );

    const { sm, md, lg } = designTokens.shadows;
    document.documentElement.style.setProperty(
      "--shadow-sm",
      `0 ${sm.y}px ${sm.blur}px ${sm.spread}px rgb(0 0 0 / 0.1)`
    );
    document.documentElement.style.setProperty(
      "--shadow-md",
      `0 ${md.y}px ${md.blur}px ${md.spread}px rgb(0 0 0 / 0.1)`
    );
    document.documentElement.style.setProperty(
      "--shadow-lg",
      `0 ${lg.y}px ${lg.blur}px ${lg.spread}px rgb(0 0 0 / 0.1)`
    );

    designTokens.spacing.scale.forEach((scale, index) => {
      document.documentElement.style.setProperty(
        `--space-${index + 1}`,
        `${scale * designTokens.spacing.base}rem`
      );
    });

    document.documentElement.style.setProperty(
      "--transition-fast",
      `${designTokens.transitions.fast}ms`
    );
    document.documentElement.style.setProperty(
      "--transition-normal",
      `${designTokens.transitions.normal}ms`
    );
    document.documentElement.style.setProperty(
      "--transition-slow",
      `${designTokens.transitions.slow}ms`
    );
  }, [designTokens]);

  return {
    radius,
    setRadius,
    designTokens,
    setDesignTokens,
    updateRadius,
    updateShadow,
    updateSpacing,
    updateTransition,
  };
};
