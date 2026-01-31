// src/pages/api/db/add-subject.ts
import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const name =
    typeof (payload as { name?: unknown }).name === 'string'
      ? (payload as { name?: string }).name?.trim()
      : '';
  const userId = (payload as { userId?: unknown }).userId;

  const hasValidUserId =
    typeof userId === 'string' ? userId.trim().length > 0 : typeof userId === 'number';

  if (!name || !hasValidUserId) {
    return new Response("Datos inválidos", { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection('subjects').insertOne({
      name,
      user_id: userId
    });

    return new Response(
      JSON.stringify({ id: result.insertedId.toString(), name, user_id: userId }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error guardando en MongoDB', error);
    return new Response("Error guardando en MongoDB", { status: 500 });
  }
};