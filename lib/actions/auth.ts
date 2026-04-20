"use server"

import { redirect } from "next/navigation"

import { clearSession, setSession } from "@/lib/auth/session"
import { getRoleHomePath } from "@/lib/auth/permissions"
import { authenticateUser, registerUser } from "@/lib/services/auth-service"
import { loginSchema, registerSchema } from "@/lib/validations/auth"
import type { ActionState } from "@/lib/types"

export async function loginAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Revisa los campos del formulario.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const user = await authenticateUser(parsed.data.email, parsed.data.password)

  if (!user) {
    return {
      success: false,
      message: "Credenciales invalidas. Usa admin@agrocontrol.pro / admin123 para probar.",
    }
  }

  await setSession(user)
  redirect(getRoleHomePath(user))
}

export async function registerAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Revisa los campos del formulario.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const user = await registerUser(parsed.data)

  if (!user) {
    return {
      success: false,
      message: "Ya existe un usuario con ese correo.",
    }
  }

  await setSession(user)
  redirect(getRoleHomePath(user))
}

export async function logoutAction() {
  await clearSession()
  redirect("/login")
}
