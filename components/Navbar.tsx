'use client'; 

import { useState } from 'react';
import Link from 'next/link'; // Link otimizado do Next.js 
import Image from 'next/image'; // Componente de imagem otimizado do Next.js
import { usePathname } from 'next/navigation'; // Hook para saber em qual página o usuário está
// Importando ícones da biblioteca 'lucide-react' - Deem uma olhada depois
import { Gamepad2, BarChart3, Info, LogIn, Menu, X } from 'lucide-react';

export default function Navbar() {
  // --- ESTADOS E HOOKS ---
  
  // Estado para controlar se o menu mobile está Aberto (true) ou Fechado (false)
  const [isOpen, setIsOpen] = useState(false);
  
  // Hover do link ativo verde
  const pathname = usePathname();

  // --- FUNÇÕES AUXILIARES ---

  // Alterna entre abrir e fechar
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Força o fechamento (usado para clicar em um link)
  const closeMenu = () => setIsOpen(false);

  // --- CONFIGURAÇÃO DOS LINKS ---
  // Criamos uma lista (array) para não repetir código HTML
  // Se precisar adicionar um link novo, é só adicionar por aqui!!!!
  const navItems = [
    { label: 'Início', href: '/', icon: <Gamepad2 size={18} /> },
    { label: 'Pesquisa & Dados', href: '/dados', icon: <BarChart3 size={18} /> },
    { label: 'Sobre', href: '/sobre', icon: <Info size={18} /> },
  ];

  return (
    // <nav>: Container Principal
    // fixed top-0: Prende o menu no topo da tela
    // z-50: Garante que o menu fique POR CIMA de tudo no site
    // backdrop-blur-md: Cria aquele efeito de "vidro fosco" bonito
    <nav className="w-full bg-brand-dark/95 backdrop-blur-md border-b border-white/5 fixed top-0 z-50 h-[72px]">
      
      {/* Container centralizado que limita a largura do conteúdo */}
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        
        {/* ================= LOGO ================= */}
        <Link 
          href="/" 
          onClick={closeMenu} // Fecha o menu mobile se clicar no logo
          className="flex items-center gap-2 text-white z-50"
        >
           {/* Imagem do Logo */}
           <Image 
             src="/assets/img/LOGO GAME CONNECTION.svg" 
             alt="Logo" 
             width={30} 
             height={30} 
             className="w-8 h-8"
           />
           {/* Texto do Logo - whitespace-nowrap impede que o texto quebre linha */}
           <span className="font-bold text-lg md:text-xl tracking-tight whitespace-nowrap">
             Game Connection
           </span>
        </Link>

        {/* ================= MENU DESKTOP ================= */}
        {/* hidden md:flex -> Esconde em celulares (hidden) e mostra em telas médias pra cima (flex) */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* Mapeamento da lista 'navItems' para criar os links automaticamente */}
          {navItems.map((item) => (
            <Link 
              key={item.href} // O React precisa de uma chave única para cada item
              href={item.href} 
              // Lógica Condicional: Se a URL atual for igual ao link, pinta de verde e negrito
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
        {/* md:hidden -> Só aparece em telas pequenas, some em telas médias pra cima */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-brand-green p-1 focus:outline-none"
          aria-label="Abrir Menu"
        >
          {/* Se isOpen for true mostra o X, senão mostra as Barras (Menu) */}
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* ================= MENU MOBILE (DROPDOWN) ================= */}
      {/* Este é o painel que desliza/aparece quando clicamos no hambúrguer */}
      <div className={`
        fixed top-[72px] left-0 w-full bg-brand-dark border-b border-white/10 shadow-2xl
        flex flex-col overflow-hidden transition-all duration-300 ease-in-out md:hidden
        ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} 
        /* Lógica acima: Se aberto, altura máxima de 400px. Se fechado, altura 0 (esconde) */
      `}>
        <div className="flex flex-col p-6 gap-3">
          
          {/* Links do Mobile (Reutilizando a mesma lista) */}
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={closeMenu} // Importante: fecha o menu ao clicar!
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

          {/* Linha divisória sutil */}
          <div className="h-px bg-white/10 my-2 mx-2"></div>

          {/* Botão de Cadastro Mobile (Largo e fácil de clicar) */}
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