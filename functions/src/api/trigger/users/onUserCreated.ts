import * as functions from "firebase-functions";
import { Pool } from "pg";
import { type CreateUserArgs, createUser } from "../../../db/sqlc/user_sql";

export const onUserCreatedFunction = functions
    .region("asia-southeast1")
    .auth.user()
    .onCreate(async (user) => {
      try {
        const pool: Pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });

        await createUser(pool, {
          id: user.uid,
          email: user.email,
          fullName: "",
          major: "",
          semester: 1,
        } as CreateUserArgs);

        pool.end();
      } catch (e) {
        functions.logger.error(
            "onUserCreated error: ",
            (e as Error).message
        );
      }
    });
