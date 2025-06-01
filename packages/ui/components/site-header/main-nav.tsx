"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

export function MainNav({
  logo,
  name,
  links,
}: {
  logo?: React.ReactNode;
  name?: string;
  links?: {
    href: string;
    label: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        {logo}
        <span className="hidden font-bold lg:inline-block">{name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {links?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === link.href ? "text-foreground" : "text-foreground/80"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
