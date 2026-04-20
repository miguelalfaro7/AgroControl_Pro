import { requireAdmin } from "@/lib/auth/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AlertsPage() {
  await requireAdmin()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Centro de alertas</CardTitle>
        <CardDescription>Inventario critico y recordatorios operativos en un solo lugar.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        El dashboard ya consume alertas de bajo stock y recordatorios. Este modulo queda listo para segmentacion avanzada y notificaciones futuras.
      </CardContent>
    </Card>
  )
}
