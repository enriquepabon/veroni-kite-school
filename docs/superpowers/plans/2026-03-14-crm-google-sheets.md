# CRM con Google Sheets — Plan de Implementación

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar Google Sheets como CRM liviano y automatizado para sincronizar leads, solicitudes de reserva y bookings confirmados desde Supabase, dándole al equipo de VeronikIte una vista de seguimiento comercial sin salir de Google Sheets.

**Architecture:** Los API routes existentes (`/api/leads`, `/api/booking`, `/api/bookings`) se modifican para que, después de insertar en Supabase, también escriban una fila en la hoja correspondiente de Google Sheets vía la API de Google. Se crea un módulo `src/lib/google-sheets.ts` que encapsula toda la lógica de autenticación (Service Account) y escritura. Supabase sigue siendo la fuente de verdad; el Sheet es una vista de seguimiento.

**Tech Stack:** googleapis (Google Sheets API v4), Google Cloud Service Account, Next.js API Routes, Supabase

---

## Estructura de archivos

| Acción | Archivo | Responsabilidad |
|--------|---------|-----------------|
| Crear | `src/lib/google-sheets.ts` | Cliente Google Sheets: auth + funciones de escritura por hoja |
| Modificar | `src/app/api/leads/route.ts` | Agregar llamada a Google Sheets después del insert a Supabase |
| Modificar | `src/app/api/booking/route.ts` | Agregar llamada a Google Sheets después del insert a Supabase |
| Modificar | `src/app/api/bookings/route.ts` | Agregar llamada a Google Sheets en POST después del insert |
| Crear | `src/app/api/crm/sync/route.ts` | Endpoint para sincronización manual/inicial de datos existentes |
| Modificar | `.env.example` | Agregar variables de Google Sheets |
| Modificar | `.env.local` | Agregar credenciales reales de Google |

---

## Chunk 1: Setup y Google Sheets Service

### Task 1: Instalar dependencia googleapis

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar googleapis**

```bash
npm install googleapis
```

- [ ] **Step 2: Verificar instalación**

```bash
node -e "const { google } = require('googleapis'); console.log('OK:', typeof google.sheets)"
```
Expected: `OK: function`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add googleapis dependency for Google Sheets CRM integration"
```

---

### Task 2: Configurar Google Cloud Service Account

**Nota:** Esta task es manual (no es código). Documentar los pasos para el equipo.

- [ ] **Step 1: Crear proyecto en Google Cloud Console**

1. Ir a https://console.cloud.google.com/
2. Crear proyecto: `veronikite-crm`
3. Habilitar API: **Google Sheets API**

- [ ] **Step 2: Crear Service Account**

1. IAM & Admin → Service Accounts → Create
2. Nombre: `veronikite-sheets-writer`
3. Crear clave JSON → descargar archivo
4. Del archivo JSON extraer: `client_email` y `private_key`

- [ ] **Step 3: Crear el Google Sheet**

1. Crear un Google Sheet nuevo llamado: `VeronikIte CRM`
2. Crear 3 hojas (tabs):
   - `Leads` con headers: `Fecha | Nombre | Email | Estado | Notas`
   - `Solicitudes` con headers: `Fecha | Nombre | Email | Teléfono | Curso | Fecha Preferida | Mensaje | Estado | Notas`
   - `Bookings` con headers: `Fecha | Estudiante ID | Curso ID | Slot ID | Monto COP | Estado Pago | Referencia | Estado Booking`
3. Compartir el Sheet con el `client_email` del Service Account (permiso: Editor)
4. Copiar el Sheet ID de la URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

- [ ] **Step 4: Agregar variables de entorno**

Agregar al archivo `.env.local`:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=tu-sheet-id-aqui
GOOGLE_SHEETS_CLIENT_EMAIL=veronikite-sheets-writer@veronikite-crm.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

- [ ] **Step 5: Actualizar .env.example**

Modify: `.env.example` — agregar al final:

```env
# Google Sheets CRM
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email
GOOGLE_SHEETS_PRIVATE_KEY="your-private-key"
```

- [ ] **Step 6: Commit**

```bash
git add .env.example
git commit -m "chore: add Google Sheets CRM env vars to .env.example"
```

---

### Task 3: Crear módulo google-sheets.ts

**Files:**
- Create: `src/lib/google-sheets.ts`

- [ ] **Step 1: Crear el módulo con autenticación y funciones de escritura**

```typescript
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuth() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    return null;
  }

  return new google.auth.JWT(clientEmail, undefined, privateKey, SCOPES);
}

function getSheets() {
  const auth = getAuth();
  if (!auth) return null;
  return google.sheets({ version: 'v4', auth });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

/**
 * Append a row to a specific sheet tab.
 * Fails silently (logs error) so it never blocks the main Supabase flow.
 */
async function appendRow(sheetName: string, values: (string | number | null)[]) {
  try {
    const sheets = getSheets();
    if (!sheets || !SPREADSHEET_ID) {
      console.warn('[Google Sheets] Not configured, skipping sync');
      return;
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });
  } catch (error) {
    console.error(`[Google Sheets] Failed to append to ${sheetName}:`, error);
  }
}

/** Sync a new lead to the "Leads" sheet */
export async function syncLead(data: { name: string; email: string }) {
  const now = new Date().toISOString();
  await appendRow('Leads', [now, data.name, data.email, 'Nuevo', '']);
}

/** Sync a booking request to the "Solicitudes" sheet */
export async function syncBookingRequest(data: {
  name: string;
  email: string;
  phone: string;
  course: string;
  preferred_date: string | null;
  message: string | null;
}) {
  const now = new Date().toISOString();
  await appendRow('Solicitudes', [
    now,
    data.name,
    data.email,
    data.phone,
    data.course,
    data.preferred_date ?? '',
    data.message ?? '',
    'Pendiente',
    '',
  ]);
}

/** Sync a confirmed booking to the "Bookings" sheet */
export async function syncBooking(data: {
  student_id: string;
  course_id: string;
  slot_id: string;
  amount_cop: number;
  payment_status: string;
  payment_reference: string;
  status: string;
}) {
  const now = new Date().toISOString();
  await appendRow('Bookings', [
    now,
    data.student_id,
    data.course_id,
    data.slot_id,
    data.amount_cop,
    data.payment_status,
    data.payment_reference,
    data.status,
  ]);
}
```

- [ ] **Step 2: Verificar que compila**

```bash
npx tsc --noEmit src/lib/google-sheets.ts
```
Expected: sin errores

- [ ] **Step 3: Commit**

```bash
git add src/lib/google-sheets.ts
git commit -m "feat: add Google Sheets CRM service module with lead, booking request, and booking sync"
```

---

## Chunk 2: Integración con API Routes existentes

### Task 4: Integrar sync en /api/leads

**Files:**
- Modify: `src/app/api/leads/route.ts:28-31`

- [ ] **Step 1: Agregar import y llamada a syncLead**

Después de la línea `import { createClient } from '@/lib/supabase/server';` agregar:

```typescript
import { syncLead } from '@/lib/google-sheets';
```

Después del bloque `if (error) { ... }` (línea 39) y antes del `return NextResponse.json({ success: true });`, agregar:

```typescript
        // Sync to Google Sheets CRM (fire-and-forget, non-blocking)
        syncLead({ name: name.trim(), email: email.trim().toLowerCase() });
```

- [ ] **Step 2: Verificar que compila**

```bash
npx tsc --noEmit
```
Expected: sin errores

- [ ] **Step 3: Commit**

```bash
git add src/app/api/leads/route.ts
git commit -m "feat: sync new leads to Google Sheets CRM"
```

---

### Task 5: Integrar sync en /api/booking

**Files:**
- Modify: `src/app/api/booking/route.ts:28-35`

- [ ] **Step 1: Agregar import y llamada a syncBookingRequest**

Después de la línea `import { createClient } from '@/lib/supabase/server';` agregar:

```typescript
import { syncBookingRequest } from '@/lib/google-sheets';
```

Después del bloque `if (error) { ... }` y antes del `return NextResponse.json({ success: true });`, agregar:

```typescript
        // Sync to Google Sheets CRM (fire-and-forget, non-blocking)
        syncBookingRequest({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            course: course.trim(),
            preferred_date: date || null,
            message: message?.trim() || null,
        });
```

- [ ] **Step 2: Verificar que compila**

```bash
npx tsc --noEmit
```
Expected: sin errores

- [ ] **Step 3: Commit**

```bash
git add src/app/api/booking/route.ts
git commit -m "feat: sync booking requests to Google Sheets CRM"
```

---

### Task 6: Integrar sync en /api/bookings (POST)

**Files:**
- Modify: `src/app/api/bookings/route.ts`

- [ ] **Step 1: Agregar import y llamada a syncBooking**

Después de la línea `import { notifyBookingEvent } from '@/lib/notifications';` agregar:

```typescript
import { syncBooking } from '@/lib/google-sheets';
```

Después del incremento de `booked_count` y antes del fetch de student profile, agregar:

```typescript
        // Sync to Google Sheets CRM (fire-and-forget, non-blocking)
        syncBooking({
            student_id: user.id,
            course_id: slot.course.id,
            slot_id,
            amount_cop: slot.course.price_cop,
            payment_status: 'confirmed',
            payment_reference: booking.id,
            status: 'confirmed',
        });
```

- [ ] **Step 2: Verificar que compila**

```bash
npx tsc --noEmit
```
Expected: sin errores

- [ ] **Step 3: Commit**

```bash
git add src/app/api/bookings/route.ts
git commit -m "feat: sync confirmed bookings to Google Sheets CRM"
```

---

## Chunk 3: Endpoint de sincronización inicial

### Task 7: Crear endpoint para sync masivo de datos existentes

**Files:**
- Create: `src/app/api/crm/sync/route.ts`

Este endpoint permite sincronizar los datos que ya existen en Supabase hacia Google Sheets (one-time migration o re-sync).

- [ ] **Step 1: Crear el endpoint**

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { syncLead, syncBookingRequest, syncBooking } from '@/lib/google-sheets';

export async function POST() {
  try {
    const supabase = await createClient();

    // Verify admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const results = { leads: 0, bookingRequests: 0, bookings: 0 };

    // Sync all leads
    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: true });

    if (leads) {
      for (const lead of leads) {
        await syncLead({ name: lead.name, email: lead.email });
        results.leads++;
      }
    }

    // Sync all booking requests
    const { data: requests } = await supabase
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: true });

    if (requests) {
      for (const req of requests) {
        await syncBookingRequest({
          name: req.name,
          email: req.email,
          phone: req.phone,
          course: req.course,
          preferred_date: req.preferred_date,
          message: req.message,
        });
        results.bookingRequests++;
      }
    }

    // Sync all bookings
    const { data: bookings } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: true });

    if (bookings) {
      for (const b of bookings) {
        await syncBooking({
          student_id: b.student_id,
          course_id: b.course_id,
          slot_id: b.slot_id,
          amount_cop: b.amount_cop,
          payment_status: b.payment_status,
          payment_reference: b.payment_reference,
          status: b.status,
        });
        results.bookings++;
      }
    }

    return NextResponse.json({
      success: true,
      synced: results,
    });
  } catch (error) {
    console.error('CRM sync error:', error);
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Verificar que compila**

```bash
npx tsc --noEmit
```
Expected: sin errores

- [ ] **Step 3: Commit**

```bash
git add src/app/api/crm/sync/route.ts
git commit -m "feat: add CRM bulk sync endpoint for existing Supabase data"
```

---

## Chunk 4: Variables de entorno y validación final

### Task 8: Actualizar .env.example

**Files:**
- Modify: `.env.example`

- [ ] **Step 1: Agregar las variables de Google Sheets al final del archivo**

```env

# Google Sheets CRM
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email
GOOGLE_SHEETS_PRIVATE_KEY="your-private-key"
```

- [ ] **Step 2: Commit**

```bash
git add .env.example
git commit -m "docs: add Google Sheets CRM env vars to .env.example"
```

---

### Task 9: Build completo y prueba end-to-end

- [ ] **Step 1: Verificar build completo**

```bash
npm run build
```
Expected: Build exitoso sin errores

- [ ] **Step 2: Prueba manual — Lead**

1. Iniciar dev server: `npm run dev`
2. Enviar POST a `/api/leads` con body: `{"name":"Test CRM","email":"test@crm.com"}`
3. Verificar que la fila aparece en la hoja "Leads" del Google Sheet

- [ ] **Step 3: Prueba manual — Booking Request**

1. Enviar POST a `/api/booking` con body:
   ```json
   {"name":"Test","email":"test@crm.com","phone":"3001234567","course":"descubrimiento"}
   ```
2. Verificar que la fila aparece en la hoja "Solicitudes"

- [ ] **Step 4: Prueba manual — Sync masivo**

1. Autenticarse como admin
2. Enviar POST a `/api/crm/sync`
3. Verificar que los datos existentes de Supabase aparecen en las 3 hojas

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "feat: complete Google Sheets CRM integration for VeronikIte"
```

---

## Resumen de arquitectura

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Public Forms   │────▶│  API Routes  │────▶│    Supabase      │
│  (Lead/Booking) │     │  /api/leads  │     │  (fuente verdad) │
└─────────────────┘     │  /api/booking│     └──────────────────┘
                        │  /api/bookings│            │
                        └──────┬───────┘            │
                               │                     │
                               ▼                     │
                    ┌──────────────────┐             │
                    │  google-sheets.ts│◀────────────┘
                    │  (fire & forget) │   /api/crm/sync
                    └────────┬─────────┘   (bulk sync)
                             │
                             ▼
                    ┌──────────────────┐
                    │  Google Sheet    │
                    │  "VeronikIte CRM"│
                    │  ├── Leads       │
                    │  ├── Solicitudes │
                    │  └── Bookings    │
                    └──────────────────┘
```

**Principios de diseño:**
- **Fire-and-forget:** La escritura a Google Sheets nunca bloquea ni falla la respuesta principal. Si Google falla, se loguea el error y la vida sigue.
- **Supabase = fuente de verdad:** El Sheet es solo una vista de seguimiento comercial.
- **Sync manual disponible:** `/api/crm/sync` permite re-poblar el Sheet en cualquier momento desde los datos de Supabase.
