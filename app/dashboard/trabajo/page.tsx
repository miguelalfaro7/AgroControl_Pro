import { CheckCircle2, CircleAlert, ClipboardList, LandPlot } from "lucide-react"

import { ActivityList } from "@/components/dashboard/activity-list"
import { MetricCard } from "@/components/dashboard/metric-card"
import { WorkerHighlightCard } from "@/components/dashboard/worker-highlight-card"
import { Badge } from "@/components/ui/badge"
import { requireWorker } from "@/lib/auth/session"
import { getWorkerDashboardSnapshot } from "@/lib/services/worker-dashboard-service"

export default async function WorkerDashboardPage() {
  const user = await requireWorker()
  const snapshot = await getWorkerDashboardSnapshot()

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Mi jornada</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Operacion diaria de campo</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          {user.name.split(" ")[0]}, aqui tienes tus prioridades del dia, inventario visible y el estado de los lotes activos.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Actividades del dia"
          value={`${snapshot.metrics.todaysActivities}`}
          helper="Agenda visible para la jornada actual."
          icon={ClipboardList}
        />
        <MetricCard
          title="Lotes activos"
          value={`${snapshot.metrics.activeLots}`}
          helper="Sectores en crecimiento o cosecha."
          icon={LandPlot}
        />
        <MetricCard
          title="Bajo stock"
          value={`${snapshot.metrics.lowStockCount}`}
          helper="Consulta insumos que requieren aviso al administrador."
          icon={CircleAlert}
        />
        <MetricCard
          title="Completadas"
          value={`${snapshot.metrics.completedToday}`}
          helper="Actividades cerradas en la jornada."
          icon={CheckCircle2}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ActivityList activities={snapshot.todaysActivities} />
        <WorkerHighlightCard
          title="Insumos que necesitan atencion"
          description="Vista rapida para escalar abastecimiento al administrador."
        >
          <div className="space-y-4">
            {snapshot.lowStockItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-4 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{item.name}</p>
                  <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                    Bajo stock
                  </Badge>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Disponible: {item.quantity} {item.unit} en {item.warehouse}.
                </p>
              </div>
            ))}
          </div>
        </WorkerHighlightCard>
      </section>

      <WorkerHighlightCard
        title="Lotes en seguimiento"
        description="Resumen operativo de los sectores actualmente activos."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {snapshot.activeLots.map((lot) => (
            <div
              key={lot.id}
              className="rounded-2xl border border-border/60 bg-background/70 p-4"
            >
              <p className="font-medium">{lot.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Cultivo: {lot.cropType === "AVOCADO" ? "Aguacate" : "Cafe"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Area: {lot.areaHectare} ha</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                {lot.status}
              </p>
            </div>
          ))}
        </div>
      </WorkerHighlightCard>
    </div>
  )
}

