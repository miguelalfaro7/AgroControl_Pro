import * as React from "react"

import { cn } from "@/lib/utils"

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/10",
        className
      )}
      {...props}
    />
  )
}

