import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActivitiesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividades agricolas</CardTitle>
        <CardDescription>
          Estructura reservada para fertilizacion, fumigacion, riego y cosecha.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        El esquema Prisma ya soporta relaciones con lotes, usuarios e insumos para escalar este modulo sin rehacer la base.
      </CardContent>
    </Card>
  )
}

