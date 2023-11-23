const { Router } = require('express');
const { getMaterials } = require('../controllers/getMaterials');
const { getPoints } = require('../controllers/getPoints');
const { getProducts } = require('../controllers/getProducts');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/materials', getMaterials)
router.get('/points', getPoints)
router.get('/products', getProducts)

module.exports = router;
