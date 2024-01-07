import { HttpWrapper } from "../wrapper";
import {
  SaveModuleService,
  type SaveModuleServiceRequest,
} from "../../../services/usermodules/saveModule";
import * as functions from "firebase-functions";

class SaveModule extends HttpWrapper {
  override execute(
      payload: SaveModuleServiceRequest,
      context: functions.https.CallableContext
  ): Promise<void> {
    if (!context.auth) throw Error("Unauthorised");

    return new SaveModuleService(
        payload,
        context.auth.uid
    ).execute();
  }
}

export const saveModuleFunction = new SaveModule().firebaseFunctions;
