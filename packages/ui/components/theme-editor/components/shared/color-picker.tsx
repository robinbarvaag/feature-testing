import React from "react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { cn } from "../../../../lib/utils";
import type { ColorPickerProps } from "../../types";

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={`color-${label}`}>{label}</Label>
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "h-6 w-6 rounded-md border",
              "transition-colors duration-200"
            )}
            style={{ backgroundColor: color }}
          />
          <Input
            id={`color-${label}`}
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-[180px]"
          />
        </div>
      </div>
    </div>
  );
};
