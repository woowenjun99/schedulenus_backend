import { pool } from "../../db/pool";
import { type EditUserArgs, editUser } from "../../db/sqlc/user_sql";
import { z } from "zod";

export class EditUserService {
  constructor(
        private payload: EditUserArgs,
        private uid: string
  ) {}

  private async validate(): Promise<void> {
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

  public async execute(): Promise<void> {
    await this.validate();
    return editUser(pool, this.payload as EditUserArgs);
  }
}
