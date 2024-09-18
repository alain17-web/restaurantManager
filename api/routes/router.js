// Importing Express to create a router
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
const purchaseItemRouter = require("./purchaseItem.router");
const financeRouter = require("./finance.router");
const stockRouter = require("./stock.router");

// Creating an instance of the Express Router
const router = express.Router();

// Define the routes for the application, associating specific routers with URL paths
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
router.use('/purchaseItems',purchaseItemRouter)
router.use('/finances',financeRouter)
router.use('/stock',stockRouter)

module.exports = router;

