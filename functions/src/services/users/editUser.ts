import { Pool } from "pg";
import { type EditUserArgs, editUser } from "../../db/sqlc/user_sql";
import { z } from "zod";

export class EditUserService {
  constructor(
        private pool: Pool,
        private payload: EditUserArgs,
        private uid: string
  ) {}

  private validate(): void {
    this.payload = z
        .object({
          email: z.string().email(),
          fullName: z.string(),
          id: z.string(),
          major: z.string(),
          semester: z.number().int(),
          username: z.string(),
        })
        .parse(this.payload);

    if (this.payload.id !== this.uid) {
      throw Error("You do not have permission to edit the user");
    }
  }

  public execute(): Promise<void> {
    this.validate();
    return editUser(this.pool, this.payload as EditUserArgs);
  }
}
