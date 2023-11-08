const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/usuario', (req, res) => {
  const { name } = req.body;
  // Faça o que for necessário para adicionar um usuário ao seu JSON

  res.status(201).json({ name });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
