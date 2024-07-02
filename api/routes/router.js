const express = require('express');
const employeeRouter = require('./employee.router');
const bookingRouter = require('./booking.router');
const authRouter = require('./auth.router');
const roleRouter = require("./role.router");
const rosterRouter = require("./roster.router");
const categoryRouter = require("./category.router");
const drinkRouter = require("./drink.router");
const dishRouter = require("./dish.router");
const orderRouter = require("./order.router");
const orderItemRouter = require("./orderItem.router");
const purchaseRouter = require("./purchase.router");

const router = express.Router();

router.use('/bookings', bookingRouter);
router.use('/auth',authRouter)
router.use('/employees', employeeRouter);
router.use('/roles',roleRouter);
router.use('/rosters',rosterRouter)
router.use('/categories',categoryRouter)
router.use('/drinks',drinkRouter)
router.use('/dishes',dishRouter)
router.use('/orders',orderRouter)
router.use('/orderItems',orderItemRouter)
router.use('/purchases',purchaseRouter)


module.exports = router;

