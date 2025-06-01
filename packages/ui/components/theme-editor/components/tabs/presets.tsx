import { CardContent, CardHeader, CardTitle } from "../../../card";

import { Card } from "../../../card";
import { presets } from "../../constants";
import { cn } from "../../../../lib/utils";
import { Check } from "lucide-react";

const PresetsTab = ({
  selectedPreset,
  applyPreset,
}: {
  selectedPreset: string;
  applyPreset: (name: string) => void;
}) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(presets).map(([name, preset]) => (
          <Card
            key={name}
            className={cn(
              "cursor-pointer transition-all duration-200",
              "hover:shadow-md hover:border-primary",
              selectedPreset === name && "border-primary bg-primary/5"
            )}
            onClick={() => applyPreset(name)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {preset.name}
                {selectedPreset === name && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "primary",
                    "secondary",
                    "accent",
                    "background",
                    "foreground",
                  ].map((key) => (
                    <div
                      key={key}
                      className="aspect-square rounded-md border"
                      style={{ backgroundColor: preset.colors[key] }}
                      title={key}
                    />
                  ))}
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <div className="space-y-2">
                    <div className="h-2 w-24 rounded bg-primary" />
                    <div className="h-2 w-32 rounded bg-muted" />
                    <div className="h-2 w-16 rounded bg-accent" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { PresetsTab };
