import { cn } from "../lib/utils";
import { Loader2, LogOutIcon as LogOutIconLucide } from "lucide-react";

export function LoaderIcon() {
  return <Loader2 className="w-4 h-4 animate-spin" />;
}

export function LogOutIcon({ className }: { className?: string }) {
  return <LogOutIconLucide className={cn("w-4 h-4", className)} />;
}
