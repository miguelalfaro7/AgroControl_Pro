"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ConsumptionPoint, MonthlyExpensePoint } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

export function DashboardCharts({
  expensesByMonth,
  consumptionBySupply,
}: {
  expensesByMonth: MonthlyExpensePoint[]
  consumptionBySupply: ConsumptionPoint[]
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Gastos por mes</CardTitle>
          <CardDescription>Seguimiento financiero de la operacion en curso.</CardDescription>
        </CardHeader>
        <CardContent className="h-[260px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expensesByMonth}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number" ? formatCurrency(value) : String(value ?? "")
                }
              />
              <Bar dataKey="total" fill="hsl(152 68% 34%)" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consumo de insumos</CardTitle>
          <CardDescription>Uso acumulado por insumo durante las actividades recientes.</CardDescription>
        </CardHeader>
        <CardContent className="h-[280px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={consumptionBySupply} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                width={92}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="consumed" fill="hsl(39 92% 50%)" radius={[0, 12, 12, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
