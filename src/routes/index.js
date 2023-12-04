const { Router } = require('express');

const { getUsers } = require('../controllers/getUsers');
const { postUser } = require('../controllers/postUser');
const { getProducts } = require('../controllers/getProducts');
const { getProductsId } = require('../controllers/getProductId');
const { postProduct } = require('../controllers/postProduct');
const { putProduct } = require('../controllers/putProduct');
const { pauseProduct } = require('../controllers/pauseProduct');
const { deleteProduct } = require('../controllers/deleteProduct');
const { getMaterials } = require('../controllers/getMaterials');
const { postMaterial } = require('../controllers/postMaterial');
const { getPoints } = require('../controllers/getPoints');
const { postPoint } = require('../controllers/postPoint');
const { getUserById } = require('../controllers/getUsersById');
const { mercadoController } = require('../controllers/mercadoController');
const { responseMercado } = require('../controllers/responseMercado');
const { banUser } = require ('../controllers/banUser');
const { addFavorites } = require('../controllers/addFavorites');
const { removeFavorites } = require('../controllers/removeFavorites');
const { addReviews } = require('../controllers/addReviews');
const { getFavs } = require ('../controllers/getFavorites');
const { getPurchases } = require('../controllers/getPurchases');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// GET
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/store', getProducts);
router.get('/store/:id', getProductsId);
router.get('/feedback', responseMercado);
router.get('/materials', getMaterials);
router.get('/points', getPoints);
router.get('/feedback', responseMercado);
router.get('/getfavs/:id', getFavs);
router.get('/purchases/:id', getPurchases);

// POST
router.post('/products', postProduct);
router.post('/materials', postMaterial);
router.post('/users', postUser);
router.post('/points', postPoint);
router.post('/mercadoPago', mercadoController);
router.post('/addFavorites' , addFavorites)
router.post('/removeFavorites' , removeFavorites)
router.post('/addReviews' , addReviews)

// PUT
router.put('/products/:id', putProduct);
router.put('/users/ban/:userId', banUser)

// DELETE
router.delete('/products/pause/:id', pauseProduct);
router.delete('/products/delete/:id', deleteProduct);

module.exports = router;
