import type { LucideIcon } from "lucide-react"
import {
  BellRing,
  Boxes,
  ChartColumnBig,
  ClipboardList,
  HandCoins,
  LandPlot,
} from "lucide-react"

import { canViewAlerts, canViewExpenses, isAdmin } from "@/lib/auth/permissions"
import type { AppUser } from "@/lib/types"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  visible?: (user: AppUser) => boolean
}

export const dashboardNavigation: NavItem[] = [
  {
    title: "Resumen",
    href: "/dashboard",
    icon: ChartColumnBig,
    visible: isAdmin,
  },
  {
    title: "Mi jornada",
    href: "/dashboard/trabajo",
    icon: ChartColumnBig,
    visible: (user) => user.role === "WORKER",
  },
  { title: "Inventario", href: "/dashboard/inventario", icon: Boxes },
  { title: "Gastos", href: "/dashboard/gastos", icon: HandCoins, visible: canViewExpenses },
  { title: "Actividades", href: "/dashboard/actividades", icon: ClipboardList },
  { title: "Lotes", href: "/dashboard/lotes", icon: LandPlot },
  { title: "Alertas", href: "/dashboard/alertas", icon: BellRing, visible: canViewAlerts },
]

export function getVisibleNavigation(user: AppUser) {
  return dashboardNavigation.filter((item) => (item.visible ? item.visible(user) : true))
}
