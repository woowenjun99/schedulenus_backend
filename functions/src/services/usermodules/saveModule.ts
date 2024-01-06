import {
  type FindModuleByIdArgs,
  type SaveModuleArgs,
  findModuleById,
  saveModule,
} from "../../db/sqlc/usermodules_sql";
import { pool } from "../../db/pool";
import { z } from "zod";

export type SaveModuleServiceRequest = Readonly<{
  moduleCode: string
  semesterTaken: number
}>

export class SaveModuleService {
  constructor(private payload: SaveModuleServiceRequest, private uid: string) {}

  private async validate(): Promise<void> {
    // Validate the input schema.
    this.payload = z.object({
      moduleCode: z.string(),
      semesterTaken: z.number().int().positive(),
    }).parse(this.payload);

    // Check if the user has saved the module before.
    const module = await findModuleById(pool, {
      moduleCode: this.payload.moduleCode,
      userId: this.uid,
    } as FindModuleByIdArgs);

    if (module) throw Error("Module has already been saved");

    return Promise.resolve();
  }

  public async execute() {
    await this.validate();

    // Save the module as per the request
    await saveModule(pool, {
      moduleCode: this.payload.moduleCode,
      semesterTaken: this.payload.semesterTaken,
      userId: this.uid,
    } as SaveModuleArgs);
  }
}
