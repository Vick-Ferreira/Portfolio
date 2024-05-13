const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;

// Configuração do middleware para permitir solicitações de qualquer origem
app.use(cors());

// Configuração do middleware para analisar JSON e URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ATENÇÃO:caminho relativo para o diretório de uploads. Isso pode funcionar localmente, mas pode não funcionar corretamente quando você implanta seu aplicativo em um ambiente de produção.
// Configuração para permitir solicitações de qualquer origem nas rotas específicas
app.use('/uploads', express.static(path.join(__dirname, 'Backend/uploads')));
app.use('/uploads/imagens', express.static(path.join(__dirname, 'Backend/uploads/imagens')));
app.use(express.static(path.join(__dirname, 'public')));
// Roteadores
const projetoRouter = require('./router/projetoRouter');
const feedbackRouter = require('./router/feedbackRouter');
const imgBtnRouter = require('./router/imgBtnRouter');

app.use('/projeto', projetoRouter);
app.use('/feedback', feedbackRouter);
app.use('/imgBtn', imgBtnRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Olá Vitoria, seu backend está rodando!' });
});

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URI, {
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
app.listen(port, () => {
  console.log(`Servidor está rodando na porta: ${port}`);
});
