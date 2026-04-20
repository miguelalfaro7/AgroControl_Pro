import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const protectedPrefixes = ["/dashboard"]

function decodeRole(payload: string | undefined) {
  if (!payload) {
    return null
  }

  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    return json?.role === "ADMIN" || json?.role === "WORKER" ? json.role : null
  } catch {
    return null
  }
}

export function proxy(request: NextRequest) {
  const session = request.cookies.get("agrocontrol-session")?.value
  const role = decodeRole(session)

  if (protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix)) && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (["/login", "/registro"].includes(request.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL(role === "ADMIN" ? "/dashboard" : "/dashboard/trabajo", request.url))
  }

  if (request.nextUrl.pathname === "/dashboard" && role === "WORKER") {
    return NextResponse.redirect(new URL("/dashboard/trabajo", request.url))
  }

  if (request.nextUrl.pathname === "/dashboard/trabajo" && role === "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/registro"],
}
