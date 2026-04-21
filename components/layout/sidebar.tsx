"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getVisibleNavigation } from "@/lib/constants/navigation"
import type { AppUser } from "@/lib/types"
import { cn } from "@/lib/utils"

function SidebarContent({
  user,
  pathname,
  onNavigate,
}: {
  user: AppUser
  pathname: string
  onNavigate?: () => void
}) {
  const navigation = getVisibleNavigation(user)

  return (
    <>
      <div className="rounded-[28px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-5">
        <Badge className="mb-3 border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          AgroControl Pro
        </Badge>
        <h1 className="font-heading text-xl font-semibold leading-tight sm:text-2xl">
          Operacion agricola con visibilidad real
        </h1>
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
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="break-words">{item.title}</span>
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
    </>
  )
}

export function Sidebar({
  user,
  mobileOpen,
  onMobileClose,
}: {
  user: AppUser
  mobileOpen: boolean
  onMobileClose: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      <aside className="hidden h-full min-h-screen w-full max-w-xs flex-col border-r border-sidebar-border bg-sidebar px-5 py-6 lg:flex">
        <SidebarContent user={user} pathname={pathname} />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            aria-label="Cerrar menu"
            onClick={onMobileClose}
          />
          <aside className="relative flex h-full w-[88vw] max-w-sm flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar px-4 py-5 shadow-2xl">
            <div className="mb-4 flex justify-end">
              <Button type="button" variant="outline" size="icon" onClick={onMobileClose}>
                <X className="size-4" />
              </Button>
            </div>
            <SidebarContent user={user} pathname={pathname} onNavigate={onMobileClose} />
          </aside>
        </div>
      ) : null}
    </>
  )
}
