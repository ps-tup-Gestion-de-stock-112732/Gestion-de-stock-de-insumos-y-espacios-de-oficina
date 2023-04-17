const {Router} = require('express');
const { usuariosGet, usuarioGet, usuarioPut } = require('../controllers/usuarioController');

const router = Router();

router.get('/', usuariosGet )
router.get('/:id', usuarioGet)
router.patch('/:id', usuarioPut)

module.exports = router;