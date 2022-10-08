const express = require('express');
const router = express.Router();
const loadController = require('../../controllers/admin-app/category.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/all', awaitHandlerFactory(loadController.getAll));
router.get('/product', auth(), awaitHandlerFactory(loadController.categoriya));
router.get('/one/:id',  awaitHandlerFactory(loadController.getOne));
router.post('/createss', awaitHandlerFactory(loadController.create));
router.patch('/update/:id',  awaitHandlerFactory(loadController.update));
router.delete('/delete/:id',  awaitHandlerFactory(loadController.delete));
module.exports = router;