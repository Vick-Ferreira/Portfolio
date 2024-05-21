const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const { Storage } = require('@google-cloud/storage');

// Configurações
const port = process.env.PORT || 3000;

// Crie uma instância do cliente de armazenamento
const storage = new Storage({
  projectId: 'local-circuit-422814' , // Altere para o ID do seu projeto
  keyFilename: path.join(__dirname, 'path-to-your-service-account-file.json') // Altere para o caminho do seu arquivo de credenciais
});

const bucketName = 'meu_portfolio';
const bucket = storage.bucket(bucketName);

// Função para fazer upload de arquivos
async function uploadFile(filePath, destination) {
  await bucket.upload(filePath, {
    destination: destination,
    public: true, // Torna o arquivo público
  });
  console.log(`${filePath} uploaded to ${bucketName}/${destination}`);
}

module.exports = {
  uploadFile,
};

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads/imagens', express.static(path.join(__dirname, 'uploads/imagens')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// Roteadores
const projetoRouter = require('./routers/projetoRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const imgBtnRouter = require('./routers/imgBtnRouter');
const uploadRouter = require('./routers/uploadRouter');

app.use('/projeto', projetoRouter);
app.use('/feedback', feedbackRouter);
app.use('/imgBtn', imgBtnRouter);
app.use('/upload', uploadRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Olá Vitoria, seu backend está rodando!' });
});

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexão com MongoDB estabelecida com sucesso!');
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
