import { requireAdmin } from "@/lib/auth/session"
import { Boxes, CircleAlert, HandCoins, LandPlot } from "lucide-react"

import { ActivityList } from "@/components/dashboard/activity-list"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { MetricCard } from "@/components/dashboard/metric-card"
import { getDashboardSnapshot } from "@/lib/services/dashboard-service"
import { formatCurrency } from "@/lib/utils"

export default async function DashboardPage() {
  await requireAdmin()
  const snapshot = await getDashboardSnapshot()

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Vista ejecutiva</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Salud operativa de la finca</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Monitorea costos, disponibilidad de insumos y movimientos recientes para tomar decisiones mas rapidas.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total de gastos"
          value={formatCurrency(snapshot.metrics.totalExpenses)}
          helper="Acumulado del periodo con variacion positiva controlada."
          icon={HandCoins}
        />
        <MetricCard
          title="Insumos disponibles"
          value={`${snapshot.metrics.totalSupplies}`}
          helper="Inventario consolidado entre bodegas y herramientas."
          icon={Boxes}
        />
        <MetricCard
          title="Lotes activos"
          value={`${snapshot.metrics.activeLots}`}
          helper="Sectores con cultivo en crecimiento o cosecha."
          icon={LandPlot}
        />
        <MetricCard
          title="Alertas criticas"
          value={`${snapshot.metrics.lowStockCount}`}
          helper="Insumos por debajo del umbral recomendado."
          icon={CircleAlert}
        />
      </section>

      <DashboardCharts
        expensesByMonth={snapshot.expensesByMonth}
        consumptionBySupply={snapshot.consumptionBySupply}
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ActivityList activities={snapshot.recentActivities} />
        <AlertsPanel lowStockItems={snapshot.lowStockItems} />
      </section>
    </div>
  )
}
