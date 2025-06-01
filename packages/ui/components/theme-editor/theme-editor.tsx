"use client";

import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/tabs";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import { ComponentShowcase } from "@repo/ui/components/theme-editor/previews/component-showcase";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/select";
import { presets } from "./constants";
import { TabSidebar } from "./components/tabs/sidebar";
import { TypographyTab } from "./components/tabs/typography";
import { PresetsTab } from "./components/tabs/presets";
import { ColorsTab } from "./components/tabs/colors-tab";
import { DesignTokensTab } from "./components/tabs/design-tokens-tab";
import { useThemeState } from "./hooks/useThemeState";
import { useDesignTokens } from "./hooks/useDesignTokens";
import { useTypography } from "./hooks/useTypography";
import { oklchToRgb } from "./utils/utils";
import { WCAGChecker } from "./components/shared/wcag-checker";

// Main component
const ThemeEditor: React.FC = () => {
  const {
    activeTheme,
    setActiveTheme,
    themeColors,
    setThemeColors,
    updateColor,
  } = useThemeState();

  const {
    radius,
    designTokens,
    updateRadius: debouncedUpdateRadius,
    updateShadow: debouncedUpdateShadow,
    updateSpacing: debouncedUpdateSpacing,
    updateTransition,
  } = useDesignTokens();

  const { fontSizes, debouncedUpdateFontSize } = useTypography();

  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>("Default Dark");
  const [cssFormat, setCssFormat] = useState<"oklch" | "rgb">("oklch");
  const [isWCAGCheckerExpanded, setIsWCAGCheckerExpanded] = useState(false);

  // Generate CSS
  const generateCSS = (useOklch: boolean = true) => {
    const colors = themeColors[activeTheme];
    const selector = activeTheme === "dark" ? ".dark" : ":root";

    return `${selector} {
    /* Colors */
    ${Object.entries(colors)
      .map(([key, value]) => {
        if (useOklch) {
          return `  --${key}: ${value};`;
        } else {
          return `  --${key}: ${oklchToRgb(value)};`;
        }
      })
      .join("\n")}

    /* Typography */
    --font-sans: ui-sans-serif, system-ui, sans-serif;
    --font-serif: ui-serif, Georgia, serif;
    --font-mono: ui-monospace, monospace;
    ${Object.entries(fontSizes)
      .map(([name, size]) => `  --text-${name}: ${size}rem;`)
      .join("\n")}

    /* Spacing */
    --space-unit: ${designTokens.spacing.base}rem;
    ${designTokens.spacing.scale
      .map(
        (scale, index) =>
          `  --space-${index + 1}: ${scale * designTokens.spacing.base}rem;`
      )
      .join("\n")}

    /* Transitions */
    --transition-fast: ${designTokens.transitions.fast}ms;
    --transition-normal: ${designTokens.transitions.normal}ms;
    --transition-slow: ${designTokens.transitions.slow}ms;

    /* Shadows */
    ${Object.entries(designTokens.shadows)
      .map(
        ([size, { y, blur, spread }]) =>
          `  --shadow-${size}: 0 ${y}px ${blur}px ${spread}px rgb(0 0 0 / 0.1);`
      )
      .join("\n")}

    /* Border Radius */
    --radius: ${designTokens.radius / 16}rem;
    --radius-sm: ${(designTokens.radius - 4) / 16}rem;
    --radius-md: ${(designTokens.radius - 2) / 16}rem;
    --radius-lg: ${designTokens.radius / 16}rem;
    --radius-xl: ${(designTokens.radius + 4) / 16}rem;
  }`;
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(generateCSS(cssFormat === "oklch"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Apply a preset
  const applyPreset = (presetName: string) => {
    const preset = presets[presetName];
    if (!preset) return;

    setSelectedPreset(presetName);

    setThemeColors((prev) => ({
      light: {
        ...prev.light,
        ...preset.colors,
        ...preset.lightColors,
      },
      dark: {
        ...prev.dark,
        ...preset.colors,
        ...preset.darkColors,
      },
    }));
  };

  // Fix the linter error in the import functionality
  const handleCssImport = (css: string) => {
    try {
      const vars: Record<string, string> = {};
      css.replace(/--([^:]+):\s*([^;]+);/g, (_, key, value) => {
        vars[key.trim()] = value.trim();
        return "";
      });
      if (Object.keys(vars).length > 0) {
        setThemeColors((prev) => ({
          ...prev,
          [activeTheme]: {
            ...prev[activeTheme],
            ...vars,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to parse CSS variables:", error);
    }
  };

  return (
    <div className="relative w-[1400px] min-h-screen pb-24">
      <div className="sticky top-[50px] z-10 bg-background/80 backdrop-blur-sm border-b mb-6">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Theme Editor</h1>
          <div className="flex items-center space-x-4">
            <div className="flex rounded-lg border p-1 bg-background shadow-sm">
              <Button
                onClick={() => setActiveTheme("light")}
                variant={activeTheme === "light" ? "default" : "ghost"}
              >
                Light Theme
              </Button>
              <Button
                onClick={() => setActiveTheme("dark")}
                variant={activeTheme === "dark" ? "default" : "ghost"}
              >
                Dark Theme
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="w-full max-w-[1200px] mb-4">
          <div className="flex items-center w-full justify-between">
            <TabsTrigger value="colors" className="relative flex-1">
              Theme Colors
            </TabsTrigger>
            <TabsTrigger value="sidebar" className="relative flex-1">
              Sidebar
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex-1">
              Design Tokens
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex-1">
              Typography
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex-1">
              Presets
            </TabsTrigger>
            <TabsTrigger value="import" className="flex-1">
              Import/Export
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="colors" className="mt-6">
          <ColorsTab
            themeColors={themeColors}
            updateColor={updateColor}
            activeTheme={activeTheme}
          />
        </TabsContent>

        <TabsContent value="sidebar" className="mt-6">
          <TabSidebar
            themeColors={themeColors}
            updateColor={updateColor}
            activeTheme={activeTheme}
          />
        </TabsContent>

        <TabsContent value="tokens" className="mt-6">
          <DesignTokensTab
            designTokens={designTokens}
            updateTransition={updateTransition}
            debouncedUpdateShadow={debouncedUpdateShadow}
            debouncedUpdateSpacing={debouncedUpdateSpacing}
            debouncedUpdateRadius={debouncedUpdateRadius}
            radius={radius}
          />
        </TabsContent>

        <TabsContent value="typography" className="mt-6">
          <TypographyTab
            fontSizes={fontSizes}
            debouncedUpdateFontSize={debouncedUpdateFontSize}
          />
        </TabsContent>

        <TabsContent value="presets" className="mt-6">
          <PresetsTab
            selectedPreset={selectedPreset}
            applyPreset={applyPreset}
          />
        </TabsContent>

        <TabsContent value="import" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>CSS Variables</span>
                <div className="flex items-center space-x-4">
                  <Select
                    value={cssFormat}
                    onValueChange={(value) =>
                      setCssFormat(value as "oklch" | "rgb")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oklch">OKLCH Format</SelectItem>
                      <SelectItem value="rgb">RGB Format</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={copyToClipboard} variant="default">
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="mr-2 h-4 w-4" />
                        <span>Copy CSS</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label>Import CSS Variables</Label>
                  <textarea
                    className="w-full h-32 p-4 font-mono text-sm bg-muted/30 rounded-lg"
                    placeholder="Paste your CSS variables here..."
                    onChange={(e) => handleCssImport(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Generated CSS</Label>
                  <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono whitespace-pre">
                      {generateCSS(cssFormat === "oklch")}
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Preview</CardTitle>
              <p className="text-sm text-muted-foreground">
                Preview how components look with your current theme settings.
              </p>
            </CardHeader>
            <CardContent>
              <ComponentShowcase
                colors={themeColors[activeTheme]}
                onColorChange={updateColor}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* WCAG Checker */}
      <WCAGChecker
        themeColors={themeColors[activeTheme]}
        isExpanded={isWCAGCheckerExpanded}
        onToggle={() => setIsWCAGCheckerExpanded(!isWCAGCheckerExpanded)}
      />
    </div>
  );
};

export default ThemeEditor;
