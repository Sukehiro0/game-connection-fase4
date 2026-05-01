'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Activity, Leaf, Lock, Server, Cpu, AlertTriangle, CheckSquare, Square, Terminal, Network, Fingerprint, Shield } from "lucide-react";

type ChecklistItem = { id: string; label: string; checked: boolean };
type ChecklistCategory = { [key: string]: ChecklistItem[] };


/**
 * Resuminho para o Sensei Pedro Bezerra
 * @component AdminDashboard
 * @description Painel restrito de DevSecOps e Analytics ESG.
 * Apresenta auditoria de rede, interceptações simuladas por IA comportamental 
 * e métricas de mitigação de carbono. Acesso protegido por RBAC (Role-Based Access Control) client-side.
 */

export default function AdminDashboard() {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);

  // =============================
  // CHECKLIST INTERATIVA
  // ===========================
  const defaultChecklist: ChecklistCategory = {
    "Segurança": [
      { id: 'sec_owasp', label: 'OWASP', checked: true },
      { id: 'sec_rate', label: 'Rate limit', checked: true },
      { id: 'sec_mfa', label: 'MFA', checked: false },
      { id: 'sec_logs', label: 'Logs', checked: true },
      { id: 'sec_backups', label: 'Backups', checked: false },
      { id: 'sec_headers', label: 'Headers', checked: true },
    ],
    "Código": [
      { id: 'cod_clean', label: 'Clean code', checked: true },
      { id: 'cod_testes', label: 'Testes', checked: false },
      { id: 'cod_linter', label: 'Linter', checked: true },
      { id: 'cod_cicd', label: 'CI/CD', checked: false },
    ],
    "Infra": [
      { id: 'inf_monitor', label: 'Monitoramento', checked: true },
      { id: 'inf_alertas', label: 'Alertas', checked: false },
      { id: 'inf_roll', label: 'Rollback', checked: false },
      { id: 'inf_back', label: 'Backup', checked: false },
    ],
    "Produto": [
      { id: 'pro_ux', label: 'UX boa', checked: true },
      { id: 'pro_a11y', label: 'Acessibilidade', checked: true },
      { id: 'pro_seo', label: 'SEO (se web pública)', checked: true },
      { id: 'pro_analy', label: 'Analytics', checked: true },
    ]
  };

  const [checklist, setChecklist] = useState<ChecklistCategory>(defaultChecklist);

  // Save no LocalStorage quando a página abre
  useEffect(() => {
    const savedChecklist = localStorage.getItem("admin_project_checklist");
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    }
  }, []);

  // Função para marcar/desmarcar item e salvar
  const toggleCheck = (category: string, id: string) => {
    setChecklist(prev => {
      const updated = { ...prev };
      updated[category] = updated[category].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      // Salva no LocalStorage para persistir
      localStorage.setItem("admin_project_checklist", JSON.stringify(updated));
      return updated;
    });
  };

  // ==========================================
  // CONTROLE DE ACESSO
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem("admin_security_token"); 
    if (token !== "pedro-bezerra-auth-v1") {
      alert("Acesso Negado: Credenciais de administrador não encontradas. Você será eliminado! ");
      router.push("/");
    } else {
      setAutorizado(true);
    }
  }, [router]);

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center text-brand-green font-mono">
        Validando integridade do acesso...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020111] p-6 lg:p-10 font-mono text-gray-300">
      
      {/* ================= HEADER DO ADMIN ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-brand-green/20 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <ShieldAlert className="text-brand-green" size={36} />
            Cortex Security / Admin
          </h1>
          <p className="text-sm mt-2 opacity-60">Monitoramento Ativo de Ameaças, DevSecOps & ESG Analytics</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg border border-brand-green/30 flex items-center gap-2 text-sm font-bold">
            <Activity className="animate-pulse" size={16} /> Sistema Estável
          </div>
                <button 
            onClick={() => { localStorage.removeItem("admin_security_token"); router.push("/"); }}
            className="bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-colors"
          >
            Encerrar Sessão
          </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"></div>

        </div>
      </div>

      {/* ================= LINHA 1: LOGS E ESG  ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* LOG DE INTERCEPTAÇÕES */}
        <section className="col-span-1 lg:col-span-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <Terminal className="text-brand-green" size={24} />
            Log de Interceptações (IA Preventiva)
          </h2>
                                       
          <div className="bg-[#05051a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">IP Origem</th>
                  <th className="p-4">Classificação (IA)</th>
                  <th className="p-4">Ação Tomada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5">
                  <td className="p-4 text-gray-500">Há 2 min</td>
                  <td className="p-4">192.168.***.**</td>
                  <td className="p-4 text-yellow-400 font-bold">Rate Limit / Brute Force</td>
                  <td className="p-4 text-brand-green">Drop Connection</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-4 text-gray-500">Há 15 min</td>
                  <td className="p-4">45.22.***.**</td>
                  <td className="p-4 text-red-500 font-bold">SQL Injection Target</td>
                  <td className="p-4 text-brand-green">Payload Sanitizado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ESG & ANALYTICS */}
        <section className="col-span-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <Leaf className="text-[#0dcaf0]" size={24} />
            ESG & Analytics
          </h2>
          
          <div className="bg-gradient-to-br from-[#05051a] to-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden mb-6">
            <Leaf className="absolute -right-4 -bottom-4 text-emerald-500/10" size={120} />
            <div className="relative z-10">
              <p className="text-sm text-emerald-400 font-bold mb-2 tracking-widest uppercase">CO₂ Poupado</p>
              <h3 className="text-4xl font-extrabold text-white mb-2 flex items-baseline gap-2">
                42.5 <span className="text-lg text-gray-400 font-normal">kg</span>
              </h3>
              <p className="text-xs text-gray-400">Otimização de rotas reduziu emissões em 18%.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ================= LINHA 2: CHECKLIST  ================= */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <CheckSquare className="text-brand-green" size={24} />
          Checklist de Maturidade (Produção)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(checklist).map(([category, items]) => (
            <div key={category} className="bg-[#05051a] border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-extrabold text-white mb-4 tracking-wide">{category}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li 
                    key={item.id} 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => toggleCheck(category, item.id)}
                  >
                    <button 
                      className={`flex items-center justify-center transition-colors ${item.checked ? 'text-brand-green' : 'text-gray-500 group-hover:text-brand-green/50'}`}
                      aria-label={`Marcar ${item.label}`}
                    >
                      {item.checked ? <CheckSquare size={20} /> : <Square size={20} />}
                    </button>
                    <span className={`text-sm transition-colors ${item.checked ? 'text-gray-200' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

{/* ================= LINHA 3: ROADMAP CYBERSEC (OWASP ASVS) ================= */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <Shield className="text-red-500" size={24} />
          Defesa Ativa & Roadmap de Cibersegurança
        </h2>
        
        <div className="bg-[#05051a] border border-red-500/20 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          {/* Fundo decorativo sutil */}
          <Network className="absolute -right-10 -bottom-10 text-red-500/5" size={200} />
          
          <div className="relative z-10">
            <p className="text-gray-300 leading-relaxed mb-8 max-w-4xl">
              A arquitetura atual foi projetada seguindo o básico do OWASP Top 10, com o objetivo de buscar aderência ao padrão <strong className="text-white">OWASP ASVS (Application Security Verification Standard)</strong>. Assumi a premissa de que a segurança é um estado contínuo, e a infraestrutura é dividida entre ameaças mitigadas e vetores de ataque em processo de blindagem.
            </p>

            {/* Ameaças Mitigadas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-brand-green font-bold mb-4 flex items-center gap-2">
                  <CheckSquare size={18} /> Tolerância Zero (Mitigados)
                </h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <span className="text-white font-bold">Burp Suite / ZAP:</span> 
                    <span className="text-gray-400 block mt-1">Validação de input rigorosa e proteção de estado (JWT) para evitar manipulação de pacotes em trânsito.</span>
                  </li>
                  <li>
                    <span className="text-white font-bold">Hydra & Wordlists (rockyou.txt):</span> 
                    <span className="text-gray-400 block mt-1">Rate Limit dinâmico bloqueando tentativas de força bruta burras antes que sobrecarreguem o banco de dados.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-[#0dcaf0] font-bold mb-4 flex items-center gap-2">
                  <Fingerprint size={18} /> Evasão de Reconhecimento
                </h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <span className="text-white font-bold">Nmap / Nikto:</span> 
                    <span className="text-gray-400 block mt-1">Headers de segurança (Helmet) ocultam tecnologias utilizadas para frustrar fingerprinting automatizado e scans de vulnerabilidade básicos.</span>
                  </li>
                  <li>
                    <span className="text-white font-bold">Spoofing de IP:</span> 
                    <span className="text-gray-400 block mt-1">Validação restrita de origem com políticas de CORS e bloqueio de cabeçalhos modificados maliciosamente.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Oque falta? */}
            <div className="bg-yellow-500/5 border border-dashed border-yellow-500/30 rounded-xl p-5">
              <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2">
                <AlertTriangle size={18} /> Front de Batalha: Próximos Desafios (Em Desenvolvimento)
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Creio que defesas estáticas não contêm ameaças avançadas persistentes (APTs). Então foquei nestes vetores:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-white font-bold block mb-1">Metasploit Framework:</span>
                  <span className="text-gray-400">Atualmente mitiguei a superfície, mas o próximo passo é implementar um WAF (Web Application Firewall) com análise heurística e integração Cortex XDR para barrar explorações de Zero-Days.</span>
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">Megavazamentos (COMB / Collection #1):</span>
                  <span className="text-gray-400">Wordlists básicas não bastam. Implementei a API do <em className="text-gray-300">HaveIBeenPwned</em> para impedir ativamente (Credential Stuffing) o cadastro com senhas presentes nos mais de 3.2 bilhões de registros do COMB.</span>
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">Prompt Injection & IA:</span>
                  <span className="text-gray-400">Com a integração de IA na plataforma, a prioridade absoluta é criar uma camada de sanitização para impedir que usuários manipulem o modelo comportamental usando engenharia social (Jailbreak de IA). Já vi várias Bets caindo em Prompt Injection, então é blindar a parada. Contém Ironia. </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
