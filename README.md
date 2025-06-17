# 🚀 MCP Evolution API Server

Servidor HTTP que expõe sua Evolution API v2.2.3 para permitir acesso remoto do Claude via MCP.

## 🎯 **O que este servidor faz:**

- ✅ **Expõe Evolution API** via REST endpoints
- ✅ **Permite acesso remoto do Claude** às suas instâncias WhatsApp
- ✅ **41 endpoints** para controle completo do WhatsApp
- ✅ **Integração com Chatwoot** 
- ✅ **Autenticação por API secret**
- ✅ **Deploy fácil no Easypanel**

## 🚀 **Deploy Rápido no Easypanel**

### **1. Criar novo serviço**
1. Acesse seu Easypanel
2. Vá para projeto `ia`
3. Clique em `+ Add Service`
4. Escolha `App`

### **2. Configurar source**
```yaml
Type: GitHub Repository
Repository: https://github.com/JeanZorzetti/mcp-evolution-api-server
Branch: main
Auto Deploy: ✅ Enabled
```

### **3. Configurações básicas**
```yaml
Service Name: mcp-evolution-claude
Build Type: Dockerfile
Port: 3000
Network: easypanel-ia
```

### **4. Variáveis de ambiente**
Adicione estas variáveis no Easypanel:

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Evolution API (URL interna do Easypanel)
EVOLUTION_API_URL=http://ia_evolution-api:8080
EVOLUTION_API_KEY=SuOOmamlmXs4NV3nkxpHAy7z3rcurbIz

# Chatwoot
CHATWOOT_BASE_URL=https://cmbznxmua007607qx1g71c6wi.easypanel.app
CHATWOOT_ACCESS_TOKEN=HYryEBjcUMpfBWmA4njPrD6c

# Segurança  
API_SECRET=mcp-claude-evolution-2025-secure
CORS_ORIGIN=*

# Configurações
DEFAULT_INSTANCE_NAME=Teste
TIMEOUT_MS=30000
```

### **5. Configurar domínio**
- Adicionar domínio: `mcp-evolution.roilabs.com.br`
- SSL: Automático via Let's Encrypt

### **6. Deploy**
- Clique em `Deploy`
- Aguarde build completar
- Verificar logs para erros

## 🧪 **Testar após deploy**

### **Health check:**
```bash
curl https://mcp-evolution.roilabs.com.br/health
```

### **Verificar autenticação:**
```bash
curl -H "x-api-secret: mcp-claude-evolution-2025-secure" \
     https://mcp-evolution.roilabs.com.br/info
```

### **Listar instâncias:**
```bash
curl -H "x-api-secret: mcp-claude-evolution-2025-secure" \
     https://mcp-evolution.roilabs.com.br/api/instances/list
```

## 📡 **Endpoints da API**

### **🔐 Autenticação**
Todas as requisições precisam do header:
```
x-api-secret: mcp-claude-evolution-2025-secure
```

### **📱 Instâncias**
- `GET /api/instances/list` - Listar instâncias
- `POST /api/instances/create` - Criar nova instância
- `GET /api/instances/:name/status` - Status da instância
- `GET /api/instances/:name/qrcode` - Obter QR Code
- `DELETE /api/instances/:name/logout` - Logout da instância
- `PUT /api/instances/:name/restart` - Reiniciar instância
- `DELETE /api/instances/:name` - Deletar instância

### **💬 Mensagens**
- `POST /api/messages/:instance/text` - Enviar texto
- `POST /api/messages/:instance/media` - Enviar mídia
- `POST /api/messages/:instance/audio` - Enviar áudio
- `POST /api/messages/:instance/location` - Enviar localização
- `POST /api/messages/:instance/contact` - Enviar contato
- `POST /api/messages/:instance/reaction` - Enviar reação

### **👥 Contatos**
- `GET /api/contacts/:instance/list` - Listar contatos
- `GET /api/contacts/:instance/:number/info` - Info do contato
- `GET /api/contacts/:instance/:number/picture` - Foto do perfil
- `GET /api/contacts/:instance/:number/status` - Status do perfil

### **👨‍👩‍👧‍👦 Grupos**
- `POST /api/groups/:instance/create` - Criar grupo
- `GET /api/groups/:instance/list` - Listar grupos
- `GET /api/groups/:instance/:groupId/info` - Info do grupo
- `GET /api/groups/:instance/:groupId/participants` - Participantes
- `PUT /api/groups/:instance/participants/add` - Adicionar participantes
- `PUT /api/groups/:instance/participants/remove` - Remover participantes
- `PUT /api/groups/:instance/participants/promote` - Promover admin
- `PUT /api/groups/:instance/participants/demote` - Rebaixar admin
- `PUT /api/groups/:instance/subject` - Alterar nome
- `PUT /api/groups/:instance/description` - Alterar descrição
- `DELETE /api/groups/:instance/:groupId/leave` - Sair do grupo

### **🔗 Webhooks**
- `POST /api/webhooks/:instance/set` - Configurar webhook
- `GET /api/webhooks/:instance` - Obter configuração

### **🤖 Chatwoot**
- `POST /api/chatwoot/:instance/set` - Configurar Chatwoot
- `GET /api/chatwoot/:instance` - Obter configuração

### **💬 Chat**
- `GET /api/chat/:instance/list` - Listar conversas
- `GET /api/chat/:instance/:number/messages` - Obter mensagens
- `PUT /api/chat/:instance/read` - Marcar como lida
- `PUT /api/chat/:instance/archive` - Arquivar conversa
- `DELETE /api/chat/:instance/message` - Deletar mensagem

### **🔧 Utilitários**
- `PUT /api/utils/:instance/presence` - Definir presença
- `PUT /api/utils/:instance/block` - Bloquear/desbloquear

## 📋 **Exemplos de uso**

### **Enviar mensagem de texto:**
```bash
curl -X POST \
  -H "x-api-secret: mcp-claude-evolution-2025-secure" \
  -H "Content-Type: application/json" \
  -d '{"number":"5511999999999","text":"Olá do Claude!"}' \
  https://mcp-evolution.roilabs.com.br/api/messages/Teste/text
```

### **Criar grupo:**
```bash
curl -X POST \
  -H "x-api-secret: mcp-claude-evolution-2025-secure" \
  -H "Content-Type: application/json" \
  -d '{"subject":"Grupo Claude","participants":["5511999999999"]}' \
  https://mcp-evolution.roilabs.com.br/api/groups/Teste/create
```

### **Configurar Chatwoot:**
```bash
curl -X POST \
  -H "x-api-secret: mcp-claude-evolution-2025-secure" \
  -H "Content-Type: application/json" \
  -d '{"enabled":true,"accountId":"1","token":"seu-token","url":"https://chatwoot.com"}' \
  https://mcp-evolution.roilabs.com.br/api/chatwoot/Teste/set
```

## 🔒 **Segurança**

- ✅ **API Secret obrigatório** para todas as rotas protegidas
- ✅ **CORS configurado** para permitir acesso do Claude
- ✅ **Headers de segurança** implementados
- ✅ **Validação de entrada** em todos os endpoints
- ✅ **Rate limiting** (pode ser adicionado conforme necessário)

## 🔧 **Desenvolvimento local**

### **1. Clonar repositório:**
```bash
git clone https://github.com/JeanZorzetti/mcp-evolution-api-server
cd mcp-evolution-api-server
```

### **2. Instalar dependências:**
```bash
npm install
```

### **3. Configurar ambiente:**
```bash
cp .env.example .env
# Editar .env com suas configurações
```

### **4. Compilar e executar:**
```bash
npm run build
npm start
```

### **5. Testar:**
```bash
curl http://localhost:3000/health
```

## 🐳 **Docker**

### **Build manual:**
```bash
docker build -t mcp-evolution-api .
docker run -p 3000:3000 --env-file .env mcp-evolution-api
```

## 🎯 **Como o Claude vai usar**

Após o deploy, você pode informar ao Claude:

```
🤖 Claude, o servidor MCP está pronto!

URL: https://mcp-evolution.roilabs.com.br
API Secret: mcp-claude-evolution-2025-secure

Você agora tem acesso à minha Evolution API! 
Pode listar instâncias, enviar mensagens, criar grupos, etc.
```

O Claude poderá então:
- 📱 **Gerenciar suas instâncias** WhatsApp
- 💬 **Enviar mensagens** automáticas
- 👥 **Criar e administrar grupos**
- 🤖 **Configurar Chatwoot**
- 📊 **Monitorar conversas**
- 🔧 **Automatizar workflows**

## 🛠️ **Troubleshooting**

### **Erro de build:**
- Verificar se todas as dependências estão no package.json
- Confirmar se TypeScript compila sem erros

### **Erro de conexão com Evolution API:**
- Verificar URL interna: `http://ia_evolution-api:8080`
- Confirmar que ambos estão na mesma network (`easypanel-ia`)
- Testar API Key

### **401 Unauthorized:**
- Verificar header `x-api-secret`
- Confirmar valor: `mcp-claude-evolution-2025-secure`

### **Logs do container:**
```bash
# No Easypanel, vá em Services > mcp-evolution-claude > Logs
```

## 📄 **Licença**

MIT License - Use livremente para seus projetos.

## 🤝 **Contribuições**

Contribuições são bem-vindas! Abra issues ou PRs.

---

**🎯 Resultado:** Claude com acesso total à sua Evolution API!

**🚀 Status:** Pronto para produção  
**⭐ Recursos:** 41 endpoints completos  
**🔒 Segurança:** API Secret protegido  
**📱 Compatibilidade:** Evolution API v2.2.3  
**🤖 Integração:** Chatwoot incluído
