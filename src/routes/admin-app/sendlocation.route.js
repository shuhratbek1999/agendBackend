const express = require('express');
const router = express.Router();
const sendLocationController = require('../../controllers/admin-app/sendlocation.controller');
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

router.get('/all', awaitHandlerFactory(sendLocationController.getAll));
router.get('/location', awaitHandlerFactory(sendLocationController.sendLocation));
router.get('/one/:id',  awaitHandlerFactory(sendLocationController.getOne));
router.post('/sendLocation', auth(), awaitHandlerFactory(sendLocationController.create));
router.patch('/update/:id',  awaitHandlerFactory(sendLocationController.update));
router.delete('/delete/:id',  awaitHandlerFactory(sendLocationController.delete));
module.exports = router;