import { NextResponse, type NextRequest } from "next/server";

// Barreira GROSSEIRA de rota (apenas UX): se não há cookie de sessão, manda para
// o login. A autorização REAL (sessão válida + papel) é checada no servidor, em
// cada página e rota de API — middleware não confia no cookie por si só.
const COOKIE = process.env.SESSION_COOKIE_NAME ?? "cmebe_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(COOKIE)?.value);

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/master/:path*", "/minha-filiacao/:path*", "/admin/:path*"],
};
