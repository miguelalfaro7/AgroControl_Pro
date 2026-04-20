"use client"

import { useMemo, useState } from "react"

import { getInventorySummary } from "@/lib/inventory/inventory-selectors"
import type { InventoryItem } from "@/lib/types"

export function useInventoryState(initialItems: InventoryItem[]) {
  const [items, setItems] = useState(initialItems)

  const summary = useMemo(() => getInventorySummary(items), [items])

  return {
    items,
    setItems,
    summary,
  }
}

