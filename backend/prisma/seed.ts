import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "admin@test.com";
  const password = "123456";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`Usuario de prueba creado: ${username}`);

  const tareaPrueba= 'Tarea de ejemplo para pruebas'
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      text: tareaPrueba,
      completed: false,
    },
  })

  console.log(`Tarea de prueba creada: ${tareaPrueba}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });