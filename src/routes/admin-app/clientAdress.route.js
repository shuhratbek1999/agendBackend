const express = require('express');
const router = express.Router();
const clientAdressController = require('../../controllers/admin-app/clientAdress.controller');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
router.get('/visit/:id',   auth(), awaitHandlerFactory(clientAdressController.getOne));
router.get('/clientAdress',   auth(), awaitHandlerFactory(clientAdressController.getFull));
router.get('/fullclientAdress',   auth(), awaitHandlerFactory(clientAdressController.getUser));
router.post('/creates',  awaitHandlerFactory(clientAdressController.create));
router.patch('/update/:id', auth(), awaitHandlerFactory(clientAdressController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(clientAdressController.delete));
module.exports = router;