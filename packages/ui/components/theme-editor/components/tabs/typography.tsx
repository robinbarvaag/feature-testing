import { Slider } from "../../../slider";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../card";

import { Card } from "../../../card";
import { Label } from "../../../label";
import { cn } from "../../../../lib/utils";

const TypographyCard = ({
  fontSizes,
  debouncedUpdateFontSize,
}: {
  fontSizes: Record<string, number>;
  debouncedUpdateFontSize: (name: string, size: number) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Font Sizes</CardTitle>
        <CardDescription>
          Adjust and preview text sizes from extra small to 4xl.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid gap-6">
            {Object.entries(fontSizes).map(([name, size]) => (
              <div key={name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">
                    {name.toUpperCase()} (text-{name})
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {(size * 16).toFixed(0)}px
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[size * 100]}
                    min={50}
                    max={300}
                    step={1}
                    onValueChange={([value]) =>
                      debouncedUpdateFontSize(name, (value as number) / 100)
                    }
                    className="w-[200px]"
                  />
                  <p className={cn(`text-${name}`, "flex-1")}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { TypographyCard };

const TypographyTab = ({
  fontSizes,
  debouncedUpdateFontSize,
}: {
  fontSizes: Record<string, number>;
  debouncedUpdateFontSize: (name: string, size: number) => void;
}) => {
  return (
    <div className="grid gap-8">
      <TypographyCard
        fontSizes={fontSizes}
        debouncedUpdateFontSize={debouncedUpdateFontSize}
      />
      <Card>
        <CardHeader>
          <CardTitle>Font Families</CardTitle>
          <p className="text-sm text-muted-foreground">
            Preview the available font families in your theme.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="space-y-4">
                <Label>Sans Serif</Label>
                <p className="font-sans text-xl">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div className="space-y-4">
                <Label>Serif</Label>
                <p className="font-serif text-xl">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div className="space-y-4">
                <Label>Monospace</Label>
                <p className="font-mono text-xl">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Font Weights</CardTitle>
          <p className="text-sm text-muted-foreground">
            Preview different font weights from thin to black.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid gap-6">
              {[
                { name: "thin", weight: "font-thin" },
                { name: "extralight", weight: "font-extralight" },
                { name: "light", weight: "font-light" },
                { name: "normal", weight: "font-normal" },
                { name: "medium", weight: "font-medium" },
                { name: "semibold", weight: "font-semibold" },
                { name: "bold", weight: "font-bold" },
                { name: "extrabold", weight: "font-extrabold" },
                { name: "black", weight: "font-black" },
              ].map((weight) => (
                <div key={weight.name} className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    {weight.name.toUpperCase()} ({weight.weight})
                  </Label>
                  <p className={cn("text-xl", weight.weight)}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { TypographyTab };
