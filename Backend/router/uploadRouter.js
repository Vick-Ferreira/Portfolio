const express = require('express');
const router = express.Router();
const { upload, uploadImagem, uploadVideo } = require('../controllers/uploadController');

// Rotas de upload
router.post('/imagem', upload.single('imagem'), uploadImagem);
router.post('/video', upload.single('video'), uploadVideo);

module.exports = router;
