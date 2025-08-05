# Footer com Estatísticas do GitHub

## Visão Geral

O footer da aplicação foi redesenhado para incluir estatísticas em tempo real do GitHub, mostrando o progresso e engajamento na comunidade de desenvolvimento.

## Funcionalidades

### 📊 Estatísticas do GitHub

- **Repositórios**: Número total de repositórios públicos
- **Seguidores**: Quantidade de seguidores no GitHub
- **Stars**: Total de stars recebidos em todos os repositórios
- **Forks**: Total de forks dos repositórios
- **Data de Atualização**: Indica quando os dados foram atualizados pela última vez

### 🔗 Links Sociais

- **GitHub**: Link direto para o perfil
- **LinkedIn**: Perfil profissional
- **Email**: Contato direto via email

## Componentes

### 1. `GitHubStats` (`components/github-stats.tsx`)

Componente responsável por exibir as estatísticas do GitHub com:

- Loading state com skeleton
- Animações suaves com Framer Motion
- Formatação de números (ex: 1.5k para 1500)
- Cores diferenciadas para cada métrica
- Responsividade (labels ocultos em telas pequenas)

### 2. `Footer` (`components/footer.tsx`)

Footer principal com:

- Seção de estatísticas do GitHub
- Links sociais com animações
- Copyright e informações técnicas
- Design responsivo e minimalista

### 3. API `github-stats` (`app/api/github-stats/route.ts`)

Endpoint que busca dados do GitHub:

- Dados do usuário (seguidores, repositórios)
- Cálculo de stars e forks totais
- Fallback para dados em caso de erro
- Cache control para performance

## Características do Design

### 🎨 Visual

- **Minimalista**: Design limpo e focado no conteúdo
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Animações**: Transições suaves e interativas
- **Cores**: Esquema de cores consistente com o tema da aplicação

### 🌙 Dark Mode

- Suporte completo ao modo escuro
- Cores adaptativas para melhor contraste
- Transições suaves entre temas

### ⚡ Performance

- Dados em cache para evitar requisições excessivas
- Loading states para melhor UX
- Fallback graceful em caso de erro da API

## Estrutura de Dados

```typescript
interface GitHubStats {
  followers: number;
  public_repos: number;
  total_stars: number;
  total_forks: number;
  updated_at: string;
}
```

## Configuração

### Variáveis de Ambiente

Certifique-se de que o `GITHUB_TOKEN` está configurado no arquivo `.env.local`:

```env
GITHUB_TOKEN=seu_token_do_github_aqui
```

### Token do GitHub

O token precisa das seguintes permissões:

- `public_repo` - Para acessar repositórios públicos
- `read:user` - Para ler informações do usuário

## Uso

O footer é automaticamente incluído em todas as páginas através do componente `Layout`. Não é necessário importá-lo manualmente.

## Personalização

### Cores dos Ícones

As cores dos ícones podem ser personalizadas no componente `GitHubStats`:

```typescript
const statsItems = [
  {
    icon: Github,
    label: "Repositórios",
    color: "text-blue-600 dark:text-blue-400",
  },
  // ...
];
```

### Links Sociais

Os links sociais podem ser modificados no componente `Footer`:

```typescript
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/seu-usuario",
    icon: Github,
    color: "hover:text-gray-900 dark:hover:text-white",
  },
  // ...
];
```

## Responsividade

- **Desktop**: Exibe todas as informações com labels completos
- **Tablet**: Mantém layout similar ao desktop
- **Mobile**: Oculta labels dos números, mantendo apenas os ícones e valores

## Acessibilidade

- Labels ARIA para todos os links
- Contraste adequado em ambos os temas
- Navegação por teclado suportada
- Textos descritivos para screen readers
