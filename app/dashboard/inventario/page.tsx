import { InventoryClientPage } from "@/components/inventory/inventory-client-page"
import { requireSession } from "@/lib/auth/session"
import { listInventory } from "@/lib/services/inventory-service"

export default async function InventoryPage() {
  const [items, user] = await Promise.all([listInventory(), requireSession()])

  return <InventoryClientPage initialItems={items} user={user} />
}
