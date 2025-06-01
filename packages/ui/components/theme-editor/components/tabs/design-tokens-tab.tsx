import { cn } from "../../../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../card";
import { Label } from "../../../label";
import { Slider } from "../../../slider";
import { DesignTokens } from "../../theme-editor";
import { TransitionsCard } from "../shared/transitions";

const DesignTokensTab = ({
  designTokens,
  updateTransition,
  debouncedUpdateShadow,
  debouncedUpdateSpacing,
  debouncedUpdateRadius,
  radius,
}: {
  designTokens: DesignTokens;
  updateTransition: (type: "fast" | "normal" | "slow", value: number) => void;
  debouncedUpdateShadow: (
    size: string,
    property: "y" | "blur" | "spread",
    value: number
  ) => void;
  debouncedUpdateSpacing: (index: number, value: number) => void;
  debouncedUpdateRadius: (value: number) => void;
  radius: number;
}) => {
  return (
    <div className="grid gap-8">
      <TransitionsCard
        designTokens={designTokens}
        updateTransition={updateTransition}
      />
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens</CardTitle>
          <CardDescription>
            Configure spacing, shadows, and border radius
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Border Radius Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Border Radius</h3>
              <p className="text-sm text-muted-foreground">
                Adjust the border radius for all components
              </p>
              <div className="space-y-4">
                <div>
                  <Label>Base Radius</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[radius]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={([value]) =>
                        debouncedUpdateRadius(value as number)
                      }
                      className="w-[200px]"
                    />
                    <span className="text-sm">
                      {radius / 16}rem ({radius}px)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {["sm", "md", "lg", "xl", "2xl"].map((size) => (
                    <div
                      key={size}
                      className={cn("aspect-square bg-primary/20 relative", {
                        "rounded-sm": size === "sm",
                        "rounded-md": size === "md",
                        "rounded-lg": size === "lg",
                        "rounded-xl": size === "xl",
                        "rounded-2xl": size === "2xl",
                      })}
                    >
                      <span className="text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spacing Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Spacing</h3>
              <p className="text-sm text-muted-foreground">
                Configure the base spacing unit and scale
              </p>
              <div className="space-y-4">
                <div>
                  <Label>Base Unit (rem)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[designTokens.spacing.base * 100]}
                      min={10}
                      max={50}
                      step={1}
                      onValueChange={([value]) =>
                        debouncedUpdateSpacing(-1, (value as number) / 100)
                      }
                      className="w-[200px]"
                    />
                    <span className="text-sm">
                      {designTokens.spacing.base}rem (
                      {designTokens.spacing.base * 16}px)
                    </span>
                  </div>
                </div>

                <div className="grid gap-6">
                  {designTokens.spacing.scale.map((scale, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Space {index + 1}</Label>
                        <span className="text-sm">
                          {scale * designTokens.spacing.base}rem (
                          {scale * designTokens.spacing.base * 16}px)
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[scale]}
                          min={1}
                          max={16}
                          step={0.5}
                          onValueChange={([value]) =>
                            debouncedUpdateSpacing(index, value as number)
                          }
                          className="w-[200px]"
                        />
                        <div
                          className="h-4 bg-primary/20"
                          style={{
                            width: `${scale * designTokens.spacing.base * 16}px`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shadows Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shadows</h3>
              <p className="text-sm text-muted-foreground">
                Customize shadow properties for different sizes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "inner"].map(
                  (size) => (
                    <div key={size} className="space-y-4">
                      <Label>{size.toUpperCase()} Shadow</Label>
                      <div
                        className={cn(
                          "h-24 bg-card rounded-lg border flex items-center justify-center transition-shadow",
                          {
                            "shadow-2xs": size === "2xs",
                            "shadow-xs": size === "xs",
                            "shadow-sm": size === "sm",
                            "shadow-md": size === "md",
                            "shadow-lg": size === "lg",
                            "shadow-xl": size === "xl",
                            "shadow-2xl": size === "2xl",
                            "shadow-inner": size === "inner",
                          }
                        )}
                      >
                        {size.toUpperCase()}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Y Offset (px)</span>
                            <span>{designTokens.shadows[size]?.y || 0}px</span>
                          </div>
                          <Slider
                            value={[designTokens.shadows[size]?.y || 0]}
                            min={0}
                            max={50}
                            step={1}
                            onValueChange={([value]) =>
                              debouncedUpdateShadow(size, "y", value as number)
                            }
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Blur Radius (px)</span>
                            <span>
                              {designTokens.shadows[size]?.blur || 0}px
                            </span>
                          </div>
                          <Slider
                            value={[designTokens.shadows[size]?.blur || 0]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={([value]) =>
                              debouncedUpdateShadow(
                                size,
                                "blur",
                                value as number
                              )
                            }
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Spread (px)</span>
                            <span>
                              {designTokens.shadows[size]?.spread || 0}px
                            </span>
                          </div>
                          <Slider
                            value={[designTokens.shadows[size]?.spread || 0]}
                            min={-25}
                            max={25}
                            step={1}
                            onValueChange={([value]) =>
                              debouncedUpdateShadow(
                                size,
                                "spread",
                                value as number
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Transitions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Transitions</h3>
              <p className="text-sm text-muted-foreground">
                Set transition durations for animations
              </p>
              <div className="space-y-4">
                <div>
                  <Label>Fast (ms)</Label>
                  <Slider
                    value={[designTokens.transitions.fast]}
                    min={0}
                    max={1000}
                    step={1}
                    onValueChange={([value]) =>
                      updateTransition("fast", value as number)
                    }
                  />
                </div>
                <div>
                  <Label>Normal (ms)</Label>
                  <Slider
                    value={[designTokens.transitions.normal]}
                    min={0}
                    max={1000}
                    step={1}
                    onValueChange={([value]) =>
                      updateTransition("normal", value as number)
                    }
                  />
                </div>
                <div>
                  <Label>Slow (ms)</Label>
                  <Slider
                    value={[designTokens.transitions.slow]}
                    min={0}
                    max={1000}
                    step={1}
                    onValueChange={([value]) =>
                      updateTransition("slow", value as number)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { DesignTokensTab };
