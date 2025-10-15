"use server";

import { neon } from "@neondatabase/serverless";

import { MediaList } from "@/types/media";

const db_url = process.env.DATABASE_URL;
if (!db_url) throw new Error("Missing env variable DATABASE_URL");
const sql = neon(db_url);

export default async function getLists(args?: {
  type?: MediaList["type"];
  limit?: number;
}) {
  let whereClause = sql``;
  if (args?.type) whereClause = sql`WHERE type = ${args.type}`;
  let limitClause = sql``;
  if (args?.limit) limitClause = sql`LIMIT ${args.limit}`;
  const response = await sql`SELECT * FROM list ${whereClause} ${limitClause}`;
  return response as MediaList[];
}

export async function getList(args?: {
  id?: MediaList["id"];
  slug?: MediaList["slug"];
}) {
  let whereClause = sql``;
  if (args?.id) whereClause = sql`WHERE id=${args.id}`;
  else if (args?.slug) whereClause = sql`WHERE slug=${args.slug}`;
  const response = await sql`SELECT * from entry ${whereClause}`;
  return response[0] as MediaList | undefined;
}
