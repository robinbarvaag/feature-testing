import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { AlertTriangle, Check } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { useFocusTrap } from "../../hooks/use-focus-trap";

export const KeyboardNavigationTab: React.FC = () => {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const [tabOrder, setTabOrder] = useState<string[]>([]);
  const [focusTrapActive, setFocusTrapActive] = useState(false);
  const focusTrapRef = useFocusTrap(focusTrapActive);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const activeElement = document.activeElement;
        if (activeElement?.id) {
          setFocusedElement(activeElement.id);
          setTabOrder((prev) => [...prev, activeElement.id]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Navigation Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="test-input-1">First Input</Label>
                <Input
                  id="test-input-1"
                  placeholder="Tab to me first"
                  className={cn(
                    focusedElement === "test-input-1" && "ring-2 ring-primary"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="test-input-2">Second Input</Label>
                <Input
                  id="test-input-2"
                  placeholder="Tab to me second"
                  className={cn(
                    focusedElement === "test-input-2" && "ring-2 ring-primary"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="test-button">Button</Label>
                <Button
                  id="test-button"
                  className={cn(
                    focusedElement === "test-button" && "ring-2 ring-primary"
                  )}
                >
                  Focusable Button
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium mb-4">Tab Order Results</h3>
              <div className="space-y-2">
                {tabOrder.map((elementId, index) => (
                  <div
                    key={`${elementId}-${index}`}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <span className="text-muted-foreground">{index + 1}.</span>
                    <span>{elementId}</span>
                    {index === tabOrder.length - 1 && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setTabOrder([]);
                  setFocusedElement(null);
                }}
              >
                Reset Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Focus Trap Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Button
                variant={focusTrapActive ? "default" : "outline"}
                onClick={() => setFocusTrapActive(!focusTrapActive)}
              >
                {focusTrapActive ? "Disable" : "Enable"} Focus Trap
              </Button>
              {focusTrapActive && (
                <span className="text-sm text-muted-foreground">
                  Focus is now trapped within this section
                </span>
              )}
            </div>

            <div
              ref={focusTrapRef}
              className={cn(
                "p-4 border rounded-lg",
                focusTrapActive && "ring-2 ring-primary"
              )}
            >
              <div className="space-y-4">
                <Input id="trap-input-1" placeholder="Trapped input 1" />
                <Input id="trap-input-2" placeholder="Trapped input 2" />
                <Button id="trap-button">Trapped Button</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
