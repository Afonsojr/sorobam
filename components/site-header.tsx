"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Dumbbell, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Ábaco", icon: Calculator },
  { href: "/aprender", label: "Aprender", icon: GraduationCap },
  { href: "/treino", label: "Treino", icon: Dumbbell },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Soroban, página inicial">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-2">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-semibold leading-none tracking-tight">Soroban</span>
            <span className="mt-1 hidden text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:block">
              prática japonesa
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 rounded-lg border bg-background/90 p-1" aria-label="Navegação principal">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active && "bg-foreground text-background hover:bg-foreground hover:text-background",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}