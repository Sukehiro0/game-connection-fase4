'use client';

// Importação dos Hooks do React 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Otimizador de imagens do Next
import Link from "next/link";   // Links internos otimizados
// Ícones da biblioteca 'lucide-react'
import { Eye, EyeOff, Check, Loader2, ArrowLeft } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter(); // Inicializa o roteador
  
  // === Memória dos Componentes ===
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [termos, setTermos] = useState(false); // Checkbox ESG
  
  // Estados visuais
  const [loading, setLoading] = useState(false); // Controla o spinner de carregamento
  const [mostrarSenha, setMostrarSenha] = useState(false); // Alterna entre texto/senha

  // Estados de Erro 
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  // Objeto que guarda quais requisitos da senha foram atendidos
  const [requisitos, setRequisitos] = useState({
    tamanho: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
  });

  const [forcaSenha, setForcaSenha] = useState({ porcentagem: 0, texto: "", cor: "bg-red-500" });

  useEffect(() => {
    // 1. Testes de senhas (Regex)
    const reqs = {
      tamanho: senha.length >= 8,
      maiuscula: /[A-Z]/.test(senha), // Tem letra maiúscula?
      minuscula: /[a-z]/.test(senha), // Tem letra minúscula?
      numero: /[0-9]/.test(senha),    // Tem número?
    };
    setRequisitos(reqs); // Atualiza os checks visuais

    // 2. Calcula a "nota" da senha (de 0 a 100)
    let forca = 0;
    if (reqs.tamanho) forca += 25;
    if (reqs.maiuscula) forca += 25;
    if (reqs.minuscula) forca += 25;
    if (reqs.numero) forca += 25;

    // 3. Define a cor da barra baseada na nota
    let cor = "bg-red-500";
    let texto = "";

    if (senha.length > 0) {
      if (forca <= 25) { texto = "Fraca"; cor = "bg-red-500"; }
      else if (forca <= 50) { texto = "Média"; cor = "bg-yellow-500"; }
      else if (forca <= 75) { texto = "Boa"; cor = "bg-blue-400"; }
      else { texto = "Forte"; cor = "bg-brand-green"; }
    }

    setForcaSenha({ porcentagem: forca, texto, cor });
    
    // Se o usuário começou a corrigir, limpamos a mensagem de erro antiga
    if (senhaErro) setSenhaErro("");
  }, [senha, senhaErro]); // Dependências: Roda quando 'senha' ou 'senhaErro' mudam

  // Limpa erro de email assim que o usuário digita algo novo
  useEffect(() => {
    if (emailErro) setEmailErro("");
  }, [email, emailErro]);

  // === HANDLER: O que acontece ao clicar em "Iniciar Jornada" ===
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar (comportamento padrão do HTML)
    let valido = true;

    // Validação Final do Email (Regex de email padrão)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      setEmailErro("E-mail inválido.");
      valido = false;
    }

    // Validação Final da Senha
    if (forcaSenha.porcentagem < 100) {
      setSenhaErro("A senha não atende aos requisitos.");
      valido = false;
    }

    // Se tudo estiver certo...
    if (valido) {
      setLoading(true); // Ativa o spinner
      // Simula um envio para a API (espera 2 segundos)
      setTimeout(() => {
        router.push("/feedback"); // Redireciona para a página de sucesso
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-10 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* ==================== BRILHO DE FUNDO (GLOW) ==================== */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
      ></div>

      {/* ==================== CAIXA DO FORMULÁRIO ==================== */}
      <div className="w-full max-w-lg bg-brand-dark/90 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(29,229,109,0.1)] relative z-10">
        
        {/* Botão Voltar (Seta) */}
        <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft />
        </Link>

        {/* Cabeçalho do Card */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Cadastre-se</h1>
          <p className="text-gray-400 mt-2 text-lg">Crie sua conta e encontre seu player 2.</p>
        </div>

        {/* Início do Formulário */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          {/* --- CAMPO EMAIL --- */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 ml-1">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
              // Classes condicionais: Se tiver erro, borda vermelha. Se não, borda verde transparente.
              className={`w-full bg-brand-green/5 border ${emailErro ? 'border-red-500' : 'border-brand-green/20'} text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-500`}
              placeholder="player@email.com"
            />
            {/* Mensagem de erro condicional */}
            {emailErro && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{emailErro}</p>}
          </div>

          {/* --- CAMPO SENHA --- */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 ml-1">Senha</label>
            <div className="relative">
              <input 
                type={mostrarSenha ? "text" : "password"} // Troca o tipo para mostrar/esconder
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={`w-full bg-brand-green/5 border ${senhaErro ? 'border-red-500' : 'border-brand-green/20'} text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-500 pr-12`}
                placeholder="••••••••"
              />
              {/* Botão do Olho (Icon eye) */}
              <button 
                type="button" // Importante ser type="button" para não enviar o form
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition-colors p-1"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Barra Visual de Força */}
            <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ease-out ${forcaSenha.cor}`} 
                style={{ width: `${forcaSenha.porcentagem}%` }}
              ></div>
            </div>
            
            {/* Checklist de Requisitos (Componentes Reutilizáveis) */}
            <div className="grid grid-cols-2 gap-2 mt-3 ml-1">
              <RequisitoItem label="8 caracteres" atingido={requisitos.tamanho} />
              <RequisitoItem label="Maiúscula" atingido={requisitos.maiuscula} />
              <RequisitoItem label="Minúscula" atingido={requisitos.minuscula} />
              <RequisitoItem label="Número" atingido={requisitos.numero} />
            </div>
          </div>

          {/* --- CHECKBOX TERMOS (Obrigatório para ESG/LGPD) --- */}
          <div className="flex items-start gap-3 pt-2 ml-1">
            <div className="relative flex items-center mt-0.5">
              <input 
                type="checkbox" 
                id="termos"
                checked={termos}
                onChange={(e) => setTermos(e.target.checked)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-brand-green/40 bg-brand-dark/50 checked:border-brand-green checked:bg-brand-green transition-all hover:border-brand-green"
              />
              {/* Ícone de Check customizado que aparece quando checked */}
              <Check size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-dark opacity-0 peer-checked:opacity-100" />
            </div>
            <label htmlFor="termos" className="text-xs text-gray-400 select-none cursor-pointer leading-relaxed">
              Li e aceito a <a href="#" className="text-brand-green hover:text-brand-hover underline-offset-2 hover:underline transition-colors">Política de Privacidade</a> e os <a href="#" className="text-brand-green hover:text-brand-hover underline-offset-2 hover:underline transition-colors">Termos de Uso</a> da Game Connection.
            </label>
          </div>

          {/* --- BOTÃO DE SUBMIT --- */}
          <button 
            type="submit"
            // Desabilita se os termos não foram aceitos OU se está carregando
            disabled={!termos || loading}
            className="w-full bg-brand-green text-brand-dark font-extrabold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#0ea149] transition-all hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_0_0_#0ea149] flex items-center justify-center gap-2"
          >
            {/* Mostra Spinner se carregando, senão mostra texto */}
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Iniciar Jornada"}
          </button>

        </form>

        {/* Divisor Visual */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-sm"><span className="bg-brand-dark px-4 text-gray-500 font-medium">Ou continue com</span></div>
        </div>

        {/* Botões de Login Social */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white py-3.5 rounded-xl border border-white/10 transition-all font-bold group">
            <Image src="/assets/img/DISCORD.svg" alt="Discord" width={24} height={24} className="group-hover:scale-110 transition-transform" />
            Discord
          </button>
          <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white py-3.5 rounded-xl border border-white/10 transition-all font-bold group">
            <Image src="/assets/img/GOOGLE.svg" alt="Google" width={24} height={24} className="group-hover:scale-110 transition-transform" />
            Google
          </button>
        </div>

      </div>
    </div>
  );
}

// === COMPONENTE AUXILIAR (REUTILIZÁVEL) ===
// Cria os itenzinhos do checklist da senha (bolinha cinza ou check verde)
function RequisitoItem({ label, atingido }: { label: string, atingido: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-xs font-medium transition-colors duration-300 ${atingido ? 'text-brand-green' : 'text-gray-500'}`}>
      <div className={`flex items-center justify-center w-4 h-4 rounded-full border transition-all ${atingido ? 'border-brand-green bg-brand-green' : 'border-gray-600'}`}>
          {atingido && <Check size={10} className="text-brand-dark" />}
      </div>
      <span>{label}</span>
    </div>
  );
}