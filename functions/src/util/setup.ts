import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
        "postgresql://root:secret@localhost:5432/test?sslmode=disable",
});

beforeAll(async () => {
  await pool.connect();
});

jest.mock("../db/pool", () => {
  return { pool }
})