// Estrutura de e-mail PREPARADA, porém honesta: se o SMTP não estiver
// configurado (ver docs/cmebe-env.md), o sistema NÃO finge envio — apenas
// registra a intenção e segue o fluxo. O transporte real (nodemailer) só é
// usado quando as variáveis SMTP existem e o pacote estiver instalado.

type EmailInput = { to: string; subject: string; html: string; text?: string };
type EmailResult = { sent: boolean; reason?: string };

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.EMAIL_FROM,
  );
}

export async function sendEmail(input: EmailInput): Promise<EmailResult> {
  if (!smtpConfigured()) {
    // Não finge envio. Registra a intenção para fins de log/depuração.
    console.info(
      `[email] SMTP não configurado — e-mail NÃO enviado. Destino: ${input.to} | Assunto: ${input.subject}`,
    );
    return { sent: false, reason: "smtp-not-configured" };
  }

  // ----------------------------------------------------------------------
  // PONTO DE INTEGRAÇÃO DO TRANSPORTE REAL.
  // Ao adicionar a dependência de envio (ex.: `npm i nodemailer`), habilite o
  // transporte aqui usando as variáveis SMTP_* e EMAIL_FROM (ver
  // docs/cmebe-env.md). Enquanto o transporte não é habilitado, NÃO fingimos
  // envio — retornamos sent:false de forma explícita.
  // Exemplo:
  //   const { createTransport } = await import("nodemailer");
  //   const transport = createTransport({ host: SMTP_HOST, port: SMTP_PORT, ... });
  //   await transport.sendMail({ from: EMAIL_FROM, to, subject, html, text });
  //   return { sent: true };
  // ----------------------------------------------------------------------
  console.warn(
    `[email] SMTP configurado, mas o transporte ainda não foi habilitado neste build. E-mail NÃO enviado. Destino: ${input.to}`,
  );
  return { sent: false, reason: "transport-not-enabled" };
}

// Mensagens específicas (best-effort; nunca quebram o fluxo principal).
export function emailRegistrationReceived(to: string, name: string) {
  return sendEmail({
    to,
    subject: "CMEBE — Solicitação de filiação recebida",
    html: `<p>Olá, ${name}.</p><p>Sua solicitação de filiação foi recebida e está em análise pelo CMEBE.</p>`,
  });
}

export function emailApproved(to: string, name: string, membershipNumber: string) {
  return sendEmail({
    to,
    subject: "CMEBE — Filiação aprovada",
    html: `<p>Olá, ${name}.</p><p>Sua filiação foi aprovada. Número: <strong>${membershipNumber}</strong>.</p>`,
  });
}

export function emailRejected(to: string, name: string, reason: string) {
  return sendEmail({
    to,
    subject: "CMEBE — Solicitação de filiação não aprovada",
    html: `<p>Olá, ${name}.</p><p>Sua solicitação não foi aprovada.</p><p>Motivo: ${reason}</p>`,
  });
}

export function emailDocumentsRequested(to: string, name: string, message: string) {
  return sendEmail({
    to,
    subject: "CMEBE — Documentos solicitados",
    html: `<p>Olá, ${name}.</p><p>Precisamos de documentos adicionais:</p><p>${message}</p>`,
  });
}

export function emailSuspended(to: string, name: string) {
  return sendEmail({
    to,
    subject: "CMEBE — Filiação suspensa",
    html: `<p>Olá, ${name}.</p><p>Sua filiação foi temporariamente suspensa. Entre em contato com o conselho.</p>`,
  });
}
