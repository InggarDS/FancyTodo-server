const router = require('express').Router();
const controller = require('../controllers/user')

router.get('/signin', controller.signin)
router.post('/signup', controller.signup)


module.exports = router