'use client';

import { useState } from 'react';
import { Mail, User, Lock, Gamepad2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  // Estado para guardar o que o usuário digita
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  // Estados para controlar a interface (loading, sucesso, erro)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Função que roda quando o botão de submit é clicado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar
    setStatus('loading');
    setMessage('');

    try {
      // O 'fetch' chama a nossa API enviando o JSON com os dados
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        // Limpa o formulário após o sucesso
        setFormData({ email: '', username: '', password: '' });
      } else {
        setStatus('error');
        setMessage(data.message || 'Erro ao realizar cadastro.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro de conexão. O servidor pode estar offline.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020111] p-4 pt-20">
      <div className="w-full max-w-md bg-white/5 border border-brand-green/20 rounded-2xl p-8 backdrop-blur-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-brand-green/10 rounded-full mb-4">
            <Gamepad2 className="w-8 h-8 text-brand-green" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Junte-se ao Game Connection</h1>
          <p className="text-gray-400 text-sm">Crie sua conta e encontre seu duo ideal.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                placeholder="player1@exemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Campo de Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                placeholder="Seu nick nos games"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          {/* Campo de Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                required
                minLength={6}
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {/* Feedback Visual (Mensagens de Erro/Sucesso) */}
          {message && (
            <div className={`p-3 rounded-lg text-sm text-center font-medium ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {message}
            </div>
          )}

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-emerald-400 text-[#020111] font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Processando...' : 'Desbloquear Acesso'}
            {!status && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

      </div>
    </main>
  );
}