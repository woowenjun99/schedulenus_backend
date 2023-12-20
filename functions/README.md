# Documentation

## Setup

1. sqlc CLI tool
2. golang-migrate
3. prisma

## Generating SQL queries

We will be using the SQLC CLI tool to generate the type-safe queries that will be used for the application.

1. In order to generate the SQL queries, go to `src/db/migration` and place the migration file.
2. Go to `src/db/query` and write the SQL command. The reason why we chose SQLC over ORMs such as Prisma
   is because Prisma is unable to support `JOIN` queries, which makes it less efficient even though the DX is
   good.
3. Once completed, run `sqlc generate` to generate the type-safe queries.

## Generating SQL migration files

Generating migration files is difficult and might lead to many issues. Therefore, we will be using the Prisma
to define the schema and the migration file.

1.
