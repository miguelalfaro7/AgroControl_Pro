"use client"

import { X } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

export function DialogShell({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[28px] border border-border/60 bg-background shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border/60 p-4 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
            {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
            <X className="size-4" />
          </Button>
        </div>
        <div className="max-h-[calc(90vh-96px)] overflow-y-auto p-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}
