import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuth() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    return null;
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
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
