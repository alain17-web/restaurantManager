const express = require('express');
const employeeRouter = require('./employee.router');
const bookingRouter = require('./booking.router');
const authRouter = require('./auth.router');
const roleRouter = require("./role.router");

const router = express.Router();


router.use('/bookings', bookingRouter);
router.use('/auth',authRouter)
router.use('/employees', employeeRouter);
router.use('/roles',roleRouter);

module.exports = router;