# 🌙 Sistema de Dark Mode

Este documento descreve a implementação do sistema de dark mode no portfolio.

## 📦 Componentes Implementados

### 1. ThemeContext
**Arquivo**: `lib/theme-context.tsx`

**Funcionalidades**:
- ✅ **Gerenciamento de estado**: Controla o tema atual (light/dark)
- ✅ **Persistência**: Salva preferência no localStorage
- ✅ **Detecção automática**: Detecta preferência do sistema
- ✅ **Prevenção de flash**: Evita flash de conteúdo não estilizado
- ✅ **Hydration safe**: Compatível com SSR

**Hook personalizado**:
```tsx
const { theme, toggleTheme, setTheme } = useTheme();
```

### 2. ThemeToggle
**Arquivo**: `components/theme-toggle.tsx`

**Características**:
- ✅ **Animações suaves**: Transições com Framer Motion
- ✅ **Ícones dinâmicos**: Sol/Lua que alternam
- ✅ **Acessibilidade**: ARIA labels apropriados
- ✅ **Responsivo**: Funciona em mobile e desktop

### 3. ThemeScript
**Arquivo**: `app/theme-script.tsx`

**Propósito**: Aplica o tema inicial no HTML para evitar flash
- ✅ **Execução imediata**: Roda antes do React
- ✅ **Fallback seguro**: Light mode como padrão
- ✅ **Detecção de sistema**: Respeita preferência do usuário

## 🎨 Implementação Visual

### Cores do Sistema

**Light Mode**:
- Background: `bg-gray-50` / `bg-white`
- Text: `text-gray-900` / `text-gray-700`
- Borders: `border-gray-200`
- Accent: `text-blue-600`

**Dark Mode**:
- Background: `bg-gray-900` / `bg-gray-800`
- Text: `text-white` / `text-gray-300`
- Borders: `border-gray-700`
- Accent: `text-blue-400`

### Transições
```css
transition-colors duration-300
```

## 📱 Componentes Atualizados

### 1. Layout Principal
- ✅ **Header**: Background com blur e transparência
- ✅ **Navbar**: Cores adaptativas
- ✅ **Footer**: Suporte completo ao dark mode

### 2. Páginas
- ✅ **Home**: Gradiente adaptativo
- ✅ **Projetos**: Cards e elementos com cores apropriadas
- ✅ **Contato**: Formulário e informações de contato

### 3. Componentes UI
- ✅ **Cards**: Background e bordas adaptativas
- ✅ **Botões**: Estados hover e focus
- ✅ **Inputs**: Background e texto adaptativos
- ✅ **Badges**: Cores de fundo e texto

## 🔧 Configuração

### 1. Tailwind CSS
O sistema usa as classes `dark:` do Tailwind para aplicar estilos condicionalmente.

### 2. Context Provider
```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### 3. Script de Inicialização
```tsx
<ThemeScript />
```

## 🎯 Funcionalidades

### 1. Detecção Automática
- Verifica `localStorage` para tema salvo
- Detecta preferência do sistema (`prefers-color-scheme`)
- Fallback para light mode

### 2. Persistência
- Salva preferência no `localStorage`
- Mantém escolha entre sessões
- Sincroniza entre abas

### 3. Performance
- Evita flash de conteúdo
- Transições suaves
- Hydration segura

### 4. Acessibilidade
- ARIA labels apropriados
- Suporte a `prefers-reduced-motion`
- Navegação por teclado

## 📱 Responsividade

### Desktop
- Toggle visível na navbar
- Animações completas
- Layout otimizado

### Mobile
- Menu lateral com toggle
- Animações adaptadas
- Touch-friendly

## 🚀 Melhorias Futuras

### Possíveis Implementações
1. **Tema automático**: Baseado na hora do dia
2. **Temas customizados**: Múltiplas opções de cores
3. **Animações condicionais**: Baseadas no tema
4. **Sincronização**: Entre dispositivos

### Otimizações
1. **CSS Variables**: Para temas dinâmicos
2. **Bundle splitting**: Carregar estilos sob demanda
3. **Cache**: Otimizar performance

## 🎨 Exemplos de Uso

### Componente com Dark Mode
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold">Título</h1>
  <p className="text-gray-600 dark:text-gray-300">Descrição</p>
</div>
```

### Hook de Tema
```tsx
function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Tema atual: {theme}
    </button>
  );
}
```

### Condicionais
```tsx
{theme === 'dark' ? <MoonIcon /> : <SunIcon />}
```

## 🔍 Debugging

### Verificar Tema Atual
```javascript
// No console do navegador
localStorage.getItem('theme')
document.documentElement.classList.contains('dark')
```

### Forçar Tema
```javascript
// Light mode
localStorage.setItem('theme', 'light')
document.documentElement.classList.remove('dark')

// Dark mode
localStorage.setItem('theme', 'dark')
document.documentElement.classList.add('dark')
```

## 📚 Recursos

- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Next.js with Dark Mode](https://nextjs.org/docs/advanced-features/custom-document)
- [Framer Motion](https://www.framer.com/motion/)
- [CSS Color Scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)

---

**Nota**: O sistema de dark mode foi implementado seguindo as melhores práticas de acessibilidade, performance e experiência do usuário, garantindo uma transição suave e consistente em toda a aplicação. 