const router = require('express').Router()
const Projeto = require('../models/projetos')
const projetosController = require('../controller/projetoController')



//crinado rotas para a API

router.post('/', upload.single('video'), projetosController.createProjeto);

router.get('/', projetosController.buscarProjeto);

module.exports = router;