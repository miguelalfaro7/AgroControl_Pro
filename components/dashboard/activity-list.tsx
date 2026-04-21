import { CalendarClock, Sprout } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ActivityItem } from "@/lib/types"
import { formatDateTime } from "@/lib/utils"

export function ActivityList({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Actividades recientes</CardTitle>
        <CardDescription>Agenda operativa y ejecucion de campo.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/70 p-4"
          >
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-700 dark:text-emerald-300">
              <Sprout className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium break-words">{activity.type}</p>
                <Badge>{activity.status}</Badge>
              </div>
              <p className="mt-1 break-words text-sm text-muted-foreground">{activity.lotName}</p>
              <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarClock className="size-3.5" />
                {formatDateTime(activity.scheduledAt)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
