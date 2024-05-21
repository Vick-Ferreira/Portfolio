const Projeto = require('../models/Projeto');
const { uploadFile } = require('../index'); // Importa a função de upload

exports.createProjeto = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const localFilePath = req.file.path;
    const gcsFilePath = `videos/${req.file.filename}`;
    await uploadFile(localFilePath, gcsFilePath);
    const videoUrl = `https://storage.googleapis.com/meu_portfolio/${gcsFilePath}`;

    const projeto = new Projeto({ titulo, descricao, video: videoUrl });
    await projeto.save();

    res.json({ projeto, msg: "Projeto salvo com sucesso" });
  } catch (err) {
    console.error("Erro ao salvar o projeto:", err);
    res.status(500).json({ message: "Erro ao salvar o projeto." });
  }
};


exports.buscarProjeto = async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.json(projetos);
  } catch (err) {
    console.error("Erro ao buscar projetos:", err);
    res.status(500).json({ message: "Erro ao buscar projetos." });
  }
};

