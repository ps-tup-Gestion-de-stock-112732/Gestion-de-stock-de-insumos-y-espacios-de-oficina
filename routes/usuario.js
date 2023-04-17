const {Router} = require('express');
const { usuariosGet, usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuarioController');

const router = Router();

router.get('/', usuariosGet )
router.get('/:id', usuarioGet)
router.post('/', usuarioPost)
router.patch('/:id', usuarioPut)
router.put('/delete/:id', usuarioDelete)

module.exports = router;