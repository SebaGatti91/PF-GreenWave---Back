const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getUsers } = require('../controllers/getUsers');
const { postUser } = require('../controllers/postUser');
const { getProducts } = require('../controllers/getProducts');
const { getProductsId } = require('../controllers/getProductId');
const { postProduct } = require('../controllers/postProduct');
const { putProduct } = require('../controllers/putProduct');
const { deleteProduct } = require('../controllers/deleteProduct');
const { getMaterials } = require('../controllers/getMaterials');
const { postMaterial } = require('../controllers/postMaterial');
const { getPoints } = require('../controllers/getPoints');
const { postPoint } = require('../controllers/postPoint');
const { getUserById } = require('../controllers/getUsersById');
const { mercadoController } = require('../controllers/mercadoController');
const { banUser } = require ('../controllers/banUser')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/users', getUsers);
router.post('/users', postUser);
router.get('/store', getProducts);
router.get('/store/:id', getProductsId);
router.post('/products', postProduct);
router.put('/products', putProduct);
router.delete('/store/:id', deleteProduct);
router.get('/materials', getMaterials);
router.post('/materials', postMaterial);
router.get('/points', getPoints);
router.post('/points', postPoint);
router.get('/users/:id', getUserById);
router.post('/mercadoPago', mercadoController);
router.put('/users/ban/:userId', banUser)

module.exports = router;
