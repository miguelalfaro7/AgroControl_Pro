import { redirect } from "next/navigation"

import { AuthForm } from "@/components/auth-form"
import { loginAction } from "@/lib/actions/auth"
import { getSessionUser } from "@/lib/auth/session"

export default async function LoginPage() {
  const user = await getSessionUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef6ef_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <AuthForm
        title="Bienvenido de nuevo"
        description="Accede al centro de control agricola con tus credenciales."
        action={loginAction}
        mode="login"
      />
    </main>
  )
}

