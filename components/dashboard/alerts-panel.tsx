import { AlertTriangle, BellDot } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { InventoryItem } from "@/lib/types"

const reminders = [
  "Fertilizacion de lote norte programada para hoy a las 07:00",
  "Auditoria de inventario recomendada antes del cierre semanal",
]

export function AlertsPanel({ lowStockItems }: { lowStockItems: InventoryItem[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alertas y recordatorios</CardTitle>
        <CardDescription>Eventos que requieren atencion operativa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-4 text-sm"
          >
            <div className="flex items-center gap-2 font-medium text-amber-700 dark:text-amber-300">
              <AlertTriangle className="size-4" />
              Bajo inventario
            </div>
            <p className="mt-2 break-words">{item.name}</p>
            <p className="mt-1 text-muted-foreground">
              Disponible: {item.quantity} {item.unit}. Minimo sugerido: {item.reorderLevel} {item.unit}.
            </p>
          </div>
        ))}

        {reminders.map((item) => (
          <div key={item} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm">
            <div className="flex flex-wrap items-center gap-2 font-medium">
              <BellDot className="size-4 text-emerald-600" />
              Recordatorio
              <Badge className="sm:ml-auto">Agenda</Badge>
            </div>
            <p className="mt-2 break-words text-muted-foreground">{item}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
