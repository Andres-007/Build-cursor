// src/pages/api/db/add-subject.ts
import type { APIRoute } from 'astro';
import { sql } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  const { name, userId } = await request.json();

  try {
    const newSubject = await sql`
      INSERT INTO subjects (name, user_id)
      VALUES (${name}, ${userId})
      RETURNING *
    `;
    
    return new Response(JSON.stringify(newSubject), { status: 201 });
  } catch (error) {
    return new Response("Error guardando en PostgreSQL", { status: 500 });
  }
}