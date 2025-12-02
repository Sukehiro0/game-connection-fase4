'use client';

import { useState, useEffect } from "react";
import { Zap, ZapOff } from "lucide-react";

export default function ThemeToggle() {
  // PARTE 3: LÓGICA COMPUTACIONAL
  // Estado Binário: 0 = Normal, 1 = Modo Foco (P&B)
  const [focusBit, setFocusBit] = useState(0);

  // EFEITO: Aplica a decisão visual baseada no Bit
  useEffect(() => {
    // Acessa o elemento <html> do site
    const html = document.documentElement;
    
    if (focusBit === 1) {
      // Se Bit 1: Aplica filtro cinza e aumenta contraste (Modo Leitura/Foco)
      html.style.filter = 'grayscale(100%) contrast(110%)';
    } else {
      // Se Bit 0: Remove os filtros (Volta ao normal)
      html.style.filter = 'none';
    }
  }, [focusBit]);

  // Lógica XOR para alternar o bit (0 -> 1 -> 0)
  const toggleFocus = () => {
    setFocusBit((prev) => prev ^ 1);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
      
      {/* Labelzinho que aparece só quando ativa (Feedback Visual) */}
      <span className={`
        text-[10px] font-mono bg-black/80 px-2 py-1 rounded text-brand-green border border-brand-green/30 transition-opacity duration-300
        ${focusBit === 1 ? 'opacity-100' : 'opacity-0'}
      `}>
        STATUS: FOCUS_MODE_ON (1)
      </span>

      {/* O Botão Flutuante */}
      <button
        onClick={toggleFocus}
        className={`
          p-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:scale-110 border-2
          ${focusBit === 0 
            ? 'bg-brand-green border-white text-brand-dark shadow-[0_0_20px_rgba(29,229,109,0.4)] rotate-0' // Estilo Ligado
            : 'bg-gray-800 border-gray-500 text-gray-400 rotate-180' // Estilo Desligado
          }
        `}
        title={focusBit === 0 ? "Ativar Modo Foco (1)" : "Desativar (0)"}
      >
        {focusBit === 0 ? <Zap size={24} fill="currentColor" /> : <ZapOff size={24} />}
      </button>
    </div>
  );
}