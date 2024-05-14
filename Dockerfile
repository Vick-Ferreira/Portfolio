FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do backend
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Define o diretório de trabalho para o diretório Backend
WORKDIR /usr/src/app/Backend

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
