-- CreateTable
CREATE TABLE "Instrutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "instrutorId" INTEGER NOT NULL,
    CONSTRAINT "Curso_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "Instrutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Instrutor_email_key" ON "Instrutor"("email");
