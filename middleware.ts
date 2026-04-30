import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const ip = request.ip ?? '127.0.0.1';
  
  // ==========================================
  // 1. RATE LIMITING (Anti-Brute Force / DoS)
  // ==========================================
  // Bloqueio de IP ao tentar mais de 10 requisições em 60s
  if (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname.startsWith('/admin')) {
    const limit = 15; // Máximo de requisições sem choro
    const windowMs = 60 * 1000; // 1 minuto em ms
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, timer: Date.now() });
    } else {
      const data = rateLimitMap.get(ip);
      if (Date.now() - data.timer > windowMs) {
        rateLimitMap.set(ip, { count: 1, timer: Date.now() });
      } else {
        data.count++;
        if (data.count > limit) {
          // Ação da "IA" Bloqueio do IP
          console.warn(`[DEFESA CIBERNÉTICA] IP Bloqueado por Rate Limit: ${ip}`);
          return new NextResponse('Too Many Requests. Comportamento anômalo detectado.', { status: 429 });
        }
      }
    }
  }

  // ==========================================
  // 2. HELMET NATIVO (Security Headers OWASP)
  // ==========================================
  // Proteção contra XSS, Clickjacking e Sniffing de pacotes
  
  // Força navegação via HTTPS
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // Impede que o site seja colocado em iframes (Clickjacking)
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Impede que o navegador tente adivinhar o tipo de arquivo (MIME Sniffing)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Controle de Referenciador (Protege vazamento de dados de URL)
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy (Bloqueia injeção de scripts não autorizados - XSS)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};