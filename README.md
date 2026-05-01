# 🎮 Game Connection - Fase 4

> "Mais que Partidas, Criamos Conexões"

Projeto desenvolvido para o **Happy Game (FIAP)**. Esta aplicação conecta de formas amorosas e amigaveis, baseada em preferências e comportamento, promovendo um ambiente saudável e seguro.

---

## Tecnologias Utilizadas

* **Framework:** Next.js 15 (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Ícones:** Lucide React
* **API:** Integração com RAWG Video Games Database API

---

## Como rodar o projeto

Siga estes passos para executar a aplicação localmente:

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

3.  **Acesse no navegador:**
    Abra [http://localhost:3000](http://localhost:3000)

---

## Estrutura do Projeto

* `/app`: Páginas e rotas da aplicação (Home, Dados, Sobre, Cadastro).
* `/components`: Componentes reutilizáveis (Navbar, Footer, Cards).
* `/public`: Imagens e ativos estáticos.
* `/docs`: Documentação acadêmica e relatórios da Fase 4.

---

## DevSecOps & Cibersegurança (Enterprise Challenge)
Esta aplicação implementa os princípios de **Zero Trust** e diretrizes do **OWASP Top 10**. 
- **Middleware de Borda (Edge):** Proteção ativa via Rate Limiting para mitigar ataques de força bruta (Brute Force/DoS).
- **Security Headers:** Implementação de HSTS, prevenção contra Clickjacking (X-Frame-Options) e MIME Sniffing.
- **Painel de Ameaças (`/admin`):** Dashboard restrito para monitoramento preventivo simulando integração de IA comportamental e auditoria de logs.
- **Impacto ESG:** Otimização de queries e redução estimada da pegada de carbono detalhada no painel de Analytics.

---

## Integrantes do Grupo

* **Lucas Guedes** - RM 567004
---

© 2026 Game Connection