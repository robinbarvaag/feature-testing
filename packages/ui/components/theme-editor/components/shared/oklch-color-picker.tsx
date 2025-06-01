import { parseOklch, oklchToRgb } from "./../../utils/utils";

const OklchColorPicker: React.FC<{
  color: string;
  onChange: (value: string) => void;
  label: string;
}> = ({ color, onChange, label }) => {
  const { l, c, h } = parseOklch(color);
  const rgbColor = oklchToRgb(color);

  const handleChange = (newL: number, newC: number, newH: number) => {
    onChange(`oklch(${newL.toFixed(3)} ${newC.toFixed(3)} ${newH.toFixed(3)})`);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{label}</h3>
        <div className="flex items-center space-x-2">
          <div className="relative group">
            <input
              type="color"
              value={rgbColor}
              onChange={(e) => {
                // Convert hex to RGB
                const hex = e.target.value;
                const r = parseInt(hex.slice(1, 3), 16) / 255;
                const g = parseInt(hex.slice(3, 5), 16) / 255;
                const b = parseInt(hex.slice(5, 7), 16) / 255;

                // Approximate OKLCH values
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const chroma = (max - min) * 0.3;
                const lightness = (r + g + b) / 3;

                let hue = 0;
                if (max === min) {
                  hue = 0;
                } else if (max === r) {
                  hue = 60 * ((g - b) / (max - min));
                } else if (max === g) {
                  hue = 60 * (2 + (b - r) / (max - min));
                } else {
                  hue = 60 * (4 + (r - g) / (max - min));
                }
                if (hue < 0) hue += 360;

                handleChange(lightness, chroma, hue);
              }}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
            <div
              className="w-8 h-8 rounded border-2 border-border shadow-sm cursor-pointer"
              style={{ backgroundColor: rgbColor }}
            >
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-background border-2 border-border rounded-full group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div
            className="w-8 h-8 rounded border shadow-sm"
            style={{ backgroundColor: rgbColor }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm">Lightness</label>
            <span className="text-sm">{l.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={l}
            onChange={(e) => handleChange(parseFloat(e.target.value), c, h)}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm">Chroma</label>
            <span className="text-sm">{c.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.3"
            step="0.01"
            value={c}
            onChange={(e) => handleChange(l, parseFloat(e.target.value), h)}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm">Hue</label>
            <span className="text-sm">{h.toFixed(0)}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={h}
            onChange={(e) => handleChange(l, c, parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="w-full h-2 mt-1 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 to-red-500"></div>
        </div>
      </div>

      <div className="mt-4 text-sm font-mono bg-muted/30 p-2 rounded">
        {color}
      </div>
    </div>
  );
};

export { OklchColorPicker };
