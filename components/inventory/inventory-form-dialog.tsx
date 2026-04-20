"use client"

import { useActionState, useEffect } from "react"

import { DialogShell } from "@/components/ui/dialog-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { saveInventoryAction } from "@/lib/actions/inventory"
import type { ActionState, InventoryItem } from "@/lib/types"

const initialState: ActionState = { success: false, message: "" }

export function InventoryFormDialog({
  open,
  onClose,
  item,
}: {
  open: boolean
  onClose: () => void
  item?: InventoryItem | null
}) {
  const [state, formAction, pending] = useActionState(saveInventoryAction, initialState)

  useEffect(() => {
    if (state.success) {
      onClose()
    }
  }, [onClose, state.success])

  return (
    <DialogShell
      open={open}
      onClose={onClose}
      title={item ? "Editar insumo" : "Nuevo insumo"}
      description="Registra existencias, niveles minimos y ubicacion de bodega."
    >
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="id" defaultValue={item?.id} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" defaultValue={item?.name} placeholder="Fertilizante NPK 15-15-15" />
            {state.errors?.name ? <p className="text-xs text-destructive">{state.errors.name[0]}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select id="type" name="type" defaultValue={item?.type ?? "FERTILIZER"}>
              <option value="FERTILIZER">Fertilizante</option>
              <option value="COMPOST">Abono</option>
              <option value="PESTICIDE">Pesticida</option>
              <option value="TOOL">Herramienta</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="warehouse">Bodega</Label>
            <Input id="warehouse" name="warehouse" defaultValue={item?.warehouse} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input id="quantity" name="quantity" type="number" step="0.01" defaultValue={item?.quantity} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unidad</Label>
            <Input id="unit" name="unit" defaultValue={item?.unit} placeholder="kg, litros, und" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="reorderLevel">Nivel minimo</Label>
            <Input
              id="reorderLevel"
              name="reorderLevel"
              type="number"
              step="0.01"
              defaultValue={item?.reorderLevel ?? 10}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea id="notes" name="notes" defaultValue={item?.notes} />
          </div>
        </div>

        {state.message ? (
          <p className={state.success ? "text-sm text-emerald-600" : "text-sm text-destructive"}>{state.message}</p>
        ) : null}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : item ? "Actualizar insumo" : "Crear insumo"}
          </Button>
        </div>
      </form>
    </DialogShell>
  )
}

