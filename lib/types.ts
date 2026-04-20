export type UserRole = "ADMIN" | "WORKER"
export type SupplyType = "FERTILIZER" | "COMPOST" | "PESTICIDE" | "TOOL"
export type ExpenseCategory = "SUPPLIES" | "LABOR" | "TRANSPORT"
export type CropType = "AVOCADO" | "COFFEE"
export type CropStatus = "PLANNED" | "GROWING" | "HARVEST" | "RESTING"
export type ActivityType =
  | "FERTILIZATION"
  | "FUMIGATION"
  | "IRRIGATION"
  | "HARVEST"

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface InventoryItem {
  id: string
  name: string
  type: SupplyType
  quantity: number
  unit: string
  reorderLevel: number
  warehouse: string
  notes?: string
  updatedAt: string
}

export interface InventorySummary {
  totalItems: number
  lowStockCount: number
  totalUnits: number
}

export interface ExpenseItem {
  id: string
  title: string
  amount: number
  category: ExpenseCategory
  occurredAt: string
}

export interface ActivityItem {
  id: string
  type: ActivityType
  lotName: string
  scheduledAt: string
  status: string
}

export interface LotItem {
  id: string
  name: string
  cropType: CropType
  status: CropStatus
  areaHectare: number
}

export interface DashboardMetrics {
  totalExpenses: number
  totalSupplies: number
  activeLots: number
  lowStockCount: number
}

export interface MonthlyExpensePoint {
  month: string
  total: number
}

export interface ConsumptionPoint {
  name: string
  consumed: number
}

export interface DashboardSnapshot {
  metrics: DashboardMetrics
  recentActivities: ActivityItem[]
  lowStockItems: InventoryItem[]
  expensesByMonth: MonthlyExpensePoint[]
  consumptionBySupply: ConsumptionPoint[]
}

export interface InventoryFilters {
  query?: string
  type?: string
  stock?: "all" | "low" | "healthy"
}

export interface ActionState {
  success: boolean
  message: string
  errors?: Record<string, string[] | undefined>
}
