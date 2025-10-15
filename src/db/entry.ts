"use server";

import { MediaEntry } from "@/types/media";
import { neon } from "@neondatabase/serverless";

const db_url = process.env.DATABASE_URL;
if (!db_url) throw new Error("Missing env variable DATABASE_URL");
const sql = neon(db_url);

export default async function getEntries(listId?: number, limit?: number) {
  let whereClause = sql``;
  if (listId) whereClause = sql`WHERE list_id = ${listId}`;
  let limitClause = sql``;
  if (limit) limitClause = sql`LIMIT ${limit}`;
  const response = await sql`SELECT * FROM entry ${whereClause} ${limitClause}`;
  return response as MediaEntry[];
}

export async function getEntry(id: number) {
  const response = await sql`SELECT * from entry WHERE id=${id}`;
  return response[0] as MediaEntry;
}
