'use client';

// ============================================================================
// DEPENDÊNCIAS
// ============================================================================
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Check, Loader2, ArrowLeft } from "lucide-react";

/**
 * @component CadastroPage
 * @description Rota de registro de novos usuários. Implementa validação client-side estrita,
 * cálculo de entropia (força) de senha em tempo real e acessibilidade (ARIA).
 * @returns {JSX.Element} Interface de cadastro do GameConnection.
 */
export default function CadastroPage() {
  const router = useRouter();
  
  // ============================================================================
  // ESTADOS GLOBAIS DO FORMULÁRIO
  // ============================================================================
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // ============================================================================
  // ESTADOS DE VALIDAÇÃO E FEEDBACK
  // ============================================================================
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [requisitos, setRequisitos] = useState({
    tamanho: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
  });
  const [forcaSenha, setForcaSenha] = useState({ porcentagem: 0, texto: "", cor: "bg-red-500" });

  // ============================================================================
  // EFEITOS DE CICLO DE VIDA (HOOKS)
  // ============================================================================

  /**
   * @description Monitora a digitação da senha para calcular a força heurística
   * e validar as regras de segurança (Regex) em tempo real.
   */
  useEffect(() => {
    // 1. Mapeia os requisitos usando Expressões Regulares (Regex)
    const reqs = {
      tamanho: senha.length >= 8,
      maiuscula: /[A-Z]/.test(senha),
      minuscula: /[a-z]/.test(senha),
      numero: /[0-9]/.test(senha),
    };
    setRequisitos(reqs);

    // 2. Calcula a pontuação baseada nos requisitos atingidos
    let forca = 0;
    if (reqs.tamanho) forca += 25;
    if (reqs.maiuscula) forca += 25;
    if (reqs.minuscula) forca += 25;
    if (reqs.numero) forca += 25;

    // 3. Define a identidade visual (cor e texto) baseada na entropia
    let cor = "bg-red-500";
    let texto = "";

    if (senha.length > 0) {
      if (forca <= 25) { texto = "Fraca"; cor = "bg-red-500"; }
      else if (forca <= 50) { texto = "Média"; cor = "bg-yellow-500"; }
      else if (forca <= 75) { texto = "Boa"; cor = "bg-blue-400"; }
      else { texto = "Forte"; cor = "bg-brand-green"; }
    }

    setForcaSenha({ porcentagem: forca, texto, cor });
    
    // Limpa a mensagem de erro impeditiva assim que o usuário volta a digitar
    if (senhaErro) setSenhaErro("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senha]); // Dependência isolada: re-renderiza APENAS quando a senha muda

  /**
   * @description Remove o alerta de erro do email quando o usuário inicia a correção.
   */
  useEffect(() => {
    if (emailErro) setEmailErro("");
  }, [email]);

  // ============================================================================
  // FUNÇÕES CONTROLADORAS
  // ============================================================================

  /**
   * @function handleSubmit
   * @description Intercepta a submissão do formulário, previne o recarregamento 
   * padrão do navegador (preventDefault) e aplica validação final estrita antes da rota.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento nativo (refresh) do HTML5
    let valido = true;

    // Regex oficial para formato de e-mail (RFC 5322 simplificada)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      setEmailErro("E-mail inválido.");
      valido = false;
    }

    // Impede o avanço se a senha não estiver 100% forte
    if (forcaSenha.porcentagem < 100) {
      setSenhaErro("A senha não atende a todos os requisitos de segurança.");
      valido = false;
    }

    if (!termos) {
      valido = false;
    }

    // Simulação de delay de rede (Loading state) para o MVP
    if (valido) {
      setLoading(true);
      setTimeout(() => {
        router.push("/feedback");
      }, 2000);
    }
  };

  // ============================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ============================================================================
  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-10 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* BACKGROUND EFFECTS: Glow radial decorativo (ignorado por leitores de tela) */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
        aria-hidden="true"
      ></div>

      {/* CONTAINER PRINCIPAL DO FORMULÁRIO */}
      <div className="w-full max-w-lg bg-brand-dark/90 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(29,229,109,0.1)] relative z-10">
        
        {/* NAVEGAÇÃO: Botão de retorno com label ARIA para acessibilidade */}
        <Link
          href="/"
          aria-label="Voltar para a página inicial"
          className="absolute top-6 left-6 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft aria-hidden="true" />
        </Link>

        {/* CABEÇALHO */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Cadastre-se</h1>
          <p className="text-gray-300 mt-2 text-lg">Crie sua conta e encontre seu player 2.</p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cadastro" className="space-y-6">
          
          {/* ================= CAMPO: E-MAIL ================= */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 ml-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // HACK CSS: shadow-inset usado para sobrepor a cor branca forçada pelo Autofill do Google Chrome
              className={`w-full bg-brand-green/5 border ${emailErro ? 'border-red-500' : 'border-brand-green/20'} text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-400 shadow-[0_0_0_30px_rgb(2,1,17)_inset] [-webkit-text-fill-color:white]`}
              placeholder="pedrobezerra@email.com"
              aria-required="true"
              aria-invalid={emailErro ? "true" : "false"}
              aria-describedby={emailErro ? "email-erro" : undefined}
              autoComplete="email"
            />
            {/* FEEDBACK DE ERRO (Acessível via role="alert") */}
            {emailErro && (
              <p id="email-erro" role="alert" className="text-red-500 text-xs mt-2 ml-1 font-medium animate-fade-in-up">
                {emailErro}
              </p>
            )}
          </div>

          {/* ================= CAMPO: SENHA ================= */}
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
                // HACK CSS: Identico ao e-mail, previne quebra de design no Autofill
                className={`w-full bg-brand-green/5 border ${senhaErro ? 'border-red-500' : 'border-brand-green/20'} text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-400 pr-12 shadow-[0_0_0_30px_rgb(2,1,17)_inset] [-webkit-text-fill-color:white]`}
                // placeholder="••••••••"
                aria-required="true"
                aria-invalid={senhaErro ? "true" : "false"}
                aria-describedby={`requisitos-senha${senhaErro ? " senha-erro" : ""}`}
                autoComplete="new-password"
              />
              {/* TOGGLE: Ocultar/Mostrar senha */}
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
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

            {/* PROGRESS BAR: Indicador visual de força da senha */}
            <div
              role="progressbar"
              aria-label={`Força da senha: ${forcaSenha.texto || "não definida"}`}
              aria-valuenow={forcaSenha.porcentagem}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden"
            >
              <div
                className={`h-full transition-all duration-500 ease-out ${forcaSenha.cor}`}
                style={{ width: `${forcaSenha.porcentagem}%` }}
              ></div>
            </div>

            {/* CHECKLIST: Regras de entropia exigidas */}
            <div id="requisitos-senha" aria-label="Requisitos da senha" className="grid grid-cols-2 gap-2 mt-4 ml-1">
              <RequisitoItem label="8 caracteres" atingido={requisitos.tamanho} />
              <RequisitoItem label="Maiúscula" atingido={requisitos.maiuscula} />
              <RequisitoItem label="Minúscula" atingido={requisitos.minuscula} />
              <RequisitoItem label="Número" atingido={requisitos.numero} />
            </div>
          </div>

          {/* ================= CHECKBOX: TERMOS DE USO ================= */}
          <div className="flex items-start gap-3 pt-4 ml-1">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                id="termos"
                checked={termos}
                onChange={(e) => setTermos(e.target.checked)}
                aria-required="true"
                aria-describedby="termos-label"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-brand-green/40 bg-brand-dark checked:border-brand-green checked:bg-brand-green transition-all hover:border-brand-green"
              />
              <Check size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-dark opacity-0 peer-checked:opacity-100" aria-hidden="true" />
            </div>
            <label htmlFor="termos" id="termos-label" className="text-xs text-gray-300 select-none cursor-pointer leading-relaxed">
              Li e aceito a{" "}
              <a href="#" className="text-brand-green hover:text-brand-hover underline-offset-2 hover:underline transition-colors">
                Política de Privacidade
              </a>{" "}
              e os{" "}
              <a href="#" className="text-brand-green hover:text-brand-hover underline-offset-2 hover:underline transition-colors">
                Termos de Uso
              </a>{" "}
              da Game Connection.
            </label>
          </div>

          {/* ================= BOTÃO DE SUBMIT PRINCIPAL ================= */}
          <button
            type="submit"
            disabled={!termos || loading}
            aria-disabled={!termos || loading}
            aria-busy={loading}
            className="w-full mt-2 bg-brand-green text-brand-dark font-extrabold text-lg py-4 rounded-xl shadow-[0_4px_0_0_#0ea149] transition-all hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_6px_0_0_#10a14a] active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" size={24} aria-hidden="true" /> Processando...</> : "Iniciar Jornada"}
          </button>
        </form>

        {/* ================= SEPARADOR SOCIAL LOGIN ================= */}
        <div className="relative my-8" aria-hidden="true">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-brand-dark px-4 text-gray-300 font-medium">Ou continue com</span>
          </div>
        </div>

        {/* ================= BOTÕES SOCIAIS (OAuth) ================= */}
        <div role="group" aria-label="Opções de login com redes sociais" className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white py-3.5 rounded-xl border border-white/10 transition-all font-bold group">
            <Image src="/assets/img/DISCORD.svg" alt="" width={24} height={24} aria-hidden="true" className="group-hover:scale-110 transition-transform" />
            Discord
          </button>
          <button type="button" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white py-3.5 rounded-xl border border-white/10 transition-all font-bold group">
            <Image src="/assets/img/GOOGLE.svg" alt="" width={24} height={24} aria-hidden="true" className="group-hover:scale-110 transition-transform" />
            Google
          </button>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTES
// ============================================================================

/**
 * @component RequisitoItem
 * @description Renderiza visualmente o estado de uma regra individual da senha.
 * @param {string} label - O texto descrevendo a regra (ex: "8 caracteres").
 * @param {boolean} atingido - Status de completude da regra.
 */
function RequisitoItem({ label, atingido }: { label: string, atingido: boolean }) {
  return (
    <div
      role="status"
      aria-label={`${label}: ${atingido ? "requisito atendido" : "requisito pendente"}`}
      className={`flex items-center gap-2 text-xs font-medium transition-colors duration-300 ${atingido ? 'text-brand-green' : 'text-gray-400'}`}
    >
      <div
        className={`flex items-center justify-center w-4 h-4 rounded-full border transition-all ${atingido ? 'border-brand-green bg-brand-green' : 'border-gray-500'}`}
        aria-hidden="true"
      >
        {atingido && <Check size={10} className="text-brand-dark" />}
      </div>
      <span>{label}</span>
    </div>
  );
}