const router = require('express').Router();
const apiRoutes = require('./api');

apiRoutes.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>ERRORRRR!!!!</h1>');
});

module.exports = router;