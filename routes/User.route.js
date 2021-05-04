const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');


// About page route.
router.get('/', UserController.getAll)
router.post('/create', UserController.create)
router.put('/update/:id', UserController.update)
router.delete('/delete/:id', UserController.delete)
router.post('/updateNoOfOrders', UserController.updateNoOfOrders)

module.exports = router;