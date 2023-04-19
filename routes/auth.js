const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email').isEmail().withMessage('El email no es valido'),
    check('password').notEmpty().withMessage('La password es obligatoria'),
    validarCampos,
    ],
    login)

module.exports = router