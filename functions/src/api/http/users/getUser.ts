import { HttpWrapper } from "../wrapper";
import { ReadUserRow } from "../../../db/sqlc/user_sql";
import { GetUserService } from "../../../services/users/getUser";

class GetUser extends HttpWrapper {
  public override execute(
      payload: { id: string },
  ): Promise<ReadUserRow | null> {
    return new GetUserService(payload.id).execute();
  }
}

export const getUserFunction = new GetUser().firebaseFunctions;
