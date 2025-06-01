import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import React from "react";
import { ThemeColors } from "../../theme-editor";
import { calculateContrastRatio, getWCAGLevel } from "../../utils/color-utils";

interface WCAGCheckResult {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
  affectedElements: string[];
  contrastRatio?: number;
  recommendation?: string;
  wcagLevel?: string;
}

interface WCAGCheckerProps {
  themeColors: ThemeColors;
  isExpanded: boolean;
  onToggle: () => void;
}

const checkWCAGCompliance = (colors: ThemeColors): WCAGCheckResult[] => {
  const results: WCAGCheckResult[] = [];

  // Text Contrast Checks
  const textPairs = [
    {
      bg: colors.background,
      fg: colors.foreground,
      name: "Main text",
      required: 4.5,
    },
    {
      bg: colors.card,
      fg: colors["card-foreground"],
      name: "Card text",
      required: 4.5,
    },
    {
      bg: colors.primary,
      fg: colors["primary-foreground"],
      name: "Primary button",
      required: 4.5,
    },
    {
      bg: colors.secondary,
      fg: colors["secondary-foreground"],
      name: "Secondary button",
      required: 4.5,
    },
    {
      bg: colors.destructive,
      fg: colors["destructive-foreground"],
      name: "Destructive button",
      required: 4.5,
    },
    {
      bg: colors.muted,
      fg: colors["muted-foreground"],
      name: "Muted text",
      required: 4.5,
    },
    {
      bg: colors.popover,
      fg: colors["popover-foreground"],
      name: "Popover text",
      required: 4.5,
    },
  ];

  textPairs.forEach(({ bg, fg, name, required }) => {
    const ratio = calculateContrastRatio(bg, fg);
    const { level, size } = getWCAGLevel(ratio);

    if (ratio < required) {
      results.push({
        id: `contrast-${name.toLowerCase().replace(/\s+/g, "-")}`,
        severity: "error",
        message: `${name} contrast ratio (${ratio.toFixed(2)}) is below WCAG AA requirement (${required})`,
        affectedElements: [name],
        contrastRatio: ratio,
        wcagLevel: `${level} (${size})`,
        recommendation: `Consider adjusting the foreground or background color to achieve a minimum contrast ratio of ${required}`,
      });
    } else {
      results.push({
        id: `contrast-${name.toLowerCase().replace(/\s+/g, "-")}`,
        severity: "info",
        message: `${name} meets WCAG requirements`,
        affectedElements: [name],
        contrastRatio: ratio,
        wcagLevel: `${level} (${size})`,
      });
    }
  });

  // Interactive Element Distinction
  const interactiveElements = [
    { color: colors.primary, name: "Primary button", bg: colors.background },
    {
      color: colors.secondary,
      name: "Secondary button",
      bg: colors.background,
    },
    { color: colors.accent, name: "Accent elements", bg: colors.background },
  ];

  interactiveElements.forEach(({ color, name, bg }) => {
    const ratio = calculateContrastRatio(bg, color);
    if (ratio < 3) {
      results.push({
        id: `interactive-${name.toLowerCase().replace(/\s+/g, "-")}`,
        severity: "warning",
        message: `${name} may not be distinct enough from the background`,
        affectedElements: [name],
        contrastRatio: ratio,
        recommendation:
          "Ensure interactive elements have sufficient contrast with the background (minimum 3:1)",
      });
    }
  });

  // Destructive Action Visibility
  const destructiveContrast = calculateContrastRatio(
    colors.destructive,
    colors["destructive-foreground"]
  );
  if (destructiveContrast < 4.5) {
    results.push({
      id: "destructive-visibility",
      severity: "error",
      message: "Destructive actions must be clearly visible",
      affectedElements: ["Destructive buttons"],
      contrastRatio: destructiveContrast,
      recommendation:
        "Increase contrast for destructive actions to ensure visibility (minimum 4.5:1)",
    });
  }

  // Focus State Visibility
  const focusContrast = calculateContrastRatio(colors.background, colors.ring);
  if (focusContrast < 3) {
    results.push({
      id: "focus-visibility",
      severity: "warning",
      message: "Focus indicators may not be visible enough",
      affectedElements: ["Focus ring"],
      contrastRatio: focusContrast,
      recommendation:
        "Ensure focus indicators have sufficient contrast (minimum 3:1)",
    });
  }

  return results;
};

export const WCAGChecker: React.FC<WCAGCheckerProps> = ({
  themeColors,
  isExpanded,
  onToggle,
}) => {
  const results = checkWCAGCompliance(themeColors);
  const errors = results.filter((r) => r.severity === "error");
  const warnings = results.filter((r) => r.severity === "warning");
  const info = results.filter((r) => r.severity === "info");

  return (
    <div
      className={`fixed bottom-0 right-0 w-full md:w-[17vw] bg-background border-t md:border-l shadow-lg transition-transform duration-300 ${
        isExpanded ? "translate-y-0" : "translate-y-[calc(100%-2.5rem)]"
      }`}
    >
      {/* Header */}
      <div
        className="p-2 flex items-center justify-between cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle
            size={20}
            className={
              errors.length > 0 ? "text-destructive" : "text-muted-foreground"
            }
          />
          <span className="font-medium">
            WCAG Compliance{" "}
            {errors.length > 0 ? `(${errors.length} issues)` : "(Pass)"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {errors.length > 0 && (
            <span className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded">
              {errors.length} Errors
            </span>
          )}
          {warnings.length > 0 && (
            <span className="px-2 py-1 text-xs bg-yellow-500/10 text-yellow-500 rounded">
              {warnings.length} Warnings
            </span>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`p-4 border-t ${
          isExpanded ? "block" : "hidden"
        } max-h-[70vh] overflow-y-auto`}
      >
        {errors.length === 0 && warnings.length === 0 ? (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle size={16} />
            <span>All WCAG contrast requirements are met!</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Errors */}
            {errors.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-destructive flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Contrast Errors
                </h3>
                <div className="space-y-3">
                  {errors.map((error) => (
                    <div
                      key={error.id}
                      className="p-3 bg-destructive/10 rounded-md space-y-2"
                    >
                      <p className="text-sm font-medium">{error.message}</p>
                      {error.contrastRatio && (
                        <p className="text-sm text-muted-foreground">
                          Current contrast ratio:{" "}
                          {error.contrastRatio.toFixed(2)}
                          {error.wcagLevel && ` - ${error.wcagLevel}`}
                        </p>
                      )}
                      {error.recommendation && (
                        <p className="text-sm text-muted-foreground">
                          Recommendation: {error.recommendation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-yellow-500 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Warnings
                </h3>
                <div className="space-y-3">
                  {warnings.map((warning) => (
                    <div
                      key={warning.id}
                      className="p-3 bg-yellow-500/10 rounded-md space-y-2"
                    >
                      <p className="text-sm font-medium">{warning.message}</p>
                      {warning.contrastRatio && (
                        <p className="text-sm text-muted-foreground">
                          Current contrast ratio:{" "}
                          {warning.contrastRatio.toFixed(2)}
                          {warning.wcagLevel && ` - ${warning.wcagLevel}`}
                        </p>
                      )}
                      {warning.recommendation && (
                        <p className="text-sm text-muted-foreground">
                          Recommendation: {warning.recommendation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Information */}
            {info.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-blue-500 flex items-center gap-2">
                  <Info size={16} />
                  Passing Checks
                </h3>
                <div className="space-y-3">
                  {info.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-blue-500/10 rounded-md space-y-2"
                    >
                      <p className="text-sm font-medium">{item.message}</p>
                      {item.contrastRatio && (
                        <p className="text-sm text-muted-foreground">
                          Contrast ratio: {item.contrastRatio.toFixed(2)}
                          {item.wcagLevel && ` - ${item.wcagLevel}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
