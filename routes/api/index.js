const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');

router.use('/thoughts', thoughtRoutes);

module.exports = router;