import { getMockDb } from "@/lib/data/mock-db"
import { getInventorySummary } from "@/lib/inventory/inventory-selectors"

export async function getWorkerDashboardSnapshot() {
  const db = getMockDb()
  const summary = getInventorySummary(db.inventory)
  const todaysActivities = [...db.activities]
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
    .slice(0, 4)
  const activeLots = db.lots.filter((item) => item.status === "GROWING" || item.status === "HARVEST")
  const completedToday = db.activities.filter((item) => item.status === "Completada").length

  return {
    todaysActivities,
    lowStockItems: db.inventory.filter((item) => item.quantity <= item.reorderLevel).slice(0, 3),
    activeLots,
    metrics: {
      todaysActivities: todaysActivities.length,
      lowStockCount: summary.lowStockCount,
      activeLots: activeLots.length,
      completedToday,
    },
  }
}

