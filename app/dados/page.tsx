'use client';

import { useEffect, useState } from "react";
import { Gamepad2, Users, Globe, Search, TrendingUp } from "lucide-react";
import CardStat from "@/components/CardStat";
import Image from "next/image";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { name: string }[];
}

export default function DadosPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  
  // Estados para Dashboard de Crescimento
  const [usuariosIniciais, setUsuariosIniciais] = useState(10000);
  const [taxaCrescimento, setTaxaCrescimento] = useState(15);
  const [meses, setMeses] = useState(12);

  const getUsuariosIniciaisValidos = () => usuariosIniciais > 0 ? usuariosIniciais : 1000;
  const getTaxaCrescimentoValida = () => taxaCrescimento > 0 && taxaCrescimento <= 100 ? taxaCrescimento : 10;
  const getMesesValidos = () => meses > 0 && meses <= 36 ? meses : 12;
  
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

  useEffect(() => {
    async function fetchGames() {
      try {
        const apiKey = 'c542e67aec3a4340908f9de9e86038af'; 
        const url = `https://api.rawg.io/api/games?key=${apiKey}&tags=co-op&genres=indie,family,adventure,platformer&dates=2016-01-01,2025-12-31&metacritic=80,100&ordering=-added&page_size=6`;
        const response = await fetch(url);
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark pt-40 pb-20 px-4 relative overflow-hidden">
      
      {/* GLOW DE FUNDO */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(29,229,109,0.3) 0%, rgba(2,1,30,0) 70%)' }}
        aria-hidden="true"
      ></div>

      {/*  aria-label na região principal da página */}
      <main className="container mx-auto max-w-6xl relative z-10" aria-label="Página de Pesquisa e Dados do mercado gamer">
        
        {/* CABEÇALHO */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-xl">
            Panorama do <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">Mercado</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Dados demográficos atualizados e os jogos cooperativos mais aclamados pela crítica nos últimos anos.
          </p>
        </div>

        {/* CARDS DE ESTATÍSTICA */}
        {/*  role="region" + aria-label na seção de cards */}
        <section aria-label="Estatísticas gerais do mercado gamer brasileiro" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <CardStat icon={<Gamepad2 size={32} aria-hidden="true" />} finalValue={82.8} text="da população joga" suffix="%" />
          <CardStat icon={<Users size={32} aria-hidden="true" />} finalValue={53.2} text="são mulheres" suffix="%" />
          <CardStat icon={<Globe size={32} aria-hidden="true" />} finalValue={103} text="milhões de gamers" suffix="M" />
        </section>

        {/* DASHBOARD DE PROJEÇÃO DE CRESCIMENTO */}
        {/*  role="region" + aria-label na seção de simulação */}
        <section aria-label="Simulação de crescimento de usuários" className="mb-20">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2 mb-8">
            <span className="w-2 h-10 bg-brand-green rounded-full" aria-hidden="true"></span>
            Simulação de Crescimento de Usuários
          </h2>

          {/*  role="group" agrupa os controles relacionados */}
          <div role="group" aria-labelledby="controles-simulacao-titulo" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <span id="controles-simulacao-titulo" className="sr-only">Parâmetros da simulação de crescimento</span>

            <div className="bg-brand-surface/60 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <label htmlFor="usuarios-iniciais" className="block text-xs font-semibold mb-2 text-gray-300">
                Usuários Iniciais (U₀)
              </label>
              <input
                id="usuarios-iniciais"
                type="number"
                value={usuariosIniciais}
                onChange={(e) => setUsuariosIniciais(Number(e.target.value) || 1000)}
                className="w-full bg-brand-green text-brand-dark font-bold px-3 py-2 rounded-lg text-sm"
                min="100"
                step="1000"
                aria-label="Número inicial de usuários para a simulação"
                aria-required="true"
                aria-describedby="usuarios-iniciais-desc"
              />
              {/*  aria-describedby: texto de ajuda lido pelo leitor de tela */}
              <span id="usuarios-iniciais-desc" className="sr-only">Valor mínimo: 100 usuários. Use múltiplos de 1000.</span>
            </div>

            <div className="bg-brand-surface/60 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <label htmlFor="taxa-crescimento" className="block text-xs font-semibold mb-2 text-gray-300">
                Taxa de Crescimento (% mês)
              </label>
              <input
                id="taxa-crescimento"
                type="number"
                value={taxaCrescimento}
                onChange={(e) => setTaxaCrescimento(Number(e.target.value) || 10)}
                className="w-full bg-brand-green text-brand-dark font-bold px-3 py-2 rounded-lg text-sm"
                min="1"
                max="50"
                aria-label="Taxa de crescimento mensal em porcentagem"
                aria-required="true"
                aria-describedby="taxa-crescimento-desc"
              />
              <span id="taxa-crescimento-desc" className="sr-only">Valor entre 1% e 50% ao mês.</span>
            </div>

            <div className="bg-brand-surface/60 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <label htmlFor="periodo-meses" className="block text-xs font-semibold mb-2 text-gray-300">
                Período (meses)
              </label>
              <input
                id="periodo-meses"
                type="number"
                value={meses}
                onChange={(e) => setMeses(Number(e.target.value) || 12)}
                className="w-full bg-brand-green text-brand-dark font-bold px-3 py-2 rounded-lg text-sm"
                min="1"
                max="24"
                aria-label="Período de projeção em meses"
                aria-required="true"
                aria-describedby="periodo-meses-desc"
              />
              <span id="periodo-meses-desc" className="sr-only">Valor entre 1 e 24 meses.</span>
            </div>
          </div>

          {/*  aria-live="polite": anuncia os resultados ao leitor de tela quando mudam */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            aria-live="polite"
            aria-label="Resultados da simulação de crescimento"
          >
            <div className="bg-brand-surface/60 border-2 border-brand-green rounded-xl p-6 text-center">
              <TrendingUp size={40} className="mx-auto mb-3 text-brand-green" aria-hidden="true" />
              <h3 className="text-3xl font-extrabold text-brand-green mb-1">
                {usuariosFinais.toLocaleString("pt-BR")}
              </h3>
              <p className="text-gray-300 text-sm">Usuários Projetados</p>
            </div>

            <div className="bg-brand-surface/60 border-2 border-[#0dcaf0] rounded-xl p-6 text-center">
              <TrendingUp size={40} className="mx-auto mb-3 text-[#0dcaf0]" aria-hidden="true" />
              <h3 className="text-3xl font-extrabold text-[#0dcaf0] mb-1">
                +{crescimentoTotal.toFixed(1)}%
              </h3>
              <p className="text-gray-300 text-sm">Crescimento Total</p>
            </div>

            <div className="bg-brand-surface/60 border-2 border-[#ffc107] rounded-xl p-6 text-center">
              <Users size={40} className="mx-auto mb-3 text-[#ffc107]" aria-hidden="true" />
              <h3 className="text-3xl font-extrabold text-[#ffc107] mb-1">
                {getMesesValidos()} meses
              </h3>
              <p className="text-gray-300 text-sm">Período de Análise</p>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className="bg-brand-surface/60 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Curva de Crescimento</h3>
            {/*  role="img" + aria-label dinâmico descreve o gráfico para leitores de tela */}
            <div 
              className="relative h-64 bg-brand-dark/50 rounded-lg p-4"
              role="img"
              aria-label={`Gráfico de linha mostrando crescimento exponencial de ${getUsuariosIniciaisValidos().toLocaleString("pt-BR")} para ${usuariosFinais.toLocaleString("pt-BR")} usuários em ${getMesesValidos()} meses, com crescimento total de ${crescimentoTotal.toFixed(1)}%`}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {dadosGrafico.map((d, i) => {
                  const x = (i / getMesesValidos()) * 100;
                  const y = 100 - (d.usuarios / valorMaximo) * 100;
                  return <circle key={i} cx={x} cy={y} r="0.8" fill="#1DE56D" vectorEffect="non-scaling-stroke" />;
                })}
              </svg>
            </div>
          </div>
        </section>

        {/* TABELA */}
        {/*  role="region" + aria-label na seção da tabela */}
        <section aria-label="Tabela de perfil do gamer brasileiro" className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-brand-green rounded-full" aria-hidden="true"></span>
              Perfil do Gamer Brasileiro
            </h2>
            
            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-green">
                <Search size={18} aria-hidden="true" />
              </div>
              {/*  aria-label + aria-controls vincula o input à tabela que ele filtra */}
              <input 
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Filtrar dados..."
                aria-label="Filtrar dados da tabela por indicador, valor ou fonte"
                aria-controls="tabela-gamer"
                className="w-full bg-brand-surface/80 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-400 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm bg-brand-surface/30">
            {/*  id vinculado ao aria-controls do input + aria-live para anunciar mudanças no filtro */}
            <table id="tabela-gamer" className="w-full text-left border-collapse" aria-label="Dados do perfil do gamer brasileiro" aria-live="polite">
              <thead>
                <tr className="bg-brand-surface text-gray-400 border-b border-white/10">
                  <th scope="col" className="p-5 font-semibold">Indicador</th>
                  <th scope="col" className="p-5 font-semibold">Valor</th>
                  <th scope="col" className="p-5 font-semibold">Fonte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {dadosFiltrados.length === 0 ? (
                  //  Mensagem acessível quando nenhum resultado é encontrado
                  <tr>
                    <td colSpan={3} className="p-5 text-center text-gray-300" role="alert">
                      Nenhum resultado encontrado para &quot;{filtro}&quot;.
                    </td>
                  </tr>
                ) : (
                  dadosFiltrados.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="p-5 text-gray-200 font-medium">{item.indicador}</td>
                      <td className="p-5 text-brand-green font-bold text-lg group-hover:scale-105 transition-transform origin-left">{item.valor}</td>
                      <td className="p-5 text-gray-300 text-sm">{item.fonte}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* JOGOS DA API */}
        {/*  role="region" + aria-label na seção de jogos */}
        <section aria-label="Jogos cooperativos recomendados via API RAWG">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
            <span className="w-2 h-8 bg-brand-green rounded-full" aria-hidden="true"></span>
            Recomendados: Melhores Co-op (API RAWG)
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64" role="status" aria-live="polite">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green" aria-hidden="true"></div>
              <span className="sr-only">Carregando jogos recomendados, aguarde...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                //  role="article" em cada card de jogo — semântica correta para conteúdo independente
                <article
                  key={game.id}
                  className="group bg-brand-surface/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-brand-green/50 transition-all hover:shadow-[0_0_30px_rgba(29,229,109,0.15)] hover:-translate-y-2"
                  aria-label={`Jogo: ${game.name}, avaliação ${game.rating} de 5 estrelas`}
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={game.background_image} 
                      alt={`Imagem de capa do jogo ${game.name}, gênero ${game.genres[0]?.name || 'cooperativo'}, avaliação ${game.rating} estrelas`}
                      title={`${game.name} - ${game.genres[0]?.name || 'Co-op'} | Avaliação: ${game.rating}★`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* aria-label no badge de avaliação */}
                    <div
                      className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-brand-green font-bold px-3 py-1 rounded-lg border border-brand-green/20 text-sm"
                      aria-label={`Avaliação: ${game.rating} de 5 estrelas`}
                    >
                      ★ {game.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1" title={game.name}>{game.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs font-bold text-brand-dark bg-brand-green px-2 py-1 rounded-md uppercase truncate max-w-[60%]">
                        {game.genres[0]?.name || "Co-op"}
                      </span>
                      {/*  aria-label no ano para leitores de tela */}
                      <p className="text-gray-300 text-xs" aria-label={`Ano de lançamento: ${game.released ? new Date(game.released).getFullYear() : 'não informado'}`}>
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