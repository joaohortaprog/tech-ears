-- CreateTable
CREATE TABLE "Filial" (
    "id" SERIAL NOT NULL,
    "matricula" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "coordenadorId" INTEGER NOT NULL,
    "geoX" TEXT NOT NULL,
    "geoY" TEXT NOT NULL,

    CONSTRAINT "Filial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_coordenadorId_fkey" FOREIGN KEY ("coordenadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
