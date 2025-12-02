'use client';

import Link from "next/link";
import { Gamepad2, Handshake, Heart, ArrowRight } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20 px-4 relative overflow-hidden">
      
      {/* GLOW DE FUNDO */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100vw] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
      ></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-xl">
            Sobre o <span className="text-brand-green">Game Connection</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Nascemos com um propósito claro: usar a tecnologia para combater a solidão e a toxicidade no universo gamer, criando conexões reais e duradouras.
          </p>
        </div>

        {/* === SEÇÃO 1: JOGAR === */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">Um pouco sobre nossa história</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              O Game Connection nasceu para aproximar quem compartilha o mesmo amor por jogos. Mais do que formar duos, trios ou squads, acreditamos que jogar junto pode criar amizades verdadeiras. Nossa proposta é oferecer um espaço seguro e divertido.
            </p>
          </div>
          <div className="flex-1 order-1 md:order-2 flex justify-center">
            <div className="w-64 h-64 bg-brand-surface/50 border border-brand-green/30 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(29,229,109,0.15)] animate-fade-in-up hover:scale-105 transition-transform">
              <Gamepad2 size={80} className="text-brand-green mb-4" />
              <span className="text-white font-bold tracking-widest text-xl">JOGAR</span>
            </div>
          </div>
        </div>

        {/* === SEÇÃO 2: CONECTAR (Invertida) === */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 bg-brand-surface/50 border border-brand-green/30 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(29,229,109,0.15)] animate-fade-in-up delay-100 hover:scale-105 transition-transform">
              <Handshake size={80} className="text-brand-green mb-4" />
              <span className="text-white font-bold tracking-widest text-xl">CONECTAR</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">Por que é para você?</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Criamos um ambiente pensado para transformar partidas em conexões reais. Não queremos ser só mais um aplicativo: aqui você encontra mais do que parceiros de jogo. Você encontra pessoas de verdade com a mesma paixão.
            </p>
          </div>
        </div>

        {/* === SEÇÃO 3: AMAR === */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">Seus jogos, suas conexões</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              É fácil começar uma conversa quando você já sabe que compartilha os mesmos interesses. No Game Connection, você mostra seus jogos favoritos e objetivos. Assim, você se conecta com pessoas que têm afinidades reais com você.
            </p>
          </div>
          <div className="flex-1 order-1 md:order-2 flex justify-center">
            <div className="w-64 h-64 bg-brand-surface/50 border border-brand-green/30 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(29,229,109,0.15)] animate-fade-in-up delay-200 hover:scale-105 transition-transform">
              <Heart size={80} className="text-brand-green mb-4" />
              <span className="text-white font-bold tracking-widest text-xl">AMAR</span>
            </div>
          </div>
        </div>

        {/* CTA (Chamada para Ação) */}
        <div className="text-center mb-24">
          <Link 
            href="/cadastro" 
            className="group inline-flex items-center justify-center bg-brand-green text-brand-dark text-xl font-extrabold rounded-lg px-12 py-5 transition-all shadow-[0_4px_0_0_#0ea149] hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none"
          >
            Encontrar meu Duo Agora
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* EQUIPE */}
        <div className="text-center border-t border-white/10 pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Responsáveis pelo Projeto</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Vitor Ribeiro', 'Lucas Guedes', 'Pedro Luiz', 'Bruna Rodrigues', 'Washington'].map((nome) => (
              <span key={nome} className="bg-brand-surface border border-white/5 px-6 py-3 rounded-full text-gray-300 hover:text-white hover:border-brand-green/50 transition-colors cursor-default">
                {nome}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}