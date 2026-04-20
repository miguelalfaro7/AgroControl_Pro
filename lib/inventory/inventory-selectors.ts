import type { InventoryItem, InventorySummary } from "@/lib/types"

export function isLowStockItem(item: InventoryItem) {
  return item.quantity <= item.reorderLevel
}

export function getInventorySummary(items: InventoryItem[]): InventorySummary {
  return {
    totalItems: items.length,
    lowStockCount: items.filter(isLowStockItem).length,
    totalUnits: items.reduce((sum, item) => sum + item.quantity, 0),
  }
}

