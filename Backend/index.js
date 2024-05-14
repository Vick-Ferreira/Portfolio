const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;

// Configuração do middleware para permitir solicitações de qualquer origem
app.use(cors());

// Ou, se você não estiver usando body-parser:
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/imagens', express.static(path.join(__dirname, 'uploads/imagens')));
app.use(express.static(path.join(__dirname, '../public')));
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
