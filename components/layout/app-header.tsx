import { LogOut, Search } from "lucide-react"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logoutAction } from "@/lib/actions/auth"
import type { AppUser } from "@/lib/types"

export function AppHeader({ user }: { user: AppUser }) {
  const panelLabel = user.role === "ADMIN" ? "Panel administrativo" : "Panel operativo"
  const searchPlaceholder =
    user.role === "ADMIN"
      ? "Buscar lotes, insumos o actividades..."
      : "Buscar actividades, lotes o existencias..."

  return (
    <header className="flex flex-col gap-4 border-b border-border/60 bg-background/80 px-6 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{panelLabel}</p>
        <h2 className="font-heading text-2xl font-semibold">Hola, {user.name.split(" ")[0]}</h2>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-[260px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={searchPlaceholder} className="pl-10" />
        </div>
        <ThemeToggle />
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="w-full sm:w-auto">
            <LogOut className="size-4" />
            Salir
          </Button>
        </form>
      </div>
    </header>
  )
}
