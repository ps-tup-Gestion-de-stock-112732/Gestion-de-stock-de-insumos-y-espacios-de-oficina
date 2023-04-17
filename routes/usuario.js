const {Router} = require('express');
const { usuariosGet, usuarioGet } = require('../controllers/usuarioController');

const router = Router();

router.get('/', usuariosGet )
router.get('/:id', usuarioGet)

module.exports = router;