import * as functions from "firebase-functions";
import { deleteUser, DeleteUserArgs } from "../../../db/sqlc/user_sql";
import { pool } from "../../../db/pool";

export const onUserDeletedFunction = functions
    .region("asia-southeast1")
    .auth.user()
    .onDelete(async (user) => {
      try {
        // TODO: Add in the cascade portion
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
