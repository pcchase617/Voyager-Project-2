const router = require('express').Router();

const apiRoutes = require('./api');
const { route } = require('./homeRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
routee.use('/',homeRoutes)
router.use('/api', apiRoutes);

module.exports = router;
