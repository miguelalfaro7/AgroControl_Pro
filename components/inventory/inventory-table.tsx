"use client"

import { useMemo, useState, useTransition } from "react"
import { PencilLine, Plus, Search, Trash2 } from "lucide-react"

import { InventoryFormDialog } from "@/components/inventory/inventory-form-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { canCreate, canDelete, canEdit } from "@/lib/auth/permissions"
import { deleteInventoryAction } from "@/lib/actions/inventory"
import type { AppUser, InventoryItem } from "@/lib/types"
import { formatShortDate } from "@/lib/utils"

export function InventoryTable({
  items,
  user,
}: {
  items: InventoryItem[]
  user: AppUser
}) {
  const [query, setQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("ALL")
  const [stockFilter, setStockFilter] = useState("all")
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isPending, startTransition] = useTransition()
  const canCreateItems = canCreate(user)
  const canEditItems = canEdit(user)
  const canDeleteItems = canDelete(user)

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(query.toLowerCase())
      const matchesType = typeFilter === "ALL" || item.type === typeFilter
      const lowStock = item.quantity <= item.reorderLevel
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && lowStock) ||
        (stockFilter === "healthy" && !lowStock)

      return matchesQuery && matchesType && matchesStock
    })
  }, [items, query, stockFilter, typeFilter])

  function handleCreate() {
    setSelectedItem(null)
    setOpen(true)
  }

  function handleEdit(item: InventoryItem) {
    setSelectedItem(item)
    setOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader className="gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <CardTitle>Inventario de insumos</CardTitle>
            <CardDescription>Administra existencias, busquedas y alertas por stock minimo.</CardDescription>
          </div>
          {canCreateItems ? (
            <Button onClick={handleCreate} className="w-full sm:w-auto">
              <Plus className="size-4" />
              Nuevo insumo
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Buscar por nombre o bodega" />
            </div>
            <Select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="ALL">Todos los tipos</option>
              <option value="FERTILIZER">Fertilizante</option>
              <option value="COMPOST">Abono</option>
              <option value="PESTICIDE">Pesticida</option>
              <option value="TOOL">Herramienta</option>
            </Select>
            <Select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)}>
              <option value="all">Todo el stock</option>
              <option value="low">Solo bajos</option>
              <option value="healthy">Stock saludable</option>
            </Select>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/60">
            <div className="overflow-x-auto">
              <Table className="min-w-[880px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Insumo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Bodega</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Actualizado</TableHead>
                    {(canEditItems || canDeleteItems) ? (
                      <TableHead className="text-right">Acciones</TableHead>
                    ) : null}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => {
                    const lowStock = item.quantity <= item.reorderLevel

                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.notes || "Sin observaciones"}</p>
                          </div>
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>{item.warehouse}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              lowStock
                                ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            }
                          >
                            {lowStock ? "Bajo stock" : "Estable"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatShortDate(item.updatedAt)}</TableCell>
                        {canEditItems || canDeleteItems ? (
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {canEditItems ? (
                                <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                                  <PencilLine className="size-4" />
                                </Button>
                              ) : null}
                              {canDeleteItems ? (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  disabled={isPending}
                                  onClick={() =>
                                    startTransition(async () => {
                                      await deleteInventoryAction(item.id)
                                    })
                                  }
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              ) : null}
                            </div>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <InventoryFormDialog
        key={selectedItem?.id ?? "new"}
        open={open}
        onClose={() => setOpen(false)}
        item={selectedItem}
      />
    </>
  )
}
