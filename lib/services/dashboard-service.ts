import { getMockDb } from "@/lib/data/mock-db"
import type { DashboardSnapshot } from "@/lib/types"

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const db = getMockDb()
  const totalExpenses = db.expenses.reduce((sum, item) => sum + item.amount, 0)
  const totalSupplies = db.inventory.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockItems = db.inventory.filter((item) => item.quantity <= item.reorderLevel)
  const activeLots = db.lots.filter((item) => item.status === "GROWING" || item.status === "HARVEST").length

  return {
    metrics: {
      totalExpenses,
      totalSupplies,
      activeLots,
      lowStockCount: lowStockItems.length,
    },
    recentActivities: [...db.activities].sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt)).slice(0, 5),
    lowStockItems,
    expensesByMonth: [
      { month: "Ene", total: 820000 },
      { month: "Feb", total: 1260000 },
      { month: "Mar", total: 540000 },
      { month: "Abr", total: 960000 },
      { month: "May", total: 1250000 },
      { month: "Jun", total: 740000 },
    ],
    consumptionBySupply: [
      { name: "NPK 15-15-15", consumed: 42 },
      { name: "Compost", consumed: 31 },
      { name: "Fungicida cobre", consumed: 18 },
      { name: "Machetes", consumed: 9 },
    ],
  }
}

