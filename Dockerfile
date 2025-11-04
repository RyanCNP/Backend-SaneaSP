# Usar a imagem do Node.js
FROM node:16-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar apenas package.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar restante do código
COPY . .

# Expor a porta da API
EXPOSE 3000

# Rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]
