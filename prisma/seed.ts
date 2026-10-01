// Seed protegido para criar/garantir o primeiro usuário MASTER.
// Uso: defina MASTER_EMAIL e MASTER_PASSWORD no .env e rode:
//   npm run db:seed:master
//
// Idempotente: se o e-mail já existir, garante o papel MASTER (sem duplicar).
// A senha NUNCA é impressa nos logs.

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.MASTER_EMAIL?.trim().toLowerCase();
  const password = process.env.MASTER_PASSWORD;
  const name = process.env.MASTER_NAME?.trim() || "Administração CMEBE";

  if (!email || !password) {
    console.error(
      "[seed] Defina MASTER_EMAIL e MASTER_PASSWORD no .env antes de rodar.",
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("[seed] MASTER_PASSWORD deve ter ao menos 8 caracteres.");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "MASTER" },
    });
    console.log(`[seed] Usuário já existia: papel garantido como MASTER (${email}).`);
    return;
  }

  const passwordHash = await hashPassword(password);
  await prisma.user.create({
    data: {
      name,
      email,
      phone: "",
      passwordHash,
      role: "MASTER",
    },
  });
  console.log(`[seed] Usuário MASTER criado com sucesso: ${email}`);
  console.log("[seed] Faça login e troque a senha assim que possível.");
}

main()
  .catch((error) => {
    console.error("[seed] Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
