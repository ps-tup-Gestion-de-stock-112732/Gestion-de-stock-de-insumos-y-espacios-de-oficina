const { Router } = require('express');
const { rolesGet } = require('../controllers/roleController');

const routerRoles = Router();

routerRoles.get('/', rolesGet )

module.exports = routerRoles;