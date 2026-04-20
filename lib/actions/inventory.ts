"use server"

import { revalidatePath } from "next/cache"

import { requireSession } from "@/lib/auth/session"
import { canCreate, canDelete, canEdit } from "@/lib/auth/permissions"
import { removeInventoryItem, upsertInventoryItem } from "@/lib/services/inventory-service"
import { inventorySchema } from "@/lib/validations/inventory"
import type { ActionState } from "@/lib/types"

function revalidateInventoryViews() {
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/inventario")
}

export async function saveInventoryAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireSession()
  const itemId = formData.get("id") || undefined
  const allowed = itemId ? canEdit(user) : canCreate(user)

  if (!allowed) {
    return {
      success: false,
      message: "No tienes permisos para gestionar insumos.",
    }
  }

  const parsed = inventorySchema.safeParse({
    id: itemId,
    name: formData.get("name"),
    type: formData.get("type"),
    quantity: formData.get("quantity"),
    unit: formData.get("unit"),
    reorderLevel: formData.get("reorderLevel"),
    warehouse: formData.get("warehouse"),
    notes: formData.get("notes"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "No se pudo guardar el insumo.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  await upsertInventoryItem(parsed.data)
  revalidateInventoryViews()

  return {
    success: true,
    message: parsed.data.id ? "Insumo actualizado correctamente." : "Insumo creado correctamente.",
  }
}

export async function deleteInventoryAction(id: string) {
  const user = await requireSession()

  if (!canDelete(user)) {
    throw new Error("No autorizado para eliminar insumos.")
  }

  await removeInventoryItem(id)
  revalidateInventoryViews()
}
