'use client';

// ============================================================================
// DEPENDÊNCIAS
// ============================================================================
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Check, Loader2, ArrowLeft, User } from "lucide-react";

/**
 * @component CadastroPage
 * @description Rota de registro de novos usuários. Implementa validação client-side estrita,
 * cálculo de entropia (força) de senha em tempo real, acessibilidade (ARIA) e 
 * integração direta com a API do Supabase/Prisma.
 */
export default function CadastroPage() {
  const router = useRouter();
  
  // ===========================================================================
  // ESTADOS GLOBAIS DO FORMULÁRIO
  // ============================================================================
  const [username, setUsername] = useState(""); // <-- NOVO ESTADO ADICIONADO
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // ===========================================================================
  // ESTADOS DE VALIDAÇÃO E FEEDBACK
  // ============================================================================
  const [usernameErro, setUsernameErro] = useState(""); // <-- NOVO ERRO ADICIONADO
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [apiErro, setApiErro] = useState(""); // <-- ESTADO PARA ERROS DO BACK-END (ex: Email em uso)
  
  const [requisitos, setRequisitos] = useState({
    tamanho: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
  });
  const [forcaSenha, setForcaSenha] = useState({ porcentagem: 0, texto: "", cor: "bg-red-500" });

  // ===========================================================================
  // EFEITOS DE CICLO DE VIDA (HOOKS)
  // ============================================================================

  useEffect(() => {
    const reqs = {
      tamanho: senha.length >= 8,
      maiuscula: /[A-Z]/.test(senha),
      minuscula: /[a-z]/.test(senha),
      numero: /[0-9]/.test(senha),
    };
    setRequisitos(reqs);

    let forca = 0;
    if (reqs.tamanho) forca += 25;
    if (reqs.maiuscula) forca += 25;
    if (reqs.minuscula) forca += 25;
    if (reqs.numero) forca += 25;

    let cor = "bg-red-500";
    let texto = "";

    if (senha.length > 0) {
      if (forca <= 25) { texto = "Fraca"; cor = "bg-red-500"; }
      else if (forca <= 50) { texto = "Média"; cor = "bg-yellow-500"; }
      else if (forca <= 75) { texto = "Boa"; cor = "bg-blue-400"; }
      else { texto = "Forte"; cor = "bg-brand-green"; }
    }

    setForcaSenha({ porcentagem: forca, texto, cor });
    if (senhaErro) setSenhaErro("");
  }, [senha]); 

  useEffect(() => { if (emailErro) setEmailErro(""); }, [email]);
  useEffect(() => { if (usernameErro) setUsernameErro(""); }, [username]);
  useEffect(() => { if (apiErro) setApiErro(""); }, [email, username, senha]); // Limpa o erro da API ao digitar de novo

  // ============================================================================
  // FUNÇÕES CONTROLADORAS
  // ============================================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    let valido = true;

    // Validação de Username
    if (username.trim().length < 3) {
      setUsernameErro("O nick deve ter pelo menos 3 caracteres.");
      valido = false;
    }

    // Validação de Email (Regex)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      setEmailErro("E-mail inválido.");
      valido = false;
    }

    // Validação de Senha
    if (forcaSenha.porcentagem < 100) {
      setSenhaErro("A senha não atende a todos os requisitos de segurança.");
      valido = false;
    }

    if (!termos) valido = false;

    // A MÁGICA ACONTECE AQUI: Conexão real com o Back-end
    if (valido) {
      setLoading(true);
      setApiErro(""); // Reseta erros antigos
      
      try {
        const response = await fetch('/api/cadastro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Convertendo para o nome que o Prisma/Backend espera
          body: JSON.stringify({ 
            username: username.trim(), 
            email: email.trim(), 
            password: senha 
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Sucesso absoluto! Redireciona o usuário
          router.push("/feedback"); 
        } else {
          // Ex: "Este email já está em uso" (Status 409)
          setApiErro(data.message || "Erro desconhecido ao tentar cadastrar.");
          setLoading(false);
        }
      } catch (error) {
        setApiErro("Servidor indisponível. Verifique sua conexão ou tente mais tarde.");
        setLoading(false);
      }
    }
  };

  // ===========================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ============================================================================
  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-10 px-4 flex items-center justify-center relative overflow-hidden">
      
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
        aria-hidden="true"
      ></div>

      <div className="w-full max-w-lg bg-brand-dark/90 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(29,229,109,0.1)] relative z-10">

        <Link href="/" aria-label="Voltar para a página inicial" className="absolute top-6 left-6 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft aria-hidden="true" />
        </Link>

        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Cadastre-se</h1>
          <p className="text-gray-300 mt-2 text-lg">Crie sua conta e encontre seu player 2.</p>
        </div>

        {/* ALERTA DE ERRO DA API (Gatilho quando o email/user já existe no banco) */}
        {apiErro && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 animate-fade-in-up">
            <p className="text-red-400 text-sm font-medium">{apiErro}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cadastro" className="space-y-6">
          
          {/* ================= USERNAME (NOVO CAMPO) ================= */}
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-gray-300 mb-2 ml-1">
              Nickname (Nome de Usuário)
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full bg-brand-green/5 border ${usernameErro ? 'border-red-500' : 'border-brand-green/20'} text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-400 shadow-[0_0_0_30px_rgb(2,1,17)_inset] [-webkit-text-fill-color:white]`}
                placeholder="Pedroooooo"
                aria-required="true"
                aria-invalid={usernameErro ? "true" : "false"}
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
            </div>
            {usernameErro && (
              <p role="alert" className="text-red-500 text-xs mt-2 ml-1 font-medium animate-fade-in-up">
                {usernameErro}
              </p>
            )}
          </div>

          {/* ================= E-MAIL ================= */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 ml-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-brand-green/5 border ${emailErro ? 'border-red-500' : 'border-brand-green/20'} text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-400 shadow-[0_0_0_30px_rgb(2,1,17)_inset] [-webkit-text-fill-color:white]`}
              placeholder="pedrobezerra@email.com"
              aria-required="true"
              aria-invalid={emailErro ? "true" : "false"}
              autoComplete="email"
            />
            {emailErro && (
              <p id="email-erro" role="alert" className="text-red-500 text-xs mt-2 ml-1 font-medium animate-fade-in-up">
                {emailErro}
              </p>
            )}
          </div>

          {/* ================= SENHA ================= */}
          <div>
            <label htmlFor="senha" className="block text-sm font-bold text-gray-300 mb-2 ml-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={`w-full bg-brand-green/5 border ${senhaErro ? 'border-red-500' : 'border-brand-green/20'} text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-400 pr-12 shadow-[0_0_0_30px_rgb(2,1,17)_inset] [-webkit-text-fill-color:white]`}
                aria-required="true"
                aria-invalid={senhaErro ? "true" : "false"}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-green transition-colors p-1 z-10"
              >
                {mostrarSenha ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
              </button>
            </div>

            {senhaErro && (
              <p id="senha-erro" role="alert" className="text-red-500 text-xs mt-2 ml-1 font-medium animate-fade-in-up">
                {senhaErro}
              </p>
            )}

            <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ease-out ${forcaSenha.cor}`} style={{ width: `${forcaSenha.porcentagem}%` }}></div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 ml-1">
              <RequisitoItem label="8 caracteres" atingido={requisitos.tamanho} />
              <RequisitoItem label="Maiúscula" atingido={requisitos.maiuscula} />
              <RequisitoItem label="Minúscula" atingido={requisitos.minuscula} />
              <RequisitoItem label="Número" atingido={requisitos.numero} />
            </div>
          </div>

          {/* ================= TERMOS DE USO ================= */}
          <div className="flex items-start gap-3 pt-4 ml-1">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                id="termos"
                checked={termos}
                onChange={(e) => setTermos(e.target.checked)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-brand-green/40 bg-brand-dark checked:border-brand-green checked:bg-brand-green transition-all hover:border-brand-green"
              />
              <Check size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-dark opacity-0 peer-checked:opacity-100" aria-hidden="true" />
            </div>
            <label htmlFor="termos" className="text-xs text-gray-300 select-none cursor-pointer leading-relaxed">
              Li e aceito a <a href="#" className="text-brand-green hover:underline">Política de Privacidade</a> e os <a href="#" className="text-brand-green hover:underline">Termos de Uso</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={!termos || loading}
            className="w-full mt-2 bg-brand-green text-brand-dark font-extrabold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#0ea149] transition-all hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" size={24} /> Processando...</> : "Iniciar Jornada"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-sm"><span className="bg-brand-dark px-4 text-gray-300 font-medium">Ou continue com</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white py-3.5 rounded-xl border border-white/10 transition-all font-bold group">
            <Image src="/assets/img/DISCORD.svg" alt="" width={24} height={24} className="group-hover:scale-110 transition-transform" /> Discord
          </button>
          <button type="button" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white py-3.5 rounded-xl border border-white/10 transition-all font-bold group">
            <Image src="/assets/img/GOOGLE.svg" alt="" width={24} height={24} className="group-hover:scale-110 transition-transform" /> Google
          </button>
        </div>

      </div>
    </div>
  );
}

function RequisitoItem({ label, atingido }: { label: string, atingido: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-xs font-medium transition-colors duration-300 ${atingido ? 'text-brand-green' : 'text-gray-400'}`}>
      <div className={`flex items-center justify-center w-4 h-4 rounded-full border transition-all ${atingido ? 'border-brand-green bg-brand-green' : 'border-gray-500'}`}>
        {atingido && <Check size={10} className="text-brand-dark" />}
      </div>
      <span>{label}</span>
    </div>
  );
}