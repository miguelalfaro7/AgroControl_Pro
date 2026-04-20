"use client"

import { Boxes, CircleAlert, Warehouse } from "lucide-react"

import { MetricCard } from "@/components/dashboard/metric-card"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { useInventoryState } from "@/hooks/use-inventory-state"
import type { AppUser, InventoryItem } from "@/lib/types"

export function InventoryClientPage({
  initialItems,
  user,
}: {
  initialItems: InventoryItem[]
  user: AppUser
}) {
  const { items, summary } = useInventoryState(initialItems)

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Inventario</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Control de insumos y herramientas</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Gestiona cantidades, niveles minimos, bodegas y alertas de abastecimiento para aguacate y cafe.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Referencias activas"
          value={`${summary.totalItems}`}
          helper="Catalogo actual de insumos y herramientas."
          icon={Boxes}
        />
        <MetricCard
          title="Bajo stock"
          value={`${summary.lowStockCount}`}
          helper="Elementos que requieren reabastecimiento."
          icon={CircleAlert}
        />
        <MetricCard
          title="Unidades registradas"
          value={`${summary.totalUnits}`}
          helper="Suma consolidada de cantidades en inventario."
          icon={Warehouse}
        />
      </section>

      <InventoryTable items={items} user={user} />
    </div>
  )
}
