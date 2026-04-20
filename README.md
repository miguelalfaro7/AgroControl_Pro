# AgroControl Pro

Plataforma web profesional para la gestion agricola de una finca de aguacate y cafe, construida con `Next.js App Router`, `TypeScript`, `Tailwind CSS`, `shadcn/ui`, `Prisma ORM` y `PostgreSQL`.

## Estado de esta entrega

- Autenticacion base con login, registro, roles y proteccion de rutas
- Dashboard ejecutivo con metricas, alertas y graficas `Recharts`
- Modulo funcional de inventario con CRUD, filtros y alertas de bajo stock
- Esquema Prisma listo para PostgreSQL
- Arquitectura preparada para crecer hacia gastos, lotes, cultivos y actividades

## Credenciales demo

- `admin@agrocontrol.pro`
- `admin123`

## Estructura principal

```text
app/
  (auth)/
    login/
    registro/
  dashboard/
    actividades/
    alertas/
    gastos/
    inventario/
    lotes/
components/
  dashboard/
  inventory/
  layout/
  ui/
lib/
  actions/
  auth/
  constants/
  data/
  db/
  services/
  validations/
prisma/
  schema.prisma
proxy.ts
prisma.config.ts
```

## Desarrollo

```bash
pnpm install
pnpm db:generate
pnpm dev
```

## Base de datos

1. Configura `DATABASE_URL` en `.env`.
2. Genera el cliente de Prisma:

```bash
pnpm db:generate
```

3. Sincroniza el esquema con PostgreSQL:

```bash
pnpm db:push
```

## Notas de arquitectura

- `lib/services/*` encapsula la logica de dominio.
- `lib/actions/*` concentra las server actions.
- `lib/data/mock-db.ts` permite ejecutar la app con datos demo mientras se conecta PostgreSQL.
- `lib/db/prisma.ts` deja listo el cliente Prisma para la capa persistente real.
- `proxy.ts` protege rutas privadas y redirige segun sesion.

