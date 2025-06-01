import React, { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Menu, X } from 'lucide-react';
import { Label } from '@repo/ui/components/label';
import { OklchColorPicker } from '../components/shared/oklch-color-picker';

interface SidebarPreviewProps {
  colors: {
    sidebar: string;
    'sidebar-foreground': string;
    'sidebar-primary': string;
  };
  onColorChange: (key: string, value: string) => void;
}

export const SidebarPreview: React.FC<SidebarPreviewProps> = ({
  colors,
  onColorChange,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="border rounded-lg overflow-hidden">
        <div className="flex h-[300px]">
          <div
            className={`
              w-64 bg-sidebar text-sidebar-foreground border-r shrink-0
              transition-all duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              absolute md:relative md:translate-x-0
            `}
          >
            <div className="p-4 border-b">
              <h3 className="font-semibold">Sidebar Demo</h3>
            </div>
            <nav className="p-4 space-y-2">
              <a
                href="#"
                className="block px-2 py-1 rounded hover:bg-sidebar-primary/10"
              >
                Hjem
              </a>
              <a
                href="#"
                className="block px-2 py-1 rounded hover:bg-sidebar-primary/10"
              >
                Profil
              </a>
              <a
                href="#"
                className="block px-2 py-1 rounded hover:bg-sidebar-primary/10"
              >
                Innstillinger
              </a>
            </nav>
          </div>
          <div className="flex-1 p-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Dette er hovedinnholdet. Sidebaren er alltid synlig på desktop
                og kan toggles på mobil.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="space-y-2">
          <Label>Sidebar Bakgrunn</Label>
          <OklchColorPicker
            color={colors.sidebar}
            onChange={(value) => onColorChange('sidebar', value)}
            label="Sidebar Background"
          />
        </div>
        <div className="space-y-2">
          <Label>Sidebar Tekst</Label>
          <OklchColorPicker
            color={colors['sidebar-foreground']}
            onChange={(value) => onColorChange('sidebar-foreground', value)}
            label="Sidebar Text"
          />
        </div>
        <div className="space-y-2">
          <Label>Sidebar Primærfarge</Label>
          <OklchColorPicker
            color={colors['sidebar-primary']}
            onChange={(value) => onColorChange('sidebar-primary', value)}
            label="Sidebar Primary"
          />
        </div>
      </div>
    </div>
  );
};
