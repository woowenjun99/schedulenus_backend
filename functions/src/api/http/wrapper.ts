import * as functions from "firebase-functions";
import { pool } from "../../db/pool";

/**
 * A wrapper over the https cloud functions. Override the execute
 * function.
 */
export abstract class HttpWrapper {
    abstract execute(
        payload: unknown,
        context: functions.https.CallableContext
    ): Promise<object | void | null>;

    get firebaseFunctions() {
      return functions
          .region("asia-southeast1")
          .https.onCall(
              async (
                  payload: unknown,
                  context: functions.https.CallableContext
              ) => {
                try {
                  const result = await this.execute(
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
