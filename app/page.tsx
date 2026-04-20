import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.3),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.18),_transparent_22%),linear-gradient(180deg,#f8fafc_0%,#eef6ef_100%)] px-6 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),_transparent_20%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-14">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
              AgroControl Pro
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-5xl font-semibold leading-tight">
              Gestion profesional para fincas de aguacate y cafe con foco en operacion, costos y trazabilidad.
            </h1>
          </div>
          <div className="hidden gap-3 md:flex">
            <Button asChild variant="outline">
              <Link href="/login">Iniciar sesion</Link>
            </Button>
            <Button asChild>
              <Link href="/registro">Crear cuenta</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <Card className="border-white/20 bg-white/70 dark:bg-slate-950/55">
            <CardContent className="space-y-6 p-8">
              <p className="max-w-2xl text-lg text-muted-foreground">
                Dashboard analitico, inventario con alertas, control de gastos, lotes, cultivos, actividades y una base de datos lista para escalar con Prisma y PostgreSQL.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/dashboard">Ver dashboard</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/dashboard/inventario">Explorar inventario</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-white/60 to-amber-500/10 dark:from-emerald-500/12 dark:via-slate-950/55 dark:to-amber-500/8">
            <CardContent className="space-y-4 p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Incluye demo inmediata</p>
                <p className="mt-2 text-4xl font-semibold">admin@agrocontrol.pro</p>
                <p className="text-lg text-muted-foreground">Contrasena: admin123</p>
              </div>
              <p className="text-sm text-muted-foreground">
                La app arranca con datos demo para no bloquear la experiencia mientras conectas PostgreSQL.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

