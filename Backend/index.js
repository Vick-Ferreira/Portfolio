const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 5000;

// Configuração do middleware cors para permitir solicitações de qualquer origem
app.use(cors());
// Configuração do middleware para permitir solicitações de qualquer origem
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Configurar o middleware para servir arquivos estáticos do diretório 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/imagens', express.static(path.join(__dirname, 'uploads/imagens')));
app.use(express.json());

const projetoRouter = require('./router/projetoRouter');
app.use('/projeto', projetoRouter);
const feedbackRouter = require('./router/feedbackRouter');
app.use('/feedback', feedbackRouter);
const imgBtnRouter = require('./router/imgBtnRouter');
app.use('/imgBtn', imgBtnRouter);
//configuração para servir meus arquivos estáticos
const frontendPath = path.join(__dirname, '../public');
app.use(express.static(frontendPath));
app.use(express.urlencoded({ extended: true }))//analisa dados das solicitações (extended :indica ao Express para analisar dados codificados em URL usando a biblioteca querystring do Node.js)
//metodo teste
app.get('/', (req, res) => {
  res.json({ message: 'Olá Vitoria, seu backend está rodando!' });
});
//Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Conexão com MongoDB estabelecida com sucesso!");
});

// Inicialização do servidor
console.log("Iniciando o servidor...");
app.listen(port, () => {
  console.log(`Servidor está rodando na porta: ${port}`);
});