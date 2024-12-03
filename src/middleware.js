//desktop/proj/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  console.log("Middleware carregado");
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Verifica se o usuário está autenticado
  console.log(token)
  if (!token) {
    console.log("estou aqui a dar kick")
    return NextResponse.redirect(new URL('/', req.url));
  }
  console.log("Middleware carregado 1")
  // Impede o acesso do admin1 à rota "/teste"
  if (req.nextUrl.pathname === '/teste' && token.role === 'admin1') {
    console.log("Middleware carregado 2")
    return NextResponse.redirect(new URL('/no-access', req.url));
  }

  console.log("Middleware carregado 3")
  return NextResponse.next();
}

console.log("Middleware carregado 1");


// Configuração das rotas protegidas
export const config = {
  matcher: ['/dashboard', '/teste', '/validateAssociate'],
};
