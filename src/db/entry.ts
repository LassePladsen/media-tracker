"use server";

import { neon } from "@neondatabase/serverless";

import { type Entry } from "@/types/schema";

type EntryWithoutId = Omit<Entry, "id">;

const TABLE = "entry";

const db_url = process.env.DATABASE_URL;
if (!db_url) throw new Error("Missing env variable DATABASE_URL");
const sql = neon(db_url);

export default async function getEntries(args?: {
  listId?: Entry["list_id"];
  limit?: number;
}) {
  let whereClause = sql``;
  if (args?.listId) whereClause = sql`WHERE list_id = ${args.listId}`;
  let limitClause = sql``;
  if (args?.limit) limitClause = sql`LIMIT ${args.limit}`;
  const response =
    await sql`SELECT * FROM ${sql.unsafe(TABLE)} ${whereClause} ${limitClause}`;
  return response as Entry[];
}

export async function getEntry(id: Entry["id"]) {
  const response = await sql`SELECT * from ${sql.unsafe(TABLE)} WHERE id=${id}`;
  return response[0] as Entry | undefined;
}

export async function updateEntry(id: Entry["id"], entryData: EntryWithoutId) {
  const response = await sql`
    UPDATE ${sql.unsafe(TABLE)} SET
      title=${entryData.title},
      status=${entryData.status},
      genre=${entryData.genre},
      year=${entryData.year},
      rating=${entryData.rating},
      episodes_watched=${entryData.episodes_watched},
      date_started=${entryData.date_started},
      date_ended=${entryData.date_ended}
    WHERE id=${id}`;
  return response;
}

export async function addEntry(entry: EntryWithoutId) {
  const response = await sql`
    INSERT INTO ${sql.unsafe(TABLE)} (
      list_id,
      title,
      status,
      genre,
      year,
      rating,
      episodes_watched,date_started,
      date_ended
      ) VALUES (
        ${entry.list_id},
        ${entry.title},
        ${entry.status},
        ${entry.genre},
        ${entry.year},
        ${entry.rating},
        ${entry.episodes_watched},
        ${entry.date_started},
        ${entry.date_ended}
      )
    `;
  return response;
}

export async function deleteEntry(id: Entry["id"]) {
  const response = await sql`DELETE FROM ${sql.unsafe(TABLE)} WHERE id=${id}`;
  return response;
}
