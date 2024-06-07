const express = require('express');
const employeeRouter = require('./employee.router');
const bookingRouter = require('./booking.router');
const authRouter = require('./auth.router');

const router = express.Router();

router.use('/employees', employeeRouter);
router.use('/bookings', bookingRouter);
router.use('/auth',authRouter)

module.exports = router;