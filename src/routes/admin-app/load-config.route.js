const express = require('express');
const router = express.Router();
const loadController = require('../../controllers/admin-app/load-config.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/agentApp', awaitHandlerFactory(loadController.getAll));
router.get('/agentApp/:id',  awaitHandlerFactory(loadController.getOne));
router.post('/create', awaitHandlerFactory(loadController.create));
router.patch('/update/:id',  awaitHandlerFactory(loadController.update));
router.delete('/delete/:id',  awaitHandlerFactory(loadController.delete));
module.exports = router;