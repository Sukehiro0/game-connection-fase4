'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Gamepad2, BarChart3, Info, LogIn, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const navItems = [
    { label: 'Início', href: '/', icon: <Gamepad2 size={18} /> },
    { label: 'Pesquisa & Dados', href: '/dados', icon: <BarChart3 size={18} /> },
    { label: 'Sobre', href: '/sobre', icon: <Info size={18} /> },
  ];

  // Caso a URL comece com "/admin" a Navbar normal do user desaparece
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="w-full bg-brand-dark/95 backdrop-blur-md border-b border-white/5 fixed top-0 z-50 h-[72px]">
      
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        
        {/* ================= LOGO ================= */}
        <Link 
          href="/" 
          onClick={closeMenu}
          className="flex items-center gap-2 text-white z-50"
        >
           {/* Imagem do Logo - COM ALT TEXT DESCRITIVO PARA ACESSIBILIDADE */}
           <Image 
             src="/assets/img/LOGO GAME CONNECTION.svg" 
             alt="Logo do Game Connection - Ícone de controle de videogame verde representando a plataforma de conexão entre gamers" 
             title="Logo do Game Connection - Ícone de controle de videogame verde representando a plataforma de conexão entre gamers"
             width={30} 
             height={30} 
             className="w-8 h-8"
           />
           <span className="font-bold text-lg md:text-xl tracking-tight whitespace-nowrap">
             Game Connection
           </span>
        </Link>

        {/* ================= MENU DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-8">
          
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-2 text-base font-medium transition-colors hover:text-brand-green
                ${pathname === item.href ? 'text-brand-green font-bold' : 'text-gray-300'}
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          
          {/* Botão de Cadastro (Destaque) */}
          <Link 
            href="/cadastro" 
            className="flex items-center gap-2 bg-brand-green text-brand-dark font-extrabold text-base py-2.5 px-6 rounded-lg shadow-[0_4px_0_0_#0ea149] transition-all hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a]"
          >
            <LogIn size={18} />
            Cadastro
          </Link>
        </div>

        {/* ================= BOTÃO HAMBÚRGUER (MOBILE) ================= */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-brand-green p-1 focus:outline-none"
          aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* ================= MENU MOBILE (DROPDOWN) ================= */}
      <div className={`
        fixed top-[72px] left-0 w-full bg-brand-dark border-b border-white/10 shadow-2xl
        flex flex-col overflow-hidden transition-all duration-300 ease-in-out md:hidden
        ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} 
      `}>
        <div className="flex flex-col p-6 gap-3">
          
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={closeMenu}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all border border-transparent
                ${pathname === item.href 
                  ? 'bg-brand-green/10 text-brand-green font-bold border-brand-green/20' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'}
              `}
            >
              {item.icon}
              <span className="text-base">{item.label}</span>
            </Link>
          ))}

          <div className="h-px bg-white/10 my-2 mx-2"></div>

          {/* Botão de Cadastro Mobile */}
          <Link 
            href="/cadastro" 
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 bg-brand-green text-brand-dark font-extrabold text-base py-3 rounded-lg shadow-[0_4px_0_0_#0ea149] active:scale-95 transition-transform mx-2 mt-1"
          >
            <LogIn size={20} />
            Cadastro
          </Link>
        </div>
      </div>
    </nav>
  );
}