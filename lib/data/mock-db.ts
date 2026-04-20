import type {
  ActivityItem,
  AppUser,
  ExpenseItem,
  InventoryItem,
  LotItem,
} from "@/lib/types"

interface MockDb {
  users: Array<AppUser & { password: string }>
  inventory: InventoryItem[]
  expenses: ExpenseItem[]
  activities: ActivityItem[]
  lots: LotItem[]
}

declare global {
  var __agroMockDb: MockDb | undefined
}

const initialDb: MockDb = {
  users: [
    {
      id: "user-admin",
      name: "Laura Ramirez",
      email: "admin@agrocontrol.pro",
      role: "ADMIN",
      password: "admin123",
    },
    {
      id: "user-worker",
      name: "Juan Perez",
      email: "trabajador@agrocontrol.pro",
      role: "WORKER",
      password: "trabajador123",
    },
  ],
  inventory: [
    {
      id: "sup-1",
      name: "Fertilizante NPK 15-15-15",
      type: "FERTILIZER",
      quantity: 18,
      unit: "kg",
      reorderLevel: 20,
      warehouse: "Bodega Principal",
      notes: "Uso intensivo en lote norte",
      updatedAt: "2026-04-18T14:00:00.000Z",
    },
    {
      id: "sup-2",
      name: "Compost organico premium",
      type: "COMPOST",
      quantity: 72,
      unit: "kg",
      reorderLevel: 25,
      warehouse: "Bodega Sur",
      notes: "Aplicacion para cafe joven",
      updatedAt: "2026-04-19T09:00:00.000Z",
    },
    {
      id: "sup-3",
      name: "Fungicida cobre",
      type: "PESTICIDE",
      quantity: 9,
      unit: "litros",
      reorderLevel: 12,
      warehouse: "Cuarto de insumos",
      notes: "Reservado para fumigacion preventiva",
      updatedAt: "2026-04-17T16:30:00.000Z",
    },
    {
      id: "sup-4",
      name: "Machete profesional",
      type: "TOOL",
      quantity: 14,
      unit: "und",
      reorderLevel: 6,
      warehouse: "Herramientas",
      updatedAt: "2026-04-15T11:45:00.000Z",
    },
  ],
  expenses: [
    {
      id: "exp-1",
      title: "Compra de fertilizante de arranque",
      amount: 820000,
      category: "SUPPLIES",
      occurredAt: "2026-01-10T10:00:00.000Z",
    },
    {
      id: "exp-2",
      title: "Jornales poda lote central",
      amount: 1260000,
      category: "LABOR",
      occurredAt: "2026-02-16T10:00:00.000Z",
    },
    {
      id: "exp-3",
      title: "Transporte cosecha piloto",
      amount: 540000,
      category: "TRANSPORT",
      occurredAt: "2026-03-03T10:00:00.000Z",
    },
    {
      id: "exp-4",
      title: "Fungicidas temporada lluvia",
      amount: 960000,
      category: "SUPPLIES",
      occurredAt: "2026-04-05T10:00:00.000Z",
    },
  ],
  activities: [
    {
      id: "act-1",
      type: "FERTILIZATION",
      lotName: "Lote Norte",
      scheduledAt: "2026-04-20T07:00:00.000Z",
      status: "Programada",
    },
    {
      id: "act-2",
      type: "FUMIGATION",
      lotName: "Lote Cafetal",
      scheduledAt: "2026-04-19T13:30:00.000Z",
      status: "Completada",
    },
    {
      id: "act-3",
      type: "IRRIGATION",
      lotName: "Lote Alta Vista",
      scheduledAt: "2026-04-18T10:00:00.000Z",
      status: "En curso",
    },
  ],
  lots: [
    {
      id: "lot-1",
      name: "Lote Norte",
      cropType: "AVOCADO",
      status: "GROWING",
      areaHectare: 2.4,
    },
    {
      id: "lot-2",
      name: "Lote Cafetal",
      cropType: "COFFEE",
      status: "HARVEST",
      areaHectare: 1.8,
    },
    {
      id: "lot-3",
      name: "Lote Alta Vista",
      cropType: "AVOCADO",
      status: "GROWING",
      areaHectare: 3.2,
    },
  ],
}

export function getMockDb() {
  if (!global.__agroMockDb) {
    global.__agroMockDb = structuredClone(initialDb)
  }

  return global.__agroMockDb
}

