const express = require('express');
const employeeRouter = require('./employee.router');
const bookingRouter = require('./booking.router');
const authRouter = require('./auth.router');
const roleRouter = require("./role.router");
const rosterRouter = require("./roster.router");
const categoryRouter = require("./category.router");

const router = express.Router();

router.use('/bookings', bookingRouter);
router.use('/auth',authRouter)
router.use('/employees', employeeRouter);
router.use('/roles',roleRouter);
router.use('/rosters',rosterRouter)
router.use('/categories',categoryRouter)

module.exports = router;