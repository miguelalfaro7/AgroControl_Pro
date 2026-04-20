import { getMockDb } from "@/lib/data/mock-db"
import { getInventorySummary as buildInventorySummary } from "@/lib/inventory/inventory-selectors"
import type { InventoryFilters, InventoryItem } from "@/lib/types"

function applyFilters(items: InventoryItem[], filters: InventoryFilters) {
  return items.filter((item) => {
    const matchesQuery =
      !filters.query ||
      item.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(filters.query.toLowerCase())

    const matchesType = !filters.type || filters.type === "ALL" || item.type === filters.type
    const lowStock = item.quantity <= item.reorderLevel
    const matchesStock =
      !filters.stock ||
      filters.stock === "all" ||
      (filters.stock === "low" && lowStock) ||
      (filters.stock === "healthy" && !lowStock)

    return matchesQuery && matchesType && matchesStock
  })
}

export async function listInventory(filters: InventoryFilters = {}) {
  const db = getMockDb()
  return applyFilters(db.inventory, filters).sort((a, b) => a.name.localeCompare(b.name))
}

export async function getInventorySummary() {
  const db = getMockDb()
  return buildInventorySummary(db.inventory)
}

export async function upsertInventoryItem(
  input: Omit<InventoryItem, "updatedAt" | "id"> & { id?: string }
) {
  const db = getMockDb()

  if (input.id) {
    db.inventory = db.inventory.map((item) =>
      item.id === input.id ? { ...item, ...input, updatedAt: new Date().toISOString() } : item
    )
    return
  }

  db.inventory.unshift({
    ...input,
    id: `sup-${Date.now()}`,
    updatedAt: new Date().toISOString(),
  })
}

export async function removeInventoryItem(id: string) {
  const db = getMockDb()
  db.inventory = db.inventory.filter((item) => item.id !== id)
}
