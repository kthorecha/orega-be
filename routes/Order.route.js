const express = require('express');
const router = express.Router();
const orderController = require('../controllers/Order.controller');


// About page route.
router.get('/', orderController.getAll)
router.post('/create', orderController.create)
router.put('/update/:id', orderController.update)
router.delete('/delete/:id', orderController.delete)
router.get('/getUserOrders', orderController.getUserwiseOrders)
// router.get('/getUserOrderById/:id', orderController.getOrderCountByUserId)

module.exports = router;