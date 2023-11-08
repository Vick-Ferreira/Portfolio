const express = require('express');
const axios = require('axios'); // Importe a biblioteca axios
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/usuario', async (req, res) => {
  const { name } = req.body;

  try {
    // Faz uma requisição POST para a API JSON para adicionar um usuário
    const response = await axios.post('https://json-portfolio-alpha.vercel.app/', { name });

    // Verifica se a resposta da API foi bem-sucedida
    if (response.status === 201) {
      // Retorna a resposta da API como resposta do seu servidor Express
      res.status(201).json({ name });
    } else {
      res.status(500).json({ error: 'Erro ao adicionar usuário' });
    }
  } catch (error) {
    console.error('Erro na requisição para a API JSON:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
