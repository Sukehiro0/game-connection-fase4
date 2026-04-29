'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Home, ArrowRight } from "lucide-react";

export default function FeedbackPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // === EFEITO 1: CONFETES DE CELEBRAÇÃO ===
  useEffect(() => {
    const colors = ["#1DE56D", "#39FF74", "#00ff66", "#ffffff"];
    const confettiCount = 50; // Quantidade
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        
        confetti.style.position = "fixed";
        confetti.style.width = Math.random() * 10 + 5 + "px";
        confetti.style.height = Math.random() * 5 + 5 + "px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = "-10px";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.opacity = "1";
        confetti.style.zIndex = "40"; 
        confetti.style.pointerEvents = "none";
        
        document.body.appendChild(confetti);
  
        const anim = confetti.animate([
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
          duration: 800 + Math.random() * 1200, 
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        });
        
        anim.onfinish = () => confetti.remove();
      }, i * 30); 
    }
  }, []);

  // === EFEITO 2: CONTADOR ===
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <style jsx global>{`
        @keyframes pop-rotate {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          60% { transform: scale(1.1) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-pop-rotate {
          animation: pop-rotate 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* CONTAINER PRINCIPAL */}
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-4 relative overflow-hidden">
        
        {/* ==================== GLOW DE FUNDO (TOPO) ==================== */}
        <div 
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
        ></div>

        {/* CARTÃO DE SUCESSO */}
        <div className="w-full max-w-lg bg-brand-dark/95 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(29,229,109,0.1)] relative z-10 text-center animate-fade-in-up">
          
          {/* ÍCONE */}
          <div className="mx-auto mb-8 mt-4 bg-brand-green/20 w-28 h-28 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(29,229,109,0.4)] animate-pop-rotate">
            <Check className="text-brand-green w-14 h-14" strokeWidth={4} />
          </div>

          {/* TÍTULO */}
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Cadastro realizado!<br />
            <span className="text-brand-green">GG!</span>
          </h1>

          {/* DESCRIÇÃO */}
          <p className="text-gray-300 mt-4 text-lg">
            Sua conta foi criada com sucesso. Agora é só encontrar seu duo e partir para o rankup.
          </p>

          {/* BOTÃO HOME */}
          <Link 
            href="/"
            className="group w-full bg-brand-green text-brand-dark font-extrabold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#0ea149] transition-all hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 mt-10"
            aria-label="Voltar para a página inicial"
          >
            <Home size={20} aria-hidden="true" />
            Ir para Home
          </Link>

          {/* CONTADOR */}
          <p className="text-sm text-gray-300 mt-6 font-medium">
            Redirecionando automaticamente em <span className="text-brand-green font-bold text-base">{countdown}</span> segundos...
          </p>

          {/* LINK DADOS */}
          <div className="mt-4">
            <Link href="/dados" className="text-sm text-gray-300 hover:text-white flex items-center justify-center gap-1 transition-colors">
              Ou veja os dados do mercado <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}