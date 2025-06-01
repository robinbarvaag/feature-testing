export interface ThemeColors {
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  background: string;
  foreground: string;
  muted: string;
  "muted-foreground": string;
  border: string;
  ring: string;
  input: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  sidebar: string;
  "sidebar-foreground": string;
  "sidebar-primary": string;
  "sidebar-primary-foreground": string;
  "sidebar-accent": string;
  "sidebar-accent-foreground": string;
  "sidebar-border": string;
  "sidebar-ring": string;
  "chart-1": string;
  "chart-2": string;
  "chart-3": string;
  "chart-4": string;
  "chart-5": string;
}

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export interface Preset {
  name: string;
  colors: {
    [key: string]: string;
  };
  lightColors: {
    [key: string]: string;
  };
  darkColors: {
    [key: string]: string;
  };
}

export interface TabWarnings {
  sidebar: string[];
  cards: string[];
  components: string[];
}

export interface DesignTokens {
  radius: number;
  shadows: {
    [key: string]: { y: number; blur: number; spread: number };
  };
  spacing: {
    base: number;
    scale: number[];
  };
  transitions: {
    [key in "fast" | "normal" | "slow"]: number;
  };
}
