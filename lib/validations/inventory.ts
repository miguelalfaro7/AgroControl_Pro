import { z } from "zod"

export const inventorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "El nombre es obligatorio"),
  type: z.enum(["FERTILIZER", "COMPOST", "PESTICIDE", "TOOL"]),
  quantity: z.coerce.number().min(0, "La cantidad no puede ser negativa"),
  unit: z.string().min(1, "La unidad es obligatoria"),
  reorderLevel: z.coerce.number().min(0, "El minimo debe ser positivo"),
  warehouse: z.string().min(2, "La bodega es obligatoria"),
  notes: z.string().optional(),
})

