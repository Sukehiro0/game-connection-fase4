'use client';

import { useEffect, useState } from "react";
import { Gamepad2, Users, Globe, Search } from "lucide-react";
import CardStat from "@/components/CardStat";

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

  useEffect(() => {
    async function fetchGames() {
      try {
        const apiKey = 'c542e67aec3a4340908f9de9e86038af'; 
        
        // === FILTRO AUTOMÁTICO "SAFE & MODERN" ===
        // genres=indie,family...: Foca em jogos mais "casal/amigos"
        // dates=2016...: Só jogos recentes (evita velharias quebradas)
        // metacritic=80,100
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
      ></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* CABEÇALHO */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-xl">
            Panorama do <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">Mercado</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dados demográficos atualizados e os jogos cooperativos mais aclamados pela crítica nos últimos anos.
          </p>
        </div>

        {/* CARDS DE ESTATÍSTICA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <CardStat icon={<Gamepad2 size={32} />} finalValue={82.8} text="da população joga" suffix="%" />
          <CardStat icon={<Users size={32} />} finalValue={53.2} text="são mulheres" suffix="%" />
          <CardStat icon={<Globe size={32} />} finalValue={103} text="milhões de gamers" suffix="M" />
        </div>

        {/* TABELA */}
        <div className="mb-20">
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
                className="w-full bg-brand-surface/80 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all placeholder:text-gray-600 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm bg-brand-surface/30">
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
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5 text-gray-300 font-medium">{item.indicador}</td>
                    <td className="p-5 text-brand-green font-bold text-lg group-hover:scale-105 transition-transform origin-left">{item.valor}</td>
                    <td className="p-5 text-gray-500 text-sm">{item.fonte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* JOGOS DA API (AUTOMÁTICO COM FILTROS) */}
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
            <span className="w-2 h-8 bg-brand-green rounded-full"></span>
            Recomendados: Melhores Co-op (API RAWG)
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <div key={game.id} className="group bg-brand-surface/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-brand-green/50 transition-all hover:shadow-[0_0_30px_rgba(29,229,109,0.15)] hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={game.background_image} 
                      alt={game.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-brand-green font-bold px-3 py-1 rounded-lg border border-brand-green/20 text-sm">
                      ★ {game.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1" title={game.name}>{game.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      {/* Generos */}
                      <span className="text-xs font-bold text-brand-dark bg-brand-green px-2 py-1 rounded-md uppercase truncate max-w-[60%]">
                        {game.genres[0]?.name || "Co-op"}
                      </span>
                      <p className="text-gray-500 text-xs">
                        {game.released ? new Date(game.released).getFullYear() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}