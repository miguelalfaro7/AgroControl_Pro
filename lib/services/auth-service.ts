import { getMockDb } from "@/lib/data/mock-db"
import type { AppUser } from "@/lib/types"

export async function authenticateUser(email: string, password: string) {
  const db = getMockDb()
  const user = db.users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
  )

  if (!user) {
    return null
  }

  const safeUser: AppUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }

  return safeUser
}

export async function registerUser(input: {
  name: string
  email: string
  password: string
  role: AppUser["role"]
}) {
  const db = getMockDb()
  const exists = db.users.some((item) => item.email.toLowerCase() === input.email.toLowerCase())

  if (exists) {
    return null
  }

  const user = {
    id: `user-${Date.now()}`,
    ...input,
  }

  db.users.unshift(user)

  const safeUser: AppUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }

  return safeUser
}
