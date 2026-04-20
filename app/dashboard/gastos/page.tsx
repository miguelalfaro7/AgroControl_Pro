import { requireAdmin } from "@/lib/auth/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ExpensesPage() {
  await requireAdmin()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Control de gastos</CardTitle>
        <CardDescription>
          La base del modulo ya esta lista para conectar formularios, filtros por fecha y persistencia Prisma.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        En esta entrega se priorizo el modulo funcional de inventario y el dashboard, dejando el espacio preparado para ampliar gastos con el mismo patron de servicios y server actions.
      </CardContent>
    </Card>
  )
}
