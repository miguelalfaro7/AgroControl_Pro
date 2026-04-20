import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LotsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lotes y cultivos</CardTitle>
        <CardDescription>Base preparada para gestionar aguacate y cafe por terreno.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Se definieron modelos de lotes y cultivos con estado productivo para continuar con formularios, trazabilidad y analitica por area.
      </CardContent>
    </Card>
  )
}

