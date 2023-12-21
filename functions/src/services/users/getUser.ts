import { ReadUserRow, readUser } from "../../db/sqlc/user_sql";
import { pool } from "../../db/pool";

export class GetUserService {
  constructor(private userId: string) {}

  public execute(): Promise<ReadUserRow | null> {
    return readUser(pool, { id: this.userId });
  }
}
