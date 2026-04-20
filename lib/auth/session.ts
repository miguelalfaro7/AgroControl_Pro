"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { getRoleHomePath, isAdmin, isWorker } from "@/lib/auth/permissions"
import type { AppUser } from "@/lib/types"

const SESSION_COOKIE = "agrocontrol-session"

function encodeSession(user: AppUser) {
  return Buffer.from(JSON.stringify(user)).toString("base64url")
}

function decodeSession(payload: string): AppUser | null {
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AppUser
  } catch {
    return null
  }
}

export async function setSession(user: AppUser) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSessionUser() {
  const cookieStore = await cookies()
  const payload = cookieStore.get(SESSION_COOKIE)?.value

  if (!payload) {
    return null
  }

  return decodeSession(payload)
}

export async function requireSession() {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function redirectToRoleHome() {
  const user = await requireSession()
  redirect(getRoleHomePath(user))
}

export async function requireAdmin() {
  const user = await requireSession()

  if (!isAdmin(user)) {
    redirect(getRoleHomePath(user))
  }

  return user
}

export async function requireWorker() {
  const user = await requireSession()

  if (!isWorker(user)) {
    redirect(getRoleHomePath(user))
  }

  return user
}
