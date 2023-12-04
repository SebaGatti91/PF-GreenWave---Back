const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// USERS;
const { getUsers } = require('../controllers/getUsers');
const { getUserById } = require('../controllers/getUsersById');
const { postUser } = require('../controllers/postUser');
const { banUser } = require ('../controllers/banUser');

// PRODUCTS;
const { getProducts } = require('../controllers/getProducts');
const { getProductsId } = require('../controllers/getProductId');
const { postProduct } = require('../controllers/postProduct');
const { putProduct } = require('../controllers/putProduct');
const { pauseProduct } = require('../controllers/pauseProduct');
const { deleteProduct } = require('../controllers/deleteProduct');

// MATERIALS;
const { getMaterials } = require('../controllers/getMaterials');
const { postMaterial } = require('../controllers/postMaterial');

// POINTS;
const { getPoints } = require('../controllers/getPoints');
const { postPoint } = require('../controllers/postPoint');

// MERCADO PAGO;
const { mercadoController } = require('../controllers/mercadoController');
const { responseMercado } = require('../controllers/responseMercado');
const { getPurchases } = require('../controllers/getPurchases');

// FAVORITES;
const { getFavs } = require ('../controllers/getFavorites');
const { addFavorites } = require('../controllers/addFavorites');
const { removeFavorites } = require('../controllers/removeFavorites');

//REVIEWS
const { addReviews } = require('../controllers/addReviews');

const router = Router();

// Configurar los routers;
// Ejemplo: router.use('/auth', authRouter);

// GET;
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/store', getProducts);
router.get('/store/:id', getProductsId);
router.get('/materials', getMaterials);
router.get('/points', getPoints);
router.get('/feedback', responseMercado);
router.get('/favorites/:id', getFavs);
router.get('/purchases/:id', getPurchases);

// POST;
router.post('/users', postUser);
router.post('/products', postProduct);
router.post('/materials', postMaterial);
router.post('/points', postPoint);
router.post('/mercadoPago', mercadoController);
router.post('/favorites' , addFavorites);
router.post('/reviews' , addReviews);

// PUT;
router.put('/users/ban/:userId', banUser);
router.put('/products/:id', putProduct); 

// DELETE;
router.delete('/products/pause/:id', pauseProduct);
router.delete('/products/delete/:id', deleteProduct);
router.delete('/favorites' , removeFavorites);

module.exports = router;
