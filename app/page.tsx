'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
// Todos os ícones importados para rechear os achievements e cards
import { Users, ArrowRight, Gamepad2, MessageSquare, Info, UserPlus, BarChart3, Heart, Shield, Sword, Target, Zap, Star, Trophy } from "lucide-react";

export default function Home() {
  const [subtitle, setSubtitle] = useState("");
  const [userCount, setUserCount] = useState(0);
  
  // Array completo de Achievements com categorias e ícones
  const achievements = [
    { icon: Gamepad2, title: "Jogue uma Partida" },
    { icon: Users, title: "Crie uma Conexão" },
    { icon: MessageSquare, title: "Inicie uma Conversa" },
    { icon: Heart, title: "Achievement de Final Feliz" },
    { icon: Trophy, title: "Primeira Vitória" },
    { icon: Shield, title: "Conta Blindada" }, 
    { icon: Sword, title: "Duo Imbatível" },
    { icon: Target, title: "Match Perfeito" },
    { icon: Zap, title: "Conexão Rápida" },
    { icon: Star, title: "Gamer de Elite" },
  ];
  
  const fullSubtitle = "A Game Connection é um espaço feito para gamers se conectarem, formarem duos, novas amizades e quem sabe, o achievement de final feliz.";

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullSubtitle.length) {
        setSubtitle(fullSubtitle.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    const finalValue = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000;
    let startValue = 0;
    const duration = 2000;
    const increment = finalValue / (duration / 20);

    const counterInterval = setInterval(() => {
      startValue += increment;
      if (startValue >= finalValue) {
        setUserCount(finalValue);
        clearInterval(counterInterval);
      } else {
        setUserCount(Math.floor(startValue));
      }
    }, 20);

    return () => {
      clearInterval(typeInterval);
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 relative overflow-hidden dark:bg-brand-dark transition-colors duration-500">
  
        {/* GLOW DE FUNDO */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
        aria-hidden="true"
      ></div>

      <div className="container mx-auto max-w-6xl z-10 flex flex-col w-full">
        
        {/* ================= SEÇÃO ORIGINAL ================= */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center pt-20">
          
          {/* TÍTULO PRINCIPAL */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 leading-tight text-gray-900 dark:text-white animate-fade-in-up drop-shadow-2xl transition-colors duration-500">
            Mais que Partidas<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
              Criamos Conexões
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-12 max-w-3xl leading-relaxed min-h-[80px] md:min-h-[60px] font-light transition-colors duration-500">
            {subtitle}
            <span className="animate-pulse text-brand-green font-bold" aria-hidden="true">|</span>
          </p>
          
          {/* BOTÃO DE AÇÃO */}
          <Link 
            href="/cadastro" 
            className="group relative inline-flex items-center justify-center bg-brand-green text-brand-dark text-lg md:text-xl font-extrabold rounded-lg px-12 py-4 mb-16 transition-all duration-300 ease-in-out shadow-[0_4px_0_0_#0ea149] hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none"
            aria-label="Ir para página de cadastro para encontrar seu match"
          >
            Encontre o seu Match
            <ArrowRight className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          {/* CONTADOR DE USUÁRIOS */}
          <div className="inline-flex items-center justify-center gap-5 px-10 py-4 rounded-2xl bg-white/60 dark:bg-brand-surface/40 backdrop-blur-md border border-brand-green/20 animate-fade-in-up hover:border-brand-green/40 transition-colors cursor-default min-w-[400px] shadow-lg">
            <div className="bg-brand-green/10 p-2.5 rounded-full">
              <Users className="text-brand-green w-6 h-6" aria-hidden="true" />
            </div>
            <div className="text-left">
              <span className="block font-mono font-bold text-gray-900 dark:text-white text-2xl leading-none mb-1 transition-colors duration-500">
                {userCount.toLocaleString("pt-BR")}
              </span>
              <span className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-widest font-bold transition-colors duration-500">
                gamers conectados
              </span>
            </div>
          </div>
        </div>

        {/* ================= NOVA SEÇÃO: ACHIEVEMENTS (ABAIXO DO SCROLL) ================= */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-20">
          
{/* Lado Esquerdo - Grid de Achievements */}
          <div className="flex-1 flex justify-center w-full" aria-label="Grid interativo de conquistas da plataforma" role="region">
            <div className="grid grid-cols-5 gap-3 md:gap-5">
              {achievements.map((achiev, index) => {
                const Icon = achiev.icon;
                const isActive = index === 2; 

                return (
                  <div 
                    key={index}
                    className={`group/achiev w-14 h-14 md:w-20 md:h-20 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-brand-green/10 border border-brand-green scale-110 shadow-[0_0_25px_rgba(29,229,109,0.5)]'  //animate-pulse - possibilidade em aberto
                        : 'bg-[#05051a] border border-brand-green/20 hover:bg-brand-green/10 hover:border-brand-green hover:scale-110 hover:shadow-[0_0_25px_rgba(29,229,109,0.5)]'
                    }`}
                    title={achiev.title}
                    role="img"
                    aria-label={`Conquista: ${achiev.title}`}
                  >
                    <Icon 
                      size={32} 
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-brand-green' : 'text-brand-green/40 group-hover/achiev:text-brand-green'
                      }`} 
                      aria-hidden="true" 
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lado Direito */}
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="text-brand-green font-bold text-sm tracking-widest uppercase mb-3 block">
              Desbloqueie seu Achievement
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white drop-shadow-xl">
              Seu Espaço para ir <br className="hidden lg:block" />
              Além das Partidas
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
              Conecte-se com gamers, forme duos imbatíveis, faça novas amizades e conquiste o seu &quot;achievement de final feliz&quot;.
            </p>
            <Link 
              href="/cadastro" 
              className="group relative inline-flex items-center justify-center bg-brand-green text-brand-dark text-lg md:text-xl font-extrabold rounded-lg px-12 py-4 transition-all duration-300 ease-in-out shadow-[0_4px_0_0_#0ea149] hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none"
              aria-label="Iniciar jogo e criar conta na plataforma"
            >
              Play
            </Link>
          </div>
        </div>

        {/* ================= NOVA SEÇÃO: CARDS DE AÇÃO ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-32" aria-label="Navegação principal da plataforma">
          
          {/* Card 1 */}
          <div className="bg-[#05051a] border border-brand-green/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl hover:border-brand-green/40 transition-colors group">
            <div className="w-20 h-20 bg-brand-green/5 border border-brand-green/20 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-brand-green/20 group-hover:shadow-[0_0_20px_rgba(29,229,109,0.3)] transition-all duration-300">
              <Info size={36} className="text-brand-green group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">Conheça ainda mais<br/>a Plataforma</h3>
            <p className="text-gray-400 mb-10 flex-grow text-sm leading-relaxed">
              Explore as principais funções e descubra tudo o que a plataforma oferece de forma rápida e intuitiva.
            </p>
            <Link 
              href="/sobre" 
              className="group/btn relative inline-flex items-center justify-center bg-brand-green text-brand-dark text-lg md:text-xl font-extrabold rounded-lg px-16 py-3 transition-all duration-300 ease-in-out shadow-[0_4px_0_0_#0ea149] hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none"
            >
              Acessar Agora
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-[#05051a] border border-brand-green/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl hover:border-brand-green/40 transition-colors group">
            <div className="w-20 h-20 bg-brand-green/5 border border-brand-green/20 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-brand-green/20 group-hover:shadow-[0_0_20px_rgba(29,229,109,0.3)] transition-all duration-300">
              <UserPlus size={36} className="text-brand-green group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">Desbloqueie seu<br/>Acesso</h3>
            <p className="text-gray-400 mb-10 flex-grow text-sm leading-relaxed">
              Cadastre-se em poucos passos e comece a utilizar todas as funcionalidades exclusivas da plataforma.
            </p>
            <Link 
              href="/cadastro" 
              className="group/btn relative inline-flex items-center justify-center bg-brand-green text-brand-dark text-lg md:text-xl font-extrabold rounded-lg px-16 py-3 transition-all duration-300 ease-in-out shadow-[0_4px_0_0_#0ea149] hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none"
            >
              Entrar no Game
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-[#05051a] border border-brand-green/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl hover:border-brand-green/40 transition-colors group">
            <div className="w-20 h-20 bg-brand-green/5 border border-brand-green/20 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-brand-green/20 group-hover:shadow-[0_0_20px_rgba(29,229,109,0.3)] transition-all duration-300">
              <BarChart3 size={36} className="text-brand-green group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">Análises e<br/>Insights</h3>
            <p className="text-gray-400 mb-10 flex-grow text-sm leading-relaxed">
              Visualize informações atualizadas e obtenha dados precisos para tomar decisões alinhadas ao que deseja.
            </p>
            <Link 
              href="/dados" 
              className="group/btn relative inline-flex items-center justify-center bg-brand-green text-brand-dark text-lg md:text-xl font-extrabold rounded-lg px-16 py-3 transition-all duration-300 ease-in-out shadow-[0_4px_0_0_#0ea149] hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none"
            >
              Explorar Dados
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}