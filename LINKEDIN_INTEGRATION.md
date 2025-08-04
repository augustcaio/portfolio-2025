# Integração com LinkedIn

Este projeto inclui uma integração com o LinkedIn para buscar dados do perfil automaticamente e exibi-los no currículo.

## 🚀 Funcionalidades Atuais

- ✅ Busca de dados do perfil do LinkedIn
- ✅ Exibição dinâmica de informações no currículo
- ✅ Status de sincronização em tempo real
- ✅ Modo offline com dados locais
- ✅ Print-friendly com dados atualizados

## 📋 Dados Sincronizados

- **Informações Pessoais**: Nome, headline, localização
- **Experiência Profissional**: Cargo, empresa, período, descrições
- **Educação**: Formação, instituição, período
- **Habilidades**: Lista de tecnologias e competências
- **Certificações**: Nome, emissor, ano
- **Contato**: Email, telefone, links sociais

## 🔧 Configuração Atual

### Dados Mockados

Atualmente, o sistema usa dados mockados baseados no perfil real do LinkedIn. Os dados estão em:

```
lib/linkedin-api.ts
```

### API Route

A API route está disponível em:

```
/api/linkedin
```

## 🔗 Integração Real com LinkedIn

Para implementar a integração real com a API do LinkedIn, você precisará:

### 1. Criar uma Aplicação no LinkedIn

1. Acesse [LinkedIn Developers](https://developer.linkedin.com/)
2. Crie uma nova aplicação
3. Configure as permissões necessárias:
   - `r_liteprofile` - Perfil básico
   - `r_emailaddress` - Email
   - `r_basicprofile` - Perfil completo

### 2. Configurar Variáveis de Ambiente

```env
LINKEDIN_CLIENT_ID=seu_client_id
LINKEDIN_CLIENT_SECRET=seu_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback
```

### 3. Implementar OAuth Flow

```typescript
// lib/linkedin-auth.ts
export const getLinkedInAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
    scope: "r_liteprofile r_emailaddress",
    state: generateRandomState(),
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params}`;
};
```

### 4. Buscar Dados Reais

```typescript
// lib/linkedin-api.ts
export const fetchLinkedInProfile = async (accessToken: string) => {
  const response = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
```

## 🛠️ Alternativas para Dados Reais

### 1. Web Scraping (Não Recomendado)

- Pode violar os Termos de Serviço do LinkedIn
- Instável devido a mudanças na interface
- Requer manutenção constante

### 2. APIs de Terceiros

- **Apify**: Oferece scrapers para LinkedIn
- **ScrapingBee**: API de web scraping
- **Bright Data**: Proxy e scraping

### 3. Sincronização Manual

- Atualizar dados manualmente no arquivo `linkedin-api.ts`
- Usar um CMS para gerenciar o currículo
- Integração com Notion, Sanity, ou similar

## 📊 Estrutura de Dados

```typescript
interface LinkedInProfile {
  name: string;
  headline: string;
  location: string;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  contact: ContactInfo;
}
```

## 🔄 Atualização Automática

Para manter os dados sempre atualizados:

### 1. Webhook do LinkedIn

- Configure webhooks para mudanças no perfil
- Atualize dados automaticamente

### 2. Sincronização Periódica

```typescript
// Cron job ou Vercel Cron
export async function syncLinkedInData() {
  // Buscar dados atualizados
  // Salvar no banco de dados
  // Invalidar cache
}
```

### 3. Cache Inteligente

```typescript
// Cache por 1 hora, revalidação em background
export const getLinkedInProfile = async () => {
  const cached = await redis.get("linkedin_profile");
  if (cached) return JSON.parse(cached);

  const fresh = await fetchFreshData();
  await redis.setex("linkedin_profile", 3600, JSON.stringify(fresh));
  return fresh;
};
```

## 🚨 Limitações e Considerações

### Rate Limiting

- LinkedIn tem limites de requisições
- Implemente cache adequado
- Use retry com backoff exponencial

### Privacidade

- Respeite as configurações de privacidade
- Só busque dados públicos
- Implemente consentimento do usuário

### Conformidade

- Siga as diretrizes da API do LinkedIn
- Respeite os Termos de Serviço
- Implemente logging adequado

## 📝 Próximos Passos

1. **Implementar OAuth**: Configurar autenticação real
2. **Banco de Dados**: Salvar dados sincronizados
3. **Cache**: Implementar cache inteligente
4. **Webhooks**: Configurar atualizações automáticas
5. **UI/UX**: Melhorar interface de sincronização

## 🔗 Links Úteis

- [LinkedIn API Documentation](https://developer.linkedin.com/docs)
- [OAuth 2.0 Flow](https://developer.linkedin.com/docs/oauth2)
- [Profile API](https://developer.linkedin.com/docs/profile-api)
- [Rate Limiting](https://developer.linkedin.com/docs/guide/v2/rate-limits)
