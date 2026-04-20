import { AppHeader } from "@/components/layout/app-header"
import { Sidebar } from "@/components/layout/sidebar"
import type { AppUser } from "@/lib/types"

export async function AppShell({
  user,
  children,
}: {
  user: AppUser
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(241,245,249,1)_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,rgba(2,6,23,1)_0%,rgba(15,23,42,1)_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <Sidebar user={user} />
        <div className="flex min-h-screen flex-col">
          <AppHeader user={user} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
