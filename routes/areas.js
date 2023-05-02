const { Router } = require('express');
const { areasGet } = require('../controllers/areasController');

const routerAreas = Router();

routerAreas.get('/', areasGet )

module.exports = routerAreas;