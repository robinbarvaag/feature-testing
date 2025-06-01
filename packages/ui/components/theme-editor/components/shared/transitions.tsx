import { useCallback } from "react";

import { useState } from "react";

import { useRef } from "react";

import { useEffect } from "react";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "../../../button";
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

const TransitionsCard = ({
  designTokens,
  updateTransition,
}: {
  designTokens: DesignTokens;
  updateTransition: (type: "fast" | "normal" | "slow", value: number) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const THROTTLE_MS = 100;

  const handleTransitionChange = useCallback(
    (type: "fast" | "normal" | "slow", value: number) => {
      const now = Date.now();
      if (now - lastUpdateRef.current >= THROTTLE_MS) {
        updateTransition(type, value);
        lastUpdateRef.current = now;
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          updateTransition(type, value);
          lastUpdateRef.current = Date.now();
          timeoutRef.current = null;
        }, THROTTLE_MS);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transitions</CardTitle>
        <CardDescription>
          Define standard transition durations and test animations in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(designTokens.transitions).map(([key, value]) => (
            <div key={key} className="space-y-4">
              <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[value]}
                  min={50}
                  max={1000}
                  step={50}
                  onValueChange={([newValue]) => {
                    handleTransitionChange(
                      key as "fast" | "normal" | "slow",
                      newValue as number
                    );
                  }}
                  className="w-[200px]"
                />
                <span className="text-sm">{value}ms</span>

                {/* Animation Test Section */}
                <div className="flex gap-4 ml-8">
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground">Scale</span>
                    <div
                      className={cn(
                        "size-8 bg-primary/20 rounded-md transition-transform will-change-transform",
                        isAnimating && "scale-125"
                      )}
                      style={{ transitionDuration: `${value}ms` }}
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground">
                      Rotate
                    </span>
                    <div
                      className={cn(
                        "size-8 bg-primary/20 rounded-md transition-transform will-change-transform",
                        isAnimating && "rotate-180"
                      )}
                      style={{ transitionDuration: `${value}ms` }}
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground">Fade</span>
                    <div
                      className={cn(
                        "size-8 bg-primary/20 rounded-md transition-opacity will-change-opacity",
                        isAnimating && "opacity-0"
                      )}
                      style={{ transitionDuration: `${value}ms` }}
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground">Slide</span>
                    <div
                      className={cn(
                        "size-8 bg-primary/20 rounded-md transition-transform will-change-transform",
                        isAnimating && "translate-x-full"
                      )}
                      style={{ transitionDuration: `${value}ms` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              setIsAnimating(true);
              timeoutRef.current = setTimeout(
                () => setIsAnimating(false),
                Math.max(...Object.values(designTokens.transitions)) + 100
              );
            }}
            variant="outline"
            className="mt-4"
          >
            Test Animations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { TransitionsCard };
