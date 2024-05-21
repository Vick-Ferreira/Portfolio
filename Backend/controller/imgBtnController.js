const ImgBtn = require('../models/ImgBtn');
const { uploadFile } = require('../index'); // Importa a função de upload

exports.createImgBtn = async (req, res) => {
  try {
    const localFilePath = req.file.path;
    const gcsFilePath = `imagens/${req.file.filename}`;
    await uploadFile(localFilePath, gcsFilePath);
    const imageUrl = `https://storage.googleapis.com/meu_portfolio/${gcsFilePath}`;

    const imgBtn = new ImgBtn({ imagem: imageUrl });
    await imgBtn.save();

    res.json({ imgBtn, msg: "Imagem salva com sucesso" });
  } catch (err) {
    console.error("Erro ao salvar a imagem:", err);
    res.status(500).json({ message: "Erro ao salvar a imagem." });
  }
};

exports.buscarImgBtn = async (req, res) => {
  try {
    const imgBtn = await ImgBtn.find();
    res.json(imgBtn);
  } catch (err) {
    console.error("Erro ao buscar projetos:", err);
    res.status(500).json({ message: "Erro ao buscar projetos." });
  }
};
