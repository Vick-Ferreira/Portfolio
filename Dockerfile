FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o arquivo package.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do backend
RUN npm install

# Copia a pasta Backend para o diretório de trabalho
COPY Backend ./Backend

# Copia a pasta public para o diretório de trabalho
COPY public ./public

# Copia a pasta uploads de dentro da pasta Backend para o diretório de trabalho
COPY Backend/uploads ./uploads

# Define o diretório de trabalho
WORKDIR /usr/src/app/

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
