import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatShortDate(value: string | Date) {
  return format(new Date(value), "dd MMM yyyy", { locale: es })
}

export function formatDateTime(value: string | Date) {
  return format(new Date(value), "dd MMM yyyy, HH:mm", { locale: es })
}

export function toNumber(value: string | number) {
  if (typeof value === "number") {
    return value
  }

  const normalized = value.replace(",", ".")
  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : 0
}

