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

export const findModuleByIdQuery = `-- name: FindModuleById :one
SELECT grades, module_code, semester_taken, user_id
FROM usermodules
WHERE user_id = $1 AND module_code = $2
LIMIT 1 OFFSET 0`;

export interface FindModuleByIdArgs {
    userId: string;
    moduleCode: string;
}

export interface FindModuleByIdRow {
    grades: number | null;
    moduleCode: string;
    semesterTaken: number;
    userId: string;
}

export async function findModuleById(client: Client, args: FindModuleByIdArgs): Promise<FindModuleByIdRow | null> {
    const result = await client.query({
        text: findModuleByIdQuery,
        values: [args.userId, args.moduleCode],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        grades: row[0],
        moduleCode: row[1],
        semesterTaken: row[2],
        userId: row[3]
    };
}

export const deleteModuleQuery = `-- name: DeleteModule :exec
DELETE FROM usermodules
WHERE user_id = $1 AND module_code = $2`;

export interface DeleteModuleArgs {
    userId: string;
    moduleCode: string;
}

export async function deleteModule(client: Client, args: DeleteModuleArgs): Promise<void> {
    await client.query({
        text: deleteModuleQuery,
        values: [args.userId, args.moduleCode],
        rowMode: "array"
    });
}

