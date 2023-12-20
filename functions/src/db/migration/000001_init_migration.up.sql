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

-- CreateTable
CREATE TABLE "usermodules" (
    "grades" REAL,
    "module_code" TEXT NOT NULL,
    "semester_taken" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "usermodules_pkey" PRIMARY KEY ("userId","module_code")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "usermodules" ADD CONSTRAINT "usermodules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;