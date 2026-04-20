"use client"

import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import type { ActionState } from "@/lib/types"

const initialState: ActionState = { success: false, message: "" }

export function AuthForm({
  title,
  description,
  action,
  mode,
}: {
  title: string
  description: string
  action: (state: ActionState, formData: FormData) => Promise<ActionState>
  mode: "login" | "register"
}) {
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <Card className="w-full max-w-xl border-white/10 bg-white/85 shadow-2xl backdrop-blur dark:bg-slate-950/70">
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          {mode === "register" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="Nombre completo" />
              {state.errors?.name ? <p className="text-xs text-destructive">{state.errors.name[0]}</p> : null}
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" name="email" type="email" placeholder="admin@agrocontrol.pro" />
            {state.errors?.email ? <p className="text-xs text-destructive">{state.errors.email[0]}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input id="password" name="password" type="password" placeholder="******" />
            {state.errors?.password ? <p className="text-xs text-destructive">{state.errors.password[0]}</p> : null}
          </div>

          {mode === "register" ? (
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select id="role" name="role" defaultValue="WORKER">
                <option value="ADMIN">Administrador</option>
                <option value="WORKER">Trabajador</option>
              </Select>
            </div>
          ) : null}

          {state.message ? (
            <p className={state.success ? "text-sm text-emerald-600" : "text-sm text-destructive"}>{state.message}</p>
          ) : null}

          <Button type="submit" className="h-11 w-full" disabled={pending}>
            {pending ? "Procesando..." : mode === "login" ? "Ingresar al panel" : "Crear cuenta"}
          </Button>

          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "¿Aun no tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <Link
              href={mode === "login" ? "/registro" : "/login"}
              className="font-medium text-emerald-700 hover:underline dark:text-emerald-300"
            >
              {mode === "login" ? "Registrate" : "Inicia sesion"}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

