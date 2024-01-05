import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const saveModuleQuery = `-- name: SaveModule :exec
INSERT INTO usermodules
(module_code, semester_taken, user_id)
VALUES ($1, $2, $3)`;

export interface SaveModuleArgs {
    moduleCode: string;
    semesterTaken: number;
    userId: string;
}

export async function saveModule(client: Client, args: SaveModuleArgs): Promise<void> {
    await client.query({
        text: saveModuleQuery,
        values: [args.moduleCode, args.semesterTaken, args.userId],
        rowMode: "array"
    });
}

