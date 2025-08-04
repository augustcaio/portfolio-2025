# Portfolio 2025

Este é um projeto de portfolio pessoal desenvolvido com [Next.js](https://nextjs.org) e TypeScript.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário (100% Tailwind)
- **Lucide React** - Ícones modernos
- **Geist Font** - Tipografia otimizada

## 📁 Estrutura do Projeto

```
portfolio-2025/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal da aplicação
│   ├── page.tsx           # Página inicial
│   ├── projetos/          # Página de projetos
│   └── contato/           # Página de contato
├── components/            # Componentes reutilizáveis
│   ├── layout.tsx         # Layout com Navbar e Footer
│   ├── navbar.tsx         # Navegação principal
│   └── footer.tsx         # Rodapé com links sociais
├── lib/                   # Utilitários e configurações
└── public/                # Arquivos estáticos
```

## 🎯 Funcionalidades Implementadas

### Semana 2: Estrutura de Páginas e Layout ✅

- **Layout Base**: Componente layout reutilizável
- **Navbar Responsivo**: Navegação com menu mobile
- **Footer**: Links sociais e informações de copyright
- **Páginas**: Home, Projetos e Contato
- **Design Responsivo**: Adaptado para desktop e mobile
- **Tema Escuro**: Suporte a modo escuro/claro

## 🛠️ Como Executar

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**

   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   ```
   http://localhost:3001
   ```

## 📱 Páginas Disponíveis

- **Home** (`/`) - Página inicial com apresentação
- **Projetos** (`/projetos`) - Galeria de projetos desenvolvidos
- **Contato** (`/contato`) - Formulário de contato e informações

## 🎨 Componentes

### Navbar

- Logo/nome do portfolio
- Links de navegação (Home, Projetos, Contato)
- Menu hambúrguer para mobile
- Design com backdrop blur

### Footer

- Copyright
- Links para redes sociais (GitHub, LinkedIn, Twitter, Email)
- Design responsivo

### Layout

- Integra Navbar e Footer
- Estrutura flexível para conteúdo
- Padding adequado para navbar fixo

## 🔧 Próximos Passos

- [ ] Implementar animações com Framer Motion
- [ ] Adicionar seção de habilidades
- [ ] Integrar formulário de contato com backend
- [ ] Otimizar SEO e performance
- [ ] Adicionar testes automatizados

## 📡 API Integration

### Consumo de API de Projetos ✅

- **Endpoint**: `https://git-api-i3y5.onrender.com/repos`
- **Função**: `fetchProjects()` em `/lib/api.ts`
- **Interface**: `Project` com tipagem TypeScript
- **Recursos**:
  - Nome e descrição do projeto
  - Linguagem de programação
  - Stars e forks do GitHub
  - Data de atualização
  - Topics/tags
  - Links para repositório e demo
- **Cache**: Revalidação a cada 1 hora
- **Error Handling**: Retorna lista vazia em caso de erro da API
- **Dados**: Apenas projetos reais da API externa

## 🐛 Problemas Resolvidos

### Erro de Hidratação

- **Problema**: Diferenças entre HTML do servidor e cliente causando erros de hidratação
- **Solução**:
  - Adicionado `suppressHydrationWarning={true}` no html e body
  - Criado componente `ClientOnly` para renderização apenas no cliente
  - Implementado skeleton loading para componentes interativos
  - Simplificado componentes removendo lógica de hidratação desnecessária
  - Otimizado imports do Lucide React

### CSS Simplificado

- **Problema**: Mistura de CSS vanilla desnecessário com Tailwind CSS
- **Solução**:
  - Removido CSS customizado desnecessário do `globals.css`
  - Mantido apenas variáveis CSS essenciais para shadcn/ui
  - Substituído `.line-clamp-3` por truncamento JavaScript
  - Projeto usa Tailwind CSS + variáveis shadcn/ui necessárias

### Erro da API Corrigido

- **Problema**: API externa retornando erro 404 (não encontrada)
- **Solução**:
  - Removidos dados mockados fictícios
  - Configurado para usar apenas dados reais da API
  - Melhor tratamento de erros com logs informativos
  - Interface limpa sem notificações de fallback

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
