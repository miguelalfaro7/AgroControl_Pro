import { ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MetricCard({
  title,
  value,
  helper,
  icon: Icon,
}: {
  title: string
  value: string
  helper: string
  icon: LucideIcon
}) {
  return (
    <Card className="border-border/60 bg-card/90">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
        </div>
        <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-700 dark:text-emerald-300">
          <Icon className="size-5" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center gap-2 pt-0 text-xs text-muted-foreground">
        <ArrowUpRight className="size-3.5 text-emerald-600" />
        {helper}
      </CardContent>
    </Card>
  )
}

