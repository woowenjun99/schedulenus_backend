import * as functions from "firebase-functions";
import { Pool } from "pg";
import { deleteUser, DeleteUserArgs } from "../../../db/sqlc/user_sql";

export const onUserDeletedFunction = functions
    .region("asia-southeast1")
    .auth.user()
    .onDelete(async (user) => {
      try {
        const pool: Pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });

        await deleteUser(pool, {
          id: user.uid,
        } as DeleteUserArgs);

        pool.end();
      } catch (e) {
        functions.logger.error(
            "onUserCreated error: ",
            (e as Error).message
        );
      }
    });
