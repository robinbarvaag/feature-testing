import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const PresetsTab = () => {
  const presets = {
    // Add your presets here
  };

  const selectedPreset = 'default'; // Replace with actual selected preset

  const applyPreset = (name: string) => {
    // Implement the logic to apply the selected preset
  };

  return (
    <CardHeader>
      <CardTitle>Theme Presets</CardTitle>
      <CardDescription>
        Choose from predefined theme presets or create your own
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(presets).map(([name, preset]) => (
          <Button
            key={name}
            variant="outline"
            className={cn(
              "h-auto flex flex-col items-start gap-2 p-4",
              selectedPreset === name && "border-primary"
            )}
            onClick={() => applyPreset(name)}
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-medium">{name}</span>
              {selectedPreset === name && (
                <Check size={16} className="text-primary" />
              )}
            </div>
            <div className="flex gap-2">
              {Object.values(preset.colors || {}).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </Button>
        ))}
      </div>
    </CardContent>
  );
};

export default PresetsTab; 