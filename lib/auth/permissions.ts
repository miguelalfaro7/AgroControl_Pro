import type { AppUser } from "@/lib/types"

type MaybeUser = AppUser | null | undefined

export function isAdmin(user: MaybeUser) {
  return user?.role === "ADMIN"
}

export function isWorker(user: MaybeUser) {
  return user?.role === "WORKER"
}

export function canCreate(user: MaybeUser) {
  return isAdmin(user)
}

export function canEdit(user: MaybeUser) {
  return isAdmin(user)
}

export function canDelete(user: MaybeUser) {
  return isAdmin(user)
}

export function canViewExpenses(user: MaybeUser) {
  return isAdmin(user)
}

export function canViewAlerts(user: MaybeUser) {
  return isAdmin(user)
}

export function canViewExecutiveDashboard(user: MaybeUser) {
  return isAdmin(user)
}

export function canAccessWorkerPanel(user: MaybeUser) {
  return isWorker(user)
}

export function getRoleHomePath(user: MaybeUser) {
  return isAdmin(user) ? "/dashboard" : "/dashboard/trabajo"
}
