"use server";

import { neon } from "@neondatabase/serverless";

import { MediaList } from "@/types/media";

const db_url = process.env.DATABASE_URL;
if (!db_url) throw new Error("Missing env variable DATABASE_URL");
const sql = neon(db_url);

export default async function getLists(
  type?: MediaList["type"],
  limit?: number,
) {
  let whereClause = sql``;
  if (type) whereClause = sql`WHERE list_id = ${type}`;
  let limitClause = sql``;
  if (limit) limitClause = sql`LIMIT ${limit}`;
  const response = await sql`SELECT * FROM entry ${whereClause} ${limitClause}`;
  return response as MediaList[];
}

export async function getList(id: MediaList["id"]) {
  const response = await sql`SELECT * from entry WHERE id=${id}`;
  return response[0] as MediaList;
}
