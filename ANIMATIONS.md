# 🎨 Animações com Framer Motion

Este documento descreve as animações implementadas no portfolio usando Framer Motion.

## 📦 Instalação

```bash
npm install framer-motion
```

## 🎯 Componentes Animados

### 1. ProjectCard
**Arquivo**: `components/project-card.tsx`

**Animações implementadas**:
- **Entrada**: Cards aparecem com fade-in e slide-up com delay escalonado
- **Hover**: Cards se elevam suavemente (-8px) ao passar o mouse
- **Título**: Escala sutil (1.02x) no hover
- **Ícone GitHub**: Rotação (5°) e escala (1.1x) no hover
- **Badges**: Escala (1.05x) no hover com animação de entrada escalonada
- **Estatísticas**: Escala (1.05x) no hover
- **Botões**: Escala (1.02x) no hover, (0.98x) no click

**Código de exemplo**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.5, 
    delay: index * 0.1,
    ease: "easeOut"
  }}
  whileHover={{ 
    y: -8,
    transition: { duration: 0.2 }
  }}
>
```

### 2. Página de Projetos
**Arquivo**: `app/projetos/page.tsx`

**Animações implementadas**:
- **Header**: Fade-in com slide-down e escala
- **Filtro**: Slide-in da direita
- **Estatísticas**: Stagger animation com hover effects
- **Lista de projetos**: Container com stagger children
- **Botão "Carregar mais"**: Fade-in com slide-up

**Variantes de container**:
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### 3. LanguageFilter
**Arquivo**: `components/language-filter.tsx`

**Animações implementadas**:
- **Container**: Slide-in da direita
- **Select**: Escala no hover
- **Opções**: Fade-in escalonado

### 4. ProjectsSkeleton
**Arquivo**: `components/projects-skeleton.tsx`

**Animações implementadas**:
- **Container**: Fade-in geral
- **Elementos**: Stagger animation
- **Hover effects**: Escala nos cards skeleton

## 🆕 Componentes de Animação Reutilizáveis

### 1. PageTransition
**Arquivo**: `components/page-transition.tsx`

**Propósito**: Transições suaves entre páginas

**Uso**:
```tsx
<PageTransition>
  <SeuConteudo />
</PageTransition>
```

### 2. ScrollReveal
**Arquivo**: `components/scroll-reveal.tsx`

**Propósito**: Revelar elementos conforme o scroll

**Props**:
- `direction`: "up" | "down" | "left" | "right"
- `delay`: Delay em segundos
- `distance`: Distância da animação

**Uso**:
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <SeuElemento />
</ScrollReveal>
```

### 3. AnimatedLoader
**Arquivo**: `components/animated-loader.tsx`

**Propósito**: Loader animado personalizado

**Props**:
- `size`: "sm" | "md" | "lg"
- `className`: Classes CSS adicionais

**Uso**:
```tsx
<AnimatedLoader size="md" />
```

## 🎨 Tipos de Animações

### 1. Fade In/Out
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

### 2. Slide Animations
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

### 3. Scale Animations
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### 4. Stagger Animations
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### 5. Infinite Animations
```tsx
animate={{ rotate: 360 }}
transition={{
  duration: 2,
  repeat: Infinity,
  ease: "linear"
}}
```

## 🎯 Performance e Acessibilidade

### Performance
- **Reduced Motion**: Respeita preferências do usuário
- **GPU Acceleration**: Usa `transform` e `opacity` para melhor performance
- **Lazy Loading**: Animações só executam quando elementos estão visíveis

### Acessibilidade
- **Reduced Motion**: Detecta `prefers-reduced-motion`
- **ARIA Labels**: Mantidos em todos os elementos animados
- **Focus Management**: Animações não interferem na navegação por teclado

## 🔧 Configurações

### Easing Functions
- `easeOut`: Para entradas suaves
- `easeInOut`: Para transições
- `linear`: Para animações infinitas

### Timing
- **Entrada**: 0.5s - 0.6s
- **Hover**: 0.2s
- **Stagger**: 0.1s entre elementos

## 🚀 Melhorias Futuras

### Possíveis Implementações
1. **Page Transitions**: Animações entre rotas
2. **Parallax Effects**: Efeitos de profundidade
3. **Gesture Animations**: Animações baseadas em gestos
4. **Spring Physics**: Animações mais naturais
5. **Lottie Integration**: Animações vetoriais complexas

### Otimizações
1. **Bundle Splitting**: Carregar Framer Motion sob demanda
2. **Animation Caching**: Cache de animações frequentes
3. **Intersection Observer**: Otimizar animações de scroll

## 📚 Recursos

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Animation Best Practices](https://www.framer.com/motion/best-practices/)
- [Performance Guide](https://www.framer.com/motion/performance/)
- [Accessibility Guide](https://www.framer.com/motion/accessibility/)

## 🎨 Exemplos de Uso

### Animação de Lista
```tsx
<motion.div variants={containerVariants}>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      variants={itemVariants}
      custom={index}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Animação de Loading
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }}
>
  <SpinnerIcon />
</motion.div>
```

### Animação de Hover
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  <Button />
</motion.div>
```

---

**Nota**: Todas as animações foram implementadas seguindo as melhores práticas de performance e acessibilidade, garantindo uma experiência suave e inclusiva para todos os usuários. 