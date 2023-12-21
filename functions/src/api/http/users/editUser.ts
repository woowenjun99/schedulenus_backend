import { HttpWrapper } from "../wrapper";
import { EditUserService } from "../../../services/users/editUser";
import { EditUserArgs } from "../../../db/sqlc/user_sql";
import * as functions from "firebase-functions";

class EditUser extends HttpWrapper {
  override execute(
      payload: EditUserArgs,
      context: functions.https.CallableContext
  ): Promise<void> {
    if (!context.auth) throw Error("Unauthorised");

    return new EditUserService(
        payload,
        context.auth.uid
    ).execute();
  }
}

export const editUserFunction = new EditUser().firebaseFunctions;
