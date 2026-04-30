'use client'; 

import { usePathname } from 'next/navigation';

export default function Footer() {
   const pathname = usePathname();

  // Caso a URL comece com "/admin" a Navbar normal do user desaparece
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full bg-brand-dark border-t border-white/5 py-8 text-center mt-auto relative z-50">
      <div className="container mx-auto px-4">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Game Connection - Todos os direitos reservados.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Desenvolvido para Atividade 05 Enterprise Challange
        </p>
      </div>
    </footer>
  );
}
