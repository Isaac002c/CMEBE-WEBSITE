// Seed protegido para criar/garantir o usuário ADMIN (vice-presidente Pr. Gerson),
// responsável pelo painel de associados/parceiros.
// Uso: defina ADMIN_EMAIL e ADMIN_PASSWORD no .env e rode:
//   npm run db:seed:admin
//
// Idempotente: se o e-mail já existir, garante o papel ADMIN (sem duplicar).
// A senha NUNCA é impressa nos logs.

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Pr. Gerson";

  if (!email || !password) {
    console.error(
      "[seed:admin] Defina ADMIN_EMAIL e ADMIN_PASSWORD no .env antes de rodar.",
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("[seed:admin] ADMIN_PASSWORD deve ter ao menos 8 caracteres.");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({ where: { email }, data: { role: "ADMIN" } });
    console.log(`[seed:admin] Usuário já existia: papel garantido como ADMIN (${email}).`);
    return;
  }

  const passwordHash = await hashPassword(password);
  await prisma.user.create({
    data: {
      name,
      email,
      phone: "",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`[seed:admin] Usuário ADMIN criado com sucesso: ${email} (${name}).`);
  console.log("[seed:admin] Faça login em /entrar e troque a senha assim que possível.");
}

main()
  .catch((error) => {
    console.error("[seed:admin] Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
