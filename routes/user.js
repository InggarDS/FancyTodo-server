const router = require('express').Router();
const controller = require('../controllers/user')

router.post('/signin', controller.signin)
router.post('/signup', controller.signup)
router.post('/googleSign', controller.googleSign)


module.exports = router