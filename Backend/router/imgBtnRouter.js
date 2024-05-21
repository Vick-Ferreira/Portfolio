const express = require('express');
const router = express.Router();
const imgBtnController = require('../controllers/imgBtnController');
const uploads = require("../config/multerImage");

router.post('/', uploads.single('imagem'), imgBtnController.createImgBtn);
router.get('/', imgBtnController.buscarImgBtn);

module.exports = router;
