import React from "react";
import { Button } from "../../../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../card";
import { Label } from "../../../label";
import { ThemeColors } from "../../theme-editor";
import { OklchColorPicker } from "../shared/oklch-color-picker";

interface ColorsTabProps {
  themeColors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  updateColor: (color: string, value: string) => void;
  activeTheme: "light" | "dark";
}

export const ColorsTab: React.FC<ColorsTabProps> = ({
  themeColors,
  updateColor,
  activeTheme,
}) => {
  const generateColorPalette = (baseColor: string) => {
    // Convert OKLCH to HSL for easier manipulation
    const hslMatch = baseColor.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!hslMatch) return [];

    let [_, l, c, h] = hslMatch.map(Number);

    if (l === undefined) {
      l = 1;
    }

    // Generate variations with different lightness
    return [
      { l: l * 0.2, c, h }, // Darkest
      { l: l * 0.4, c, h },
      { l: l * 0.6, c, h },
      { l: l * 0.8, c, h },
      { l, c, h }, // Original
      { l: Math.min(l * 1.2, 1), c, h },
      { l: Math.min(l * 1.4, 1), c, h },
      { l: Math.min(l * 1.6, 1), c, h },
      { l: Math.min(l * 1.8, 1), c, h }, // Lightest
    ].map(({ l, c, h }) => `oklch(${l} ${c} ${h})`);
  };

  return (
    <div>
      {/* Color Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Color Generator</CardTitle>
          <CardDescription>
            Generate a color palette based on your primary color
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Base Color</Label>
              <OklchColorPicker
                color={themeColors[activeTheme].primary}
                onChange={(value) => updateColor("primary", value)}
                label="Primary Color"
              />
            </div>
            <div className="space-y-4">
              <Label>Generated Palette</Label>
              <div className="grid grid-cols-9 gap-2">
                {generateColorPalette(themeColors[activeTheme].primary).map(
                  (color, index) => (
                    <div key={index} className="space-y-2">
                      <div
                        className="h-10 w-full rounded-md border"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-xs text-center">{index * 100 + 100}</p>
                    </div>
                  )
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    const palette = generateColorPalette(
                      themeColors[activeTheme].primary
                    ) as string[];

                    updateColor("primary", palette[4] || "");
                    updateColor("secondary", palette[2] || "");
                    updateColor("accent", palette[6] || "");
                  }}
                >
                  Apply to Theme Colors
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Colors</CardTitle>
          <CardDescription>
            Core colors that define your application's visual identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Primary</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Main brand color for key interactive elements
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].primary}
                onChange={(value) => updateColor("primary", value)}
                label="Primary Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme]["primary-foreground"]}
                onChange={(value) => updateColor("primary-foreground", value)}
                label="Primary Foreground"
              />
            </div>

            <div className="space-y-2">
              <Label>Secondary</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Supporting color for alternative elements
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].secondary}
                onChange={(value) => updateColor("secondary", value)}
                label="Secondary Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme]["secondary-foreground"]}
                onChange={(value) => updateColor("secondary-foreground", value)}
                label="Secondary Foreground"
              />
            </div>

            <div className="space-y-2">
              <Label>Accent</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Highlight color for emphasis
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].accent}
                onChange={(value) => updateColor("accent", value)}
                label="Accent Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme]["accent-foreground"]}
                onChange={(value) => updateColor("accent-foreground", value)}
                label="Accent Foreground"
              />
            </div>

            <div className="space-y-2">
              <Label>Destructive</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Color for error states and critical actions
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].destructive}
                onChange={(value) => updateColor("destructive", value)}
                label="Destructive Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme]["destructive-foreground"]}
                onChange={(value) =>
                  updateColor("destructive-foreground", value)
                }
                label="Destructive Foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Interface Colors</CardTitle>
          <CardDescription>
            Colors used for the application interface and components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Background</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Main application background
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].background}
                onChange={(value) => updateColor("background", value)}
                label="Background Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme].foreground}
                onChange={(value) => updateColor("foreground", value)}
                label="Text Color"
              />
            </div>

            <div className="space-y-2">
              <Label>Card</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Card and container backgrounds
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].card}
                onChange={(value) => updateColor("card", value)}
                label="Card Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme]["card-foreground"]}
                onChange={(value) => updateColor("card-foreground", value)}
                label="Card Text"
              />
            </div>

            <div className="space-y-2">
              <Label>Muted</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Subtle backgrounds and secondary content
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].muted}
                onChange={(value) => updateColor("muted", value)}
                label="Muted Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme]["muted-foreground"]}
                onChange={(value) => updateColor("muted-foreground", value)}
                label="Muted Text"
              />
            </div>

            <div className="space-y-2">
              <Label>Popover</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Dropdowns and floating elements
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].popover}
                onChange={(value) => updateColor("popover", value)}
                label="Popover Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme]["popover-foreground"]}
                onChange={(value) => updateColor("popover-foreground", value)}
                label="Popover Text"
              />
            </div>

            <div className="space-y-2">
              <Label>Border & Ring</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Border and focus ring colors
              </p>
              <OklchColorPicker
                color={themeColors[activeTheme].border}
                onChange={(value) => updateColor("border", value)}
                label="Border Color"
              />
              <OklchColorPicker
                color={themeColors[activeTheme].ring}
                onChange={(value) => updateColor("ring", value)}
                label="Focus Ring"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Colors</CardTitle>
          <CardDescription>
            Color palette for data visualizations and charts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="space-y-2">
                <Label>Chart Color {num}</Label>
                <OklchColorPicker
                  color={
                    themeColors[activeTheme][
                      `chart-${num}` as keyof ThemeColors
                    ]
                  }
                  onChange={(value) => updateColor(`chart-${num}`, value)}
                  label={`Chart ${num}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
