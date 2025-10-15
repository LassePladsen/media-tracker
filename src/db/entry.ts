"use server";

import { neon } from "@neondatabase/serverless";

import { MediaEntry } from "@/types/media";

const db_url = process.env.DATABASE_URL;
if (!db_url) throw new Error("Missing env variable DATABASE_URL");
const sql = neon(db_url);

export default async function getEntries(args?: {
  listId?: MediaEntry["list_id"];
  limit?: number;
}) {
  let whereClause = sql``;
  if (args?.listId) whereClause = sql`WHERE list_id = ${args.listId}`;
  let limitClause = sql``;
  if (args?.limit) limitClause = sql`LIMIT ${args.limit}`;
  const response = await sql`SELECT * FROM entry ${whereClause} ${limitClause}`;
  return response as MediaEntry[];
}

export async function getEntry(id: MediaEntry["id"]) {
  const response = await sql`SELECT * from entry WHERE id=${id}`;
  return response[0] as MediaEntry | undefined;
}
