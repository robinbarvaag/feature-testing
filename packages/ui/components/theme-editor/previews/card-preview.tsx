import React from 'react';
import { Label } from '@repo/ui/components/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@repo/ui/components/card';
import { OklchColorPicker } from '../components/shared/oklch-color-picker';

interface CardPreviewProps {
  colors: {
    background: string;
    foreground: string;
    card: string;
    'card-foreground': string;
    muted: string;
    'muted-foreground': string;
  };
  onColorChange: (key: string, value: string) => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  colors,
  onColorChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Card Preview */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Card and Text Preview</CardTitle>
            <CardDescription>
              Shows how cards and text appear with selected colors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">Normal Text</h4>
                <p>This is an example of regular text in the application.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-muted-foreground">
                  Muted Text
                </h4>
                <p className="text-muted-foreground">
                  This is an example of muted text used for less important
                  content.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p>This is text on a muted background.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="space-y-2">
          <Label>Background</Label>
          <OklchColorPicker
            color={colors.background}
            onChange={(value) => onColorChange('background', value)}
            label="Background"
          />
        </div>
        <div className="space-y-2">
          <Label>Text</Label>
          <OklchColorPicker
            color={colors.foreground}
            onChange={(value) => onColorChange('foreground', value)}
            label="Text"
          />
        </div>
        <div className="space-y-2">
          <Label>Card Background</Label>
          <OklchColorPicker
            color={colors.card}
            onChange={(value) => onColorChange('card', value)}
            label="Card Background"
          />
        </div>
        <div className="space-y-2">
          <Label>Card Text</Label>
          <OklchColorPicker
            color={colors['card-foreground']}
            onChange={(value) => onColorChange('card-foreground', value)}
            label="Card Text"
          />
        </div>
        <div className="space-y-2">
          <Label>Muted Background</Label>
          <OklchColorPicker
            color={colors.muted}
            onChange={(value) => onColorChange('muted', value)}
            label="Muted Background"
          />
        </div>
        <div className="space-y-2">
          <Label>Muted Text</Label>
          <OklchColorPicker
            color={colors['muted-foreground']}
            onChange={(value) => onColorChange('muted-foreground', value)}
            label="Muted Text"
          />
        </div>
      </div>
    </div>
  );
};
