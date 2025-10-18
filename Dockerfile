# Imagem base do Node.js
FROM node:16-alpine

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Executar o build da aplicação
RUN npm run build

# Copiar apenas o conteúdo da pasta ./dist para o diretório de trabalho no container
COPY . .

# Expor a porta que a aplicação vai rodar (opcional)
EXPOSE 3000

# Comando para rodar a aplicação (ajuste conforme seu start script)
CMD ["npm", "start"]
 