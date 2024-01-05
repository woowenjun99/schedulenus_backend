-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" BIGINT NOT NULL,
    "dirty" BOOLEAN NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "usermodules" (
    "grades" REAL,
    "module_code" TEXT NOT NULL,
    "semester_taken" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "usermodules_pkey" PRIMARY KEY ("user_id","module_code")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "has_completed_setup" BOOLEAN NOT NULL DEFAULT false,
    "major" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "username" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "usermodules" ADD CONSTRAINT "usermodules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
