import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Label } from '@repo/ui/components/label';
import { SidebarPreview } from '../../previews/sidebar-preview';
import { ThemeColors } from '../../theme-editor';
import { OklchColorPicker } from '../shared/oklch-color-picker';

interface TabSidebarProps {
  themeColors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  updateColor: (color: string, value: string) => void;
  activeTheme: 'light' | 'dark';
}

export const TabSidebar: React.FC<TabSidebarProps> = ({
  themeColors,
  updateColor,
  activeTheme,
}) => {
  return (
    <div>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Sidebar Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Main Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Background</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Main background color for the sidebar
                    </p>
                    <OklchColorPicker
                      color={themeColors[activeTheme].sidebar}
                      onChange={(value) => updateColor('sidebar', value)}
                      label="Sidebar Background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Foreground</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Default text color in the sidebar
                    </p>
                    <OklchColorPicker
                      color={themeColors[activeTheme]['sidebar-foreground']}
                      onChange={(value) =>
                        updateColor('sidebar-foreground', value)
                      }
                      label="Sidebar Text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Border</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Color for sidebar borders and dividers
                    </p>
                    <OklchColorPicker
                      color={themeColors[activeTheme]['sidebar-border']}
                      onChange={(value) => updateColor('sidebar-border', value)}
                      label="Sidebar Border"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium">Interactive Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Primary</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for active items and important actions in the sidebar
                    </p>
                    <OklchColorPicker
                      color={themeColors[activeTheme]['sidebar-primary']}
                      onChange={(value) =>
                        updateColor('sidebar-primary', value)
                      }
                      label="Sidebar Primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Foreground</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Text color for primary elements in the sidebar
                    </p>
                    <OklchColorPicker
                      color={
                        themeColors[activeTheme]['sidebar-primary-foreground']
                      }
                      onChange={(value) =>
                        updateColor('sidebar-primary-foreground', value)
                      }
                      label="Sidebar Primary Text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Accent</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for hover states and secondary interactions
                    </p>
                    <OklchColorPicker
                      color={themeColors[activeTheme]['sidebar-accent']}
                      onChange={(value) => updateColor('sidebar-accent', value)}
                      label="Sidebar Accent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <SidebarPreview
          colors={themeColors[activeTheme]}
          onColorChange={updateColor}
        />
      </div>
    </div>
  );
};
