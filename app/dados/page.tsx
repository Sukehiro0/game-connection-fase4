'use client';

// ============================================================================
// DEPENDÊNCIAS
// ============================================================================
import { useEffect, useState } from "react";
import { Gamepad2, Users, Globe, Search, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";
import CardStat from "@/components/CardStat";

// ============================================================================
// TIPAGEM
// ============================================================================
interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { name: string }[];
}

export default function DadosPage() {
  // ============================================================================
  // ESTADOS GLOBAIS
  // ============================================================================
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  
  // Estados do Dashboard de Crescimento
  const [usuariosIniciais, setUsuariosIniciais] = useState(10000);
  const [taxaCrescimento, setTaxaCrescimento] = useState(15);
  const [meses, setMeses] = useState(12);

  // ============================================================================
  // SANITIZAÇÃO DE DADOS
  // ============================================================================
  const getUsuariosIniciaisValidos = () => usuariosIniciais > 0 ? usuariosIniciais : 1000;
  const getTaxaCrescimentoValida = () => taxaCrescimento > 0 && taxaCrescimento <= 100 ? taxaCrescimento : 10;
  const getMesesValidos = () => meses > 0 && meses <= 36 ? meses : 12;
  
  // ============================================================================
  // DADOS ESTÁTICOS (ESG)
  // ============================================================================
  const dadosTabela = [
    { indicador: "População que joga games digitais (2025)", valor: "82,8 %", fonte: "PGB 2025" },
    { indicador: "Jogos digitais como diversão principal", valor: "80,1 %", fonte: "PGB 2025" },
    { indicador: "Mulheres gamers no Brasil", valor: "53,2 %", fonte: "PGB 2025" },
    { indicador: "Faixa etária principal (Millennials)", valor: "30–44 anos", fonte: "PGB 2025" },
    { indicador: "Plataforma favorita: Smartphone", valor: "40,8 %", fonte: "PGB 2025" },
    { indicador: "Jogadores de Console", valor: "24,7 %", fonte: "PGB 2025" },
    { indicador: "Jogadores de PC", valor: "20,3 %", fonte: "PGB 2025" },
    { indicador: "Total de jogadores no Brasil", valor: "103 mi", fonte: "Setor de games" },
  ];

  const dadosFiltrados = dadosTabela.filter(item => 
    (item.indicador + item.valor + item.fonte).toLowerCase().includes(filtro.toLowerCase())
  );

  // ============================================================================
  // LÓGICA DO GRÁFICO
  // ============================================================================
  const calcularCrescimento = (u0: number, taxa: number, tempo: number) => {
    const r = taxa / 100;
    return u0 * Math.pow(1 + r, tempo);
  };

  const gerarDadosGrafico = () => {
    const dados = [];
    const u0 = getUsuariosIniciaisValidos();
    const taxa = getTaxaCrescimentoValida();
    const periodo = getMesesValidos();
    for (let mes = 0; mes <= periodo; mes++) {
      const usuarios = calcularCrescimento(u0, taxa, mes);
      dados.push({ mes, usuarios: Math.round(usuarios) });
    }
    return dados;
  };

  const dadosGrafico = gerarDadosGrafico();
  const usuariosFinais = dadosGrafico[dadosGrafico.length - 1].usuarios;
  const crescimentoTotal = ((usuariosFinais - getUsuariosIniciaisValidos()) / getUsuariosIniciaisValidos()) * 100;
  const valorMaximo = Math.max(...dadosGrafico.map(d => d.usuarios));

  // ============================================================================
  // INTEGRAÇÃO DE API (RAWG Database)
  // ============================================================================
  useEffect(() => {
    async function fetchGames() {
      try {
        const apiKey = 'c542e67aec3a4340908f9de9e86038af'; 
        
        // Busca por jogos cooperativos com base em popularidade/rating
        const url = `https://api.rawg.io/api/games?key=${apiKey}&tags=co-op&ordering=-rating&page_size=6`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Falha na resposta da API.");
        
        const data = await response.json();
        
    
        if (data.results && data.results.length > 0) {
          setGames(data.results);
        } else {
          throw new Error("Nenhum jogo retornado pela busca.");
        }
      } catch (error) {
        console.warn("[DEV LOG] RAWG falhou ou retornou vazio. Acionando Fallback de Imagens da Steam.", error);
        
        // Listinha de jogos que roubei e selecionei do chat
        setGames([
          { id: 1, name: "It Takes Two", background_image: "https://cdn.akamai.steamstatic.com/steam/apps/1426210/capsule_616x353.jpg", rating: 4.8, released: "2021-03-26", genres: [{name: "Platformer"}] },
          { id: 2, name: "A Way Out", background_image: "https://cdn.akamai.steamstatic.com/steam/apps/1222700/capsule_616x353.jpg", rating: 4.5, released: "2018-03-23", genres: [{name: "Adventure"}] },
          { id: 3, name: "Portal 2", background_image: "https://cdn.akamai.steamstatic.com/steam/apps/620/capsule_616x353.jpg", rating: 4.9, released: "2011-04-18", genres: [{name: "Puzzle"}] },
          { id: 4, name: "Overcooked! 2", background_image: "https://cdn.akamai.steamstatic.com/steam/apps/728880/capsule_616x353.jpg", rating: 4.4, released: "2018-08-07", genres: [{name: "Indie"}] },
          { id: 5, name: "Left 4 Dead 2", background_image: "https://cdn.akamai.steamstatic.com/steam/apps/550/capsule_616x353.jpg", rating: 4.6, released: "2009-11-17", genres: [{name: "Action"}] },
          { id: 6, name: "Stardew Valley", background_image: "https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg", rating: 4.7, released: "2016-02-25", genres: [{name: "RPG"}] }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  // ============================================================================
  // RENDERIZAÇÃO
  // ============================================================================
  return (
    <div className="min-h-screen bg-brand-dark pt-40 pb-20 px-4 relative overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
        aria-hidden="true"
      ></div>

      <main className="container mx-auto max-w-6xl relative z-10">
        
        {/* CABEÇALHO */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-xl">
            Panorama do <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">Mercado</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Dados demográficos atualizados e os jogos cooperativos mais aclamados pela crítica nos últimos anos.
          </p>
        </div>

        {/* CARDS INFORMATIVOS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <CardStat icon={<Gamepad2 size={32} />} finalValue={82.8} text="da população joga" suffix="%" />
          <CardStat icon={<Users size={32} />} finalValue={53.2} text="são mulheres" suffix="%" />
          <CardStat icon={<Globe size={32} />} finalValue={103} text="milhões de gamers" suffix="M" />
        </section>

        {/* SIMULADOR DE CRESCIMENTO COM INPUTS CUSTOMIZADOS */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2 mb-8">
            <span className="w-2 h-10 bg-brand-green rounded-full"></span>
            Simulação de Crescimento de Usuários
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <InputNumericoCustomizado 
              id="usuarios-iniciais"
              label="Usuários Iniciais (U₀)"
              value={usuariosIniciais}
              setValue={setUsuariosIniciais}
              step={1000}
              min={100}
              desc="Mínimo de 100. Use múltiplos de 1000."
            />
            <InputNumericoCustomizado 
              id="taxa-crescimento"
              label="Taxa de Crescimento (% mês)"
              value={taxaCrescimento}
              setValue={setTaxaCrescimento}
              step={1}
              min={1}
              max={50}
              desc="Entre 1% e 50% ao mês."
            />
            <InputNumericoCustomizado 
              id="periodo-meses"
              label="Período (meses)"
              value={meses}
              setValue={setMeses}
              step={1}
              min={1}
              max={36}
              desc="Entre 1 e 36 meses."
            />
          </div>

          {/* PAINEL DE RESULTADOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-brand-surface/60 border-2 border-brand-green rounded-xl p-6 text-center shadow-lg">
              <TrendingUp size={40} className="mx-auto mb-3 text-brand-green" />
              <h3 className="text-3xl font-extrabold text-brand-green mb-1">
                {usuariosFinais.toLocaleString("pt-BR")}
              </h3>
              <p className="text-gray-300 text-sm">Usuários Projetados</p>
            </div>
            <div className="bg-brand-surface/60 border-2 border-[#0dcaf0] rounded-xl p-6 text-center shadow-lg">
              <TrendingUp size={40} className="mx-auto mb-3 text-[#0dcaf0]" />
              <h3 className="text-3xl font-extrabold text-[#0dcaf0] mb-1">
                +{crescimentoTotal.toFixed(1)}%
              </h3>
              <p className="text-gray-300 text-sm">Crescimento Total</p>
            </div>
            <div className="bg-brand-surface/60 border-2 border-[#ffc107] rounded-xl p-6 text-center shadow-lg">
              <Users size={40} className="mx-auto mb-3 text-[#ffc107]" />
              <h3 className="text-3xl font-extrabold text-[#ffc107] mb-1">
                {getMesesValidos()} meses
              </h3>
              <p className="text-gray-300 text-sm">Período de Análise</p>
            </div>
          </div>

          {/* GRÁFICO (SVG) */}
          <div className="bg-brand-surface/60 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Curva de Crescimento</h3>
            <div className="relative h-64 bg-[#020111]/50 rounded-lg p-4">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1DE56D" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1DE56D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,100 ${dadosGrafico.map((d, i) => {
                    const x = (i / getMesesValidos()) * 100;
                    const y = 100 - (d.usuarios / valorMaximo) * 100;
                    return `${x},${y}`;
                  }).join(" ")} 100,100`}
                  fill="url(#areaGradient)"
                />
                <polyline
                  points={dadosGrafico.map((d, i) => {
                    const x = (i / getMesesValidos()) * 100;
                    const y = 100 - (d.usuarios / valorMaximo) * 100;
                    return `${x},${y}`;
                  }).join(" ")}
                  fill="none"
                  stroke="#1DE56D"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* TABELA DE INDICADORES */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-brand-green rounded-full"></span>
              Perfil do Gamer Brasileiro
            </h2>
            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-green">
                <Search size={18} />
              </div>
              <input 
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Filtrar dados..."
                className="w-full bg-brand-surface/80 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-brand-surface/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-surface text-gray-400 border-b border-white/10">
                  <th className="p-5 font-semibold">Indicador</th>
                  <th className="p-5 font-semibold">Valor</th>
                  <th className="p-5 font-semibold">Fonte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {dadosFiltrados.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 text-gray-200 font-medium">{item.indicador}</td>
                    <td className="p-5 text-brand-green font-bold text-lg">{item.valor}</td>
                    <td className="p-5 text-gray-300 text-sm">{item.fonte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* GALERIA DE JOGOS (Com Fallback de Imagem Seguro) */}
        <section>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
            <span className="w-2 h-8 bg-brand-green rounded-full"></span>
            Recomendados: Melhores Co-op
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <article key={game.id} className="group bg-brand-surface/60 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-green/50 transition-all hover:shadow-[0_0_30px_rgba(29,229,109,0.15)] hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden bg-[#020111]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={game.background_image || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop'} 
                      alt={game.name}
                      onError={(e) => { 
                        // FALLBACK DE SEGURANÇA: Se a imagem quebrar, ele carrega essa imagem gamer genérica
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop'; 
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-brand-green font-bold px-3 py-1 rounded-lg border border-brand-green/20 text-sm">
                      ★ {game.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{game.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs font-bold text-brand-dark bg-brand-green px-2 py-1 rounded-md uppercase truncate max-w-[60%]">
                        {game.genres && game.genres[0] ? game.genres[0].name : "Co-op"}
                      </span>
                      <p className="text-gray-300 text-xs">
                        {game.released ? new Date(game.released).getFullYear() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTE: Input Numérico Estilizado (Sem as setas feias do navegador)
// ============================================================================
function InputNumericoCustomizado({ id, label, value, setValue, step, min, max, desc }: any) {
  
  // Funções controladas para os novos botões customizados
  const incrementar = () => setValue(Math.min(max || Infinity, Number(value) + step));
  const decrementar = () => setValue(Math.max(min || 0, Number(value) - step));

  return (
    <div className="bg-brand-surface/60 backdrop-blur-md border border-white/10 rounded-xl p-4">
      <label htmlFor={id} className="block text-xs font-semibold mb-2 text-gray-300">
        {label}
      </label>
      
      <div className="relative">
        {/* Input com appearance-none escondendo o controle padrão */}
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full bg-brand-green text-[#020111] font-bold px-4 py-3 rounded-lg text-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] focus:outline-none focus:ring-2 focus:ring-white pr-12"
        />
        
        {/* Nossos Botões Customizados de UI Premium */}
        <div className="absolute right-1 top-1 bottom-1 flex flex-col justify-center gap-0.5 pr-1">
          <button 
            type="button" 
            onClick={incrementar}
            className="text-[#020111]/60 hover:text-[#020111] hover:bg-white/20 rounded transition-colors p-0.5"
            aria-label="Aumentar valor"
          >
            <ChevronUp size={16} strokeWidth={3} />
          </button>
          <button 
            type="button" 
            onClick={decrementar}
            className="text-[#020111]/60 hover:text-[#020111] hover:bg-white/20 rounded transition-colors p-0.5"
            aria-label="Diminuir valor"
          >
            <ChevronDown size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
      
      <span className="block mt-2 text-[10px] text-gray-400">{desc}</span>
    </div>
  );
}