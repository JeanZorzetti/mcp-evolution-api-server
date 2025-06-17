import express from 'express';
import cors from 'cors';
import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

interface EvolutionAPIConfig {
  baseURL: string;
  apiKey: string;
  timeout: number;
}

class EvolutionAPIClient {
  private api: AxiosInstance;

  constructor(config: EvolutionAPIConfig) {
    this.api = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.apiKey,
      },
    });
  }

  // ================== INSTÂNCIAS ==================
  async createInstance(instanceName: string, qrcode: boolean = true) {
    const response = await this.api.post(`/instance/create`, {
      instanceName,
      qrcode,
    });
    return response.data;
  }

  async getInstances() {
    const response = await this.api.get('/instance/fetchInstances');
    return response.data;
  }

  async getInstance(instanceName: string) {
    const response = await this.api.get(`/instance/connect/${instanceName}`);
    return response.data;
  }

  async deleteInstance(instanceName: string) {
    const response = await this.api.delete(`/instance/delete/${instanceName}`);
    return response.data;
  }

  async getInstanceStatus(instanceName: string) {
    const response = await this.api.get(`/instance/connectionState/${instanceName}`);
    return response.data;
  }

  async logoutInstance(instanceName: string) {
    const response = await this.api.delete(`/instance/logout/${instanceName}`);
    return response.data;
  }

  async restartInstance(instanceName: string) {
    const response = await this.api.put(`/instance/restart/${instanceName}`);
    return response.data;
  }

  async getQRCode(instanceName: string) {
    const response = await this.api.get(`/instance/qrcode/${instanceName}`);
    return response.data;
  }

  // ================== MENSAGENS ==================
  async sendTextMessage(instanceName: string, data: {
    number: string;
    text: string;
    delay?: number;
    quoted?: any;
    mentionsEveryOne?: boolean;
    mentioned?: string[];
  }) {
    const response = await this.api.post(`/message/sendText/${instanceName}`, data);
    return response.data;
  }

  async sendMediaMessage(instanceName: string, data: {
    number: string;
    mediatype: 'image' | 'document' | 'video' | 'audio';
    media: string;
    caption?: string;
    fileName?: string;
    delay?: number;
    quoted?: any;
    mentionsEveryOne?: boolean;
    mentioned?: string[];
  }) {
    const response = await this.api.post(`/message/sendMedia/${instanceName}`, data);
    return response.data;
  }

  async sendAudioMessage(instanceName: string, data: {
    number: string;
    audio: string;
    delay?: number;
    encoding?: boolean;
  }) {
    const response = await this.api.post(`/message/sendWhatsAppAudio/${instanceName}`, data);
    return response.data;
  }

  async sendLocationMessage(instanceName: string, data: {
    number: string;
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  }) {
    const response = await this.api.post(`/message/sendLocation/${instanceName}`, data);
    return response.data;
  }

  async sendContactMessage(instanceName: string, data: {
    number: string;
    contact: {
      fullName: string;
      wuid: string;
      phoneNumber: string;
      organization?: string;
      email?: string;
      url?: string;
    };
  }) {
    const response = await this.api.post(`/message/sendContact/${instanceName}`, data);
    return response.data;
  }

  async sendReactionMessage(instanceName: string, data: {
    number: string;
    reaction: string;
    messageId: string;
  }) {
    const response = await this.api.post(`/message/sendReaction/${instanceName}`, data);
    return response.data;
  }

  // ================== CONTATOS ==================
  async getContacts(instanceName: string) {
    const response = await this.api.get(`/chat/findContacts/${instanceName}`);
    return response.data;
  }

  async getContactInfo(instanceName: string, number: string) {
    const response = await this.api.get(`/chat/whatsappNumbers/${instanceName}?numbers=${number}`);
    return response.data;
  }

  async getProfilePicture(instanceName: string, number: string) {
    const response = await this.api.get(`/chat/profilePicture/${instanceName}?number=${number}`);
    return response.data;
  }

  async getProfileStatus(instanceName: string, number: string) {
    const response = await this.api.get(`/chat/profileStatus/${instanceName}?number=${number}`);
    return response.data;
  }

  // ================== GRUPOS ==================
  async createGroup(instanceName: string, data: {
    subject: string;
    description?: string;
    participants: string[];
  }) {
    const response = await this.api.post(`/group/create/${instanceName}`, data);
    return response.data;
  }

  async getGroups(instanceName: string) {
    const response = await this.api.get(`/group/fetchAllGroups/${instanceName}`);
    return response.data;
  }

  async getGroupInfo(instanceName: string, groupJid: string) {
    const response = await this.api.get(`/group/findGroupInfos/${instanceName}?groupJid=${groupJid}`);
    return response.data;
  }

  async getGroupParticipants(instanceName: string, groupJid: string) {
    const response = await this.api.get(`/group/participants/${instanceName}?groupJid=${groupJid}`);
    return response.data;
  }

  async addParticipants(instanceName: string, data: {
    groupJid: string;
    participants: string[];
  }) {
    const response = await this.api.put(`/group/updateParticipant/${instanceName}`, {
      ...data,
      action: 'add',
    });
    return response.data;
  }

  async removeParticipants(instanceName: string, data: {
    groupJid: string;
    participants: string[];
  }) {
    const response = await this.api.put(`/group/updateParticipant/${instanceName}`, {
      ...data,
      action: 'remove',
    });
    return response.data;
  }

  async promoteParticipants(instanceName: string, data: {
    groupJid: string;
    participants: string[];
  }) {
    const response = await this.api.put(`/group/updateParticipant/${instanceName}`, {
      ...data,
      action: 'promote',
    });
    return response.data;
  }

  async demoteParticipants(instanceName: string, data: {
    groupJid: string;
    participants: string[];
  }) {
    const response = await this.api.put(`/group/updateParticipant/${instanceName}`, {
      ...data,
      action: 'demote',
    });
    return response.data;
  }

  async updateGroupSubject(instanceName: string, data: {
    groupJid: string;
    subject: string;
  }) {
    const response = await this.api.put(`/group/updateGroupSubject/${instanceName}`, data);
    return response.data;
  }

  async updateGroupDescription(instanceName: string, data: {
    groupJid: string;
    description: string;
  }) {
    const response = await this.api.put(`/group/updateGroupDescription/${instanceName}`, data);
    return response.data;
  }

  async leaveGroup(instanceName: string, groupJid: string) {
    const response = await this.api.delete(`/group/leaveGroup/${instanceName}?groupJid=${groupJid}`);
    return response.data;
  }

  // ================== WEBHOOKS ==================
  async setWebhook(instanceName: string, data: {
    url: string;
    enabled: boolean;
    webhookByEvents?: boolean;
    webhookBase64?: boolean;
    events?: string[];
  }) {
    const response = await this.api.post(`/webhook/set/${instanceName}`, data);
    return response.data;
  }

  async getWebhook(instanceName: string) {
    const response = await this.api.get(`/webhook/find/${instanceName}`);
    return response.data;
  }

  // ================== CHATWOOT ==================
  async setChatwoot(instanceName: string, data: {
    enabled: boolean;
    accountId: string;
    token: string;
    url: string;
    nameInbox?: string;
    signMsg?: boolean;
    reopenConversation?: boolean;
    conversationPending?: boolean;
    importContacts?: boolean;
    importMessages?: boolean;
    daysLimitImportMessages?: number;
    signDelimiter?: string;
    autoCreate?: boolean;
    organization?: string;
    logo?: string;
  }) {
    const response = await this.api.post(`/chatwoot/set/${instanceName}`, data);
    return response.data;
  }

  async getChatwoot(instanceName: string) {
    const response = await this.api.get(`/chatwoot/find/${instanceName}`);
    return response.data;
  }

  // ================== CHAT ==================
  async getChats(instanceName: string) {
    const response = await this.api.get(`/chat/findChats/${instanceName}`);
    return response.data;
  }

  async getChatMessages(instanceName: string, data: {
    number: string;
    limit?: number;
    page?: number;
  }) {
    const { number, limit = 20, page = 1 } = data;
    const response = await this.api.get(`/chat/findMessages/${instanceName}?number=${number}&limit=${limit}&page=${page}`);
    return response.data;
  }

  async markMessageAsRead(instanceName: string, data: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  }) {
    const response = await this.api.put(`/chat/markMessageAsRead/${instanceName}`, data);
    return response.data;
  }

  async archiveChat(instanceName: string, data: {
    chat: string;
    archive: boolean;
  }) {
    const response = await this.api.put(`/chat/archiveChat/${instanceName}`, data);
    return response.data;
  }

  async deleteMessage(instanceName: string, data: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  }) {
    const response = await this.api.delete(`/chat/deleteMessage/${instanceName}`, { data });
    return response.data;
  }

  // ================== UTILITÁRIOS ==================
  async sendPresence(instanceName: string, data: {
    number: string;
    presence: 'available' | 'composing' | 'recording' | 'paused';
    delay?: number;
  }) {
    const response = await this.api.put(`/chat/presence/${instanceName}`, data);
    return response.data;
  }

  async blockUnblockContact(instanceName: string, data: {
    number: string;
    status: 'block' | 'unblock';
  }) {
    const response = await this.api.put(`/chat/updateContactBlock/${instanceName}`, data);
    return response.data;
  }
}

// Configuração do cliente Evolution API
const config: EvolutionAPIConfig = {
  baseURL: process.env.EVOLUTION_API_URL || 'http://ia_evolution-api:8080',
  apiKey: process.env.EVOLUTION_API_KEY || '',
  timeout: parseInt(process.env.TIMEOUT_MS || '30000'),
};

const evolutionClient = new EvolutionAPIClient(config);

// Criar aplicação Express
const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-secret'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de autenticação simples
const authenticate = (req: any, res: any, next: any) => {
  const apiSecret = req.headers['x-api-secret'];
  
  if (process.env.API_SECRET && apiSecret !== process.env.API_SECRET) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Invalid API secret' 
    });
  }
  
  next();
};

// Middleware de tratamento de erros
const handleAsync = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ================== ROTAS DA API ==================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'MCP Evolution API Server',
    version: '1.0.0',
    port: port
  });
});

// Informações do servidor
app.get('/info', authenticate, (req, res) => {
  res.json({
    service: 'MCP Evolution API Server for Claude',
    version: '1.0.0',
    port: port,
    evolutionApiUrl: config.baseURL,
    availableEndpoints: {
      instances: '/api/instances/*',
      messages: '/api/messages/*', 
      contacts: '/api/contacts/*',
      groups: '/api/groups/*',
      webhooks: '/api/webhooks/*',
      chatwoot: '/api/chatwoot/*',
      chat: '/api/chat/*',
      utils: '/api/utils/*'
    },
    documentation: 'https://github.com/EvolutionAPI/evolution-api'
  });
});

// ================== INSTÂNCIAS ==================
app.post('/api/instances/create', authenticate, handleAsync(async (req: any, res: any) => {
  const { instanceName, qrcode = true } = req.body;
  const result = await evolutionClient.createInstance(instanceName, qrcode);
  res.json({ success: true, data: result });
}));

app.get('/api/instances/list', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getInstances();
  res.json({ success: true, data: result });
}));

app.get('/api/instances/:instanceName/info', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getInstance(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.delete('/api/instances/:instanceName', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.deleteInstance(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.get('/api/instances/:instanceName/status', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getInstanceStatus(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.delete('/api/instances/:instanceName/logout', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.logoutInstance(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.put('/api/instances/:instanceName/restart', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.restartInstance(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.get('/api/instances/:instanceName/qrcode', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getQRCode(req.params.instanceName);
  res.json({ success: true, data: result });
}));

// ================== MENSAGENS ==================
app.post('/api/messages/:instanceName/text', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.sendTextMessage(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.post('/api/messages/:instanceName/media', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.sendMediaMessage(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.post('/api/messages/:instanceName/audio', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.sendAudioMessage(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.post('/api/messages/:instanceName/location', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.sendLocationMessage(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.post('/api/messages/:instanceName/contact', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.sendContactMessage(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.post('/api/messages/:instanceName/reaction', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.sendReactionMessage(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

// ================== CONTATOS ==================
app.get('/api/contacts/:instanceName/list', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getContacts(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.get('/api/contacts/:instanceName/:number/info', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getContactInfo(req.params.instanceName, req.params.number);
  res.json({ success: true, data: result });
}));

app.get('/api/contacts/:instanceName/:number/picture', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getProfilePicture(req.params.instanceName, req.params.number);
  res.json({ success: true, data: result });
}));

app.get('/api/contacts/:instanceName/:number/status', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getProfileStatus(req.params.instanceName, req.params.number);
  res.json({ success: true, data: result });
}));

// ================== GRUPOS ==================
app.post('/api/groups/:instanceName/create', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.createGroup(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.get('/api/groups/:instanceName/list', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getGroups(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.get('/api/groups/:instanceName/:groupJid/info', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getGroupInfo(req.params.instanceName, req.params.groupJid);
  res.json({ success: true, data: result });
}));

app.get('/api/groups/:instanceName/:groupJid/participants', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getGroupParticipants(req.params.instanceName, req.params.groupJid);
  res.json({ success: true, data: result });
}));

app.put('/api/groups/:instanceName/participants/add', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.addParticipants(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.put('/api/groups/:instanceName/participants/remove', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.removeParticipants(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.put('/api/groups/:instanceName/participants/promote', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.promoteParticipants(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.put('/api/groups/:instanceName/participants/demote', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.demoteParticipants(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.put('/api/groups/:instanceName/subject', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.updateGroupSubject(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.put('/api/groups/:instanceName/description', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.updateGroupDescription(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.delete('/api/groups/:instanceName/:groupJid/leave', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.leaveGroup(req.params.instanceName, req.params.groupJid);
  res.json({ success: true, data: result });
}));

// ================== WEBHOOKS ==================
app.post('/api/webhooks/:instanceName/set', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.setWebhook(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.get('/api/webhooks/:instanceName', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getWebhook(req.params.instanceName);
  res.json({ success: true, data: result });
}));

// ================== CHATWOOT ==================
app.post('/api/chatwoot/:instanceName/set', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.setChatwoot(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.get('/api/chatwoot/:instanceName', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getChatwoot(req.params.instanceName);
  res.json({ success: true, data: result });
}));

// ================== CHAT ==================
app.get('/api/chat/:instanceName/list', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.getChats(req.params.instanceName);
  res.json({ success: true, data: result });
}));

app.get('/api/chat/:instanceName/:number/messages', authenticate, handleAsync(async (req: any, res: any) => {
  const { limit, page } = req.query;
  const result = await evolutionClient.getChatMessages(req.params.instanceName, {
    number: req.params.number,
    limit: limit ? parseInt(limit as string) : 20,
    page: page ? parseInt(page as string) : 1,
  });
  res.json({ success: true, data: result });
}));

app.put('/api/chat/:instanceName/read', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.markMessageAsRead(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.put('/api/chat/:instanceName/archive', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.archiveChat(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.delete('/api/chat/:instanceName/message', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.deleteMessage(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

// ================== UTILITÁRIOS ==================
app.put('/api/utils/:instanceName/presence', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.sendPresence(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

app.put('/api/utils/:instanceName/block', authenticate, handleAsync(async (req: any, res: any) => {
  const result = await evolutionClient.blockUnblockContact(req.params.instanceName, req.body);
  res.json({ success: true, data: result });
}));

// ================== MIDDLEWARE DE ERRO ==================
app.use((error: any, req: any, res: any, next: any) => {
  console.error('❌ Erro na API:', error);
  
  res.status(error.response?.status || 500).json({
    success: false,
    error: error.message,
    details: error.response?.data || null,
    timestamp: new Date().toISOString(),
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado',
    availableEndpoints: '/api/instances, /api/messages, /api/contacts, /api/groups, /api/webhooks, /api/chatwoot, /api/chat, /api/utils',
  });
});

// ================== INICIAR SERVIDOR ==================
const server = app.listen(port, () => {
  console.log('🚀 MCP Evolution API Server iniciado!');
  console.log(`📡 Rodando em: http://localhost:${port}`);
  console.log(`🔗 Evolution API: ${config.baseURL}`);
  console.log(`🔐 API Secret: ${process.env.API_SECRET ? 'Configurado' : 'Não configurado'}`);
  console.log('');
  console.log('📋 Endpoints disponíveis:');
  console.log('  GET  /health - Health check');
  console.log('  GET  /info - Informações do servidor');
  console.log('  POST /api/instances/create - Criar instância');
  console.log('  GET  /api/instances/list - Listar instâncias');
  console.log('  POST /api/messages/:instance/text - Enviar mensagem');
  console.log('  ... e muitos mais!');
  console.log('');
  console.log('🎯 Pronto para receber comandos do Claude!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado graciosamente');
    process.exit(0);
  });
});

export default app;