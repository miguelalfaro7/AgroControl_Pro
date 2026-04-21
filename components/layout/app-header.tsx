import { LogOut, Menu, Search } from "lucide-react"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logoutAction } from "@/lib/actions/auth"
import type { AppUser } from "@/lib/types"

export function AppHeader({
  user,
  onOpenNavigation,
}: {
  user: AppUser
  onOpenNavigation: () => void
}) {
  const panelLabel = user.role === "ADMIN" ? "Panel administrativo" : "Panel operativo"
  const searchPlaceholder =
    user.role === "ADMIN"
      ? "Buscar lotes, insumos o actividades..."
      : "Buscar actividades, lotes o existencias..."

  return (
    <header className="flex flex-col gap-4 border-b border-border/60 bg-background/80 px-4 py-4 backdrop-blur sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={onOpenNavigation}
        >
          <Menu className="size-4" />
        </Button>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{panelLabel}</p>
          <h2 className="font-heading text-xl font-semibold break-words sm:text-2xl">
            Hola, {user.name.split(" ")[0]}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full min-w-0 sm:min-w-[260px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={searchPlaceholder} className="pl-10" />
        </div>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <ThemeToggle />
          <form action={logoutAction} className="flex-1 sm:flex-none">
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-center whitespace-normal sm:w-auto"
            >
              <LogOut className="size-4" />
              Salir
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
