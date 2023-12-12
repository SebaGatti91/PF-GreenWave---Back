const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getUsers } = require('../controllers/getUsers');
const { getUserById } = require('../controllers/getUserById');
const { postUser } = require('../controllers/postUser');
const { putUser } = require("../controllers/putUsers");
const { banUser } = require('../controllers/banUser');
const { getProducts } = require('../controllers/getProducts');
const { getProductById } = require('../controllers/getProductById');
const { postProduct } = require('../controllers/postProduct');
const { putProduct } = require('../controllers/putProduct');
const { pauseProduct } = require('../controllers/pauseProduct');
const { deleteProduct } = require('../controllers/deleteProduct');
const { getMaterials } = require('../controllers/getMaterials');
const { postMaterial } = require('../controllers/postMaterial');
const { getPoints } = require('../controllers/getPoints');
const { postPoint } = require('../controllers/postPoint');
const { mercadoController } = require('../controllers/mercadoController');
const { responseMercado } = require('../controllers/responseMercado');
const { getPurchases } = require('../controllers/getPurchases');
const { getUserProducts } = require("../controllers/getUserProducts");
const { getFavs } = require('../controllers/getFavs');
const { addFavorites } = require('../controllers/addFavorites');
const { removeFavorites } = require('../controllers/removeFavorites');
const { getReviews } = require('../controllers/getReviews');
const { postReview } = require('../controllers/postReview');
const { setAdminUser } = require('../controllers/setAdminUser');
const { getUserByEmail } = require('../controllers/getUserByEmail');
const { addPurchase } = require('../controllers/addPurchase');
const { postDonation } = require('../controllers/postDonation');
const { getDonation } = require('../controllers/getDonationByUserId');
// const { verifyToken } = require('../controllers/authjwt');
const { putReview } = require('../controllers/putReview');
const { deleteReview } = require('../controllers/deleteReview');
const { getMercadoFail} = require('../controllers/getMercadoFail');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// GET
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/users/email/:email', getUserByEmail);
router.get('/store', getProducts);
router.get('/store/:id', getProductById);
router.get('/materials', getMaterials);
router.get('/points', getPoints);
router.post('/feedback', responseMercado);
router.get('/getfavs/:id', getFavs);
router.get('/purchases/:id', getPurchases);
router.get("/getUserProducts/:id", getUserProducts);
router.get('/reviews/:productId', getReviews)
router.get("/getDonation/:id", getDonation);
router.get("/failMp", getMercadoFail);

// POST
router.post('/products', postProduct);
router.post('/materials', postMaterial);
router.post('/users', postUser);
router.post('/points', postPoint);
router.post('/mercadoPago', mercadoController);
router.post('/addFavorites', addFavorites);
router.post('/removeFavorites', removeFavorites);
router.post("/addPurchase", addPurchase)
router.post('/reviews', postReview);
router.post('/donation', postDonation)

// PUT
router.put('/products/:id', putProduct);
router.put('/users/ban/:userId', banUser);
router.put('/users/admin/:userId', setAdminUser);
router.put('/users/update/:userId', putUser);
router.put('/reviews/:productId/:reviewId', putReview);
router.put('/products/pause/:id', pauseProduct);

// DELETE
router.delete('/products/delete/:id', deleteProduct);
router.delete('/reviews/:productId/:reviewId', deleteReview);

module.exports = router;
