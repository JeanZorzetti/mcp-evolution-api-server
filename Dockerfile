# Use Node.js 20 Alpine para imagem mais leve
FROM node:20-alpine

# Metadados
LABEL maintainer="Evolution API MCP Server"
LABEL description="Servidor MCP para Evolution API - Acesso remoto para Claude"

# Instalar dependências do sistema
RUN apk add --no-cache \
    dumb-init \
    curl \
    && rm -rf /var/cache/apk/*

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./

# Instalar TODAS as dependências (incluindo devDependencies para compilar)
RUN npm install && npm cache clean --force

# Copiar código fonte
COPY src/ ./src/

# Compilar TypeScript
RUN npm run build

# Remover dependências de desenvolvimento e arquivos desnecessários
RUN npm prune --production && \
    rm -rf src/ tsconfig.json node_modules/.cache

# Mudar para usuário não-root
USER nextjs

# Expor porta 3002
EXPOSE 3002

# Health check na porta 3002
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3002/health || exit 1

# Usar dumb-init para gerenciamento de processos
ENTRYPOINT ["dumb-init", "--"]

# Comando padrão
CMD ["node", "dist/server.js"]