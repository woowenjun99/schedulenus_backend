import * as functions from "firebase-functions";
import { Pool } from "pg";

/**
 * A wrapper over the https cloud functions. Override the execute
 * function.
 */
export abstract class HttpWrapper {
    abstract execute(
        pool: Pool,
        payload: unknown,
        context: functions.https.CallableContext
    ): Promise<object> | Promise<void>;

    get firebaseFunctions() {
      return functions
          .region("asia-southeast1")
          .https.onCall(
              async (
                  payload: unknown,
                  context: functions.https.CallableContext
              ) => {
                const pool = new Pool({
                  connectionString: process.env.DATABASE_URL,
                });

                try {
                  const result = await this.execute(
                      pool,
                      payload,
                      context,
                  );

                  pool.end();
                  return { success: true, ...result };
                } catch (e) {
                  pool.end();
                  return { success: false, error: (e as Error).message };
                }
              }
          );
    }
}
