const express = require('express');
const { check } = require('express-validator');
const { createOrder,getAllOrders,getAllUserOrder,updateOrder,deleteOrder } = require('../controllers/order.controller');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

const orderRouter = express.Router();

orderRouter.post(
  "/",
  [
    auth,
    check("itemList").not().isEmpty().withMessage("Item list is required"),
    check("address").not().isEmpty().withMessage("Address is required"),
    check("paymentMethod").not().isEmpty().withMessage("Payment method is required"),
  ],
  createOrder
);

orderRouter.get("/",[auth],getAllOrders)

orderRouter.get("/user/orders",[auth],getAllUserOrder)


orderRouter.patch("/:id",[auth],updateOrder)

orderRouter.delete("/:id",[auth],deleteOrder)

module.exports = orderRouter;