"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { getVisibleNavigation } from "@/lib/constants/navigation"
import type { AppUser } from "@/lib/types"
import { cn } from "@/lib/utils"

export function Sidebar({ user }: { user: AppUser }) {
  const pathname = usePathname()
  const navigation = getVisibleNavigation(user)

  return (
    <aside className="flex h-full min-h-screen w-full max-w-xs flex-col border-r border-sidebar-border bg-sidebar px-5 py-6">
      <div className="rounded-[28px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-5">
        <Badge className="mb-3 border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          AgroControl Pro
        </Badge>
        <h1 className="font-heading text-2xl font-semibold">Operacion agricola con visibilidad real</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gestiona inventario, costos, lotes y actividades desde una sola consola.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto rounded-[24px] border border-border/60 bg-background/70 p-4">
        <p className="text-sm font-medium">Estado de la finca</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {user.role === "ADMIN"
            ? "3 lotes activos, 2 alertas criticas y actividades del dia sincronizadas."
            : "Consulta operativa habilitada. El inventario se muestra en modo solo lectura."}
        </p>
      </div>
    </aside>
  )
}
