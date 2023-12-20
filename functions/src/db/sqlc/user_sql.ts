import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const createUserQuery = `-- name: CreateUser :exec
INSERT INTO users 
(id, email, full_name, major, semester) 
VALUES ($1, $2, $3, $4, $5)`;

export interface CreateUserArgs {
    id: string;
    email: string;
    fullName: string;
    major: string;
    semester: number;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<void> {
    await client.query({
        text: createUserQuery,
        values: [args.id, args.email, args.fullName, args.major, args.semester],
        rowMode: "array"
    });
}

export const findUserByEmailOrIdQuery = `-- name: FindUserByEmailOrId :one
SELECT id
FROM users
WHERE id = $1 OR email = $2`;

export interface FindUserByEmailOrIdArgs {
    id: string;
    email: string;
}

export interface FindUserByEmailOrIdRow {
    id: string;
}

export async function findUserByEmailOrId(client: Client, args: FindUserByEmailOrIdArgs): Promise<FindUserByEmailOrIdRow | null> {
    const result = await client.query({
        text: findUserByEmailOrIdQuery,
        values: [args.id, args.email],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0]
    };
}

export const editUserQuery = `-- name: EditUser :exec
UPDATE users
SET email = $1, full_name = $2, semester = $3, major=$4, username=$5, has_completed_setup = true
WHERE id = $6`;

export interface EditUserArgs {
    email: string;
    fullName: string;
    semester: number;
    major: string;
    username: string | null;
    id: string;
}

export async function editUser(client: Client, args: EditUserArgs): Promise<void> {
    await client.query({
        text: editUserQuery,
        values: [args.email, args.fullName, args.semester, args.major, args.username, args.id],
        rowMode: "array"
    });
}

export const readUserQuery = `-- name: ReadUser :one
SELECT id, email, full_name, has_completed_setup, major, semester, username FROM users WHERE id = $1`;

export interface ReadUserArgs {
    id: string;
}

export interface ReadUserRow {
    id: string;
    email: string;
    fullName: string;
    hasCompletedSetup: boolean;
    major: string;
    semester: number;
    username: string | null;
}

export async function readUser(client: Client, args: ReadUserArgs): Promise<ReadUserRow | null> {
    const result = await client.query({
        text: readUserQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        email: row[1],
        fullName: row[2],
        hasCompletedSetup: row[3],
        major: row[4],
        semester: row[5],
        username: row[6]
    };
}

export const deleteUserQuery = `-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1`;

export interface DeleteUserArgs {
    id: string;
}

export async function deleteUser(client: Client, args: DeleteUserArgs): Promise<void> {
    await client.query({
        text: deleteUserQuery,
        values: [args.id],
        rowMode: "array"
    });
}

