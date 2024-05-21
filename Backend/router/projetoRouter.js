const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');
const uploads = require("../config/multerVideo");

router.post('/', uploads.single('video'), projetoController.createProjeto);
router.get('/', projetoController.buscarProjeto);

module.exports = router;
