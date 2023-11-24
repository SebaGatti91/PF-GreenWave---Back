const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getMaterials } = require('../controllers/getMaterials');
const { getPoints } = require('../controllers/getPoints');
const { getProducts } = require('../controllers/getProducts');
const { postMaterial } = require('../controllers/postMaterial');
const { postPoint } = require('../controllers/postPoint');
const { postProduct } = require('../controllers/postProduct');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/materials', getMaterials);
router.get('/points', getPoints);
router.get('/products', getProducts);
router.post('/materials', postMaterial);
router.post('/points', postPoint);
router.post('/products', postProduct);
router.get('/products/:id', getProducts)

module.exports = router;
